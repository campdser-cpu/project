// ─────────────────────────────────────────────────────────────────────────────
// Morocco Grand Adventure — Catalog image processor
//
// Takes the 31 original catalog JPEGs (placed in CATALOG_SRC with semantic
// filenames) and generates optimized assets into public/images/catalog/:
//   <name>.webp        (full size, capped at 1600px wide, quality 80)
//   <name>-480w.webp   (mobile srcset candidate)
//   <name>-768w.webp   (tablet srcset candidate)
//
// Mirrors scripts/optimize-images.mjs conventions. Idempotent. Never deletes.
// Run: node scripts/process-catalog-images.mjs
// ─────────────────────────────────────────────────────────────────────────────
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = process.env.CATALOG_SRC || 'c:/temp/catalog-src';
const outDir = path.join(root, 'public/images/catalog');

const NAMES = [
  'berber-camel-guide-sahara-merzouga',
  'berber-child-baby-goat-village',
  'amazigh-woman-berber-jewellery',
  'ait-ben-haddou-ouarzazate-unesco',
  'ancient-berber-kasbah-ruins-southern-morocco',
  'moroccan-cliff-dwellings-rock-cut',
  'hassan-ii-mosque-casablanca',
  'luxury-desert-camp-sunset-merzouga',
  'chefchaouen-blue-city-rif',
  'moroccan-night-spice-herb-market',
  'jemaa-el-fna-night-marrakech',
  'sahara-dune-trekking-merzouga',
  'menara-gardens-pavilion-marrakech',
  'hassan-ii-mosque-doorway-casablanca',
  'grotte-assif-n-el-hed-river-cave',
  'draa-valley-oasis-palm-grove',
  'essaouira-sqala-du-port-atlantic',
  'sahara-bivouac-stars-merzouga',
  'medina-agadir-heritage',
  'fennec-fox-sahara-wildlife',
  'olive-preserved-lemon-market-stall',
  'moroccan-vegetable-tagine',
  'moroccan-mezze-couscous-tagine',
  'moroccan-tagine-salads-clay-bowls',
  'tbourida-fantasia-marrakech',
  'moroccan-riad-breakfast',
  'moroccan-fine-dining-riad',
  'moroccan-mint-tea-riad',
  'moroccan-pastries-sweets',
  'amazigh-music-ceremony',
  'moroccan-palace-ceiling-muqarnas',
];

fs.mkdirSync(outDir, { recursive: true });
let created = 0;
let bytesBefore = 0;
let bytesAfter = 0;

for (const name of NAMES) {
  const jpg = path.join(srcDir, `${name}.jpg`);
  if (!fs.existsSync(jpg)) { console.log(`  MISSING source: ${name}.jpg`); continue; }
  bytesBefore += fs.statSync(jpg).size;
  const base = path.join(outDir, name);
  const jobs = [
    [`${base}.webp`, sharp(jpg).rotate().resize({ width: 1280, withoutEnlargement: true }).webp({ quality: 72 })],
    [`${base}-480w.webp`, sharp(jpg).rotate().resize({ width: 480, withoutEnlargement: true }).webp({ quality: 78 })],
    [`${base}-768w.webp`, sharp(jpg).rotate().resize({ width: 768, withoutEnlargement: true }).webp({ quality: 78 })],
  ];
  for (const [out, pipeline] of jobs) {
    if (!fs.existsSync(out)) {
      const info = await pipeline.toFile(out);
      created++;
      bytesAfter += info.size;
      console.log(`  ${path.relative(root, out)}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
    } else {
      bytesAfter += fs.statSync(out).size;
    }
  }
}
console.log(`process-catalog-images: ${created} files created. Source ${(bytesBefore / 1048576).toFixed(1)}MB → optimized ${(bytesAfter / 1048576).toFixed(1)}MB total.`);
