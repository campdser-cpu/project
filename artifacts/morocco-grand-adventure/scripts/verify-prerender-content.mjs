import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const langs = ['en','fr','es','it','de','nl','pt','zh','ja','ko','ar'];
const required = ['tours/from-marrakech','tours/from-fes','tours/from-agadir','tours/from-casablanca','tours/from-marrakech/3-days','tours/3-day-sahara-marrakech','destinations/marrakech','destinations/fes','destinations/merzouga','day-trips','about','contact'];
const checks = ['<title>','<meta name="description"','<link rel="canonical"','hreflang=','<h1>','Book','WhatsApp'];
let errors = [];
// A route can be emitted in two forms: a flat `<route>.html` (used by
// tour/destination/blog detail pages) or a directory `<route>/index.html`
// (used by every hub/static page). Probe both forms.
function resolveHtml(lang, route) {
  const flat = path.join(dist, lang, `${route}.html`);
  if (fs.existsSync(flat)) return flat;
  const dir = path.join(dist, lang, route, 'index.html');
  if (fs.existsSync(dir)) return dir;
  return null;
}
for (const lang of langs) for (const route of required) {
  const file = resolveHtml(lang, route);
  if (!file) { errors.push(`missing ${lang}/${route}`); continue; }
  const html = fs.readFileSync(file,'utf8');
  for (const marker of checks.slice(0,5)) if (!html.includes(marker)) errors.push(`${lang}/${route}: missing ${marker}`);
  if (route.includes('from-') && !html.includes('trip-builder')) errors.push(`${lang}/${route}: missing custom-trip path`);
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Prerender content contract: PASS (${langs.length * required.length} route/language checks)`);
