// Builds external flight-search links only in documented, verified formats.
// No API key, no secret, no server call — these are plain URL builders that
// run entirely in the browser. Verified 2026-10-28:
//   - Google Flights supports a plain-English `q=` query (e.g. "flights from
//     CMN to RAK on 2026-12-10 one way"), confirmed working via a live fetch.
//   - Royal Air Maroc publishes real pages at
//     /en/flights-from-<city>-to-<city> (confirmed working via a live fetch
//     of /en/flights-from-marrakech-to-casablanca).
// Nothing here guesses a URL format we haven't actually checked.

export type TripType = 'one-way' | 'round-trip';

export type FlightSearchParams = {
  origin: string; // free text or an airport city/code the user typed
  destination: string; // free text or an airport city/code the user typed
  departDate: string; // YYYY-MM-DD
  returnDate?: string; // YYYY-MM-DD, round-trip only
  tripType: TripType;
  adults: number;
  children: number;
  /** Omit or 'economy' for no cabin phrase in the query. */
  cabin?: 'economy' | 'premium' | 'business' | 'first';
};

/**
 * Royal Air Maroc's own slug format: lowercase, spaces -> hyphens, diacritics
 * stripped. A trailing "(XXX)" airport-code suffix — e.g. the search form's
 * own datalist suggests "Marrakech (RAK)" — is stripped first: RAM's route
 * pages take a plain city name, and leaving the code in produces a 404 (the
 * exact bug this stripping step exists to prevent).
 */
function ramSlug(value: string): string {
  return value
    .replace(/\s*\([A-Za-z]{3}\)\s*$/, '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

/**
 * A Royal Air Maroc route page, built only when both sides look like a
 * plain city name (no airport code shorthand we'd have to guess at, no
 * empty string). Royal Air Maroc's own pages, not a search result we
 * fabricate — if the slug happens not to resolve, Royal Air Maroc's site
 * handles that with its own "no results" state, not ours.
 */
export function royalAirMarocRouteUrl(originCity: string, destinationCity: string): string | undefined {
  const from = ramSlug(originCity);
  const to = ramSlug(destinationCity);
  if (!from || !to) return undefined;
  return `https://www.royalairmaroc.com/en/flights-from-${from}-to-${to}`;
}

export const ROYAL_AIR_MAROC_HOME = 'https://www.royalairmaroc.com/en';

/** Google Flights' documented natural-language query format. */
export function googleFlightsUrl(params: FlightSearchParams): string {
  const pax = params.adults + params.children;
  const paxPhrase = pax > 1 ? ` for ${pax} people` : '';
  const tripPhrase = params.tripType === 'one-way' ? 'one way' : 'round trip';
  const dateFrom = params.departDate ? ` on ${params.departDate}` : '';
  const dateReturn = params.tripType === 'round-trip' && params.returnDate ? ` returning ${params.returnDate}` : '';
  const cabinPhrase = params.cabin && params.cabin !== 'economy' ? ` in ${params.cabin} class` : '';
  const query = `flights from ${params.origin} to ${params.destination}${dateFrom}${dateReturn}${paxPhrase}${cabinPhrase} ${tripPhrase}`.replace(/\s+/g, ' ').trim();
  const q = encodeURIComponent(query);
  return `https://www.google.com/travel/flights?q=${q}&hl=en&curr=USD`;
}

/** Destination-only query ("flights to Marrakech"), for the airport directory's per-airport link. */
export function googleFlightsToCityUrl(destinationCity: string): string {
  const query = `flights to ${destinationCity}`.trim();
  return `https://www.google.com/travel/flights?q=${encodeURIComponent(query)}&hl=en&curr=USD`;
}
