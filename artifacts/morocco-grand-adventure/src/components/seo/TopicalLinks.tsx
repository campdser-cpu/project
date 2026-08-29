import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedDestinations, getLocalizedTours } from '@/i18n/content';

const RELATED_DESTINATION_IDS: Record<string, string[]> = {
  marrakech: ['ourika-valley', 'ait-ben-haddou', 'dades-valley'],
  fes: ['chefchaouen', 'ifrane', 'marrakech'],
  'ait-ben-haddou': ['marrakech', 'dades-valley', 'merzouga'],
  'dades-valley': ['ait-ben-haddou', 'todra-gorge', 'merzouga'],
  merzouga: ['erg-chebbi', 'dades-valley', 'todra-gorge'],
  'erg-chebbi': ['merzouga', 'dades-valley', 'ait-ben-haddou'],
};

type TopicalLinksProps = {
  destinationId?: string;
  tourId?: string;
};

export function TopicalLinks({ destinationId, tourId }: TopicalLinksProps) {
  const { lang, t } = useLanguage();
  const destinations = getLocalizedDestinations(lang);
  const tours = getLocalizedTours(lang);

  if (destinationId) {
    const relatedDestinations = (RELATED_DESTINATION_IDS[destinationId] ?? [])
      .map(id => destinations.find(destination => destination.id === id))
      .filter(Boolean);
    const relatedTours = tours
      .filter(tour => tour.id !== tourId && tour.routeIds?.includes(destinationId))
      .slice(0, 3);

    if (relatedDestinations.length === 0 && relatedTours.length === 0) return null;

    return (
      <section className="border-t border-border bg-muted/40 py-12" aria-label={t('dest_nearby')}>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2">
            {relatedDestinations.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl text-foreground mb-4">{t('dest_nearby')}</h2>
                <div className="flex flex-wrap gap-2">
                  {relatedDestinations.map(destination => destination && (
                    <Link key={destination.id} href={`/destinations/${destination.id}`} className="rounded-full border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors">
                      {destination.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {relatedTours.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl text-foreground mb-4">{t('dest_tours')} {destinations.find(d => d.id === destinationId)?.name}</h2>
                <div className="flex flex-wrap gap-2">
                  {relatedTours.map(tour => (
                    <Link key={tour.id} href={`/tours/${tour.id}`} className="rounded-full border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors">
                      {tour.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (tourId) {
    const tour = tours.find(item => item.id === tourId);
    if (!tour) return null;

    const routeStops = (tour.routeIds ?? [])
      .map(id => destinations.find(destination => destination.id === id))
      .filter(Boolean)
      .slice(0, 6);
    const routeIdSet = new Set(tour.routeIds ?? []);
    const relatedTours = tours
      .filter(item => item.id !== tour.id)
      .map(item => ({
        tour: item,
        overlap: (item.routeIds ?? []).filter(id => routeIdSet.has(id)).length,
      }))
      .filter(item => item.overlap > 0)
      .sort((a, b) => b.overlap - a.overlap)
      .slice(0, 2)
      .map(item => item.tour);

    if (routeStops.length === 0 && relatedTours.length === 0) return null;

    return (
      <section className="border-t border-border bg-muted/40 py-12" aria-label={t('td_your_route')}>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2">
            {routeStops.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl text-foreground mb-4">{t('td_your_route')}</h2>
                <div className="flex flex-wrap gap-2">
                  {routeStops.map(destination => destination && (
                    <Link key={destination.id} href={`/destinations/${destination.id}`} className="rounded-full border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors">
                      {destination.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {relatedTours.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl text-foreground mb-4">{t('tour_related')}</h2>
                <div className="flex flex-wrap gap-2">
                  {relatedTours.map(relatedTour => (
                    <Link key={relatedTour.id} href={`/tours/${relatedTour.id}`} className="rounded-full border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors">
                      {relatedTour.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return null;
}
