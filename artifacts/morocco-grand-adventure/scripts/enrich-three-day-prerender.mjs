import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = path.join(root, 'scripts/prerender.ts');
const marker = 'MGA_THREE_DAY_PRERENDER_V1';
let s = fs.readFileSync(file, 'utf8');
if (!s.includes(marker)) {
  const re = /const TOUR_ROUTES = \[[\s\S]*?\n\];/;
  if (!re.test(s)) throw new Error('[3-day-prerender] TOUR_ROUTES not found');
  const replacement = `const TOUR_ROUTES = [\n  '3-day-sahara-marrakech',\n  '3-day-sahara-fes',\n  '3-day-sahara-agadir',\n  '5-day-imperial-cities',\n  '7-day-imperial-cities-sahara-escape',\n  'honeymoon-morocco',\n  '8-day-marrakech-essaouira-agadir-sahara',\n  'family-morocco-adventure',\n];\n\n// ${marker}`;
  s = s.replace(re, replacement);
  fs.writeFileSync(file, s, 'utf8');
}
console.log('[3-day-prerender] Marrakech, Fes and Agadir tour routes added to prerender inventory.');
