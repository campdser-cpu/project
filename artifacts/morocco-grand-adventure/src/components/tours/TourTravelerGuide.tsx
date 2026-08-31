import { Link } from 'wouter';
import { BookOpen, Clock3, MapPin, SunMedium } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Tour, Destination } from '@/data/content';

type Props = {
  tour: Tour;
  routeStops: Destination[];
};

/**
 * A compact editorial layer shared by every commercial tour page. It is
 * intentionally data-driven: itinerary, route and destination facts come from
 * the canonical tour data so this component cannot invent hotels, prices or
 * inclusions.
 */
export function TourTravelerGuide({ tour, routeStops }: Props) {
  const { t } = useLanguage();
  const days = Number.parseInt(tour.duration, 10) || 0;
  const isThreeDay = days === 3;
  const isDesert = tour.routeIds?.some((id) => ['merzouga', 'erg-chebbi', 'zagora', 'draa-valley'].includes(id));
  const route = routeStops.slice(0, 7);

  const planningText = isThreeDay
    ? `Three days is a compact overland format. The itinerary is designed to reach the main route highlights without hiding the amount of road travel involved. If you prefer slower mornings, longer walks or an extra night in the desert, a longer itinerary is the better fit.`
    : `This ${tour.duration.toLowerCase()} itinerary is built around the route shown below. Travel days can include substantial driving between regions, so the day-by-day plan is the best guide to the pace of the experience.`;

  return (
    <section className="py-16 md:py-20 bg-background border-y border-border" aria-labelledby="traveler-guide-heading">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary mb-3">{t('tour_private')}</p>
          <h2 id="traveler-guide-heading" className="font-serif text-3xl md:text-4xl text-foreground mb-4">
            {t('dest_travel_info')}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">{planningText}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          <div className="rounded-2xl border border-border bg-card p-6">
            <Clock3 className="w-6 h-6 text-primary mb-4" aria-hidden="true" />
            <h3 className="font-semibold text-foreground mb-2">{t('tour_itinerary')}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {tour.itineraryDays?.length
                ? `${tour.itineraryDays.length} planned travel days with named stops and practical route context.`
                : 'The route is confirmed with you before booking; no unverified day-by-day details are presented.'}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <MapPin className="w-6 h-6 text-primary mb-4" aria-hidden="true" />
            <h3 className="font-semibold text-foreground mb-2">{t('dest_view_map')}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {route.length > 0 ? route.map((d) => d.name).join(' → ') : tour.routeCaption ?? 'Route details are confirmed before travel.'}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <SunMedium className="w-6 h-6 text-primary mb-4" aria-hidden="true" />
            <h3 className="font-semibold text-foreground mb-2">{t('dest_climate')}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {isDesert
                ? 'For Sahara routes, pack sun protection and layers: desert days can be hot while nights can feel much cooler.'
                : 'Morocco spans coast, mountains and inland regions, so conditions can change noticeably along a multi-region route.'}
            </p>
          </div>
        </div>

        {route.length > 0 && (
          <div>
            <div className="flex items-end justify-between gap-4 mb-6">
              <div>
                <h3 className="font-serif text-2xl md:text-3xl text-foreground">{t('tour_related')}</h3>
                <p className="text-sm text-muted-foreground mt-1">Explore the places connected to this itinerary.</p>
              </div>
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
