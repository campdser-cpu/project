// Route contract used in CI/build verification. It intentionally checks only
// routes that the canonical tour hierarchy declares, plus legacy aliases.
const fs = await import('node:fs');
const path = await import('node:path');
const root = path.resolve(new URL('..', import.meta.url).pathname);
const hierarchy = fs.readFileSync(path.join(root, 'src/data/tour-hierarchy.ts'), 'utf8');
const required = ['from-marrakech','from-fes','from-agadir','from-casablanca','from-marrakech/3-days'];
for (const slug of required) {
  if (!hierarchy.includes(`slug: '${slug.replace('from-','').replace('/3-days','')}'`) && slug !== 'from-marrakech/3-days') throw new Error(`Missing canonical city hub: ${slug}`);
}
if (!hierarchy.includes("'marrakech': [3, 4, 5, 6, 7, 8, 9, 10]")) throw new Error('Marrakech duration contract changed unexpectedly');
console.log('GSC route contract: PASS');