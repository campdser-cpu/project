import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = path.join(root, 'src/data/tour-hierarchy.ts');
const marker = 'MGA_THREE_DAY_HIERARCHY_V1';
let s = fs.readFileSync(file, 'utf8');
if (!s.includes(marker)) {
  const re = /export const TOUR_DEPARTURE_CITY: Record<string, DepartureCity> = \{([\s\S]*?)\n\};/;
  if (!re.test(s)) throw new Error('[3-day-hierarchy] TOUR_DEPARTURE_CITY not found');
  s = s.replace(re, (full, body) => `export const TOUR_DEPARTURE_CITY: Record<string, DepartureCity> = {${body}  '3-day-sahara-fes': 'fes',\n  '3-day-sahara-agadir': 'agadir',\n};\n\n// ${marker}`);
  fs.writeFileSync(file, s, 'utf8');
}
console.log('[3-day-hierarchy] Fes and Agadir three-day routes linked to their departure-city hubs.');
