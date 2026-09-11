// Verification for Fix #1: static H1/intro localization of ExperiencePage routes.
// For each locale x route, reads the GENERATED dist HTML and checks:
//   - <title>, H1, intro paragraph, canonical, hreflang count, lang/dir
//   - the old failure: non-English H1/intro identical to the English page's
//     when an authored translation exists (allowed only for routes with no
//     authored locale metadata, e.g. /gallery).
// Run: node scripts/verify-experience-i18n.mjs
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const LOCALES = ['en', 'fr', 'es', 'it', 'de', 'nl', 'pt', 'zh', 'ja', 'ko', 'ar'];
const ROUTES = ['desert-tours', 'luxury-camp', 'camel-trekking', 'trip-builder', 'merzouga-guide'];
// Routes with authored per-locale metadata in route-metadata.ts (probe-verified).
const AUTHORED = new Set(ROUTES);

const strip = (h, re) => (h.match(re)?.[1] ?? '').replace(/\s+/g, ' ').trim();
let failures = 0;
const rows = [];

const en = {};
for (const r of ROUTES) {
  const f = join(dist, 'en', r, 'index.html');
  const h = readFileSync(f, 'utf8');
  en[r] = {
    h1: strip(h, /<h1[^>]*>([\s\S]*?)<\/h1>/),
    intro: strip(h, /<\/h1>\s*<p[^>]*>([\s\S]*?)<\/p>/),
  };
}

for (const lang of LOCALES) {
  for (const r of ROUTES) {
    const f = join(dist, lang, r, 'index.html');
    if (!existsSync(f)) { console.log(`MISSING FILE ${lang}/${r}`); failures++; continue; }
    const h = readFileSync(f, 'utf8');
    const title = strip(h, /<title[^>]*>([\s\S]*?)<\/title>/);
    const h1 = strip(h, /<h1[^>]*>([\s\S]*?)<\/h1>/);
    const intro = strip(h, /<\/h1>\s*<p[^>]*>([\s\S]*?)<\/p>/);
    const canonical = h.match(/rel="canonical" href="([^"]+)"/)?.[1] ?? '';
    const hreflangN = (h.match(/hreflang=/g) ?? []).length;
    const langAttr = h.match(/<html[^>]* lang="([^"]+)"/)?.[1] ?? '';
    const dir = h.match(/<html[^>]* dir="([^"]+)"/)?.[1] ?? '';

    const expCanonical = `https://www.moroccograndadventure.com/${lang}/${r}`;
    const problems = [];
    if (canonical !== expCanonical) problems.push(`canonical=${canonical}`);
    if (hreflangN !== 12) problems.push(`hreflang=${hreflangN}`);
    if (langAttr !== lang) problems.push(`lang=${langAttr}`);
    if (lang === 'ar' && dir !== 'rtl') problems.push(`dir=${dir}`);

    if (lang !== 'en' && AUTHORED.has(r)) {
      if (h1 === en[r].h1) problems.push('H1 still English');
      if (intro === en[r].intro) problems.push('intro still English');
    }
    const ok = problems.length === 0;
    if (!ok) failures++;
    rows.push(`${ok ? 'OK ' : 'FAIL'} ${lang}/${r} | h1="${h1.slice(0, 46)}" | title="${title.slice(0, 40)}"${problems.length ? ' | ' + problems.join('; ') : ''}`);
  }
}
console.log(rows.join('\n'));
console.log(failures === 0 ? '\nVERIFY-EXPERIENCE-I18N: PASS' : `\nVERIFY-EXPERIENCE-I18N: ${failures} FAILURES`);
process.exit(failures === 0 ? 0 : 1);
