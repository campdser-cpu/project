// ─────────────────────────────────────────────────────────────────────────────
// UI translation-key guard.
//
// t() resolves locales → gap layer → English → the key itself. That last step
// means a missing key does not throw: it paints its own name on the page.
//
// This bit once already: the journey keys were registered in gaps/index.ts but
// not in gaps/en-eager.ts, which is the ONLY gap module bundled for English at
// runtime. The prerendered HTML read correctly (the prerenderer imports the
// full gap aggregate) while the live English page showed "jx_exp_title" and
// "JX_GRP_DESERT". Nothing in the build caught it.
//
// So: collect every t('…') / tr(lang, '…') literal in the app source, and
// assert each one resolves in English through the SAME path the browser uses —
// registry.en plus gaps/en-eager. A key that resolves to itself fails.
//
// Runs in `npm run test:deterministic`, before the build.
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
// Presence, not resolved value: some entries legitimately equal their own key
// (en.ts has `person: "person"`), so comparing t() output to the key would
// report those as missing. These two objects are exactly what the browser has
// for English — the static dict plus the one eagerly bundled gap module.
import enDict from '../src/i18n/locales/en';
import { enGaps } from '../src/i18n/gaps/en-eager';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx|ts)$/.test(name)) out.push(p);
  }
  return out;
}

// Keys reached through a variable rather than a literal (e.g. `t(GROUP_KEY[k])`,
// `t(`jx_hbw_${n}_t`)`) cannot be found by a text scan, so list those families
// explicitly and expand them here.
const TEMPLATE_KEYS = [
  ...[1, 2, 3, 4].flatMap((n) => [`jx_hbw_${n}_t`, `jx_hbw_${n}_d`]),
  'jx_grp_desert', 'jx_grp_landscape', 'jx_grp_heritage', 'jx_grp_city', 'jx_grp_culture', 'jx_grp_activity',
  'jx_f_any', 'jx_f_private', 'jx_f_shared',
  'jx_f_comfort_standard', 'jx_f_comfort_luxury',
  'jx_f_camp_standard', 'jx_f_camp_luxury',
  'jx_f_pace_relaxed', 'jx_f_pace_full',
];

const files = walk(join(root, 'src'));
const keys = new Set<string>(TEMPLATE_KEYS);
for (const f of files) {
  const src = readFileSync(f, 'utf8');
  for (const m of src.matchAll(/\bt\(\s*'([a-z0-9_]+)'\s*\)/gi)) keys.add(m[1]);
  for (const m of src.matchAll(/\btr\(\s*lang\s*,\s*'([a-z0-9_]+)'\s*\)/gi)) keys.add(m[1]);
}

const known = new Set([...Object.keys(enDict as Record<string, string>), ...Object.keys(enGaps)]);
const missing = [...keys].filter((k) => !known.has(k)).sort();
console.log(`ui-keys: scanned ${files.length} source files, ${keys.size} distinct t() keys`);
if (missing.length) {
  console.error(`ui-keys: FAIL — ${missing.length} key(s) are not defined for English:`);
  for (const k of missing) console.error(`  ${k}`);
  console.error('Add them to src/i18n/locales/en.ts, or to a gap module that gaps/en-eager.ts spreads in.');
  process.exit(1);
}
console.log('ui-keys: PASS (every key resolves in English)');
