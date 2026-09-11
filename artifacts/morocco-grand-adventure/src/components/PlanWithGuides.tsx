/**
 * The four featured Merzouga guide cards shown in the "Plan with our guides"
 * hub section (Merzouga guide hub + prerendered HTML). Titles, intros and
 * thumbnails stay in sync: the runtime UI (PlanWithGuides) and the static
 * prerender both consume THIS module's slugs and the canonical guide data,
 * with localized titles from getLocalizedGuide().
 */
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedGuide } from '@/i18n/guides';
import { MERZOUGA_GUIDES } from '@/data/seoHub';
import { trackEvent } from '@/lib/analytics';

export const FEATURED_GUIDE_SLUGS = [
  'how-many-days',
  'camel-trekking',
  'best-time-to-visit',
  'what-to-pack',
] as const;

export function featuredHubPath(slug: string): string {
  return `/merzouga-guide/${slug}`;
}

export default function PlanWithGuides() {
  const { lang, t } = useLanguage();
  const cards = FEATURED_GUIDE_SLUGS.map((slug) => {
    const base = MERZOUGA_GUIDES.find((p) => p.slug === slug);
    const localized = getLocalizedGuide(slug, lang);
    return {
      slug,
      href: `/${lang}${featuredHubPath(slug)}`,
      title: localized?.title ?? base?.title ?? slug,
      intro: localized?.intro ?? base?.intro ?? '',
      image: base?.heroImage ?? '',
      imageAlt: localized?.heroAlt ?? base?.heroAlt ?? '',
    };
  });
  if (cards.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-card border-y border-border" aria-labelledby="pwig-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-3 block">{t('pwig_heading')}</span>
          <h2 id="pwig-heading" className="font-serif text-3xl md:text-5xl text-foreground">{t('pwig_heading')}</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">{t('pwig_sub')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={card.href}
                onClick={() => trackEvent('guide_card_click', { page: 'merzouga-guide', guide: card.slug })}
                className="group block bg-background rounded-3xl border border-border overflow-hidden hover:border-primary/40 hover:shadow-xl transition-all h-full"
                aria-label={`${card.title} — ${t('pwig_read')}`}
              >
                {card.image && (
                  <div className="overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.imageAlt}
                      width={800}
                      height={500}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-44 object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors mb-2">{card.title}</h3>
                  {card.intro && <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{card.intro}</p>}
                  <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-primary">
                    {t('pwig_read')} <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

