import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve(new URL('../dist/', import.meta.url).pathname);
const langs = ['en','fr','es','it','de','nl','pt','zh','ja','ko','ar'];
const required = [
  'tours/from-marrakech',
  'tours/from-fes',
  'tours/from-agadir',
  'tours/from-casablanca',
  'tours/from-marrakech/3-days',
  'tours/3-day-sahara-marrakech',
  'destinations/marrakech',
  'destinations/fes',
  'destinations/merzouga',
  'day-trips',
  'about',
  'contact',
];
const checks = ['<title>','<meta name="description"','<link rel="canonical"','hreflang=','<h1>'];

// Hub pages use <route>/index.html; destination and individual tour detail
// pages use flat <route>.html files in the existing prerenderer.
const directoryRoutes = new Set([
  'tours/from-marrakech',
  'tours/from-fes',
  'tours/from-agadir',
  'tours/from-casablanca',
  'tours/from-marrakech/3-days',
  'day-trips',
  'about',
  'contact',
]);

function fileFor(lang, route) {
  return directoryRoutes.has(route)
    ? path.join(dist, lang, route, 'index.html')
    : path.join(dist, lang, `${route}.html`);
}

const errors = [];
for (const lang of langs) for (const route of required) {
  const file = fileFor(lang, route);
  if (!fs.existsSync(file)) { errors.push(`missing ${lang}/${route}`); continue; }
  const html = fs.readFileSync(file, 'utf8');
  for (const marker of checks) if (!html.includes(marker)) errors.push(`${lang}/${route}: missing ${marker}`);
  if (route.includes('from-') && !html.includes('trip-builder')) errors.push(`${lang}/${route}: missing custom-trip path`);
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Prerender content contract: PASS (${langs.length * required.length} route/language checks)`);
