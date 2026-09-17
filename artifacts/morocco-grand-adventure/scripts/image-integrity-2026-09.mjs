// ─────────────────────────────────────────────────────────────────────────────
// Image integrity pass (September 2026). One-off, already applied — kept as the
// record of what was changed and why. Re-running it is refused.
//
// 1. RENAME files whose picture did not match their name. Several curated/
//    and catalog/ files had been saved under each other's names (the Menara
//    pavilion saved as "todra-gorge", a Casablanca minaret saved as
//    "chouara-tannery", …). Each file now carries the name of what it shows,
//    so every existing reference (which names the intended subject) is right.
// 2. REPLACE destination images that showed the wrong place or carried a
//    photographer's watermark, using verified sources (official library or
//    correctly named local files).
// 3. REMOVE assets carrying third-party marks: a Dreamstime-watermarked stock
//    preview, a ©THEHISTORIANTRAVELLER.COM watermark, Instagram-style caption
//    and location overlays, catalog photos with smeared-out marks, a stock
//    interior mock-up, and three downloaded video reels whose ownership could
//    not be established (one is byte-identical to a file saved as
//    "Spirits of Morocco … #cinematic #travel #morocco").
// 4. Done alongside this script (not by it): official-library photos MGA-008
//    (quad rental plate) and MGA-021 (hotel sign) were restricted in
//    src/data/photoLibrary.ts and their published files removed; tour-card
//    crops now come from scripts/build-tour-card-images.mjs.
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const IMG = path.join(root, 'public/images');
const sharp = createRequire(path.join(root, 'package.json'))('sharp');
const git = (...args) => execFileSync('git', args, { cwd: root, stdio: 'pipe' }).toString();

if (fs.existsSync(path.join(IMG, 'curated/menara-gardens-pavilion-marrakech.webp'))) {
  console.log('[image-integrity] already applied — nothing to do');
  process.exit(0);
}

const variants = (dir, base) => fs.readdirSync(path.join(IMG, dir))
  .filter((n) => n === `${base}.webp` || n === `${base}.jpg` || new RegExp(`^${base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}-\\d+w\\.(webp|jpg)$`).test(n));

/** Apply a set of renames {from: to} inside one folder (handles cycles). */
function renameAll(dir, map) {
  const staged = [];
  for (const [from, to] of Object.entries(map)) {
    for (const f of variants(dir, from)) {
      const tmp = `__tmp__${to}${f.slice(from.length)}`;
      git('mv', `public/images/${dir}/${f}`, `public/images/${dir}/${tmp}`);
      staged.push([tmp, `${to}${f.slice(from.length)}`]);
    }
  }
  for (const [tmp, final] of staged) git('mv', `public/images/${dir}/${tmp}`, `public/images/${dir}/${final}`);
}

// ── 1. content ≠ name → rename ──────────────────────────────────────────────
renameAll('curated', {
  // cycle A
  'blue-stairway-craft-shops-chefchaouen': 'couple-blue-steps-chefchaouen-medina',
  'couple-blue-steps-chefchaouen-medina': 'cascading-waterfall-todra-gorge',
  'cascading-waterfall-todra-gorge': 'blue-streets-berber-carpets-chefchaouen-medina',
  'blue-streets-berber-carpets-chefchaouen-medina': 'hassan-tower-mohammed-v-mausoleum-rabat',
  'hassan-tower-mohammed-v-mausoleum-rabat': 'blue-stairway-craft-shops-chefchaouen',
  // cycle B
  'handmade-baskets-blue-city-chefchaouen': 'rolling-green-hills-village-mosque-northern-morocco',
  'rolling-green-hills-village-mosque-northern-morocco': 'hassan-ii-mosque-interior-colonnades-casablanca',
  'hassan-ii-mosque-interior-colonnades-casablanca': 'panoramic-view-chefchaouen-rif-mountains',
  'panoramic-view-chefchaouen-rif-mountains': 'hassan-ii-mosque-exterior-arches-golden-hour-casablanca',
  'hassan-ii-mosque-exterior-arches-golden-hour-casablanca': 'handmade-baskets-blue-city-chefchaouen',
  // chain C (the Chouara name had no matching picture; Menara gets its own name)
  'chouara-tannery-overhead-fes-el-bali': 'hassan-ii-mosque-minaret-casablanca',
  'hassan-ii-mosque-minaret-casablanca': 'todra-gorge-river-canyon-high-atlas',
  'todra-gorge-river-canyon-high-atlas': 'menara-gardens-pavilion-marrakech',
  // pair D
  'ait-ben-haddou-kasbah-sunrise-ouarzazate': 'ancient-water-channels-olive-groves-morocco',
  'ancient-water-channels-olive-groves-morocco': 'ait-ben-haddou-footbridge-ounila-river',
});
renameAll('catalog', {
  'chefchaouen-blue-city-rif': 'moroccan-night-spice-herb-market',
  'moroccan-night-spice-herb-market': 'chefchaouen-blue-city-rif',
  'hassan-ii-mosque-doorway-casablanca': 'jemaa-el-fna-night-marrakech',
  'jemaa-el-fna-night-marrakech': 'menara-gardens-pavilion-marrakech',
  'menara-gardens-pavilion-marrakech': 'hassan-ii-mosque-doorway-casablanca',
  'moroccan-pastries-sweets': 'tbourida-fantasia-marrakech',
  'tbourida-fantasia-marrakech': 'moroccan-pastries-sweets',
  'moroccan-vegetable-tagine': 'olive-preserved-lemon-market-stall',
  'olive-preserved-lemon-market-stall': 'moroccan-vegetable-tagine',
});

// ── 2. destination images ───────────────────────────────────────────────────
// casablanca.webp showed Chefchaouen and chefchaouen.webp showed Casablanca.
for (const f of variants('dest', 'casablanca').filter((n) => n.endsWith('.webp'))) git('mv', `public/images/dest/${f}`, `public/images/dest/__swap__${f}`);
for (const f of variants('dest', 'chefchaouen').filter((n) => n.endsWith('.webp'))) git('mv', `public/images/dest/${f}`, `public/images/dest/${f.replace('chefchaouen', 'casablanca')}`);
for (const f of fs.readdirSync(path.join(IMG, 'dest')).filter((n) => n.startsWith('__swap__'))) git('mv', `public/images/dest/${f}`, `public/images/dest/${f.replace('__swap__', '').replace('casablanca', 'chefchaouen')}`);

async function writeDest(name, input, { width = 1600 } = {}) {
  const base = path.join(IMG, 'dest', name);
  const src = await sharp(input).rotate().resize({ width, withoutEnlargement: true }).toBuffer();
  await sharp(src).webp({ quality: 80, effort: 6 }).toFile(`${base}.webp`);
  await sharp(src).resize({ width: 1200, withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }).toFile(`${base}.jpg`);
  for (const w of [480, 768]) await sharp(src).resize({ width: w }).webp({ quality: 78, effort: 6 }).toFile(`${base}-${w}w.webp`);
}
const lib = (f) => path.join(IMG, 'library', f);
await writeDest('fes', lib('leather-souk-archway-fes-medina-mga-020.jpg'));           // MGA-020, Fes
await writeDest('merzouga', lib('erg-chebbi-dunes-blue-hour-morocco-mga-033.jpg'));   // MGA-033, Erg Chebbi
await writeDest('todra-gorge', path.join(IMG, 'curated/todra-gorge-river-canyon-high-atlas.webp'));
await writeDest('ait-ben-haddou', path.join(IMG, 'curated/ait-ben-haddou-bridge-town-unesco-morocco.webp'));
// Casablanca/Chefchaouen: the .jpg fallbacks were different web photos (the
// Chefchaouen one carried "© Rhonda Albom"); regenerate them from the webp.
for (const n of ['casablanca', 'chefchaouen']) {
  await sharp(path.join(IMG, `dest/${n}.webp`)).resize({ width: 1200, withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(IMG, `dest/${n}.jpg`));
}
// Meknes: the only photo carried a photographer's watermark and no verified
// Meknes photograph exists in the library, so a decorative pattern stands in
// (rendered with empty alt) until a real photograph is supplied.
{
  const W = 1600, H = 1067, S = 160;
  const tile = `<g stroke="#C9A84C" stroke-opacity="0.55" stroke-width="2" fill="none">
    <path d="M${S / 2} 8 L${S - 8} ${S / 2} L${S / 2} ${S - 8} L8 ${S / 2} Z"/>
    <rect x="${S / 2 - 34}" y="${S / 2 - 34}" width="68" height="68" transform="rotate(45 ${S / 2} ${S / 2})"/>
    <circle cx="${S / 2}" cy="${S / 2}" r="16"/></g>`;
  let body = '';
  for (let y = 0; y < H; y += S) for (let x = 0; x < W; x += S) body += `<g transform="translate(${x} ${y})">${tile}</g>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2A2118"/><stop offset="1" stop-color="#101010"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#g)"/>${body}</svg>`;
  await writeDest('meknes', Buffer.from(svg));
}

// ── 3. homepage poster + default share image + generic heroes ───────────────
const heroDir = path.join(IMG, 'hero');
// Poster: first frame of /videos/hero.mp4 (captured in headless Chrome and
// passed in, since no ffmpeg is available here).
const posterFrame = process.env.HERO_POSTER_FRAME;
if (!posterFrame || !fs.existsSync(posterFrame)) throw new Error('HERO_POSTER_FRAME (png of hero.mp4 frame 0) is required');
await sharp(posterFrame).resize({ width: 720, height: 1280, fit: 'cover' }).webp({ quality: 72, effort: 6 }).toFile(path.join(heroDir, 'sahara-camel-riders-poster.webp'));
await sharp(posterFrame).resize({ width: 720, height: 1280, fit: 'cover' }).jpeg({ quality: 78, mozjpeg: true }).toFile(path.join(heroDir, 'sahara-camel-riders-poster.jpg'));
// Default Open Graph image (1200×630) from MGA-001.
fs.mkdirSync(path.join(IMG, 'og'), { recursive: true });
await sharp(lib('erg-chebbi-camel-trekking-sunset-morocco-mga-001.jpg')).resize({ width: 1200, height: 630, fit: 'cover', position: 'centre' }).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(IMG, 'og/morocco-grand-adventure-sahara.jpg'));
// "atlas-pano" showed a kasbah with no mountains: rebuild from MGA-016
// (kasbah gateway with the snow-capped High Atlas behind).
for (const [ext, fmt] of [['webp', (s) => s.webp({ quality: 72, effort: 6 })], ['jpg', (s) => s.jpeg({ quality: 78, mozjpeg: true })]]) {
  await fmt(sharp(lib('kasbah-gateway-high-atlas-road-morocco-mga-016.jpg')).resize({ width: 1400 })).toFile(path.join(heroDir, `atlas-pano.${ext}`));
}
// "medina-pano" was a stock interior mock-up: rebuild from MGA-009 (souk seen
// from above, Marrakech).
for (const [ext, fmt] of [['webp', (s) => s.webp({ quality: 62, effort: 6 })], ['jpg', (s) => s.jpeg({ quality: 72, mozjpeg: true })]]) {
  await fmt(sharp(lib('marrakech-souk-aerial-view-mga-009.jpg')).resize({ width: 900 })).toFile(path.join(heroDir, `medina-pano.${ext}`));
}

// ── 4. remove third-party assets ────────────────────────────────────────────
const remove = [
  ...variants('hero', 'desert-pano').map((f) => `hero/${f}`),
  ...variants('tours', '7-day-grand-morocco').map((f) => `tours/${f}`),
  ...['camel-caravan-sunset-silhouette-sahara-desert', 'fes-tannery-chouara-leather-dyeing-morocco',
    'hassan-ii-mosque-arched-corridor-casablanca', 'sahara-desert-camp-starry-night-lantern-merzouga',
    'sahara-desert-sunset-silhouette-dune-morocco', 'marrakech-souk-brass-lanterns-market',
    'sahara-desert-dunes-couple-sunset-merzouga', 'ait-benhaddou-kasbah-sunset-unesco-morocco']
    .flatMap((b) => variants('curated', b).map((f) => `curated/${f}`)),
  ...['ait-ben-haddou-ouarzazate-unesco', 'medina-agadir-heritage', 'grotte-assif-n-el-hed-river-cave', 'fennec-fox-sahara-wildlife']
    .flatMap((b) => variants('catalog', b).map((f) => `catalog/${f}`)),
];
for (const f of remove) git('rm', '-q', `public/images/${f}`);
for (const v of ['student-tours-hero.mp4', 'morocco-imperial-cities-desert-oasis-tour.mp4', 'sahara-desert-dunes-quad-biking-morocco.mp4']) {
  git('rm', '-q', `public/videos/${v}`);
}
console.log(`[image-integrity] renamed curated/catalog files, rebuilt 7 destination images and 2 heroes, removed ${remove.length} image files and 3 videos`);
