import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePromoActive } from './PromoProvider';
import { Countdown } from './Countdown';
import { PromoCta } from './PromoCta';

type Props = { variant?: 'full' | 'compact'; className?: string };

/** Site-wide limited-time offer banner with live countdown + WhatsApp CTA. */
export function PromoBanner({ variant = 'full', className = '' }: Props) {
  const { t } = useLanguage();
  const active = usePromoActive();
  if (!active) return null;

  if (variant === 'compact') {
    return (
      <div className={`rounded-2xl border border-primary/25 bg-primary/5 p-5 md:p-6 ${className}`}>
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <p className="font-serif text-lg font-bold text-foreground md:text-xl">
              <span className="mr-1.5">🎉</span>
              {t('promo_headline')}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{t('promo_book_before')}</p>
          </div>
          <div className="flex shrink-0 flex-col items-center gap-4 md:items-end">
            <Countdown />
            <PromoCta />
          </div>
        </div>
        <p className="mt-4 border-t border-primary/15 pt-3 text-center text-xs text-muted-foreground md:text-left">
          {t('promo_fineprint')}
        </p>
      </div>
    );
  }

  return (
    <section className={`relative overflow-hidden bg-foreground py-14 md:py-16 ${className}`}>
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="container relative z-10 mx-auto flex flex-col items-center gap-7 px-4 text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
          {t('promo_badge')} · {t('promo_save10')}
        </span>
        <h2 className="max-w-3xl font-serif text-3xl leading-tight text-background md:text-5xl">
          <span className="mr-2">🎉</span>
          {t('promo_headline')}
        </h2>
        <p className="text-background/70">{t('promo_book_before')}</p>
        <div className="flex flex-col items-center gap-2.5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary/80">
            {t('promo_ends_in')}
          </span>
          <Countdown tone="onDark" />
        </div>
        <PromoCta size="lg" />
        <p className="max-w-2xl text-xs leading-relaxed text-background/50">{t('promo_fineprint')}</p>
      </motion.div>
    </section>
  );
}
