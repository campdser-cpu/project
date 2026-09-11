// Verification for Fix #2: localized comparison-page metadata (title/H1/meta
// description) across all 11 locales x 6 comparison slugs, from GENERATED dist
// HTML. Also checks canonical, hreflang count (11 + x-default = 12), that
// x-default points to English, and that no non-English page inherits English
// metadata (compared against the English page; proper nouns are compared as a
// whole string, so e.g. "Merzouga" alone never triggers a false failure).
// Run: node scripts/verify-comparisons-i18n.mjs
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const LOCALES = ['en', 'fr', 'es', 'it', 'de', 'nl', 'pt', 'zh', 'ja', 'ko', 'ar'];
const SLUGS = ['merzouga-vs-zagora', 'erg-chebbi-vs-erg-chigaga', '2-day-vs-3-day-sahara-tour', 'private-vs-shared-tour', 'luxury-camp-vs-standard-camp', 'marrakech-vs-fes'];
const SITE = 'https://www.moroccograndadventure.com';

const strip = (h, re) => (h.match(re)?.[1] ?? '').replace(/\s+/g, ' ').trim();
let failures = 0;
const rows = [];

const en = {};
for (const s of SLUGS) {
  const f = join(dist, 'en', 'comparisons', s, 'index.html');
  const h = readFileSync(f, 'utf8');
  en[s] = { title: strip(h, /<title[^>]*>([\s\S]*?)<\/title>/), h1: strip(h, /<h1[^>]*>([\s\S]*?)<\/h1>/), desc: strip(h, /<meta name="description" content="([^"]*)"/) };
}

for (const lang of LOCALES) {
  for (const s of SLUGS) {
    const f = join(dist, lang, 'comparisons', s, 'index.html');
    if (!existsSync(f)) { console.log(`MISSING FILE ${lang}/comparisons/${s}`); failures++; continue; }
    const h = readFileSync(f, 'utf8');
    const title = strip(h, /<title[^>]*>([\s\S]*?)<\/title>/);
    const h1 = strip(h, /<h1[^>]*>([\s\S]*?)<\/h1>/);
    const desc = strip(h, /<meta name="description" content="([^"]*)"/);
    const canonical = h.match(/rel="canonical" href="([^"]+)"/)?.[1] ?? '';
    const hreflangs = [...h.matchAll(/hreflang="([^"]+)"/g)].map((m) => m[1]);
    const xDefault = h.match(/href="([^"]+)" hreflang="x-default"/)?.[1] ?? h.match(/hreflang="x-default"[^>]*href="([^"]+)"/)?.[1] ?? '';

    const expCanonical = `${SITE}/${lang}/comparisons/${s}`;
    const problems = [];
    if (canonical !== expCanonical) problems.push(`canonical=${canonical}`);
    if (hreflangs.length !== 12) problems.push(`hreflang=${hreflangs.length}`);
    if (!hreflangs.includes('x-default')) problems.push('no x-default');
    if (xDefault && !xDefault.startsWith(`${SITE}/en/`)) problems.push(`x-default=${xDefault}`);
    if (!title || !h1 || !desc) problems.push('missing title/h1/desc');

    if (lang !== 'en') {
      if (title === en[s].title) problems.push('title still English');
      if (h1 === en[s].h1) problems.push('H1 still English');
      if (desc === en[s].desc) problems.push('description still English');
    }
    const ok = problems.length === 0;
    if (!ok) failures++;
    rows.push(`${ok ? 'OK ' : 'FAIL'} ${lang}/${s} | h1="${h1.slice(0, 42)}"${problems.length ? ' | ' + problems.join('; ') : ''}`);
  }
}
console.log(rows.join('\n'));
console.log(failures === 0 ? '\nVERIFY-COMPARISONS-I18N: PASS' : `\nVERIFY-COMPARISONS-I18N: ${failures} FAILURES`);
process.exit(failures === 0 ? 0 : 1);
