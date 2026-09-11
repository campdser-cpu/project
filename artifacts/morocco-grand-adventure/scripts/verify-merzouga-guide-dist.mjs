// Regression test for Fix #4: "pwig_heading" literal-key leak on the Merzouga
// Guide hub. Verifies all 11 /<lang>/merzouga-guide dist pages:
//   - no literal pwig_* key anywhere in the HTML
//   - H1 present and localized (differs from the English H1 for non-en)
//   - canonical correct, hreflang = 12, x-default -> /en/
// Run: node scripts/verify-merzouga-guide-dist.mjs
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const LOCALES = ['en', 'fr', 'es', 'it', 'de', 'nl', 'pt', 'zh', 'ja', 'ko', 'ar'];
let failures = 0;
const rows = [];

const h1Of = (h) => (h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '').replace(/\s+/g, ' ').trim();

const enH1 = h1Of(readFileSync(join(dist, 'en', 'merzouga-guide', 'index.html'), 'utf8'));

for (const lang of LOCALES) {
  const file = join(dist, lang, 'merzouga-guide', 'index.html');
  if (!existsSync(file)) { console.log(`MISSING FILE ${lang}/merzouga-guide`); failures++; continue; }
  const html = readFileSync(file, 'utf8');
  const h1 = h1Of(html);
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1] ?? '';
  const hreflangs = [...html.matchAll(/hreflang="([^"]+)"/g)].map((m) => m[1]);
  const xDefault = html.match(/href="([^"]+)" hreflang="x-default"/)?.[1] ?? html.match(/hreflang="x-default"[^>]*href="([^"]+)"/)?.[1] ?? '';

  const problems = [];
  if (/pwig_(heading|sub|read)/.test(html)) problems.push('literal pwig_* key');
  if (!h1) problems.push('missing H1');
  if (lang !== 'en' && h1 === enH1) problems.push('H1 still English');
  if (canonical !== `https://www.moroccograndadventure.com/${lang}/merzouga-guide`) problems.push(`canonical=${canonical}`);
  if (hreflangs.length !== 12) problems.push(`hreflang=${hreflangs.length}`);
  if (!hreflangs.includes('x-default')) problems.push('no x-default');
  if (xDefault && !xDefault.startsWith('https://www.moroccograndadventure.com/en/')) problems.push(`x-default=${xDefault}`);
  if (lang === 'ar' && !/<html lang="ar" dir="rtl"/.test(html)) problems.push('dir=rtl missing');

  if (problems.length) failures++;
  rows.push(`${problems.length ? 'FAIL' : 'OK  '} ${lang}/merzouga-guide | h1="${h1.slice(0, 44)}"${problems.length ? ' | ' + problems.join('; ') : ''}`);
}
console.log(rows.join('\n'));
console.log(failures === 0 ? '\nVERIFY-MERZOUGA-GUIDE-DIST: PASS' : `\nVERIFY-MERZOUGA-GUIDE-DIST: ${failures} FAILURES`);
process.exit(failures === 0 ? 0 : 1);
