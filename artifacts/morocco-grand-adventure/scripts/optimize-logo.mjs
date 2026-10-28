// Generates a right-sized WebP derivative of the official logo for the header
// <img> (src/components/layout/Logo.tsx). The 1230x957 PNG source
// (public/logo-official.png, ~406 KiB) is never modified or deleted — it
// stays as the canonical, full-resolution brand asset referenced by
// structured data (schema.org Organization/TravelAgency logo), which Google
// explicitly wants as a real, reasonably sized image, not a thumbnail.
//
// Header render size: the logo is CSS-constrained to h-[46px]/h-[55px]/h-16
// (max 64px tall) with width:auto, so the largest real rendered width is
// about 82px (1230:957 aspect ratio). Generating at 260w covers roughly 3.1x
// device-pixel-ratio at that largest breakpoint — comfortably sharp on
// retina/high-DPI screens — while cutting the transferred bytes by over 95%.
//
// Idempotent, mirrors scripts/optimize-images.mjs conventions. Run:
//   node scripts/optimize-logo.mjs
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'public/logo-official.png');
const outWidth = 260;
const out = path.join(root, `public/logo-official-${outWidth}w.webp`);

const srcStat = fs.statSync(src);
const meta = await sharp(src).metadata();
console.log(`source: ${path.relative(root, src)} — ${meta.width}x${meta.height}, ${(srcStat.size / 1024).toFixed(1)} KiB, alpha=${meta.hasAlpha}`);

await sharp(src)
  .resize({ width: outWidth, withoutEnlargement: true })
  .webp({ quality: 90 }) // logo has flat brand colors + thin strokes; keep quality high, file is tiny regardless
  .toFile(out);

const outMeta = await sharp(out).metadata();
const outStat = fs.statSync(out);
console.log(`output: ${path.relative(root, out)} — ${outMeta.width}x${outMeta.height}, ${(outStat.size / 1024).toFixed(1)} KiB, alpha=${outMeta.hasAlpha}`);
console.log(`savings: ${(100 - (outStat.size / srcStat.size) * 100).toFixed(1)}% smaller`);
