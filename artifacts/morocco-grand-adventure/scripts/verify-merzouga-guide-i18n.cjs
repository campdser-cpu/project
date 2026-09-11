// Verifies the Merzouga guide hub's "Plan with our guides" section (PlanWithGuides.tsx)
// resolves for every locale:
//   1. The 4 featured card slugs exist in MERZOUGA_GUIDES (src/data/seoHub.ts).
//   2. Every locale overlay (src/i18n/guides/generated/<loc>.json) covers all 4
//      featured slugs with title/intro/heroAlt (cards are localized via the
//      overlay system through getLocalizedGuide(), NOT via mg_* dictionary keys).
//   3. The pwig_* / guide_* chrome keys used by the section exist in all 11
//      locales via src/i18n/gaps/guides.ts.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const GAPS_PATH = path.resolve(ROOT, 'src/i18n/gaps/guides.ts');
const GAPS = require(GAPS_PATH);
const seoHub = fs.readFileSync(path.join(ROOT, 'src/data/seoHub.ts'), 'utf8');
const generatedDir = path.join(ROOT, 'src/i18n/guides/generated');

const FEATURED = ['how-many-days', 'camel-trekking', 'best-time-to-visit', 'what-to-pack'];
const LOCALES = ['en', 'fr', 'es', 'de', 'it', 'nl', 'pt', 'zh', 'ja', 'ko', 'ar'];
const NON_EN_LOCALES = LOCALES.filter((l) => l !== 'en');

let problems = 0;

// 1. Featured slugs must be present in MERZOUGA_GUIDES (as : { slug: '<x>' ... )
console.log('=== 1. Featured card slugs in MERZOUGA_GUIDES (seoHub.ts) ===');
const missingSlugs = FEATURED.filter((s) => !new RegExp(`slug: '${s}'`).test(seoHub));
if (missingSlugs.length) {
  problems += missingSlugs.length;
  console.log('MISSING SLUGS:', missingSlugs.join(', '));
} else {
  console.log('All 4 featured slugs present in MERZOUGA_GUIDES - OK');
}

// 2. Per-locale overlays must cover all 4 featured slugs with title/intro/heroAlt
console.log('\n=== 2. Locale guide overlays (generated/*.json) cover the 4 featured cards ===');
for (const loc of NON_EN_LOCALES) {
  const file = path.join(generatedDir, loc + '.json');
  if (!fs.existsSync(file)) {
    problems++;
    console.log(`  ${loc}: MISSING overlay file`);
    continue;
  }
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const issues = [];
  for (const s of FEATURED) {
    const entry = data[s];
    if (!entry) { issues.push(`${s}:<no entry>`); continue; }
    if (!entry.title || !entry.intro || !entry.heroAlt) {
      issues.push(`${s}: missing title/intro/heroAlt`);
    }
  }
  if (issues.length) {
    problems += issues.length;
    console.log(`  ${loc}: ${issues.join('; ')}`);
  } else {
    console.log(`  ${loc}: all 4 featured cards localized (title/intro/heroAlt) - OK`);
  }
}

// 3. Chrome keys for the section in all 11 locales (gaps/guides.ts)
const CHROME_KEYS = ['pwig_heading', 'pwig_sub', 'pwig_read'];
console.log('\n=== 3. Section chrome keys in gaps/guides.ts (all 11 locales) ===');
for (const loc of LOCALES) {
  const dict = GAPS.guideGaps?.[loc];
  if (!dict) { problems++; console.log(`  ${loc}: MISSING locale dict`); continue; }
  const missing = CHROME_KEYS.filter((k) => !dict[k]);
  if (missing.length) { problems += missing.length; console.log(`  ${loc}: MISSING ${missing.join(', ')}`); }
  else { console.log(`  ${loc}: pwig_heading/pwig_sub/pwig_read present - OK`); }
}

console.log(`\nResult: ${problems === 0 ? 'PASS' : 'FAIL'} (${problems} problem(s))`);
process.exit(problems > 0 ? 1 : 0);