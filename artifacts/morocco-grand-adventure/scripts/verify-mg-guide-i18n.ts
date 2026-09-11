// Verification for Fix #5: mg_* Merzouga Guide hub keys (hero, features, FAQs).
// Uses the REAL runtime resolver (t) with every locale dictionary + gap layer
// registered — the same resolution path the hydrated SPA uses on
// /<lang>/merzouga-guide. Asserts:
//   1. en resolves every mg_ key to its canonical English string (never the raw key)
//   2. all 11 locales resolve all 25 mg_ keys to non-empty, non-raw-key values
//   3. the 22 keys added for nl/pt/zh/ja/ko/ar now differ from English
//      (whole-string compare; no literal-key or English fallback remains)
// Run: npx tsx scripts/verify-mg-guide-i18n.ts
import { registerAllTranslations } from '../src/i18n/locales';
import { t, languages, type Lang } from '../src/i18n/index';

const KEYS = [
  'mg_hero_alt', 'mg_breadcrumb', 'mg_title', 'mg_subtitle', 'mg_cta',
  'mg_f1_title', 'mg_f1_desc', 'mg_f2_title', 'mg_f2_desc',
  'mg_f3_title', 'mg_f3_desc', 'mg_f4_title', 'mg_f4_desc',
  'mg_f5_title', 'mg_f5_desc', 'mg_f6_title', 'mg_f6_desc',
  'mg_faq1_q', 'mg_faq1_a', 'mg_faq2_q', 'mg_faq2_a',
  'mg_faq3_q', 'mg_faq3_a', 'mg_faq4_q', 'mg_faq4_a',
];
const ADDED = ['nl', 'pt', 'zh', 'ja', 'ko', 'ar'];

registerAllTranslations();

let failures = 0;
const en: Record<string, string> = {};
for (const k of KEYS) {
  en[k] = t('en', k);
  if (!en[k] || en[k] === k) { console.log(`FAIL en ${k} -> empty or literal key`); failures++; }
}

for (const { code } of languages) {
  for (const k of KEYS) {
    const v = t(code as Lang, k);
    if (!v || v === k) { console.log(`FAIL ${code} ${k} -> empty or literal key`); failures++; continue; }
    if (code !== 'en' && ADDED.includes(code) && v === en[k]) {
      console.log(`FAIL ${code} ${k} -> still English fallback`);
      failures++;
    }
  }
}
console.log(failures === 0 ? 'VERIFY-MG-GUIDE-I18N: PASS (11 locales x 25 keys)' : `VERIFY-MG-GUIDE-I18N: ${failures} FAILURES`);
process.exit(failures === 0 ? 0 : 1);
