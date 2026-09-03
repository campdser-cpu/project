import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = path.join(root, 'scripts/prerender.ts');
const marker = 'MGA_MISSING_TOURS_PRERENDER_V1';
let s = fs.readFileSync(file, 'utf8');

if (!s.includes(marker)) {
  const ids = [
    '2-day-zagora-desert-marrakech',
    '4-day-marrakech-merzouga-sahara',
    '5-day-great-south-morocco',
    '3-day-fes-merzouga-sahara',
    '4-day-fes-marrakech-via-merzouga',
  ];
  const re = /const TOUR_ROUTES = \[[\s\S]*?\n\];/;
  const match = s.match(re);
  if (!match) throw new Error('[finalize-tour-prerender] TOUR_ROUTES declaration not found');
  const existing = new Set([...match[0].matchAll(/'([^']+)'/g)].map((m) => m[1]));
  const missing = ids.filter((id) => !existing.has(id));
  if (missing.length) {
    const additions = missing.map((id) => `  '${id}',`).join('\n');
    const replacement = match[0].replace(/\n\];$/, `\n${additions}\n];`);
    s = s.replace(match[0], replacement);
  }
  s = s.replace('export async function prerenderAllRoutes', `// ${marker}\n\nexport async function prerenderAllRoutes`);
  fs.writeFileSync(file, s, 'utf8');
}
console.log('[finalize-tour-prerender] Added the five new tour IDs to the final prerender inventory.');
