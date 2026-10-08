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
};

/**
 * Official Morocco Grand Adventure logo (/logo-official.png) — the brand's
 * official artwork, used as-is: not redrawn, recoloured or vectorized.
 */
export function Logo({ className = '', decorative = false }: LogoProps) {
  // Default prominence for the navbar; callers (Navbar, Footer) may pass
  // explicit heights. The Navbar swaps between a large top-of-page state and
  // a compact scrolled state, so height is transitioned here: width stays
  // `auto` and follows the image's natural aspect ratio.
  const sizeClasses = className.includes('h-') ? className : 'h-[46px] sm:h-[55px] md:h-16';

  return (
    <img
      src="/logo-official.png"
      alt={decorative ? '' : 'Morocco Grand Adventure'}
      width={1230}
      height={957}
      className={`w-auto transition-[height] duration-300 ease-out ${sizeClasses}`}
    />
  );
}
