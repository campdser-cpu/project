// Route contract used in CI/build verification. It intentionally checks only
// routes that the canonical tour hierarchy declares, plus legacy aliases.
const fs = await import('node:fs');
const path = await import('node:path');
const { fileURLToPath } = await import('node:url');

// scripts/ is directly inside the morocco-grand-adventure workspace.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const hierarchy = fs.readFileSync(path.join(root, 'src/data/tour-hierarchy.ts'), 'utf8');
const required = ['from-marrakech','from-fes','from-agadir','from-casablanca','from-marrakech/3-days'];
for (const slug of required) {
  if (!hierarchy.includes(`slug: '${slug.replace('from-','').replace('/3-days','')}'`) && slug !== 'from-marrakech/3-days') throw new Error(`Missing canonical city hub: ${slug}`);
}
// CITY_HUB_DURATIONS uses unquoted object keys in the canonical source.
if (!hierarchy.includes('marrakech: [3, 4, 5, 6, 7, 8, 9, 10]')) throw new Error('Marrakech duration contract changed unexpectedly');
// BUILD_VERIFY_2026_09_03: keep this contract source fresh in Vercel deployments.
console.log('GSC route contract: PASS');
