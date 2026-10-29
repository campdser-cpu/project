type LogoProps = {
  /**
   * Retained for call-site compatibility with Navbar/Footer. The official
   * raster logo has fixed, baked-in artwork colors and is no longer
   * recoloured per variant.
   */
  variant?: 'dark' | 'light';
  className?: string;
  /**
   * Set when an ancestor already supplies the accessible name — the navbar
   * wraps this in `<Link aria-label="Morocco Grand Adventure — Home">`. The
   * mark is then purely decorative and must stay out of the accessibility
   * tree, otherwise the link exposes a nested, duplicated image node. When
   * false (e.g. the footer, where the logo stands alone), the image names
   * itself via `alt`.
   */
  decorative?: boolean;
  /**
   * The rendered CSS width at each breakpoint, matching `className`'s own
   * height classes exactly (width follows the image's aspect ratio, so a
   * height class implies one real width). Callers with different height
   * classes render at different widths and so must pass their own accurate
   * `sizes` — copying a default here would silently mis-size whichever
   * caller didn't match it. See Navbar.tsx/Footer.tsx for the two real values.
   */
  sizes: string;
  /**
   * The navbar logo is above the fold on every page and stays eager
   * (default). The footer logo is always below the fold, so its call site
   * passes 'lazy'.
   */
  loading?: 'eager' | 'lazy';
};

/**
 * Official Morocco Grand Adventure logo — the brand's official artwork, used
 * as-is: not redrawn, recoloured or vectorized. Two WebP derivatives exist
 * (public/logo-official-{130,260}w.webp, via scripts/optimize-logo.mjs)
 * instead of the full 1230x957 source PNG (~406 KiB):
 *   • The navbar's initial, top-of-page state renders the logo at h-20 on
 *     mobile (~103x80px) — PageSpeed's mobile audit measured exactly this
 *     instance against the old single 260w file and flagged it as oversized
 *     (260x202 served for a ~103x80 slot). 130w covers that slot up to ~1.25x
 *     DPR; the browser escalates to 260w on its own past that.
 *   • Footer's largest breakpoint (md:h-[82px], ~105px wide) still needs
 *     260w at 2x+ DPR, so that file is kept as the larger srcset rung for
 *     every caller/breakpoint 130w can't safely cover.
 * The browser's own srcset/sizes matching picks whichever is actually
 * needed per caller/breakpoint/DPR — this component no longer hardcodes one.
 * The original full-resolution PNG is untouched on disk — it remains the
 * canonical asset referenced by the Organization/TravelAgency structured
 * data in StructuredData.tsx and index.html, which is metadata only (never
 * downloaded as part of page render) and is deliberately left at full
 * resolution per Google's logo guidance.
 */
export function Logo({ className = '', decorative = false, sizes, loading = 'eager' }: LogoProps) {
  // Default prominence for the navbar; callers (Navbar, Footer) may pass
  // explicit heights. The Navbar swaps between a large top-of-page state and
  // a compact scrolled state, so height is transitioned here: width stays
  // `auto` and follows the image's natural aspect ratio.
  const sizeClasses = className.includes('h-') ? className : 'h-[46px] sm:h-[55px] md:h-16';

  return (
    <img
      src="/logo-official-260w.webp"
      srcSet="/logo-official-130w.webp 130w, /logo-official-260w.webp 260w"
      sizes={sizes}
      alt={decorative ? '' : 'Morocco Grand Adventure'}
      width={260}
      height={202}
      loading={loading}
      decoding="async"
      className={`w-auto transition-[height] duration-300 ease-out ${sizeClasses}`}
    />
  );
}
