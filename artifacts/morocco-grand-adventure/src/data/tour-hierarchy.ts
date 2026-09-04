// ─────────────────────────────────────────────────────────────────────────────
// Tours Information Architecture
// ─────────────────────────────────────────────────────────────────────────────
// Defines the Tours tree (Cities → Durations → Tours) that the /tours hub,
// city hubs and duration hubs render from.
//
// Every tour below is the canonical tour already shipped in src/data/content.ts
// — nothing here invents a price, hotel, pickup time, or itinerary. The
// departure-city assignment is derived from each tour's real name, description
// and day-one itinerary (all start in the city listed).
//
// City hubs that currently have no canned tours (Casablanca, Fes, Agadir) still
// carry genuinely useful, codebase-grounded destination content and direct
// travellers to the private trip-builder / contact flow rather than fabricating
// itineraries that are not supported by the shipped data.
// ─────────────────────────────────────────────────────────────────────────────

export type DepartureCity = 'marrakech' | 'casablanca' | 'fes' | 'agadir';

export const DEPARTURE_CITIES: DepartureCity[] = [
  'marrakech',
  'casablanca',
  'fes',
  'agadir',
];

/**
 * Canonical tour id → departure city.
 * Grounded in tour name / description / day-one itinerary in content.ts.
 */
export const TOUR_DEPARTURE_CITY: Record<string, DepartureCity> = {
  '3-day-sahara-marrakech': 'marrakech',
  '5-day-imperial-cities': 'marrakech',
  '7-day-imperial-cities-sahara-escape': 'marrakech',
  'honeymoon-morocco': 'marrakech',
  '8-day-marrakech-essaouira-agadir-sahara': 'marrakech',
  '2-day-zagora-desert-marrakech': 'marrakech',
  '4-day-marrakech-merzouga-sahara': 'marrakech',
  '5-day-great-south-morocco': 'marrakech',
  '3-day-fes-merzouga-sahara': 'fes',
  '4-day-fes-marrakech-via-merzouga': 'fes',
  'marrakech-4-day': 'marrakech',
  'casablanca-3-day': 'casablanca',
  'casablanca-4-day': 'casablanca',
  'casablanca-5-day': 'casablanca',
  'casablanca-8-day': 'casablanca',
  'fes-4-day': 'fes',
  'fes-5-day': 'fes',
  'fes-8-day': 'fes',
  'agadir-4-day': 'agadir',
  'agadir-5-day': 'agadir',
  'agadir-8-day': 'agadir',  '3-day-sahara-fes': 'fes',
  '3-day-sahara-agadir': 'agadir',
};

// MGA_THREE_DAY_HIERARCHY_V1

/** Extract the leading number of days from a duration string like "3 Days / 2 Nights". */
export function tourDurationDays(duration: string): number {
  const match = duration.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

/** Returns the canonical tour ids that depart from a given city (may be empty). */
export function tourIdsForCity(city: DepartureCity): string[] {
  return Object.entries(TOUR_DEPARTURE_CITY)
    .filter(([, c]) => c === city)
    .map(([id]) => id);
}

/** Human label for a duration bucket used to group tours on the hub pages. */
export function durationLabel(days: number): string {
  if (days <= 2) return 'Day Trips & Short Escapes';
  if (days === 3) return '3-Day Tours';
  if (days === 4) return '4-Day Tours';
  if (days <= 6) return '5–6 Day Tours';
  if (days <= 8) return '7–8 Day Tours';
  return '9+ Day Tours';
}

export type CityHub = {
  id: DepartureCity;
  /** URL segment: /tours/from-<slug> */
  slug: string;
  name: string;
  heroImage: string;
  heroAlt: string;
  title: string;
  intro: string;
  body: string;
  /** Candidate destination ids linked as "related destinations". Missing ones are skipped. */
  destinationIds: string[];
  /** Whether a dedicated /tours/from-<slug>/<duration> hub has enough content to exist. */
  hasDurationDrive: boolean;
};

export const CITY_HUBS: CityHub[] = [
  {
    id: 'marrakech',
    slug: 'marrakech',
    name: 'Marrakech',
    heroImage: '/images/dest/marrakech.webp',
    heroAlt: 'The ochre walls and souks of Marrakech, Morocco',
    title: 'Tours from Marrakech',
    intro:
      'Marrakech is the natural starting point for most private Morocco itineraries — the Red City has an international airport, a treasure of palace and souk experiences, and sits just a few hours from the High Atlas and the Sahara.',
    body:
      'From Marrakech you can cross the Tizi n’Tichka Pass over the High Atlas on the way to the UNESCO kasbah of Aït Ben Haddou, wind through the Dades Valley and Todra Gorge, then ride a camel across the golden dunes of Erg Chebbi at sunset. Our private tours from Marrakech range from a compact 3-day Sahara loop to grand multi-city journeys that take in Fes, Chefchaouen and the Atlantic coast — all with your own English-speaking driver, handpicked riads and hotels, and a night in a luxury desert camp.',
    destinationIds: ['marrakech', 'ait-ben-haddou', 'dades-valley', 'todra-gorge', 'merzouga', 'erg-chebbi'],
    hasDurationDrive: true,
  },
  {
    id: 'casablanca',
    slug: 'casablanca',
    name: 'Casablanca',
    heroImage: '/images/curated/hassan-ii-mosque-minaret-casablanca.webp',
    heroAlt: 'The minaret of the Hassan II Mosque rising above Casablanca, Morocco',
    title: 'Tours from Casablanca',
    intro:
      'Casablanca is Morocco’s economic capital and a busy international arrival point — a fast, direct gateway that connects you to Marrakech, Rabat, Fes and the Sahara without doubling back.',
    body:
      'Most visitors fly into Casablanca and continue south or north from here. The city itself rewards a short stay with the breathtaking Hassan II Mosque on the Atlantic and elegant art-deco streets. From Casablanca we can build a private route through the imperial cities, across the High Atlas to Aït Ben Haddou and the Dades Valley, and out to the Erg Chebbi dunes — or head north to the blue walls of Chefchaouen. Because every journey is private, we simply plan the route and pace around your arrival time and dates.',
    destinationIds: ['casablanca', 'marrakech', 'rabat', 'fes', 'chefchaouen', 'merzouga'],
    hasDurationDrive: false,
  },
  {
    id: 'fes',
    slug: 'fes',
    name: 'Fes',
    heroImage: '/images/curated/leather-tanning-vats-fes-medina.webp',
    heroAlt: 'Traditional leather tanning vats in the Fes medina, Morocco',
    title: 'Tours from Fes',
    intro:
      'Fes is Morocco’s cultural and spiritual heart, and an ideal base for the northern imperial cities, the cedar forests of the Middle Atlas and the Sahara road to Merzouga.',
    body:
      'Home to the world’s oldest university and one of the largest living medieval medinas on Earth, Fes rewards at least a couple of days. From here you can visit Meknès, the Roman ruins of Volubilis and the blue city of Chefchaouen — or head south through the Ziz Valley to the dunes of Erg Chebbi. We’ll build a private Fes itinerary around you, pairing guided medina walks with comfortable, well-paced driving days.',
    destinationIds: ['fes', 'meknes', 'chefchaouen', 'ifrane', 'merzouga', 'erg-chebbi'],
    hasDurationDrive: false,
  },
  {
    id: 'agadir',
    slug: 'agadir',
    name: 'Agadir',
    heroImage: '/images/dest/agadir.webp',
    heroAlt: 'The beach and promenade of Agadir, on Morocco’s Atlantic coast',
    title: 'Tours from Agadir',
    intro:
      'Agadir is Morocco’s year-round beach resort on the Atlantic — a great place to unwind at the end of a journey or to start a route north via Essaouira and Marrakech or east toward the Sahara.',
    body:
      'With one of the sunniest climates in Morocco, Agadir pairs a long, sandy bay with easy access to the laid-back surf town of Taghazout and the walled souks of Taroudant. Heading inland, the road climbs through the Saffron Valley to Ouarzazate, the Dades and Todra gorges and the Erg Chebbi dunes. We can start a private itinerary in Agadir and shape the rest around how many days you have and where you want to finish.',
    destinationIds: ['agadir', 'taghazout', 'essaouira', 'marrakech', 'ait-ben-haddou', 'merzouga'],
    hasDurationDrive: false,
  },
];

export function getCityHub(slug: string): CityHub | undefined {
  return CITY_HUBS.find((h) => h.slug === slug);
}

// ─────────────────────────────────────────────────────────────────────────────
// Duration hubs available per departure city — the single source of truth for
// the /tours/from-<city>/<N>-days routes (prerenderer + runtime + sitemap all
// derive from this, so a duration page can never "go missing" from the site).
//
// A duration in a city's list means the route HAS an intentional destination:
//   • if the city has a canned tour of that length it lists the real tour;
//   • otherwise the page honestly states no fixed itinerary is published and
//     funnels the traveller to the private trip-builder/quote flow — it never
//     invents a tour the business does not ship (see DURATION_HUB_* copy).
// ─────────────────────────────────────────────────────────────────────────────
// MGA_MISSING_TOURS_V1

export const CITY_HUB_DURATIONS: Record<DepartureCity, number[]> = {
  marrakech: [3, 4, 5, 6, 7, 8, 9, 10],
  casablanca: [3, 4, 5, 6, 7, 8],
  fes: [3, 4, 5, 6, 7, 8],
  agadir: [3, 4, 5, 6, 7, 8],
};

/** Canonical URL path for a city+duration hub, e.g. /tours/from-marrakech/3-days. */
export function durationHubPath(city: DepartureCity, days: number): string {
  const hub = getCityHub(city);
  const slug = hub?.slug ?? city;
  return `/tours/from-${slug}/${days}-days`;
}

/** All canonical duration-hub paths for a departure city. */
export function durationHubPaths(city: DepartureCity): string[] {
  return (CITY_HUB_DURATIONS[city] ?? []).map((days) => durationHubPath(city, days));
}