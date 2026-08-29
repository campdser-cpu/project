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

const HUB_DESTINATION_IDS = [
  'marrakech',
  'fes',
  'ait-ben-haddou',
  'dades-valley',
  'merzouga',
  'erg-chebbi',
];

const HUB_TOUR_IDS = [
  '3-day-sahara-marrakech',
  '5-day-imperial-cities',
  '7-day-imperial-cities-sahara-escape',
];

type TopicalLinksProps = {
  destinationId?: string;
  tourId?: string;
  context?: 'destinations-hub' | 'trip-builder';
};

function LinkList({
  items,
  href,
}: {
  items: { id: string; name: string }[];
  href: (id: string) => string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(item => (
        <Link
          key={item.id}
          href={href(item.id)}
          className="rounded-full border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}

function SectionShell({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <section className="border-t border-border bg-muted/40 py-12" aria-label={label}>
      <div className="container mx-auto px-4 max-w-6xl">{children}</div>
    </section>
  );
}

export function TopicalLinks({ destinationId, tourId, context }: TopicalLinksProps) {
  const { lang, t } = useLanguage();
  const destinations = getLocalizedDestinations(lang);
  const tours = getLocalizedTours(lang);

  if (context === 'destinations-hub') {
    const hubDestinations = HUB_DESTINATION_IDS
      .map(id => destinations.find(destination => destination.id === id))
      .filter(Boolean) as { id: string; name: string }[];
    const hubTours = HUB_TOUR_IDS
      .map(id => tours.find(tour => tour.id === id))
      .filter(Boolean) as { id: string; name: string }[];

    return (
      <SectionShell label={t('nav_destinations')}>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl text-foreground mb-4">{t('nav_destinations')}</h2>
            <LinkList items={hubDestinations} href={id => `/destinations/${id}`} />
          </div>
          <div>
            <h2 className="font-serif text-2xl text-foreground mb-4">{t('nav_tours')}</h2>
            <LinkList items={hubTours} href={id => `/tours/${id}`} />
          </div>
        </div>
      </SectionShell>
    );
  }

  if (context === 'trip-builder') {
    const plannerTours = HUB_TOUR_IDS
      .map(id => tours.find(tour => tour.id === id))
      .filter(Boolean) as { id: string; name: string }[];
    const plannerDestinations = HUB_DESTINATION_IDS.slice(0, 4)
      .map(id => destinations.find(destination => destination.id === id))
      .filter(Boolean) as { id: string; name: string }[];

    return (
      <SectionShell label={`${t('nav_tours')} ${t('nav_destinations')}`}>
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-3">{t('section_planner')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t('section_planner_sub')}</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-4">{t('nav_tours')}</h3>
            <LinkList items={plannerTours} href={id => `/tours/${id}`} />
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-4">{t('nav_destinations')}</h3>
            <LinkList items={plannerDestinations} href={id => `/destinations/${id}`} />
          </div>
        </div>
      </SectionShell>
    );
  }

  if (destinationId) {
    const relatedDestinations = (RELATED_DESTINATION_IDS[destinationId] ?? [])
      .map(id => destinations.find(destination => destination.id === id))
      .filter(Boolean);
    const relatedTours = tours
      .filter(tour => tour.routeIds?.includes(destinationId))
      .slice(0, 3);

    if (relatedDestinations.length === 0 && relatedTours.length === 0) return null;

    return (
      <SectionShell label={t('dest_nearby')}>
        <div className="grid gap-8 md:grid-cols-2">
          {relatedDestinations.length > 0 && (
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">{t('dest_nearby')}</h2>
              <LinkList items={relatedDestinations as { id: string; name: string }[]} href={id => `/destinations/${id}`} />
            </div>
          )}
          {relatedTours.length > 0 && (
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">{t('dest_tours')} {destinations.find(d => d.id === destinationId)?.name}</h2>
              <LinkList items={relatedTours as { id: string; name: string }[]} href={id => `/tours/${id}`} />
            </div>
          )}
        </div>
      </SectionShell>
    );
  }

  if (tourId) {
    const tour = tours.find(item => item.id === tourId);
    if (!tour) return null;

    const routeDestinations = (tour.routeIds ?? [])
      .map(id => destinations.find(destination => destination.id === id))
      .filter(Boolean) as { id: string; name: string }[];
    const priorityIds = ['marrakech', 'ourika-valley', 'ait-ben-haddou', 'dades-valley', 'merzouga', 'erg-chebbi', 'fes'];
    const priorityStops = priorityIds
      .map(id => routeDestinations.find(destination => destination.id === id))
      .filter(Boolean) as { id: string; name: string }[];
    const routeStops = [...priorityStops, ...routeDestinations]
      .filter((destination, index, items) => items.findIndex(item => item.id === destination.id) === index)
      .slice(0, 7);
    const routeIdSet = new Set(tour.routeIds ?? []);
    const relatedTours = tours
      .filter(item => item.id !== tour.id)
      .map(item => ({ tour: item, overlap: (item.routeIds ?? []).filter(id => routeIdSet.has(id)).length }))
      .filter(item => item.overlap > 0)
      .sort((a, b) => b.overlap - a.overlap)
      .slice(0, 2)
      .map(item => item.tour) as { id: string; name: string }[];

    if (routeStops.length === 0 && relatedTours.length === 0) return null;

    return (
      <SectionShell label={t('td_your_route')}>
        <div className="grid gap-8 md:grid-cols-2">
          {routeStops.length > 0 && (
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">{t('td_your_route')}</h2>
              <LinkList items={routeStops} href={id => `/destinations/${id}`} />
            </div>
          )}
          {relatedTours.length > 0 && (
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">{t('tour_related')}</h2>
              <LinkList items={relatedTours} href={id => `/tours/${id}`} />
            </div>
          )}
        </div>
      </SectionShell>
    );
  }

  return null;
}
