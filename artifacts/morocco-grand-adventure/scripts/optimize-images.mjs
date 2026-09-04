// Generate missing responsive <img> variants (480w / 768w) for the images that
// are referenced by front-end components but have no prescaled candidate yet.
//
// Performance target (Phase: Core Web Vitals): give the responsive <img> srcSet
// real files to choose from so mobile users never download a full-width original
// when the image is rendered at ~378px. Companion to the srcSet attributes added
// to TourCard / Tours / destination / hub components.
//
// Only generated for files that currently exist under public/images/. Never
// deletes anything. Re-running is idempotent.
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public/images');

/** Map a source image path -> { webp, avif } candidate widths we want to ensure. */
const WIDTHS = [480, 768];

async function stat(p) {
  try { const s = await fs.promises.stat(p); return s; } catch { return null; }
}

async function ensureVariants(rel) {
  const abs = path.join(publicDir, rel);
  const info = await stat(abs);
  if (!info || !info.isFile()) { console.log(`  skip (missing) ${rel}`); return []; }
  if (!/\.webp$/i.test(rel)) return [];
  const base = abs.replace(/\.webp$/i, '');
  const created = [];
  for (const w of WIDTHS) {
    const outWebp = `${base}-${w}w.webp`;
    if (!(await stat(outWebp))) {
      await sharp(abs).resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile(outWebp);
      created.push(path.relative(publicDir, outWebp));
    }
  }
  return created;
}

// Reference list mirrors the images used at runtime by TourCard / Tours / hubs /
// destination-detail / home (dest + curated + personal). Derived from the
// src/data/content.ts image fields plus home.tsx curated references.
const rels = [
  // dest (tour/destination card images)
  ...['merzouga','fes','meknes','casablanca','rabat','ouarzazate','ait-ben-haddou','zagora','dades-valley','todra-gorge','skoura','roses-valley','draa-valley','chefchaouen','imlil','ourika-valley','ouzoud','ifrane','essaouira','agadir','taghazout','legzira','el-jadida','tangier','tetouan','akchour','nkob','mirleft'].map((n)=> `dest/${n}.webp`),
  // curated (home hub cards + tour/destination galleries)
  ...['ait-ben-haddou-kasbah-sunrise-ouarzazate','chouara-tannery-overhead-fes-el-bali','hassan-ii-mosque-interior-colonnades-casablanca','berber-guide-camel-sahara-desert-merzouga','ait-ben-haddou-bridge-town-unesco-morocco','couple-blue-steps-chefchaouen-medina','todra-gorge-river-canyon-high-atlas','cascading-waterfall-todra-gorge','tin-mal-mosque-pointed-arches-high-atlas','hassan-tower-mohammed-v-mausoleum-rabat','blue-streets-berber-carpets-chefchaouen-medina','hassan-ii-mosque-arched-corridor-casablanca','marrakech-medina-street-life-locals-morocco','sahara-desert-camp-starry-night-lantern-merzouga','sahara-desert-dunes-couple-sunset-merzouga','hassan-ii-mosque-exterior-arches-golden-hour-casablanca','handmade-baskets-blue-city-chefchaouen','blue-stairway-craft-shops-chefchaouen','marrakech-souk-brass-lanterns-market','leather-tanning-vats-fes-medina','ancient-water-channels-olive-groves-morocco','rolling-green-hills-village-mosque-northern-morocco','panoramic-view-chefchaouen-rif-mountains','hassan-ii-mosque-minaret-casablanca','hassan-ii-mosque-ornate-bronze-door-casablanca','ait-benhaddou-kasbah-sunset-unesco-morocco','fes-tannery-chouara-leather-dyeing-morocco','marrakech-medina-motorbike-archway-local-life','tannery-workers-dyeing-pits-fes','sahara-desert-sunset-silhouette-dune-morocco','camel-caravan-sunset-silhouette-sahara-desert','sahara-desert-dunes-quad-biking-morocco'].map((n)=> `curated/${n}.webp`),
  // personal (home IG + signature place cards)
  ...['guests-sunset','group-atlas','luxury-camp-dusk','guests-van'].map((n)=> `personal/${n}.webp`),
];
console.log(`\noptimize-images: ${rels.length} reference images across dest/curated/personal`);
let total=0;
for (const rel of rels) { const created=await ensureVariants(rel); if(created.length){ total+=created.length; console.log(`  ${rel} -> ${created.join(', ')}`); } }
console.log(`optimize-images: generated ${total} new variant files.`);