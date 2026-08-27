// ─────────────────────────────────────────────────────────────────────────────
// Morocco Grand Adventure — Image SEO & performance optimizer
//
// Reads every photo in public/images and:
//   1. Generates a .webp mirror of each JPG (visually lossless, ~30-50% smaller).
//   2. Generates responsive width variants (-480w / -960w / -1440w .webp) so
//      `srcset` can serve mobile/tablet/desktop the right size.
//   3. Generates optimized header-logo variants + PNG favicon/touch icons from
//      the official brand logo (public/logo-official.png, 1536x1536).
//   4. Emits src/data/image-manifest.ts with intrinsic dimensions for every
//      image so <img> tags can declare width/height (CLS = 0).
//
// Existing originals are NEVER modified or deleted. Already-generated files
// that are newer than their source are skipped, so re-runs are cheap.
//
//   pnpm exec tsx scripts/img-optimize.ts
// ─────────────────────────────────────────────────────────────────────────────
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, '..');
const pubDir = path.join(projectDir, 'public');
const manifestOut = path.join(projectDir, 'src', 'data', 'image-manifest.ts');

const QUALITY = 80;
const VARIANT_WIDTHS = [480, 960, 1440];

let sharp: any = null;
try {
  const m = await import('sharp');
  sharp = m.default;
} catch {
  console.error(
    '[img-optimize] sharp is not installed. Run `pnpm add -w -D sharp` first. No files were changed.',
  );
  process.exit(1);
}

type Meta = { w: number; h: number };

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

async function isFresh(candidate: string, source: string): Promise<boolean> {
  try {
    const [c, s] = await Promise.all([fs.promises.stat(candidate), fs.promises.stat(source)]);
    return c.mtimeMs >= s.mtimeMs;
  } catch {
    return false;
  }
}

async function generateVariants(
  source: string,
  meta: Meta,
  baseName: string,
  outDir: string,
): Promise<number[]> {
  const usable = VARIANT_WIDTHS.filter((w) => w < meta.w * 0.8);
  const made: number[] = [];
  for (const w of usable) {
    const out = path.join(outDir, `${baseName}-${w}w.webp`);
    if (await isFresh(out, source)) {
      made.push(w);
      continue;
    }
    await sharp(source)
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(out);
    made.push(w);
  }
  return made;
}

// ── 1 & 2: photos in public/images ───────────────────────────────────────────
const imagesDir = path.join(pubDir, 'images');
const photos = walk(imagesDir).filter((f) => /\.(jpe?g|png)$/i.test(f));
const manifest: Record<string, { w: number; h: number; variants: number[] }> = {};
let mirrors = 0;
let variantCount = 0;

for (const photo of photos) {
  const ext = path.extname(photo).toLowerCase();
  const baseName = path.basename(photo, ext);
  const outDir = path.dirname(photo);
  const meta = await sharp(photo).metadata();
  const w: number = meta.width ?? 0;
  const h: number = meta.height ?? 0;
  if (!w || !h) {
    console.warn(`[img-optimize] SKIP (no dimensions): ${path.relative(pubDir, photo)}`);
    continue;
  }

  // WebP mirror for JPG sources (never overwrite an existing .webp source).
  if (ext === '.jpg' || ext === '.jpeg') {
    const webpMirror = path.join(outDir, `${baseName}.webp`);
    if (!(await isFresh(webpMirror, photo))) {
      await sharp(photo).rotate().webp({ quality: QUALITY }).toFile(webpMirror);
      mirrors++;
    }
  }

// ── 3: official brand logo derivatives ───────────────────────────────────────
const logoSrc = path.join(pubDir, 'logo-official.png');
if (fs.existsSync(logoSrc)) {
  const logoJobs: Array<[number, 'webp' | 'png', string]> = [
    [384, 'webp', 'logo-official-384.webp'],
    [768, 'webp', 'logo-official-768.webp'],
    [512, 'png', 'logo-official-icon-512.png'],
    [192, 'png', 'logo-official-icon-192.png'],
    [180, 'png', 'logo-official-icon-180.png'],
  ];
  for (const [size, fmt, name] of logoJobs) {
    const out = path.join(pubDir, name);
    if (await isFresh(out, logoSrc)) continue;
    const pipeline = sharp(logoSrc).resize({ width: size, height: size, fit: 'cover' });
    if (fmt === 'webp') await pipeline.webp({ quality: 90 }).toFile(out);
    else await pipeline.png({ compressionLevel: 9 }).toFile(out);
    console.log(`[img-optimize] logo → ${name}`);
  }
  manifest['/logo-official.png'] = { w: 1536, h: 1536, variants: [384, 768] };
}

// ── 4: dimensions manifest for the app ───────────────────────────────────────
const header = `// ─────────────────────────────────────────────────────────────────────────────
// AUTO-GENERATED by scripts/img-optimize.ts — do not edit by hand.
// Intrinsic dimensions + available responsive WebP variants for every site
// image. Consumed by src/lib/images.ts to add width/height (CLS = 0) and
// srcset/sizes (responsive delivery) to <img> elements.
// ─────────────────────────────────────────────────────────────────────────────

export type ImageEntry = { w: number; h: number; variants: number[] };

export const IMAGE_MANIFEST: Record<string, ImageEntry> = ${JSON.stringify(manifest, null, 2)};
`;
fs.writeFileSync(manifestOut, header, 'utf8');

console.log(
  `[img-optimize] ${mirrors} WebP mirror(s), ${variantCount} responsive variant(s), ` +
    `${Object.keys(manifest).length} manifest entries. Originals preserved.`,
);

  const variants = await generateVariants(photo, { w, h }, baseName, outDir);
  variantCount += variants.length;

  const rel = path.relative(pubDir, photo).replace(/\\/g, '/');
  manifest[`/${rel}`] = { w, h, variants };
}
