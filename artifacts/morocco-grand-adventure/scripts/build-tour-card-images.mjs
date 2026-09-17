// Tour-card derivatives cut from official-library photographs (see
// src/data/photoLibrary.ts). Each tour gets a 3:2 crop framed on the subject,
// in the TourCard convention: <name>.webp (1200w) + -480w/-768w WebP, and a
// 1200w JPEG for Open Graph. Idempotent: re-running rewrites the same files.
//
//   node scripts/build-tour-card-images.mjs
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const lib = (f) => path.join(root, 'public/images/library', f);
const outDir = path.join(root, 'public/images/tours');

// top: fraction of the spare height left above the 3:2 crop (0 = top, 1 = bottom).
const CARDS = [
  { name: 'couple-sunset-erg-chebbi', src: 'couple-sunset-erg-chebbi-morocco-mga-031.jpg', top: 0.5 },          // honeymoon-morocco
  { name: 'camel-trek-sunset-erg-chebbi', src: 'erg-chebbi-camel-trekking-sunset-morocco-mga-001.jpg', top: 0.5 }, // casablanca-5-day
  { name: 'dune-walk-erg-chebbi', src: 'erg-chebbi-dunes-golden-hour-morocco-mga-029.jpg', top: 0.5 },           // 4-day-marrakech-merzouga-sahara
  { name: 'camels-beach-agadir', src: 'camels-beach-agadir-morocco-mga-032.jpg', top: 0.5 },                    // 3-day-sahara-agadir
  { name: 'ait-ben-haddou-ounila-reflection', src: 'ait-ben-haddou-ounila-river-reflection-morocco-mga-035.jpg', top: 0.2 }, // 5-day-imperial-cities
  { name: 'ait-ben-haddou-rooftop-view', src: 'ait-ben-haddou-rooftop-view-morocco-mga-037.jpg', top: 0.4 },     // agadir-4-day
  { name: 'land-cruiser-todra-gorge', src: 'land-cruiser-todra-gorge-entrance-mga-045.jpg', top: 0.54 },         // 4-day-fes-marrakech-via-merzouga
  { name: 'guided-walk-todra-gorge', src: 'walking-todra-gorge-morocco-mga-026.jpg', top: 0.6 },               // marrakech-4-day
];

fs.mkdirSync(outDir, { recursive: true });
for (const c of CARDS) {
  const { width, height } = await sharp(lib(c.src)).metadata();
  const cw = Math.min(width, Math.round((height * 3) / 2));
  const ch = Math.round((cw * 2) / 3);
  const left = Math.round((width - cw) / 2);
  const topPx = Math.round((height - ch) * c.top);
  const crop = () => sharp(lib(c.src)).extract({ left, top: topPx, width: cw, height: ch });
  await crop().resize(1200, 800).webp({ quality: 64, effort: 6 }).toFile(path.join(outDir, `${c.name}.webp`));
  await crop().resize(1200, 800).jpeg({ quality: 72, mozjpeg: true }).toFile(path.join(outDir, `${c.name}.jpg`));
  for (const w of [480, 768]) {
    await crop().resize(w, Math.round((w * 2) / 3)).webp({ quality: 68, effort: 6 }).toFile(path.join(outDir, `${c.name}-${w}w.webp`));
  }
  const kb = (f) => Math.round(fs.statSync(path.join(outDir, f)).size / 1024);
  console.log(`${c.name}: ${kb(`${c.name}.webp`)} KB webp, ${kb(`${c.name}.jpg`)} KB jpg`);
}
