import { Link } from 'wouter';
import { BookOpen, Clock3, MapPin, SunMedium } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Tour, Destination } from '@/data/content';

type Props = {
  tour: Tour;
  routeStops: Destination[];
};

/** Reusable editorial layer using only canonical/localized tour and destination facts. */
export function TourTravelerGuide({ tour, routeStops }: Props) {
  const { t } = useLanguage();
  const route = routeStops.slice(0, 7);
  const bestTimes = [...new Set(routeStops.map((d) => d.bestTime).filter(Boolean))].slice(0, 3);

  return (
    <section className="py-16 md:py-20 bg-background border-y border-border" aria-labelledby="traveler-guide-heading">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary mb-3">{t('tour_private')}</p>
          <h2 id="traveler-guide-heading" className="font-serif text-3xl md:text-4xl text-foreground mb-4">
            {t('dest_travel_info')}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">{tour.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          <div className="rounded-2xl border border-border bg-card p-6">
            <Clock3 className="w-6 h-6 text-primary mb-4" aria-hidden="true" />
            <h3 className="font-semibold text-foreground mb-2">{t('tour_itinerary')}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {tour.itineraryDays?.length ? `${tour.itineraryDays.length} ${t('tour_day')}` : t('dest_travel_info')}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <MapPin className="w-6 h-6 text-primary mb-4" aria-hidden="true" />
            <h3 className="font-semibold text-foreground mb-2">{t('dest_view_map')}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {route.length > 0 ? route.map((d) => d.name).join(' → ') : tour.routeCaption ?? t('dest_travel_info')}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <SunMedium className="w-6 h-6 text-primary mb-4" aria-hidden="true" />
            <h3 className="font-semibold text-foreground mb-2">{t('dest_climate')}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {bestTimes.length > 0 ? `${t('dest_best_time')}: ${bestTimes.join(' · ')}` : t('dest_travel_info')}
            </p>
          </div>
        </div>

        {route.length > 0 && (
          <div>
            <div className="flex items-end justify-between gap-4 mb-6">
              <h3 className="font-serif text-2xl md:text-3xl text-foreground">{t('tour_related')}</h3>
              <BookOpen className="hidden sm:block w-7 h-7 text-primary" aria-hidden="true" />
            </div>
            <div className="flex flex-wrap gap-3">
              {route.map((destination) => (
                <Link
                  key={destination.id}
                  href={`/destinations/${destination.id}`}
                  className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  {destination.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
