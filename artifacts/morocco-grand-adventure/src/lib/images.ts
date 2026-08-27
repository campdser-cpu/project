// ─────────────────────────────────────────────────────────────────────────────
// Image utilities driven by the auto-generated image-manifest.
// Provides:
//   • intrinsic width/height for every site image (eliminates CLS)
//   • responsive srcset + sizes so mobile/tablet/desktop get the right size
//   • helper to build a source list (WebP + original fallback)
// ─────────────────────────────────────────────────────────────────────────────
import { IMAGE_MANIFEST } from '@/data/image-manifest';

type Variant = { path: string; w: number };

/** Turn a manifest entry's variant widths into usable {path,w} candidates. */
export function variantPaths(src: string, variantWidths: number[]): Variant[] {
  // If :WEBP (explicit WebP swapped) or already a .webp source, variants live
  // alongside it (e.g. /images/dest/marrakech.webp → marrakech-960w.webp).
  const webpSource = src.replace(/\.(jpe?g|png)$/i, '.webp');
  const stem = webpSource.replace(/\.webp$/i, '');
  return (variantWidths ?? []).map((w) => ({ path: `${stem}-${w}w.webp`, w }));
}

/** Build a responsive srcset for a source image (variants only). */
export function srcsetFor(src: string, variantWidths: number[]): string {
  return variantPaths(src, variantWidths)
    .map((v) => `${v.path} ${v.w}w`)
    .join(', ');
}

/** The best single-response src: WebP mirror (or original if already WebP). */
export function webpSrc(src: string): string {
  if (/\.webp$/i.test(src)) return src;
  return src.replace(/\.(jpe?g|png)$/i, '.webp');
}

/** Intrinsic width/height for a root-relative asset path ('' when unknown). */
export function intrinsicFor(src: string): { width?: number; height?: number } {
  const e = IMAGE_MANIFEST[src];
  if (e) return { width: e.w, height: e.h };
  // Fall back to the WebP mirror key if the caller references the JPG.
  const alt = src.replace(/\.(jpe?g|png)$/i, '.jpg');
  const e2 = IMAGE_MANIFEST[alt];
  return e2 ? { width: e2.w, height: e2.h } : {};
}

/** Convenience: spread on an <img> to add srcset + width + height. */
export function responsiveImage(src: string, sizes?: string) {
  const e = IMAGE_MANIFEST[src] ?? IMAGE_MANIFEST[src.replace(/\.(jpe?g|png)$/i, '.jpg')];
  const variants = e?.variants ?? [];
  const ws = srcsetFor(src, variants);
  return {
    src,
    ...(ws ? { srcset: ws, sizes: sizes ?? '100vw' } : {}),
    ...(e ? { width: e.w, height: e.h } : {}),
  };
}