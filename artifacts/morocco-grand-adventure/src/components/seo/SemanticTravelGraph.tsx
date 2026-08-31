import { siteGraph } from '../../data/seo-site-graph';

/** Visible contextual navigation + machine-readable relationships. */
export function SemanticTravelGraph({ locale = 'en' }: { locale?: string }) {
  const label = locale === 'fr' ? 'Explorer le Maroc' : locale === 'es' ? 'Explorar Marruecos' : locale === 'it' ? 'Esplora il Marocco' : locale === 'de' ? 'Marokko entdecken' : locale === 'ar' ? 'اكتشف المغرب' : 'Explore Morocco';
  return <section aria-labelledby="semantic-travel-graph" className="border-y py-10">
    <h2 id="semantic-travel-graph" className="text-2xl font-semibold">{label}</h2>
    <nav aria-label={label} className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {Object.entries(siteGraph.cityTourHubs).map(([city, href]) => <a key={city} href={href} className="rounded-lg border p-4 hover:underline">{city.charAt(0).toUpperCase() + city.slice(1)} tours</a>)}
      {siteGraph.coreDestinations.slice(0, 6).map(href => <a key={href} href={href} className="rounded-lg border p-4 hover:underline">{href.split('/').pop()?.replaceAll('-', ' ')}</a>)}
    </nav>
  </section>;
}
