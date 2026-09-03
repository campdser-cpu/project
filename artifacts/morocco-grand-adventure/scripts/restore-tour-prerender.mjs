import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = path.join(root, 'scripts/prerender.ts');
let s = fs.readFileSync(file, 'utf8');

const dynamic = /const TOUR_ROUTES = getLocalizedTours\('en'\)\.map\(\(tour\) => tour\.id\);\n\n\/\/ MGA_MISSING_TOURS_V1/;
if (dynamic.test(s)) {
  s = s.replace(dynamic, `const TOUR_ROUTES = [\n  '3-day-sahara-marrakech',\n  '5-day-imperial-cities',\n  '7-day-imperial-cities-sahara-escape',\n  'honeymoon-morocco',\n  '8-day-marrakech-essaouira-agadir-sahara',\n  'family-morocco-adventure',\n];`);
  fs.writeFileSync(file, s, 'utf8');
}
console.log('[restore-tour-prerender] Restored the legacy prerender list so existing enrichment remains compatible.');
