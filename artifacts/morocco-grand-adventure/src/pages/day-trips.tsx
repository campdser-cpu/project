import { Link } from 'wouter';
import { Clock, ChevronRight } from 'lucide-react';
import { ExperiencePage, defaultTrustBadges } from '../components/ExperiencePage';
import { TravelerDecisionGuide } from '../components/TravelerDecisionGuide';
import { useLanguage } from '@/contexts/LanguageContext';
import { tours } from '@/data/content';
import { DAY_TRIP_PRODUCT_IDS } from '@/data/tour-hierarchy';
import { getLocalizedTour } from '@/i18n/content';
import { PriceTag } from '../components/promo/PriceTag';
import { trackEvent } from '@/lib/analytics';

// Shown first and clearly separate from the "more ideas" section below, which
// covers places a custom day trip COULD visit but has no fixed, priced
// product yet. This is the fix for the page's old naming collision: "Day
// Trips" named a concept page whose only CTA was a custom quote, with no
// link anywhere to the real day-trip tours that already exist and are
// bookable today.

function RealDayTripProducts() {
  const { t, lang } = useLanguage();
  const products = DAY_TRIP_PRODUCT_IDS
    .map((id) => tours.find((tour) => tour.id === id))
    .filter((tour): tour is NonNullable<typeof tour> => Boolean(tour));
  if (products.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-3 block">{t('dt_products_eyebrow')}</span>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">{t('dt_products_title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t('dt_products_sub')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((tourBase) => {
            const tour = getLocalizedTour(tourBase.id, lang) ?? tourBase;
            return (
              <Link
                key={tour.id}
                href={`/tours/${tour.id}`}
                onClick={() => trackEvent('day_trip_click', { tour_id: tour.id, source_page: 'day-trips' })}
                className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300"
              >
                <div className="h-44 relative overflow-hidden">
                  <img
                    src={tour.image}
                    srcSet={`${tour.image.replace(/\.webp$/, '-480w.webp')} 480w, ${tour.image} 800w`}
                    sizes="(max-width: 640px) 100vw, 25vw"
                    alt={tour.name}
                    width={800}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-background/90 backdrop-blur text-foreground text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3" aria-hidden="true" /> {tour.duration}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">{tour.name}</h3>
                  <div className="mt-auto pt-3 flex items-center justify-between">
                    <PriceTag price={tour.price} size="sm" />
                    <span className="text-primary text-sm font-bold flex items-center gap-1">
                      {t('tours_view')} <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function DayTrips() {
  const { t } = useLanguage();
  // Essaouira, Chefchaouen, Meknès/Volubilis and the Merzouga desert explorer
  // have no fixed, priced day-trip product yet — real destinations, genuinely
  // reachable as a day trip, but only as a custom request. The two that DO
  // have real products (Ourika, Ouzoud) are shown once, as products, above —
  // keeping them here too would show the same place twice with two different
  // (and confusing) calls to action.
  const moreIdeas = [
    { title: t('dt_f3_title'), description: t('dt_f3_desc') },
    { title: t('dt_f4_title'), description: t('dt_f4_desc') },
    { title: t('dt_f5_title'), description: t('dt_f5_desc') },
    { title: t('dt_f6_title'), description: t('dt_f6_desc') },
  ];

  return (
    <ExperiencePage
      id="day-trips"
      heroImage="/images/dest/ouzoud.webp"
      heroAlt={t('dt_hero_alt')}
      breadcrumbName={t('dt_breadcrumb')}
      title={t('dt_title')}
      subtitle={t('dt_subtitle')}
      ctaText={t('dt_cta')}
      ctaLink="/build-your-day-trip"
      trustBadges={defaultTrustBadges()}
      highlights={moreIdeas}
      faqs={[
        { question: t('dt_faq1_q'), answer: t('dt_faq1_a') },
        { question: t('dt_faq2_q'), answer: t('dt_faq2_a') },
        { question: t('dt_faq3_q'), answer: t('dt_faq3_a') },
        { question: t('dt_faq4_q'), answer: t('dt_faq4_a') },
      ]}
    >
      <RealDayTripProducts />
      <TravelerDecisionGuide />
    </ExperiencePage>
  );
}
