// ─────────────────────────────────────────────────────────────────────────────
// Student Tours photo pipeline.
//
// Reads originals from the LOCAL, uncommitted folder "student picture tours/"
// (tens of MB of full-resolution files, not shipped) and writes web-ready
// assets into public/images/student-tours/ using the section's existing
// convention: <name>.jpg fallback, <name>.webp, and -480w/-768w/-1280w(/-1600w)
// WebP derivatives. Metadata is stripped; nothing is retouched.
//
// Run manually after changing the manifest:
//   node scripts/build-student-tour-photos.mjs
//
// PROVENANCE — recorded here, never shown to visitors, never invented:
//   owner-confirmed  Morocco Grand Adventure confirmed on 2026-09-16 that these
//                    photos are its own and may be published.
//   pexels           Pexels licence (commercial use permitted). Photo ID and
//                    user slug come from the Pexels download filename. `title`
//                    is recorded only where the Pexels page was actually
//                    fetched; the rest were blocked by a Cloudflare challenge.
//
// Deliberately NOT processed from that folder (see the commit message for the
// full audit): photos saved from other businesses' or individuals' Instagram
// accounts, near-duplicate frames, a Pexels buggy photo whose country could not
// be established, a Pexels photo of a stranger's child, and a Pexels photo
// centred on a third-party hotel. Also left out: the owner-confirmed WhatsApp
// photo of a lizard on a hand (IMG-20260321-WA0020), which no section's copy
// describes.
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(path.join(root, 'package.json'));
const sharp = require('sharp');

const SRC_DIR = path.join(root, 'student picture tours');
const OUT_DIR = path.join(root, 'public/images/student-tours');

const OWNER = { source: 'owner-confirmed', confirmed: '2026-09-16' };

// `match` is a unique substring of the original filename.
// `hero: true` produces a 3:2 crop aligned to the bottom of the frame (where
// the people are) plus a 1600w derivative for wide viewports.
export const MANIFEST = [
  // ── heroes ────────────────────────────────────────────────────────────────
  { match: '(JPG)_7~2', out: 'student-group-sahara-dunes', hero: true, ...OWNER },
  { match: '(JPG)~3', out: 'students-dune-ridge-sahara', hero: true, ...OWNER },
  { match: '(JPG)_11~2', out: 'student-group-ait-ben-haddou-entrance', hero: true, quality: 70, ...OWNER },
  // ── owner-confirmed group trip ────────────────────────────────────────────
  { match: '(JPG)_18~2', out: 'student-group-ait-ben-haddou-ksar', ...OWNER },
  { match: '(JPG)_17~2', out: 'students-sahara-dunes-evening', ...OWNER },
  { match: '(JPG)_6~2', out: 'student-drumming-desert-evening', ...OWNER },
  { match: '(JPG)_1~2', out: 'students-terrace-kasbah-riverbed', ...OWNER },
  { match: '(JPG)_16~2', out: 'students-terrace-valley-view', ...OWNER },
  { match: '(JPG)_15~2', out: 'student-groups-4x4-sahara', ...OWNER },
  { match: '(JPG)_10~2', out: 'students-terrace-kasbahs-river', ...OWNER },
  { match: '(JPG)_12~2', out: 'students-4x4-desert-dunes', ...OWNER },
  // ── owner-confirmed WhatsApp ──────────────────────────────────────────────
  { match: 'IMG-20260914-WA0015', out: 'camel-caravan-silhouette-sahara', ...OWNER },
  // ── Pexels (licensed) ─────────────────────────────────────────────────────
  {
    match: 'pexels-drethousand-8571115', out: 'village-palm-grove-atlas-foothills',
    quality: 70, source: 'pexels', pexelsId: '8571115', pexelsUser: 'drethousand',
    url: 'https://www.pexels.com/photo/aerial-view-of-houses-at-the-foot-of-atlas-mountains-8571115/',
    title: 'Aerial view of houses at the foot of Atlas Mountains',
  },
  {
    match: 'pexels-aymane-hanni-2148955127-30710644.jpg.jpeg', out: 'whitewashed-hillside-town',
    quality: 70, source: 'pexels', pexelsId: '30710644', pexelsUser: 'aymane-hanni-2148955127',
    url: 'https://www.pexels.com/photo/30710644/', title: null,
  },
  {
    match: 'pexels-zakariahanif-10541223.jpg.jpeg', out: 'nomad-tent-desert',
    quality: 70, source: 'pexels', pexelsId: '10541223', pexelsUser: 'zakariahanif',
    url: 'https://www.pexels.com/photo/10541223/', title: null,
  },
];

// Byte-for-byte copies from the committed curated/ library, under names that
// describe the picture. The curated/ filenames of these two do NOT match their
// content (the "hassan-ii-mosque-*" files show a river gorge and Chefchaouen),
// so the Student Tour pages must not reference them by those names. Only the
// sizes that exist in curated/ are copied; curated/ has no .jpg fallback.
export const LIBRARY_COPIES = [
  { from: 'curated/hassan-ii-mosque-minaret-casablanca', out: 'river-gorge-narrows' },
  { from: 'curated/hassan-ii-mosque-interior-colonnades-casablanca', out: 'chefchaouen-blue-hillside' },
];

function copyFromLibrary({ from, out }) {
  const images = path.join(root, 'public/images');
  const copied = [];
  for (const suffix of ['.webp', '-480w.webp', '-768w.webp', '-1280w.webp']) {
    const src = path.join(images, `${from}${suffix}`);
    if (!fs.existsSync(src)) continue;
    fs.copyFileSync(src, path.join(OUT_DIR, `${out}${suffix}`));
    copied.push(suffix);
  }
  if (!copied.includes('.webp')) throw new Error(`library copy missing: ${from}`);
  return copied;
}

// Dense textures (a crowd against earthen architecture, aerial landscapes)
// compress poorly, so those entries set a lower `quality`.
const HERO_WIDTHS = [480, 768, 1280, 1600];
const WIDTHS = [480, 768, 1280];

async function build(entry, files) {
  const hits = files.filter((f) => f.includes(entry.match));
  if (hits.length !== 1) throw new Error(`"${entry.match}" matched ${hits.length} files`);
  const input = path.join(SRC_DIR, hits[0]);

  let pipeline = sharp(input).rotate();
  if (entry.hero) {
    const m = await sharp(input).rotate().metadata();
    const h = Math.round(m.width / 1.5);
    // bottom-aligned 3:2 band: the people sit in the lower part of these frames
    pipeline = pipeline.extract({ left: 0, top: Math.max(0, m.height - h), width: m.width, height: h });
  }
  const base = await pipeline
    .resize(entry.hero ? 1920 : 1600, entry.hero ? 1280 : 1600, { fit: 'inside', withoutEnlargement: true })
    .toBuffer();
  const meta = await sharp(base).metadata();

  const out = (suffix) => path.join(OUT_DIR, `${entry.out}${suffix}`);
  await sharp(base).jpeg({ quality: 80, mozjpeg: true }).toFile(out('.jpg'));
  await sharp(base).webp({ quality: entry.quality ?? 78, effort: 6 }).toFile(out('.webp'));

  const widths = [];
  for (const w of entry.hero ? HERO_WIDTHS : WIDTHS) {
    if (meta.width < w) continue;
    await sharp(base).resize({ width: w }).webp({ quality: entry.quality ?? 78, effort: 6 }).toFile(out(`-${w}w.webp`));
    widths.push(w);
  }
  return {
    out: entry.out, w: meta.width, h: meta.height, widths,
    jpgBytes: fs.statSync(out('.jpg')).size,
    webpBytes: fs.statSync(out('.webp')).size,
    derivBytes: Object.fromEntries(widths.map((w) => [w, fs.statSync(out(`-${w}w.webp`)).size])),
    source: entry.source,
  };
}

const invoked = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (invoked) {
  for (const c of LIBRARY_COPIES) console.log(`${c.out.padEnd(40)} copied from ${c.from} [${copyFromLibrary(c).join(' ')}]`);
  if (!fs.existsSync(SRC_DIR)) throw new Error(`source folder missing: ${SRC_DIR}`);
  const files = fs.readdirSync(SRC_DIR);
  const results = [];
  for (const entry of MANIFEST) results.push(await build(entry, files));
  for (const r of results) {
    console.log(
      `${r.out.padEnd(40)} ${String(r.w).padStart(4)}x${String(r.h).padEnd(4)} ` +
      `jpg ${String(r.jpgBytes).padStart(7)}  webp ${String(r.webpBytes).padStart(7)}  ` +
      `[${r.widths.map((w) => `${w}:${r.derivBytes[w]}`).join(' ')}]  ${r.source}`,
    );
  }
  console.log(`\n[student-tour-photos] wrote ${results.length} photographs to public/images/student-tours/`);
}
