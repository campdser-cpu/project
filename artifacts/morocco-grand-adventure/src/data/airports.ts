// Verified directory of Moroccan airports and a small set of verified
// domestic-route facts, used by the /flights page (src/pages/flights.tsx)
// and its prerendered counterpart (scripts/prerender.ts).
//
// What "verified" means here: IATA codes, airport names/cities and the
// route facts below were checked against public reporting (Royal Air
// Maroc's own route-query pages, and Morocco World News / Barlamantoday
// coverage of RAM's October 2025 domestic network expansion) on
// 2026-10-28. These are network/reporting facts, NOT a live schedule or
// fare feed — there is no live API behind this file. Route status can
// change; always say so in the UI rather than imply a guaranteed flight.
//
// Deliberately NOT included: fabricated flight numbers, times, fares, or
// seat availability. None of that exists in this file on purpose.

export type AirportStatus =
  /** Major international + domestic hub with frequent scheduled service. */
  | 'international-hub'
  /** Scheduled domestic service confirmed (frequency varies by route). */
  | 'domestic-scheduled'
  /** Served by Royal Air Maroc Express / regional routes, lower frequency. */
  | 'domestic-limited';

export type Airport = {
  iata: string;
  name: string;
  city: string;
  region: string;
  status: AirportStatus;
  /** One-line, verifiable statement of what this airport is for travelers. */
  summary: string;
  /** Which parts of Morocco this airport realistically puts within reach. */
  reaches: string;
  /** Matches a CITY_HUBS id (src/data/tour-hierarchy.ts) when this city already has departure tours. */
  cityHubId?: string;
};

export const AIRPORTS: Airport[] = [
  {
    iata: 'RAK',
    name: 'Marrakech Menara Airport',
    city: 'Marrakech',
    region: 'Marrakech-Safi',
    status: 'international-hub',
    summary: 'Morocco’s busiest tourist gateway, a short drive from the medina.',
    reaches: 'Marrakech itself, the High Atlas, and the classic southern road to Aït Ben Haddou and the Sahara at Merzouga.',
    cityHubId: 'marrakech',
  },
  {
    iata: 'CMN',
    name: 'Casablanca Mohammed V International Airport',
    city: 'Casablanca',
    region: 'Casablanca-Settat',
    status: 'international-hub',
    summary: 'Morocco’s largest airport and Royal Air Maroc’s main hub, with the country’s busiest domestic connections.',
    reaches: 'Casablanca, and onward domestic connections to most other Moroccan airports on this list.',
    cityHubId: 'casablanca',
  },
  {
    iata: 'FEZ',
    name: 'Fès–Saïss Airport',
    city: 'Fes',
    region: 'Fès-Meknès',
    status: 'international-hub',
    summary: 'The main gateway to Morocco’s imperial north.',
    reaches: 'Fes, the Middle Atlas, and a more direct northern road to the Sahara than the Marrakech crossing.',
    cityHubId: 'fes',
  },
  {
    iata: 'AGA',
    name: 'Agadir Al Massira Airport',
    city: 'Agadir',
    region: 'Souss-Massa',
    status: 'international-hub',
    summary: 'The main airport for Morocco’s Atlantic coast and surf region.',
    reaches: 'Agadir, Taghazout and Essaouira along the coast, with a road connection toward Marrakech and the south.',
    cityHubId: 'agadir',
  },
  {
    iata: 'TNG',
    name: 'Tangier Ibn Battouta Airport',
    city: 'Tangier',
    region: 'Tanger-Tétouan-Al Hoceïma',
    status: 'international-hub',
    summary: 'The gateway to northern Morocco, also reachable by ferry from Spain.',
    reaches: 'Tangier, Chefchaouen, Tétouan and the Rif Mountains.',
    cityHubId: 'tangier',
  },
  {
    iata: 'RBA',
    name: 'Rabat–Salé Airport',
    city: 'Rabat',
    region: 'Rabat-Salé-Kénitra',
    status: 'domestic-scheduled',
    summary: 'Morocco’s capital-city airport, mainly used alongside Casablanca for the imperial-cities loop.',
    reaches: 'Rabat and Salé, with the imperial cities (Meknès, Fes) within easy road reach.',
  },
  {
    iata: 'OZZ',
    name: 'Ouarzazate Airport',
    city: 'Ouarzazate',
    region: 'Drâa-Tafilalet',
    status: 'domestic-limited',
    summary: 'A small southern airport; historically served by Royal Air Maroc Express to Casablanca and Zagora. Royal Air Maroc’s own route page showed real, bookable fares for some dates and no results for others — availability looks date-dependent rather than a standing daily schedule, so check specific dates directly.',
    reaches: 'Ouarzazate, the Atlas Film Studios and Aït Ben Haddou — most travelers reach this area by road from Marrakech rather than by air.',
    cityHubId: 'ouarzazate',
  },
  {
    iata: 'ERH',
    name: 'Errachidia – Moulay Ali Cherif Airport',
    city: 'Errachidia',
    region: 'Drâa-Tafilalet',
    status: 'domestic-limited',
    summary: 'A small regional airport close to the Sahara; Royal Air Maroc’s own route-query pages showed no bookable flights to/from Casablanca across the months we checked.',
    reaches: 'Errachidia and the Tafilalet oases, one of the closer towns to the Erg Chebbi dunes — most travelers reach the desert by private road transfer instead.',
    cityHubId: 'errachidia',
  },
  {
    iata: 'ESU',
    name: 'Essaouira–Mogador Airport',
    city: 'Essaouira',
    region: 'Marrakech-Safi',
    status: 'domestic-limited',
    summary: 'A small coastal airport for the walled port city of Essaouira.',
    reaches: 'Essaouira itself; most visitors arrive overland from Marrakech or Agadir instead.',
  },
  {
    iata: 'NDR',
    name: 'Nador International Airport',
    city: 'Nador',
    region: 'Oriental',
    status: 'domestic-scheduled',
    summary: 'Serves Morocco’s eastern Mediterranean coast.',
    reaches: 'Nador and the Rif’s eastern coastline.',
  },
  {
    iata: 'OUD',
    name: 'Oujda Angads Airport',
    city: 'Oujda',
    region: 'Oriental',
    status: 'domestic-scheduled',
    summary: 'The main airport for Morocco’s eastern region, near the Algerian border.',
    reaches: 'Oujda and eastern Morocco.',
  },
  {
    iata: 'TTU',
    name: 'Tétouan Sania Ramel Airport',
    city: 'Tétouan',
    region: 'Tanger-Tétouan-Al Hoceïma',
    status: 'domestic-scheduled',
    summary: 'A northern airport near Tétouan, with Royal Air Maroc reportedly adding weekly domestic frequencies in 2025 alongside its existing Casablanca service.',
    reaches: 'Tétouan and the northern Mediterranean coast.',
  },
  {
    iata: 'VIL',
    name: 'Dakhla Airport',
    city: 'Dakhla',
    region: 'Dakhla-Oued Ed-Dahab',
    status: 'domestic-scheduled',
    summary: 'The main airport for Dakhla, in Morocco’s far south; reported new Marrakech–Dakhla service launched in 2025.',
    reaches: 'Dakhla and the southern Atlantic coast — well outside the areas our tours currently operate in.',
  },
  {
    iata: 'EUN',
    name: 'Hassan I Airport (Laâyoune)',
    city: 'Laâyoune',
    region: 'Laâyoune-Sakia El Hamra',
    status: 'domestic-scheduled',
    summary: 'The main airport for Laâyoune; reported new Marrakech–Laâyoune and Rabat–Laâyoune services launched in 2025.',
    reaches: 'Laâyoune and the southern provinces — well outside the areas our tours currently operate in.',
  },
];

export function airportByIata(iata: string): Airport | undefined {
  return AIRPORTS.find((a) => a.iata === iata.toUpperCase());
}

/**
 * Resolve free-typed text ("Marrakech", "RAK", "Marrakech (RAK)") to a
 * verified airport, or undefined. Shared by the search form (to look up the
 * route-status panel) and the Royal Air Maroc link builder (so a value the
 * UI's own datalist suggested, like "Marrakech (RAK)", resolves to the plain
 * city name "Marrakech" before it reaches a URL slug) — one resolver, not
 * two copies that could drift apart.
 */
export function resolveAirport(input: string): Airport | undefined {
  const v = input.trim().toLowerCase();
  if (!v) return undefined;
  const codeMatch = v.match(/\(([a-z]{3})\)\s*$/) ?? (v.length === 3 ? [null, v] : null);
  if (codeMatch) {
    const byCode = airportByIata(codeMatch[1]!);
    if (byCode) return byCode;
  }
  return AIRPORTS.find((a) => a.city.toLowerCase() === v || a.name.toLowerCase() === v);
}

export type RouteStatus = 'reported-scheduled' | 'limited-or-seasonal' | 'no-confirmed-service';

export type DomesticRouteFact = {
  from: string; // IATA
  to: string; // IATA
  status: RouteStatus;
  note: string;
};

/**
 * A small, deliberately non-exhaustive set of verified domestic-route facts
 * (checked 2026-10-28 against Royal Air Maroc's own route pages and recent
 * network-expansion reporting) — not a schedule feed. Every pair not listed
 * here simply has no verified claim one way or the other in this file; the
 * UI must say that plainly rather than silently guessing.
 */
export const DOMESTIC_ROUTE_FACTS: DomesticRouteFact[] = [
  { from: 'CMN', to: 'RAK', status: 'reported-scheduled', note: 'Casablanca–Marrakech is reported as one of Royal Air Maroc’s two busiest domestic routes.' },
  { from: 'CMN', to: 'AGA', status: 'reported-scheduled', note: 'Casablanca–Agadir is reported as one of Royal Air Maroc’s two busiest domestic routes.' },
  { from: 'RAK', to: 'EUN', status: 'limited-or-seasonal', note: 'Reported as a new route launched in 2025, operating twice weekly (Wednesdays and Fridays).' },
  { from: 'RAK', to: 'VIL', status: 'limited-or-seasonal', note: 'Reported as operating twice weekly (Mondays and Thursdays).' },
  { from: 'RBA', to: 'EUN', status: 'limited-or-seasonal', note: 'Reported as operating three times weekly (Wednesdays, Fridays and Sundays).' },
  { from: 'CMN', to: 'TTU', status: 'limited-or-seasonal', note: 'Reported base service on Fridays and Sundays, with additional weekly frequencies added in 2025.' },
  { from: 'CMN', to: 'OZZ', status: 'limited-or-seasonal', note: 'Royal Air Maroc’s own route page showed real, bookable fares for some dates and no results for other months — availability looks date-dependent, not a standing daily schedule. Check your specific dates directly.' },
  { from: 'CMN', to: 'ERH', status: 'no-confirmed-service', note: 'Royal Air Maroc’s own route-query page showed no bookable flights across the months we checked.' },
  { from: 'RAK', to: 'OZZ', status: 'no-confirmed-service', note: 'No verified scheduled air route between these two cities — this is normally a 3–4 hour private road transfer.' },
  { from: 'RAK', to: 'ERH', status: 'no-confirmed-service', note: 'No verified scheduled air route between these two cities — this is normally covered as part of a multi-day Sahara road itinerary.' },
  { from: 'RAK', to: 'FEZ', status: 'no-confirmed-service', note: 'Morocco’s domestic network is built around the Casablanca hub, not direct links between Marrakech and Fes — most travelers fly via Casablanca or travel overland.' },
  { from: 'RAK', to: 'TNG', status: 'no-confirmed-service', note: 'No verified direct route — check Royal Air Maroc for current connections via Casablanca.' },
];

export function findRouteFact(fromIata: string, toIata: string): DomesticRouteFact | undefined {
  const a = fromIata.toUpperCase();
  const b = toIata.toUpperCase();
  return DOMESTIC_ROUTE_FACTS.find((r) => (r.from === a && r.to === b) || (r.from === b && r.to === a));
}
