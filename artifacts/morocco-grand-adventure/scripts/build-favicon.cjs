// ─────────────────────────────────────────────────────────────────────────────
// Morocco Grand Adventure — Compact Icon (favicon) Builder
//
// Renders the official COMPACT brand icon (public/favicon.svg: Moroccan arch +
// camel + palm + Sahara, premium gold/green) into the technically required
// raster sizes and formats WITHOUT altering the artwork:
//
//   public/images/logo/mga-icon-48.png     (48x48)
//   public/images/logo/mga-icon-96.png     (96x96)
//   public/images/logo/mga-icon-180.png    (180x180 — Apple Touch Icon)
//   public/images/logo/mga-icon-192.png    (192x192 — PWA)
//   public/images/logo/mga-icon-512.png    (512x512 — PWA / Google)
//   public/favicon.ico                     (16/32/48 PNG-compressed entries)
//
// The FULL brand logo (public/logo.svg, public/logo-official.png) is never
// touched. Run manually after changing favicon.svg, then commit the generated
// assets. Not wired into the build to keep the deploy pipeline unchanged.
// ─────────────────────────────────────────────────────────────────────────────
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const srcSvg = path.join(root, 'public', 'favicon.svg');
const outDir = path.join(root, 'public', 'images', 'logo');
const icoPath = path.join(root, 'public', 'favicon.ico');

// Public URL-safe file names (root-relative, stable).
const pngSizes = [
  { file: 'mga-icon-48.png', size: 48 },
  { file: 'mga-icon-96.png', size: 96 },
  { file: 'mga-icon-180.png', size: 180 },
  { file: 'mga-icon-192.png', size: 192 },
  { file: 'mga-icon-512.png', size: 512 },
];

/** Encode an ICO (PING-compressed) container from rendered PNG buffers. */
function buildIco(pngBuffers) {
  const count = pngBuffers.length;
  // ICONDIR (6) + ICONDIRENTRY (16 each)
  const header = Buffer.alloc(6 + 16 * count);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);

  let offset = header.length;
  pngBuffers.forEach((buf, i) => {
    const entry = i * 16 + 6;
    // Icon dir entry layout (16 bytes):
    //  +0 width (1) | +1 height (1) [0 => 256] | +2 colorCount | +3 reserved |
    //  +4 planes (2) | +6 bitCount (2) | +8 bytesInRes (4) | +12 imageOffset (4)
    header.writeUInt8(Math.min(bufWidths[i], 256), entry + 0); // width
    header.writeUInt8(Math.min(bufHeights[i], 256), entry + 1); // height
    header.writeUInt8(0, entry + 2); // color count
    header.writeUInt8(0, entry + 3); // reserved
    header.writeUInt16LE(1, entry + 4); // planes
    header.writeUInt16LE(32, entry + 6); // bit count
    header.writeUInt32LE(buf.length, entry + 8); // bytes in resource
    header.writeUInt32LE(offset, entry + 12); // image offset
    offset += buf.length;
  });

  return Buffer.concat([header, ...pngBuffers]);
}

/** We need width/height of each rendered PNG for the ICO header. */
const bufWidths = [];
const bufHeights = [];

async function main() {
  if (!fs.existsSync(srcSvg)) {
    throw new Error(`Source compact icon not found: ${srcSvg}`);
  }
  fs.mkdirSync(outDir, { recursive: true });

  const svgBuf = fs.readFileSync(srcSvg);

  // Sanity: the source must be square (compact identity).
  const meta = await sharp(svgBuf).metadata();
  if (meta.width !== meta.height) {
    throw new Error(`Source compact icon is not square (${meta.width}x${meta.height}). Aborting.`);
  }
  console.log(`[build-favicon] source ${path.relative(root, srcSvg)} is square ${meta.width}x${meta.height}`);

  for (const { file, size } of pngSizes) {
    const png = await sharp(svgBuf).resize(size, size).png().toBuffer();
    fs.writeFileSync(path.join(outDir, file), png);
    console.log(`[build-favicon] wrote public/images/logo/${file} (${png.length} bytes)`);
  }

  // favicon.ico — 16/32/48 PNG entries (modern browser-compatible).
  const icoEntries = [16, 32, 48];
  const icoPngs = [];
  for (const size of icoEntries) {
    const png = await sharp(svgBuf).resize(size, size).png().toBuffer();
    icoPngs.push(png);
    bufWidths.push(size);
    bufHeights.push(size);
  }
  fs.writeFileSync(icoPath, buildIco(icoPngs));
  console.log(`[build-favicon] wrote public/favicon.ico (entries ${icoEntries.join(',')})`);

  // Verify all outputs.
  for (const { file, size } of pngSizes) {
    const m = await sharp(path.join(outDir, file)).metadata();
    console.log(`[build-favicon] verify ${file} -> ${m.width}x${m.height} ${m.format} alpha=${m.hasAlpha}`);
  }
}

main().catch((err) => {
  console.error('[build-favicon] FAILED:', err.message);
  process.exit(1);
});