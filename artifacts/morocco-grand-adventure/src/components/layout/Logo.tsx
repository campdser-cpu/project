type LogoProps = {
  /** 'dark' = light background (scrolled). 'light' = dark/hero background (transparent header). */
  variant?: 'dark' | 'light';
  className?: string;
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
export function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const ink = variant === 'dark' ? '#1E3B2C' : '#FFFFFF';
  const gold = variant === 'dark' ? '#A97C2F' : '#EFD9AC';

  // Default prominence for the navbar; callers (Footer) may pass explicit heights.
  const sizeClasses = className.includes('h-') ? className : 'h-10 sm:h-12 md:h-14';

  return (
    <svg
      viewBox="0 0 975 290"
      width={975}
      height={290}
      role="img"
      aria-label="Morocco Grand Adventure"
      className={`w-auto ${sizeClasses}`}
    >
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
