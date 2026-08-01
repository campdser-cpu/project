import { useLanguage } from '@/contexts/LanguageContext';
import { useCountdown } from '@/lib/promo';

type Props = { tone?: 'default' | 'onDark'; className?: string };

/** Live four-unit countdown (days / hours / minutes / seconds) to the promo deadline. */
export function Countdown({ tone = 'default', className = '' }: Props) {
  const { t } = useLanguage();
  const { days, hours, minutes, seconds } = useCountdown();
  const units: [number, string][] = [
    [days, t('promo_days')],
    [hours, t('promo_hours')],
    [minutes, t('promo_minutes')],
    [seconds, t('promo_seconds')],
  ];
  const box =
    tone === 'onDark' ? 'bg-white/10 border-white/15 text-white' : 'bg-card border-border text-foreground';
  const label = tone === 'onDark' ? 'text-white/60' : 'text-muted-foreground';
  return (
    // dir=ltr keeps D:H:M:S order stable even under RTL (Arabic)
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`} dir="ltr">
      {units.map(([value, name], i) => (
        <div key={i} className="flex flex-col items-center">
          <div className={`flex min-w-[52px] items-center justify-center rounded-xl border px-2.5 py-2 backdrop-blur-sm ${box}`}>
            <span className="font-serif text-2xl font-bold leading-none tabular-nums sm:text-3xl">
              {String(value).padStart(2, '0')}
            </span>
          </div>
          <span className={`mt-1.5 text-[10px] font-medium uppercase tracking-wider ${label}`}>{name}</span>
        </div>
      ))}
    </div>
  );
}
