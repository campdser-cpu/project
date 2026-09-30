// ─────────────────────────────────────────────────────────────────────────────
// Tour Quick Facts — a verified start/end destination for the "at a glance"
// panel on a tour detail page.
//
// Consumed by BOTH the runtime SPA (src/pages/tour-detail.tsx) and the
// prerenderer (scripts/prerender.ts), so crawlable HTML matches client output.
//
// Grounded only in what the tour already publishes:
//   • Start: routeIds[0] — the tour's own curated first stop, already used to
//     place the first marker on the route map.
//   • End: the LAST itinerary day's own `stops` (walked from the end, so a
//     closing entry like "Airport / hotel transfer" doesn't hide a real place
//     named just before it — e.g. "...Marrakech souks", "Airport / hotel
//     transfer") and, only if none of those name a place, the day's own title
//     (covers a day like "Marrakech Guided Tour & Departure" whose stops list
//     only attractions inside the city, never the city name itself).
//   Never the narrative `desc` — free prose there can mention the start city
//   in passing ("...compact overland format from Agadir...") without the trip
//   actually returning there.
//   Every candidate is matched against the site's own destinations, so a
//   genuinely open-ended finish (several quote-only routes end "as agreed in
//   your quote") is left out rather than guessed.
// Nothing here invents a place the tour's own data does not already name.
// ─────────────────────────────────────────────────────────────────────────────
import type { Destination, Tour } from './content';

export type TourStartEnd = {
  startId: string;
  /** Absent when the tour's own last day doesn't name a recognised end place — never guessed. */
  endId?: string;
  isRoundTrip: boolean;
};

function cleanStopLabel(raw: string): string {
  return raw.replace(/^(End|Overnight):\s*/i, '').trim();
}

/** First destination whose name appears in `text` (case-insensitive). */
function matchDestination(text: string, canonicalDestinations: Destination[]): Destination | undefined {
  const lower = text.toLowerCase();
  return canonicalDestinations.find((d) => lower.includes(d.name.toLowerCase()));
}

function findEndDestination(
  lastDay: { title: string; stops?: string[] },
  canonicalDestinations: Destination[],
): Destination | undefined {
  const stops = lastDay.stops ?? [];
  for (let i = stops.length - 1; i >= 0; i--) {
    const match = matchDestination(cleanStopLabel(stops[i]), canonicalDestinations);
    if (match) return match;
  }
  return matchDestination(lastDay.title, canonicalDestinations);
}

export function deriveTourStartEnd(
  tour: Pick<Tour, 'routeIds' | 'itineraryDays'>,
  canonicalDestinations: Destination[],
): TourStartEnd | undefined {
  const ids = tour.routeIds;
  const days = tour.itineraryDays;
  if (!ids || ids.length === 0 || !days || days.length === 0) return undefined;
  const startId = ids[0];
  const startDest = canonicalDestinations.find((d) => d.id === startId);
  if (!startDest) return undefined;

  const endDest = findEndDestination(days[days.length - 1], canonicalDestinations);
  return { startId, endId: endDest?.id, isRoundTrip: endDest?.id === startId };
}
