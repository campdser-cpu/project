import { useMemo } from 'react';

type LogoProps = {
  /** 'dark' = light background (scrolled). 'light' = dark/hero background (transparent header). */
  variant?: 'dark' | 'light';
  className?: string;
};

/**
 * Premium logo lockup: the original Morocco Grand Adventure emblem beside the
 * MOROCCO GRAND ADVENTURE wordmark.
 *
 * - Emblem is the original asset only (favicon.svg for dark, logo-emblem-light.svg for light).
 * - No rectangular full-logo image, no baked-in wordmark, no background canvas.
 * - Wordmark is real HTML text (Playfair Display + Lato) for crispness at any size.
 */
export function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const emblemSrc = variant === 'dark' ? '/favicon.svg' : '/logo-emblem-light.svg';

  const wordmark = useMemo(() => {
    const morocco = variant === 'dark' ? 'text-[#1E3D2F]' : 'text-[#F5EFE0]';
    const grand = variant === 'dark' ? 'text-[#A8842B]' : 'text-[#D4AF37]';
    const divider = variant === 'dark' ? 'bg-[#C9A84C]' : 'bg-[#C9A84C]';
    return { morocco, grand, divider };
  }, [variant]);

  return (
    <span className={`inline-flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {/* Original emblem only — large, sharp, no rectangular frame or baked wordmark. */}
      <img
        src={emblemSrc}
        alt=""
        aria-hidden="true"
        width={48}
        height={48}
        className="h-11 w-11 sm:h-12 sm:w-12 shrink-0"
        draggable={false}
      />

      {/* Wordmark beside the emblem — real text, premium luxury proportions. */}
      <span className="flex flex-col leading-none">
        <span className={`font-serif font-bold tracking-[0.28em] text-[15px] sm:text-[17px] ${wordmark.morocco}`}>
          MOROCCO
        </span>
        <span className={`my-0.5 h-px w-full ${wordmark.divider}`} />
        <span className={`font-sans font-bold tracking-[0.22em] text-[8.5px] sm:text-[9.5px] ${wordmark.grand}`}>
          GRAND ADVENTURE
        </span>
      </span>
    </span>
  );
}
