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
  '3-day-sahara-fes': 'fes',
  '3-day-sahara-agadir': 'agadir',
  '5-day-imperial-cities': 'marrakech',
  '7-day-imperial-cities-sahara-escape': 'marrakech',
  'honeymoon-morocco': 'marrakech',
  '8-day-marrakech-essaouira-agadir-sahara': 'marrakech',
  'family-morocco-adventure': 'marrakech',
};

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
    heroImage: '/images/dest/casablanca.webp',
    heroAlt: 'The Hassan II Mosque on the Atlantic coast of Casablanca, Morocco',
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
    heroImage: '/images/dest/fes.webp',
    heroAlt: 'The medieval medina of Fes, Morocco',
    title: 'Tours from Fes',
    intro:
      'Fes is Morocco’s cultural and spiritual heart, and an ideal base for the northern imperial cities, the cedar forests of the Middle Atlas and the Sahara road to Merzouga.',
    body:
      'Home to the world’s oldest university and one of the largest living medieval medinas on Earth, Fes rewards at least a couple of days. From here you can visit Meknès, the Roman ruins of Volubilis and the blue city of Chefchaouen — or head south through the Ziz Valley to the dunes of Erg Chebbi. We’ll build a private Fes itinerary around you, pairing guided medina walks with comfortable, well-paced driving days. A three-day Fes-to-Sahara route is available as a quote-only private itinerary; its final accommodation, inclusions and onward finish are confirmed before payment rather than assumed.',
    destinationIds: ['fes', 'meknes', 'chefchaouen', 'ifrane', 'merzouga', 'erg-chebbi'],
    hasDurationDrive: true,
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
      'With one of the sunniest climates in Morocco, Agadir pairs a long, sandy bay with easy access to the laid-back surf town of Taghazout and the walled souks of Taroudant. Heading inland, the road climbs through southern Morocco toward Ouarzazate, the Dades and Todra gorges and the Erg Chebbi dunes. A three-day Agadir-to-Sahara route is available as a quote-only private itinerary; the exact road stops, accommodation, inclusions and final destination are confirmed around your dates.',
    destinationIds: ['agadir', 'taghazout', 'essaouira', 'marrakech', 'ait-ben-haddou', 'merzouga'],
    hasDurationDrive: true,
  },
];

export function getCityHub(slug: string): CityHub | undefined {
  return CITY_HUBS.find((h) => h.slug === slug);
}