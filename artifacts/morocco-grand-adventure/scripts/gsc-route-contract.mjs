// Route contract used in CI/build verification. It intentionally checks only
// routes which the canonical tour hierarchy declares.
import { promises as fsp } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const hierarchy = await fsp.readFile(path.join(root, 'src', 'data', 'tour-hierarchy.ts'), 'utf8');

// Canonical city-hub slugs must be present in the hierarchy source.
const requiredSlugs = ['marrakech', 'fes', 'agadir', 'casablanca'];
for (const slug of requiredSlugs) {
  if (!hierarchy.includes(`slug: '${slug}'`)) {
    throw new Error(`Missing canonical city hub slug: ${slug}`);
  }
}

// Marrakech must expose the full 3-10 day duration ladder。
const marrMatch = hierarchy.match(/marrakech:\s*\[([^\]]*)\]/);
if (!marrMatch) throw new Error('Marrakech duration contract changed unexpectedly');
const marrDurations = (marrMatch[1] ?? '').split(',').map(function (s) { return s.trim(); }).filter(Boolean).map(Number);
for (const d of [3,4,5,6,7,8,9,10]) {
  if (!marrDurations.includes(d)) throw new Error('Marrakech duration contract missing duration: ' + d);
}

console.log('GSC route contract: PASS');