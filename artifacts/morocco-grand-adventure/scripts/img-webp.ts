// ─────────────────────────────────────────────────────────────────────────────
// Morocco Grand Adventure — Image → WebP optimizer
//
// Generates optimized .webp copies of every JPG in public/images, preserving
// aspect ratio. Optional src-swap mode rewrites source image references from
// .jpg to .webp so the site serves WebP directly (set SWAP=1).
//
// Requires `sharp` (https://sharp.pixelplumbing.com). If it is not installed,
// the script reports which converter to add and exits 0 without changing files.
// It never deletes JPGs; it only ADDS .webp files (and optionally rewrites the
// .jpg→.webp string references when SWAP=1).
//
//   pnpm exec tsx scripts/img-webp.ts            # generate .webp mirrors
//   SWAP=1 pnpm exec tsx scripts/img-webp.ts     # also rewrite refs to .webp
// ─────────────────────────────────────────────────────────────────────────────
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, '..');
const pubDir = path.join(projectDir, 'public');
const SRC_DIRS = [projectDir, path.resolve(scriptDir, '..', '..')]; // app + repo root

const QUALITY = 80; // visually lossless for these photos
const SWAP = process.env.SWAP === '1';

// One soft dependency: sharp. Import lazily so bare `tsx` runs still report
// a clear message instead of crashing with a hard module error.
let sharp: ((img: any) => any) | null = null;
try {
  const m = await import('sharp');
  sharp = m.default;
} catch {
  sharp = null;
}

if (!sharp) {
  console.log(
    '[img-webp] sharp is not installed. Run `pnpm add -w -D sharp` (or `pnpm --filter @workspace/morocco-grand-adventure add -D sharp`) then re-run to generate WebP. No files were changed.',
  );
  process.exit(0);
}

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(jpe?g)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

const jpgs = walk(pubDir);
let generated = 0;

for (const jpg of jpgs) {
  const webp = jpg.replace(/\.jpe?g$/i, '.webp');
  try {
    await sharp!(jpg)
      .webp({ quality: QUALITY })
      .rotate()
      .toFile(webp);
    generated++;
    console.log(`[img-webp] ${path.relative(pubDir, jpg)} → ${path.relative(pubDir, webp)}`);
  } catch (e) {
    console.warn(`[img-webp] SKIP ${path.basename(jpg)}: ${(e as Error).message}`);
  }
}
console.log(`[img-webp] Generated ${generated}/${jpgs.length} WebP images.`);

if (SWAP) {
  // Rewrite /images/**.jpg → .webp in source files so the site serves WebP.
  let swapped = 0;
  const RE = /(\/images\/[A-Za-z0-9_./-]+)\.(jpe?g)/g;
  for (const dir of SRC_DIRS) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory() || entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') continue;
      // eslint-disable-next-line no-inner-declarations
      function walkSwap(d: string) {
        for (const e of fs.readdirSync(d, { withFileTypes: true })) {
          const f = path.join(d, e.name);
          if (e.isDirectory()) {
            if (e.name === 'node_modules' || e.name === 'dist') continue;
            walkSwap(f);
          } else if (/\.(tsx|ts|json)$/.test(e.name)) {
            const src = fs.readFileSync(f, 'utf8');
            if (RE.test(src)) {
              const next = src.replace(RE, (m, p) => `${p}.webp`);
              fs.writeFileSync(f, next, 'utf8');
              swapped++;
              console.log(`[img-webp] SWAP refs: ${path.relative(projectDir, f)}`);
            }
          }
        }
      }
      walkSwap(path.join(dir, entry.name));
    }
  }
  console.log(`[img-webp] Rewrote .jpg→.webp references in ${swapped} source file(s).`);
}

console.log('[img-webp] Done. JPG originals are preserved (never deleted).');