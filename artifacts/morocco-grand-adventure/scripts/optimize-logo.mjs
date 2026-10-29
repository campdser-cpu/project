// Generates right-sized WebP derivatives of the official logo for the header
// <img> (src/components/layout/Logo.tsx). The 1230x957 PNG source
// (public/logo-official.png, ~406 KiB) is never modified or deleted — it
// stays as the canonical, full-resolution brand asset referenced by
// structured data (schema.org Organization/TravelAgency logo), which Google
// explicitly wants as a real, reasonably sized image, not a thumbnail.
//
// Two widths, matched to the two real rendering contexts (Navbar vs Footer),
// both CSS-constrained to a height class with width:auto (1230:957 aspect
// ratio) — confirmed by reading src/components/layout/{Navbar,Footer}.tsx:
//   • Navbar, mobile (h-[46px]) → ~59px wide. 130w covers up to ~2.2x DPR
//     there, and is still a safe floor for Footer's mobile h-16 (~82px, ~1.6x
//     DPR) — small devices stop oversampling a 260px file for a ~60-80px slot.
//   • Footer's largest desktop breakpoint (md:h-[82px]) → ~105px wide. 260w
//     covers roughly 2.5x DPR there, same reasoning as the original single-size
//     generation, kept for every breakpoint 130w can't safely cover.
// Logo.tsx/Navbar.tsx/Footer.tsx serve both via srcset + a per-call-site
// `sizes` matching each component's own breakpoint widths, so the browser
// downloads whichever is actually needed — never both.
//
// Idempotent, mirrors scripts/optimize-images.mjs conventions. Run:
//   node scripts/optimize-logo.mjs
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'public/logo-official.png');
const outWidths = [130, 260];

const srcStat = fs.statSync(src);
const meta = await sharp(src).metadata();
console.log(`source: ${path.relative(root, src)} — ${meta.width}x${meta.height}, ${(srcStat.size / 1024).toFixed(1)} KiB, alpha=${meta.hasAlpha}`);

for (const outWidth of outWidths) {
  const out = path.join(root, `public/logo-official-${outWidth}w.webp`);
  await sharp(src)
    .resize({ width: outWidth, withoutEnlargement: true })
    .webp({ quality: 90 }) // logo has flat brand colors + thin strokes; keep quality high, file is tiny regardless
    .toFile(out);

  const outMeta = await sharp(out).metadata();
  const outStat = fs.statSync(out);
  console.log(`output: ${path.relative(root, out)} — ${outMeta.width}x${outMeta.height}, ${(outStat.size / 1024).toFixed(1)} KiB, alpha=${outMeta.hasAlpha}`);
  console.log(`savings: ${(100 - (outStat.size / srcStat.size) * 100).toFixed(1)}% smaller`);
}
