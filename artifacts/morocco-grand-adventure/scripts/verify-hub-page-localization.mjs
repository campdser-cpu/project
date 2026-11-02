// ─────────────────────────────────────────────────────────────────────────────
// Regression guard for the Stage 2.2 fix: TravelInfoTopic / buildHubPageContent
// previously never localized travel-info guide pages in any non-English locale,
// client-side or prerendered (getLocalizedGuide only searched MERZOUGA_GUIDES).
// This script reads the actual prerendered dist/ HTML — the same artifact a
// real visitor and Google both receive — and fails the build if that gap
// silently returns.
//
// Three things are checked, all against real files, nothing invented:
//   1. Every TRAVEL_INFO slug with an authored overlay (detected dynamically
//      from src/i18n/guides/generated/*.json, not a hardcoded list, so this
//      stays correct as more pages are translated in later stages) must show
//      a non-English H1/intro that differs from the English version, in every
//      locale that has that overlay key.
//   2. Every TRAVEL_INFO slug WITHOUT an overlay must still show the exact
//      English H1 in every non-English locale — proving the graceful fallback
//      still works, not that the page is broken or blank.
//   3. Regression controls: a Merzouga guide page (erg-chebbi) must still
//      localize correctly, and a comparison page must keep its localized H1
//      with canonical-English body copy — both pre-existing, intentional
//      behaviors this fix must not disturb.
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const locales = ['fr', 'es', 'it', 'de', 'nl', 'pt', 'zh', 'ja', 'ko', 'ar'];

const TRAVEL_INFO_SLUGS = [
  'best-time-to-visit-morocco', 'what-to-pack-morocco', 'getting-around-morocco',
  'morocco-basics', 'atlas-mountains-guide', 'amazigh-berber-culture',
  'morocco-travel-safety', 'moroccan-food-and-cuisine', 'moroccan-souks-shopping-guide',
  'morocco-airports-guide', 'marrakech-safety-guide',
];

function h1Of(lang, routeDir, slug) {
  const p = path.join(dist, lang, routeDir, slug, 'index.html');
  if (!fs.existsSync(p)) return { missing: true };
  const html = fs.readFileSync(p, 'utf8');
  const h1 = (html.match(/<h1[^>]*>([^<]*)/) || [])[1];
  const intro = (html.match(/<\/h1>\s*<p>([^<]*)/) || [])[1];
  return { h1: h1 ? h1.trim() : undefined, intro: intro ? intro.trim() : undefined };
}

function overlaidSlugs() {
  const overlaid = new Map(); // slug -> [locales with an overlay for it]
  for (const lang of locales) {
    const p = path.join(root, 'src/i18n/guides/generated', `${lang}.json`);
    if (!fs.existsSync(p)) continue;
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));
    for (const slug of TRAVEL_INFO_SLUGS) {
      if (data[slug]) {
        if (!overlaid.has(slug)) overlaid.set(slug, []);
        overlaid.get(slug).push(lang);
      }
    }
  }
  return overlaid;
}

const errors = [];
const overlaid = overlaidSlugs();

for (const slug of TRAVEL_INFO_SLUGS) {
  const en = h1Of('en', 'travel-info', slug);
  if (en.missing || !en.h1) { errors.push(`missing EN file or H1: travel-info/${slug}`); continue; }
  const translatedLocales = new Set(overlaid.get(slug) || []);
  for (const lang of locales) {
    const row = h1Of(lang, 'travel-info', slug);
    if (row.missing) { errors.push(`missing file: ${lang}/travel-info/${slug}`); continue; }
    const isTranslated = translatedLocales.has(lang);
    if (isTranslated && row.h1 === en.h1) {
      errors.push(`REGRESSION: ${lang}/travel-info/${slug} has an authored overlay but H1 still shows English — "${row.h1}"`);
    }
    if (!isTranslated && row.h1 !== en.h1) {
      errors.push(`unexpected: ${lang}/travel-info/${slug} has no overlay but H1 differs from English fallback — "${row.h1}"`);
    }
  }
}

// Regression control: a Merzouga guide must still localize (unaffected kind).
{
  const en = h1Of('en', 'merzouga-guide', 'erg-chebbi');
  const ar = h1Of('ar', 'merzouga-guide', 'erg-chebbi');
  if (ar.missing || ar.h1 === en.h1) errors.push('REGRESSION: merzouga-guide/erg-chebbi no longer localizes in ar');
}

// Regression control: a comparison page keeps localized H1 + canonical-English body.
{
  const p = path.join(dist, 'ar/comparisons/marrakech-vs-fes/index.html');
  if (!fs.existsSync(p)) {
    errors.push('missing file: ar/comparisons/marrakech-vs-fes');
  } else {
    const html = fs.readFileSync(p, 'utf8');
    const h1 = (html.match(/<h1[^>]*>([^<]*)/) || [])[1];
    const bodyP = (html.match(/<\/h1>\s*<p>([^<]*)/) || [])[1];
    if (!h1 || /^[A-Za-z]/.test(h1.trim())) errors.push('REGRESSION: comparisons/marrakech-vs-fes AR H1 is not localized');
    if (!bodyP || !/^[A-Za-z]/.test(bodyP.trim())) errors.push('REGRESSION: comparisons/marrakech-vs-fes AR body copy is no longer canonical English (intentional design)');
  }
}

const translatedCount = [...overlaid.keys()].length;
console.log(`Hub-page localization check: ${TRAVEL_INFO_SLUGS.length} travel-info slugs × ${locales.length} locales (${translatedCount} slug(s) currently authored: ${[...overlaid.keys()].join(', ') || 'none'}).`);
if (errors.length) {
  console.error(`Hub-page localization errors: ${errors.length}`);
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('Hub-page localization check: PASS');
