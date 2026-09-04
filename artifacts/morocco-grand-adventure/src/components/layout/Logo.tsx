type LogoProps = {
  /** 'dark' = light background (scrolled). 'light' = dark/hero background (transparent header). */
  variant?: 'dark' | 'light';
  className?: string;
};

/**
 * Official Morocco Grand Adventure horizontal logo lockup.
 * Uses the exact brand assets from /images/logo/:
 * - mga-logo-horizontal-white.svg on dark/hero backgrounds
 * - mga-logo-horizontal-dark.svg on light/scrolled backgrounds
 * Single transparent SVG: brand symbol on the left, MOROCCO GRAND ADVENTURE
 * wordmark on the right. No background canvas, no opacity changes, artwork untouched.
 */
export function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const src =
    variant === 'dark'
      ? '/images/logo/mga-logo-horizontal-dark.svg'
      : '/images/logo/mga-logo-horizontal-white.svg';

  // Default prominence for the navbar; callers (Footer) may pass explicit heights.
  const sizeClasses = className.includes('h-')
    ? className
    : 'h-10 sm:h-12 md:h-14';

  return (
    <img
      src={src}
      alt="Morocco Grand Adventure"
      width={975}
      height={290}
      className={`w-auto ${sizeClasses}`}
      draggable={false}
      decoding="async"
      fetchPriority="low"
    />
  );
}
