/** Canonical semantic graph for the Morocco travel information architecture. */
export const siteGraph = {
  home: '/',
  hubs: {
    tours: '/tours',
    dayTrips: '/day-trips',
    destinations: '/destinations',
    experiences: '/experiences',
    guides: '/blog',
    faq: '/faq',
    about: '/about',
    contact: '/contact',
  },
  cityTourHubs: {
    marrakech: '/tours/from-marrakech',
    fes: '/tours/from-fes',
    agadir: '/tours/from-agadir',
    casablanca: '/tours/from-casablanca',
  },
  durationHubs: {
    marrakech3: '/tours/from-marrakech/3-days',
  },
  coreDestinations: [
    '/destinations/marrakech', '/destinations/fes', '/destinations/merzouga',
    '/destinations/erg-chebbi', '/destinations/agadir', '/destinations/casablanca',
    '/destinations/chefchaouen', '/destinations/ait-ben-haddou', '/destinations/ouarzazate',
    '/destinations/dades-valley', '/destinations/todra-gorge', '/destinations/atlas-mountains',
    '/destinations/essaouira', '/destinations/ouirgane',
  ],
} as const;

export type SiteGraph = typeof siteGraph;
