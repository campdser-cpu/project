// Experience thumbnails.
//
// The Included Experiences section shows many small images at once — up to 32
// on the longest itinerary. The sources are the verified destination, library
// and catalogue assets, and some of those masters are ~500 KB, which would be
// absurd for a 96px thumbnail. This crops each one to 4:3 and emits 160w/320w
// WebP under public/images/experiences/, keyed by experience id.
//
// Sources come from EXPERIENCES in src/data/tour-experiences.ts, so this never
// invents an image: an experience with no verified photograph simply produces
// no thumbnail and renders as text.
//
// Idempotent: re-running rewrites the same files.
//   node scripts/build-experience-thumbs.mjs
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public/images/experiences');
fs.mkdirSync(outDir, { recursive: true });

// Parse the image map straight out of the data module so the two cannot drift.
const src = fs.readFileSync(path.join(root, 'src/data/tour-experiences.ts'), 'utf8');
const block = src.slice(src.indexOf('export const EXPERIENCES'), src.indexOf('const STOP_ALIASES'));
const entries = [];
for (const m of block.matchAll(/id:\s*'([a-z0-9-]+)',[\s\S]*?(?=\n  [a-z'])/g)) {
  const id = m[1];
  const img = m[0].match(/image:\s*'([^']+)'/);
  if (img) entries.push({ id, source: img[1] });
}

let written = 0, bytes = 0, missing = [];
for (const { id, source } of entries) {
  const abs = path.join(root, 'public', source.replace(/^\//, ''));
  if (!fs.existsSync(abs)) { missing.push(`${id} -> ${source}`); continue; }
  const meta = await sharp(abs).metadata();
  // 4:3 centre crop, biased slightly above centre where horizons usually sit.
  const targetH = Math.round((meta.width * 3) / 4);
  const pipeline =
    targetH <= meta.height
      ? sharp(abs).extract({
          left: 0,
          top: Math.round((meta.height - targetH) * 0.4),
          width: meta.width,
          height: targetH,
        })
      : sharp(abs); // already wider than 4:3 — resize handles it
  for (const w of [160, 320]) {
    const file = path.join(outDir, `${id}-${w}w.webp`);
    await pipeline
      .clone()
      .resize(w, Math.round((w * 3) / 4), { fit: 'cover', position: 'attention' })
      .webp({ quality: 70, effort: 6 })
      .toFile(file);
    written++;
    bytes += fs.statSync(file).size;
  }
}
console.log(`experiences with a verified image: ${entries.length}`);
console.log(`thumbnails written: ${written} (${Math.round(bytes / 1024)} KB total, avg ${Math.round(bytes / written / 1024 * 10) / 10} KB)`);
if (missing.length) {
  console.log(`\nMISSING SOURCES (${missing.length}) — these render as text:`);
  for (const m of missing) console.log('  ' + m);
  process.exitCode = 1;
}
