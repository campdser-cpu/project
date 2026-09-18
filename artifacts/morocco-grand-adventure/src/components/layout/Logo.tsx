type LogoProps = {
  /** 'dark' = light background (scrolled). 'light' = dark/hero background (transparent header). */
  variant?: 'dark' | 'light';
  className?: string;
  /**
   * Set when an ancestor already supplies the accessible name — the navbar
   * wraps this in `<Link aria-label="Morocco Grand Adventure — Home">`. The
   * mark is then purely decorative and must stay out of the accessibility
   * tree, otherwise the link exposes a nested, duplicated image node. When
   * false (e.g. the footer, where the logo stands alone) the SVG names itself
   * with a <title>, the canonical mechanism for an inline SVG.
   */
  decorative?: boolean;
};

/**
 * Official Morocco Grand Adventure horizontal logo lockup.
 *
 * The brand symbol is the real logo drawing, extracted from the official
 * artwork with a transparent background (/images/logo/mga-emblem.webp).
 * The MOROCCO GRAND ADVENTURE wordmark stays vector so it remains crisp at
 * every size and can be recoloured per variant without a second asset.
 *
 * Geometry is unchanged from the previous lockup: the same 975x290 viewBox,
 * the same wordmark coordinates, type sizes, letter-spacing, rules and
 * ornaments, and the symbol occupies the same optical slot on the left.
 */
export function Logo({ variant = 'dark', className = '', decorative = false }: LogoProps) {
  const ink = variant === 'dark' ? '#1E3B2C' : '#FFFFFF';
  const gold = variant === 'dark' ? '#A97C2F' : '#EFD9AC';

  // Default prominence for the navbar; callers (Navbar, Footer) may pass
  // explicit heights. The Navbar swaps between a large top-of-page state and a
  // compact scrolled state, so height is transitioned here: width stays `auto`
  // and follows the fixed 975x290 viewBox ratio, which keeps the emblem and
  // wordmark scaling together with no distortion.
  const sizeClasses = className.includes('h-') ? className : 'h-10 sm:h-12 md:h-14';

  return (
    <svg
      viewBox="0 0 975 290"
      width={975}
      height={290}
      {...(decorative
        ? { 'aria-hidden': true as const, focusable: 'false' as const }
        : { role: 'img' as const })}
      // The wordmark is Latin text. Without this it inherits the page's RTL
      // direction on Arabic pages, which runs the letters back from their x
      // origin and clips "MOROCCO" out of the viewBox.
      direction="ltr"
      className={`w-auto transition-[height] duration-300 ease-out ${sizeClasses}`}
    >
      {!decorative && <title>Morocco Grand Adventure</title>}

      {/* ================= BRAND SYMBOL (real logo drawing) ================= */}
      <image
        href="/images/logo/mga-emblem.webp"
        x={26}
        y={32}
        width={221}
        height={204}
        preserveAspectRatio="xMidYMid meet"
      />

      {/* ================= WORDMARK ================= */}
      <g fontFamily="Georgia, 'Times New Roman', serif">
        <text x="286" y="150" fontSize="86" fontWeight="bold" letterSpacing="10" fill={ink}>
          MOROCCO
        </text>
        <g fill={gold}>
          <text x="290" y="215" fontSize="34" letterSpacing="14">
            GRAND
          </text>
          <text x="560" y="215" fontSize="34" letterSpacing="14">
            ADVENTURE
          </text>
          <path d="M522,203 l7,8 -7,8 -7,-8 Z" />
          <path d="M536,203 l5,8 -5,8 -5,-8 Z" opacity="0.7" />
        </g>
        <g stroke={gold} strokeWidth="2" opacity="0.9">
          <line x1="292" y1="242" x2="680" y2="242" />
          <line x1="760" y1="242" x2="938" y2="242" />
        </g>
        <g fill={gold}>
          <path d="M712,242 l8,-9 8,9 -8,9 Z M720,236 l4,6 -4,6 -4,-6 Z" fillRule="evenodd" />
          <circle cx="745" cy="242" r="2.5" />
        </g>
      </g>
    </svg>
  );
}
