// ─────────────────────────────────────────────────────────────────────────────
// Incremental content translation pipeline.
//
// Translates the canonical English content (src/data/content.ts) into every
// supported language and writes per-language ContentOverlay JSON files that the
// runtime imports (src/i18n/content/overlays.ts). Output is static/committed —
// there is NO runtime translation, which keeps the site fast and SEO-friendly.
//
// INCREMENTAL & IDEMPOTENT: each translatable "unit" (a destination, a tour, the
// category labels, etc.) is hashed by its English source. A unit is only re-sent
// to the model when its English text changes (or it is new). Everything else is
// reused from the previously generated file. This makes adding a new tour later a
// cheap re-run rather than a full re-translation — every future tour automatically
// gains all languages.
//
// Usage:
//   npx tsx scripts/i18n-translate.ts            # all languages, incremental
//   npx tsx scripts/i18n-translate.ts fr es      # only these languages
//   npx tsx scripts/i18n-translate.ts --force    # ignore cache, re-translate all
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, writeFileSync, renameSync, mkdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { destinations, tours, experiences, faqData } from '../src/data/content';

// ── Target languages (English is canonical, never translated) ────────────────
const LANGS: { code: string; name: string }[] = [
  { code: 'fr', name: 'French (Français)' },
  { code: 'es', name: 'Spanish (Español, Spain)' },
  { code: 'it', name: 'Italian (Italiano)' },
  { code: 'de', name: 'German (Deutsch)' },
  { code: 'nl', name: 'Dutch (Nederlands)' },
  { code: 'pt', name: 'Portuguese (Português, European)' },
  { code: 'zh', name: 'Simplified Chinese (简体中文)' },
  { code: 'ja', name: 'Japanese (日本語)' },
  { code: 'ko', name: 'Korean (한국어)' },
  { code: 'ar', name: 'Arabic (العربية, Modern Standard)' },
];

const OUT_DIR = 'src/i18n/content/generated';
const MANIFEST_PATH = `${OUT_DIR}/_manifest.json`;
const MODEL = 'gpt-5.4-mini';
const CONCURRENCY = 6;

// ── CLI args ─────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const FORCE = argv.includes('--force');
const requested = argv.filter((a) => !a.startsWith('--'));
const targetLangs = requested.length ? LANGS.filter((l) => requested.includes(l.code)) : LANGS;

// ── Build the English "units" (stable key order → stable hashes) ─────────────
type Unit = { key: string; source: unknown };

const categoryKeys = [...new Set(destinations.map((d) => d.category))];
const categoriesSource: Record<string, string> = Object.fromEntries(categoryKeys.map((k) => [k, k]));

function destSource(d: (typeof destinations)[number]) {
  return {
    name: d.name,
    shortDesc: d.shortDesc,
    description: d.description,
    bestTime: d.bestTime,
    region: d.region,
    highlights: d.highlights,
  };
}

function tourSource(t: (typeof tours)[number]) {
  const s: Record<string, unknown> = { name: t.name, duration: t.duration, highlights: t.highlights };
  if (t.category != null) s.category = t.category;
  if (t.description != null) s.description = t.description;
  if (t.routeCaption != null) s.routeCaption = t.routeCaption;
  if (t.included != null) s.included = t.included;
  if (t.excluded != null) s.excluded = t.excluded;
  if (t.itineraryDays?.length) {
    s.itineraryDays = t.itineraryDays.map((day) => ({ title: day.title, desc: day.desc, stops: day.stops }));
  }
  const caps = (t.gallery ?? []).map((g) => g.caption);
  if (caps.some((c) => c != null && c !== '')) {
    s.gallery = (t.gallery ?? []).map((g) => ({ caption: g.caption ?? '' }));
  }
  if (t.faq?.length) s.faq = t.faq.map((f) => ({ question: f.question, answer: f.answer }));
  return s;
}

const units: Unit[] = [
  { key: 'categories', source: categoriesSource },
  { key: 'experiences', source: experiences },
  { key: 'faq', source: faqData.map((f) => ({ question: f.question, answer: f.answer })) },
  ...destinations.map((d) => ({ key: `destination:${d.id}`, source: destSource(d) })),
  ...tours.map((t) => ({ key: `tour:${t.id}`, source: tourSource(t) })),
];

const hash = (v: unknown) => createHash('sha256').update(JSON.stringify(v)).digest('hex').slice(0, 16);

// ── Model plumbing (OpenAI-compatible endpoint via Replit AI Integrations) ───
const BASE_URL = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;
const API_KEY = process.env.AI_INTEGRATIONS_OPENAI_API_KEY;
if (!BASE_URL || !API_KEY) {
  console.error('Missing AI_INTEGRATIONS_OPENAI_BASE_URL / AI_INTEGRATIONS_OPENAI_API_KEY');
  process.exit(1);
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function withRetry<T>(label: string, fn: () => Promise<T>, tries = 6): Promise<T> {
  let lastErr: unknown;
  for (let attempt = 0; attempt < tries; attempt++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      const wait = Math.min(30000, 800 * 2 ** attempt) + Math.floor(Math.random() * 500);
      if (attempt < tries - 1) await sleep(wait);
    }
  }
  throw new Error(`[${label}] failed after ${tries} tries: ${(lastErr as Error)?.message ?? lastErr}`);
}

const SYSTEM = (langName: string) =>
  `You are an elite luxury-travel copywriter and professional literary translator. Translate the JSON in "source" into ${langName} for a high-end Moroccan travel brand.

Return ONLY a JSON object of the form {"translation": <same structure as source>}.

Rules:
- Translate EVERY human-readable string value. Do NOT translate JSON keys.
- Preserve the exact structure: same keys, same array order, same array length.
- Tone: elegant, evocative, aspirational — premium travel brochure, not a literal machine translation. Adapt idioms naturally.
- Proper nouns (Marrakech, Fes, Sahara, Erg Chebbi, Aït Ben Haddou, Majorelle, Jemaa el-Fnaa, riad, medina, kasbah, hammam, tagine, etc.): use the standard, widely recognized rendering in ${langName}. For Chinese, Japanese, Korean and Arabic use the established local exonym/transliteration where one is commonly used; otherwise keep the original name. Never translate a name word-for-word into something unrecognizable.
- Keep numbers, prices, currency symbols (€), measurements, ×, °, dashes and punctuation intact.
- Never add, remove, explain, or omit items. No commentary.`;

async function translateUnit(langName: string, source: unknown): Promise<unknown> {
  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: SYSTEM(langName) },
        { role: 'user', content: JSON.stringify({ source }) },
      ],
      response_format: { type: 'json_object' },
      max_completion_tokens: 8192,
    }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const j: any = await res.json();
  if (j.error) throw new Error(`API error: ${JSON.stringify(j.error).slice(0, 200)}`);
  const content = j.choices?.[0]?.message?.content;
  if (!content) throw new Error('empty completion');
  const parsed = JSON.parse(content);
  const translation = parsed.translation ?? parsed;
  assertComplete(source, translation);
  return coerce(source, translation);
}

// Verify the model returned a STRUCTURALLY COMPLETE translation before we accept
// it: every non-empty source string must map to a non-empty translated string,
// and arrays must keep their length. This catches silent omissions/truncations
// BEFORE coerce() masks them with English fallback (which would otherwise be
// cached as "translated"). Strings that legitimately equal English (proper nouns)
// still pass — we only reject missing/blank strings or short arrays, never equal output.
function assertComplete(src: unknown, tr: unknown, path = ''): void {
  if (typeof src === 'string') {
    if (src.trim() === '') return;
    if (typeof tr !== 'string' || tr.trim() === '')
      throw new Error(`incomplete at "${path || '(root)'}": missing/blank string`);
    return;
  }
  if (Array.isArray(src)) {
    if (!Array.isArray(tr) || tr.length !== src.length)
      throw new Error(`incomplete at "${path || '(root)'}": array length ${Array.isArray(tr) ? tr.length : 'n/a'} ≠ ${src.length}`);
    src.forEach((s, i) => assertComplete(s, tr[i], `${path}[${i}]`));
    return;
  }
  if (src && typeof src === 'object') {
    if (!tr || typeof tr !== 'object')
      throw new Error(`incomplete at "${path || '(root)'}": missing object`);
    for (const k of Object.keys(src as Record<string, unknown>))
      assertComplete((src as any)[k], (tr as any)[k], path ? `${path}.${k}` : k);
    return;
  }
}

// Force the model output back onto the exact source shape. Any missing/blank
// field falls back to the English source (which the runtime overlay merge also
// tolerates), so the structure can never drift out of index alignment.
function coerce(src: unknown, tr: unknown): unknown {
  if (typeof src === 'string') return typeof tr === 'string' && tr.trim() !== '' ? tr : src;
  if (Array.isArray(src)) return src.map((s, i) => coerce(s, Array.isArray(tr) ? tr[i] : undefined));
  if (src && typeof src === 'object') {
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(src as Record<string, unknown>)) {
      out[k] = coerce((src as Record<string, unknown>)[k], tr && typeof tr === 'object' ? (tr as any)[k] : undefined);
    }
    return out;
  }
  return src;
}

// ── Assemble a ContentOverlay from a per-unit result map ─────────────────────
function assemble(result: Record<string, unknown>) {
  const overlay: Record<string, unknown> = {
    categories: result['categories'],
    experiences: result['experiences'],
    faq: result['faq'],
    destinations: {} as Record<string, unknown>,
    tours: {} as Record<string, unknown>,
  };
  for (const d of destinations) (overlay.destinations as any)[d.id] = result[`destination:${d.id}`];
  for (const t of tours) (overlay.tours as any)[t.id] = result[`tour:${t.id}`];
  return overlay;
}

// Write via a temp file + atomic rename so an interrupted run can never leave a
// half-written (corrupt) JSON overlay or manifest in place.
function writeAtomic(path: string, data: string) {
  const tmp = `${path}.tmp`;
  writeFileSync(tmp, data);
  renameSync(tmp, path);
}

// ── Simple global concurrency pool ───────────────────────────────────────────
async function pool<T>(items: T[], concurrency: number, worker: (item: T) => Promise<void>) {
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, async () => {
      while (i < items.length) {
        const idx = i++;
        await worker(items[idx]);
      }
    }),
  );
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const manifest: Record<string, Record<string, string>> = existsSync(MANIFEST_PATH)
    ? JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'))
    : {};

  // Seed reusable units + collect the tasks that actually need the model.
  const results: Record<string, Record<string, unknown>> = {};
  type Task = { lang: string; langName: string; key: string; source: unknown; h: string };
  const tasks: Task[] = [];

  for (const { code, name } of targetLangs) {
    results[code] = {};
    const prevPath = `${OUT_DIR}/${code}.json`;
    const prev = existsSync(prevPath) ? JSON.parse(readFileSync(prevPath, 'utf8')) : null;
    const prevHashes = manifest[code] ?? {};
    let reused = 0;

    const prevValue = (key: string): unknown => {
      if (!prev) return undefined;
      if (key === 'categories') return prev.categories;
      if (key === 'experiences') return prev.experiences;
      if (key === 'faq') return prev.faq;
      if (key.startsWith('destination:')) return prev.destinations?.[key.slice('destination:'.length)];
      if (key.startsWith('tour:')) return prev.tours?.[key.slice('tour:'.length)];
      return undefined;
    };

    for (const u of units) {
      const h = hash(u.source);
      const cached = prevValue(u.key);
      if (!FORCE && prevHashes[u.key] === h && cached !== undefined) {
        results[code][u.key] = cached;
        reused++;
      } else {
        tasks.push({ lang: code, langName: name, key: u.key, source: u.source, h });
      }
    }
    const need = units.length - reused;
    console.log(`${code}: ${reused} reused, ${need} to translate`);
  }

  console.log(`\nTotal model calls: ${tasks.length} (concurrency ${CONCURRENCY}, model ${MODEL})\n`);

  let done = 0;
  await pool(tasks, CONCURRENCY, async (task) => {
    const value = await withRetry(`${task.lang}/${task.key}`, () => translateUnit(task.langName, task.source));
    results[task.lang][task.key] = value;
    done++;
    if (done % 20 === 0 || done === tasks.length) console.log(`  …${done}/${tasks.length}`);
  });

  // Write per-language overlays + refresh manifest (hashes for every unit).
  for (const { code } of targetLangs) {
    const overlay = assemble(results[code]);
    writeAtomic(`${OUT_DIR}/${code}.json`, JSON.stringify(overlay, null, 2) + '\n');
    manifest[code] = {};
    for (const u of units) manifest[code][u.key] = hash(u.source);
  }
  writeAtomic(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');

  console.log(`\nDone. Wrote ${targetLangs.length} language file(s) to ${OUT_DIR}/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
