// Desktop hero still for the homepage.
//
// The hero footage (public/videos/hero.mp4) is portrait, 720x1280 — right for a
// phone, wrong stretched across a desktop layout. Rather than enlarge it, the
// desktop gets a landscape frame from the official library: MGA-001, the Berber
// guide leading a camel caravan across Erg Chebbi at dusk, which is the same
// scene the footage tells. Mobile keeps the portrait poster.
//
// Idempotent: re-running rewrites the same files.
//   node scripts/build-home-hero.mjs
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'public/images/library/erg-chebbi-camel-trekking-sunset-morocco-mga-001.jpg');
const outDir = path.join(root, 'public/images/hero');
const base = 'sahara-caravan-desktop';

const { width, height } = await sharp(source).metadata();
// 16:9 keeps the caravan and the sky and matches most desktop viewports, so the
// browser's object-fit crop has almost nothing left to cut.
const cropHeight = Math.round((width * 9) / 16);
const top = Math.round((height - cropHeight) * 0.45);
const crop = () => sharp(source).extract({ left: 0, top, width, height: cropHeight });

for (const w of [1280, 1920]) {
  await crop().resize(w, Math.round((w * 9) / 16)).webp({ quality: 66, effort: 6 })
    .toFile(path.join(outDir, `${base}-${w}w.webp`));
}
// JPEG fallback at the smaller size for browsers without WebP.
await crop().resize(1280, 720).jpeg({ quality: 76, mozjpeg: true }).toFile(path.join(outDir, `${base}.jpg`));

for (const f of [`${base}-1280w.webp`, `${base}-1920w.webp`, `${base}.jpg`]) {
  const meta = await sharp(path.join(outDir, f)).metadata();
  console.log(`${f}: ${meta.width}x${meta.height}, ${Math.round(fs.statSync(path.join(outDir, f)).size / 1024)} KB`);
}
