import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = path.join(root, 'scripts/prerender.ts');
let s = fs.readFileSync(file, 'utf8');

// Every tour declared in content.ts must be prerendered. Keep the static-array
// form that later enrichment scripts expect, but include ALL tours (legacy,
// departure-city and enriched), not just the original six.
const legacy = [
  '3-day-sahara-marrakech',
  '5-day-imperial-cities',
  '7-day-imperial-cities-sahara-escape',
  'honeymoon-morocco',
  '8-day-marrakech-essaouira-agadir-sahara',
  'family-morocco-adventure',
];
const contentPath = path.join(root, 'src/data/content.ts');
const cs = fs.readFileSync(contentPath, 'utf8');
const toursStart = cs.indexOf('export const tours');
const allIds = [...cs.slice(toursStart).matchAll(/\bid: "([^"]+)"/g)].map((m) => m[1]);
const ids = [...new Set([...legacy, ...allIds])];

const dynamic = /const TOUR_ROUTES = getLocalizedTours\('en'\)\.map\(\(tour\) => tour\.id\);\n\n\/\/ MGA_MISSING_TOURS_V1/;
if (dynamic.test(s)) {
  const list = ids.map((id) => `  '${id}',`).join('\n');
  s = s.replace(dynamic, `const TOUR_ROUTES = [\n${list}\n];`);
  fs.writeFileSync(file, s, 'utf8');
}
console.log(`[restore-tour-prerender] Restored the full prerender list (${ids.length} tours) so existing enrichment remains compatible.`);
