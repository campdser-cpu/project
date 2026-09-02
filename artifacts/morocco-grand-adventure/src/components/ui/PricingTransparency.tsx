import { CalendarDays, Users, Sparkles, BedDouble, Car, Mountain } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * PricingTransparency — a tasteful, honest explanation of how Morocco Grand
 * Adventure prices its customized tours.
 *
 * It never shows fabricated numbers: it explains WHY a final price can vary
 * (dates/season, group size, private vs shared, accommodation level, transport
 * and activities) and reassures the traveler that the exact price is confirmed
 * before booking, with no hidden charges. Any displayed price on the site is a
 * starting price, so this component reinforces that "from" honestly.
 */
const factorKeys = [
  { icon: CalendarDays, titleKey: 'pricing_factor_dates_title', descKey: 'pricing_factor_dates_desc' },
  { icon: Users, titleKey: 'pricing_factor_travelers_title', descKey: 'pricing_factor_travelers_desc' },
  { icon: Sparkles, titleKey: 'pricing_factor_experience_title', descKey: 'pricing_factor_experience_desc' },
  { icon: BedDouble, titleKey: 'pricing_factor_stays_title', descKey: 'pricing_factor_stays_desc' },
  { icon: Car, titleKey: 'pricing_factor_transport_title', descKey: 'pricing_factor_transport_desc' },
  { icon: Mountain, titleKey: 'pricing_factor_activities_title', descKey: 'pricing_factor_activities_desc' },
] as const;

export function PricingTransparency({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();

  return (
    <section
      className={`rounded-3xl border border-primary/20 bg-primary/5 ${compact ? 'p-5' : 'p-6 md:p-8'}`}
      aria-label={t('price_heading')}
    >
      <h3 className="font-serif text-xl md:text-2xl text-foreground mb-2">{t('price_heading')}</h3>
      <p className={`text-sm leading-relaxed text-muted-foreground ${compact ? 'mb-4' : 'mb-6'}`}>{t('price_intro')}</p>

      <ul className={`grid ${compact ? 'grid-cols-2 gap-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'}`}>
        {factorKeys.map((f) => (
          <li key={f.titleKey} className="flex items-start gap-3 rounded-2xl bg-background/70 border border-border p-3">
            <f.icon className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-bold text-foreground">{t(f.titleKey)}</p>
              <p className="text-xs text-muted-foreground leading-snug">{t(f.descKey)}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-sm text-foreground/90 flex items-start gap-2">
        <Sparkles className={`w-4 h-4 text-primary shrink-0 mt-0.5 ${compact ? 'w-4 h-4' : 'w-5 h-5 mt-1'}`} aria-hidden="true" />
        <span>{t('price_assurance')}</span>
      </p>
    </section>
  );
}