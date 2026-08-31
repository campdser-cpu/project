import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const file = path.join(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'), 'scripts/enrich-three-day-cities.mjs');
let s = fs.readFileSync(file, 'utf8');
s = s.replace(/\nlet price = fs\.readFileSync\(pricePath, 'utf8'\);[\s\S]*?\n\nlet meta =/, '\n\nlet meta =');
fs.writeFileSync(file, s, 'utf8');
console.log('[3-day-city-fix] Removed the fragile PriceTag source mutation; a dedicated safe patch handles quote-only display.');
