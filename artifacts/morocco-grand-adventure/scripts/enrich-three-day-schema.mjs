import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = path.join(root, 'scripts/prerender.ts');
const marker = 'MGA_THREE_DAY_SCHEMA_V1';
let s = fs.readFileSync(file, 'utf8');
if (!s.includes(marker)) {
  const re = /t \? \(buildTourSchema\(t, id, lang\) as Record<string, unknown>\[\]\) : \[\]/;
  if (!re.test(s)) throw new Error('[3-day-schema] tour schema expression not found');
  s = s.replace(re, `(t && !t.quoteOnly) ? (buildTourSchema(t, id, lang) as Record<string, unknown>[]) : [] /* ${marker} */`);
  fs.writeFileSync(file, s, 'utf8');
}
console.log('[3-day-schema] Quote-only routes no longer emit invalid Offer prices in prerendered JSON-LD.');
