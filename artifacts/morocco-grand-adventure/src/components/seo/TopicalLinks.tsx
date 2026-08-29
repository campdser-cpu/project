import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedDestinations, getLocalizedTours } from '@/i18n/content';

const DESTINATION_IDS = ['marrakech', 'fes', 'ait-ben-haddou', 'dades-valley', 'merzouga', 'erg-chebbi'];
const TOUR_IDS = ['3-day-sahara-marrakech', '5-day-imperial-cities', '7-day-imperial-cities-sahara-escape'];

export function TopicalLinks() {
  const { lang } = useLanguage();
  const destinations = getLocalizedDestinations(lang);
  const tours = getLocalizedTours(lang);
  const destinationLinks = DESTINATION_IDS.map(id => destinations.find(d => d.id === id)).filter(Boolean);
  const tourLinks = TOUR_IDS.map(id => tours.find(t => t.id === id)).filter(Boolean);

  return (
    <section className="border-t border-border bg-muted/40 py-10" aria-label="Explore Morocco routes">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl text-foreground mb-3">Explore Morocco by route</h2>
            <p className="text-sm text-muted-foreground mb-4">Connect Morocco's imperial cities and southern highlights on the routes already covered by our itineraries.</p>
            <div className="flex flex-wrap gap-2">
              {destinationLinks.map((destination) => destination && (
                <Link key={destination.id} href={`/destinations/${destination.id}`} className="rounded-full border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors">
                  {destination.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-foreground mb-3">Private Morocco tours</h2>
            <p className="text-sm text-muted-foreground mb-4">Compare the existing Sahara and Imperial Cities itineraries before planning your trip.</p>
            <div className="flex flex-wrap gap-2">
              {tourLinks.map((tour) => tour && (
                <Link key={tour.id} href={`/tours/${tour.id}`} className="rounded-full border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors">
                  {tour.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
