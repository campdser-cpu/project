// ─────────────────────────────────────────────────────────────────────────────
// Merzouga guide — image preparation for photographs the guide uses:
//  • responsive derivatives (<name>-480w/-768w.webp, the site's convention)
//    for two personal/ photographs that shipped without them, skipping any
//    width larger than the source;
//  • a trimmed copy of personal/guests-sunset (see below).
// Idempotent.
//
//   node scripts/build-merzouga-guide-images.mjs
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sharp = createRequire(path.join(root, 'package.json'))('sharp');

const SOURCES = ['personal/sahara-dunes-golden', 'personal/guide-guest-tea'];

// personal/guests-sunset.webp carries a 16px pale frame strip down its right
// edge (columns 659–674), left over from a screenshot. The guide uses a copy
// with that strip trimmed; the original stays as it is for its other uses.
{
  const src = path.join(root, 'public/images/personal/guests-sunset.webp');
  const base = path.join(root, 'public/images/personal/guests-sunset-trimmed');
  const trimmed = await sharp(src).extract({ left: 0, top: 0, width: 658, height: 1200 }).toBuffer();
  await sharp(trimmed).webp({ quality: 82, effort: 6 }).toFile(`${base}.webp`);
  await sharp(trimmed).resize({ width: 480 }).webp({ quality: 78, effort: 6 }).toFile(`${base}-480w.webp`);
  // JPEG copy for Open Graph (the packing-list article shares this photo).
  await sharp(trimmed).jpeg({ quality: 80, mozjpeg: true }).toFile(`${base}.jpg`);
  console.log(`personal/guests-sunset-trimmed.webp ${fs.statSync(`${base}.webp`).size} B (+480w)`);
}

for (const name of SOURCES) {
  const src = path.join(root, 'public/images', `${name}.webp`);
  const { width } = await sharp(src).metadata();
  for (const w of [480, 768]) {
    if (width < w) continue;
    const out = path.join(root, 'public/images', `${name}-${w}w.webp`);
    await sharp(src).resize({ width: w }).webp({ quality: 78, effort: 6 }).toFile(out);
    console.log(`${name}-${w}w.webp ${fs.statSync(out).size} B`);
  }
}
