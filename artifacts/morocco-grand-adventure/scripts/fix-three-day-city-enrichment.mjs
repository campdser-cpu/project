import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const file = path.join(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'), 'scripts/enrich-three-day-cities.mjs');
let s = fs.readFileSync(file, 'utf8');
s = s.replaceAll('\\${NUM[size]}', 'text-sm').replaceAll('\\${className}', '');
fs.writeFileSync(file, s, 'utf8');
console.log('[3-day-city-fix] Quote-only price guard contains no build-time UI-variable interpolation.');
