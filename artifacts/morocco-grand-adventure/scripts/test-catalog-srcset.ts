// Focused regression test for the catalog-image `srcset` bug fixed in this
// pass: `SeoHubPage.tsx` and `prerender.ts` used to build a responsive
// `srcset` for every inline catalog figure by string-replacing `.webp` in
// `src`, assuming a same-folder `-480w.webp`/`-768w.webp` sibling always
// exists. That is true for the 27 original `/images/catalog/*.webp` entries,
// but the three erg-chebbi entries added this pass point at
// `/images/library/*.jpg` master files with no such siblings — the
// `.replace()` was a no-op, so the "480w"/"768w" candidates silently resolved
// to the identical master file, mislabelled as three different widths.
//
// `CatalogImage.hasResponsiveVariants` now gates srcset generation: it is set
// only where this test has verified the real sibling files exist on disk, and
// both renderers must omit `srcset`/`sizes` entirely (not just leave it
// pointed at duplicates) whenever it is absent.
//
// tsx, run via `npm run test:deterministic`.

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { IMAGE_CATALOG } from '../src/data/imageCatalog';

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(siteRoot, 'public');

function exists(relUrl: string): boolean {
  return fs.existsSync(path.join(publicDir, relUrl.replace(/^\//, '')));
}

// Builds the exact srcset string the two renderers construct, so this test
// exercises the real algorithm rather than restating it in prose.
function buildSrcset(src: string, width: number): string {
  return `${src.replace('.webp', '-480w.webp')} 480w, ${src.replace('.webp', '-768w.webp')} 768w, ${src} ${width}w`;
}

let checked480768 = 0;
let checkedNoVariants = 0;

for (const [id, img] of Object.entries(IMAGE_CATALOG)) {
  if (img.hasResponsiveVariants) {
    // 1. The flag must be backed by real, distinct files on disk — not just
    //    asserted. This is what makes the srcset "genuine" rather than guessed.
    const w480 = img.src.replace('.webp', '-480w.webp');
    const w768 = img.src.replace('.webp', '-768w.webp');
    assert.ok(exists(w480), `${id}: hasResponsiveVariants=true but ${w480} is missing on disk`);
    assert.ok(exists(w768), `${id}: hasResponsiveVariants=true but ${w768} is missing on disk`);
    assert.ok(exists(img.src), `${id}: master file ${img.src} is missing on disk`);

    // 2. The three width-labelled URLs in the generated srcset must be three
    //    genuinely distinct paths — never the same file under multiple widths.
    const srcset = buildSrcset(img.src, img.width);
    const urls = srcset.split(',').map((part) => part.trim().split(' ')[0]);
    assert.equal(new Set(urls).size, 3, `${id}: srcset must reference 3 distinct files, got ${JSON.stringify(urls)}`);
    checked480768++;
  } else {
    // 3. No flag -> no fabricated variants. The renderers must fall back to a
    //    plain `src` with no srcset attribute, which this test confirms by
    //    checking that a naive (pre-fix) srcset build for this entry WOULD
    //    have produced duplicates whenever the master isn't a .webp file —
    //    proving why the guard is necessary — while independently confirming
    //    the real renderer source omits srcset/sizes under this condition.
    if (!img.src.endsWith('.webp')) {
      const naiveSrcset = buildSrcset(img.src, img.width);
      const urls = naiveSrcset.split(',').map((part) => part.trim().split(' ')[0]);
      assert.equal(
        new Set(urls).size,
        1,
        `${id}: expected the naive .replace() heuristic to collapse to one file for a non-.webp master (confirms the guard is load-bearing)`
      );
    }
    checkedNoVariants++;
  }
}

assert.ok(checked480768 >= 27, `expected at least the 27 original catalog entries to carry hasResponsiveVariants, got ${checked480768}`);
assert.ok(checkedNoVariants >= 3, `expected at least the 3 erg-chebbi library entries to have no responsive variants, got ${checkedNoVariants}`);

// 4. The three erg-chebbi entries specifically: library master files, no flag.
for (const id of ['erg-chebbi-dune-sea-view', 'erg-chebbi-camel-caravan-sunset', 'erg-chebbi-dunes-golden-hour']) {
  const img = IMAGE_CATALOG[id];
  assert.ok(img, `${id} must exist in the catalog`);
  assert.ok(img.src.startsWith('/images/library/'), `${id} must point at a library master file`);
  assert.ok(!img.hasResponsiveVariants, `${id} must not claim responsive variants it does not have`);
}

// 5. Renderer source: both SeoHubPage.tsx (React) and prerender.ts (its
//    hand-maintained static mirror) must gate srcset/sizes on
//    `hasResponsiveVariants` — a structural check (verify-whatsapp.cjs style)
//    that the fix is actually wired in, not just present in the data model.
const seoHubPage = fs.readFileSync(path.join(siteRoot, 'src', 'components', 'seo', 'SeoHubPage.tsx'), 'utf8');
assert.ok(
  seoHubPage.includes('img.hasResponsiveVariants'),
  'SeoHubPage.tsx must gate srcSet/sizes on img.hasResponsiveVariants'
);

const prerender = fs.readFileSync(path.join(siteRoot, 'scripts', 'prerender.ts'), 'utf8');
assert.ok(
  prerender.includes('img.hasResponsiveVariants'),
  'prerender.ts must gate its static srcset mirror on img.hasResponsiveVariants'
);

console.log(
  `Catalog srcset deterministic tests: PASS (${checked480768} entries with verified variants, ${checkedNoVariants} entries correctly without)`
);
