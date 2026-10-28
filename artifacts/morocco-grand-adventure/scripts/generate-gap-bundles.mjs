// ─────────────────────────────────────────────────────────────────────────────
// Generates src/i18n/gaps/generated/{lang}.ts — one genuinely-per-locale
// module per non-English language, each containing ONLY that language's flat
// key/value gap completions.
//
// Why this exists: src/i18n/gaps/index.ts merges ~15 hand-authored,
// multi-locale source files (chrome.ts, about.ts, about2.ts, pricing.ts, ...)
// into one `i18nGaps` object keyed by language. That merge is exactly right
// for build-time tooling (i18n-audit.ts, localization-complete.ts) that needs
// every locale available at once. But the CLIENT RUNTIME only ever needs ONE
// locale's gap data at a time, and until now `loadLocale()` dynamically
// imported the whole merged module — so a French visitor's first non-English
// page load fetched all 10 locales' gap completions together (one shared
// ~638KB/~207KB-gzip chunk), not just French's share.
//
// This script does NOT change any of the 15 source files or gaps/index.ts
// itself (audit tooling keeps using that exactly as before) — it just adds a
// second, generated-only artifact that the runtime loader can import
// per-language, the same way src/i18n/content/generated/{lang}.json is
// already a generated artifact sitting alongside hand-authored sources.
//
// Run after any change to src/i18n/gaps/*.ts (needs tsx, not plain node, since
// gaps/index.ts imports its ~15 source files as extensionless TypeScript):
//   npx tsx scripts/generate-gap-bundles.mjs
// (Re-running after a build already picks up this file's current content —
// there is no code-review reason to run it automatically on every build, the
// same way src/i18n/content/generated/*.json is not regenerated on every
// build either.)
// ─────────────────────────────────────────────────────────────────────────────
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { i18nGaps } from '../src/i18n/gaps/index.ts';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(here, '..', 'src', 'i18n', 'gaps', 'generated');
mkdirSync(outDir, { recursive: true });

const LOCALES = ['fr', 'es', 'it', 'de', 'nl', 'pt', 'zh', 'ja', 'ko', 'ar'];

let totalKeys = 0;
for (const lang of LOCALES) {
  const data = i18nGaps[lang] ?? {};
  const keys = Object.keys(data).length;
  totalKeys += keys;
  const path = resolve(outDir, `${lang}.ts`);
  const banner = `// GENERATED FILE — do not hand-edit. Regenerate with:\n//   node scripts/generate-gap-bundles.mjs\n// Source of truth: the ~15 hand-authored files merged by src/i18n/gaps/index.ts\n// (chrome.ts, about.ts, about2.ts, pricing.ts, discovery.ts, trust.ts, guides.ts,\n// student-tours.ts, journey.ts, filters.ts, faq-tours.ts, student-booking.ts,\n// contact-choice.ts, guide-cta.ts, share.ts, and gaps/${lang}.ts itself) — this\n// file is just that locale's slice, split out so the client only ever fetches\n// the one language actually in use.\n`;
  const body = `${banner}const data: Record<string, string> = ${JSON.stringify(data)};\nexport default data;\n`;
  writeFileSync(path, body, 'utf8');
  console.log(`${lang}: ${keys} keys -> ${path}`);
}
console.log(`\nTotal: ${totalKeys} keys across ${LOCALES.length} locales.`);
