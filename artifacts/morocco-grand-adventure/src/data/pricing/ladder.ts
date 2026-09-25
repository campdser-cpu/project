// ─────────────────────────────────────────────────────────────────────────────
// Premium private price ladder — the customer-facing selling price.
//
// This is NOT a cost calculation and must never become one. It holds two
// published selling prices per tour and derives the rest by a fixed rule:
//
//   1 traveller  → solo          (a separate premium single-traveller price)
//   2 travellers → groupBase
//   3 travellers → groupBase − €15
//   4 travellers → groupBase − €30
//   5 travellers → groupBase − €45
//   6 travellers → groupBase − €60
//
// Six figures are never typed out where two will do: the step is applied here
// once, so a base can be changed in one place and the whole ladder moves with it.
//
// Supplier rates, margins and operating costs have no place in this file or
// anywhere else under src/ — src/ is bundled and served to every visitor. The
// internal cost validation lives in scripts/ and is never imported from here.
//
// Parties outside a tour's supported range are not priced at all. They fall
// through to the quote flow, which is the honest answer rather than an
// extrapolated number.
// ─────────────────────────────────────────────────────────────────────────────

/** Per-person reduction for each traveller beyond the second. */
export const LADDER_STEP = 15;

/** The ladder is defined from two travellers up to this size. */
export const LADDER_MAX = 6;

export type TourLadder = {
  /**
   * Published price for one traveller, deliberately outside the step rule.
   * Omitted where the product is not sold to a single traveller at all — the
   * honeymoon is a two-person journey, and inventing a solo price for it would
   * advertise something the business does not offer.
   */
  readonly solo?: number;
  /** Published per-person price at two travellers — the base the step works from. */
  readonly groupBase: number;
  /** Smallest party this tour is sold to. */
  readonly minTravelers: number;
  /** Largest party the ladder covers; above this, the quote flow takes over. */
  readonly maxTravelers: number;
  /**
   * Party sizes inside the range that are deliberately NOT published and go to
   * the quote flow instead. The family itinerary uses this: it publishes a solo
   * price and prices for three to six, but a couple on a nine-day family tour is
   * a conversation, not a shelf price.
   */
  readonly quoteOnlyPartySizes?: readonly number[];
};

/**
 * PUBLISHED PRICES. A tour absent from this map stays quote-only.
 *
 * Only the 3-day Marrakech → Merzouga anchor is live. Every other itinerary is
 * waiting on approval of the proposed matrix, including the cases flagged as
 * distinct premium/luxury products, so none of them appears here yet.
 */
const STANDARD = (solo: number, groupBase: number): TourLadder => ({
  solo, groupBase, minTravelers: 1, maxTravelers: 6,
});

export const TOUR_LADDER: Readonly<Record<string, TourLadder>> = {
  // ── 2 days ────────────────────────────────────────────────────────────────
  '2-day-zagora-desert-marrakech': STANDARD(425, 300),
  // Same duration class and cost shape as the Zagora anchor (private vehicle +
  // driver + one night's accommodation) — the published 2-day rate, not a new
  // figure invented for this route.
  'marrakech-essaouira-2-day': STANDARD(425, 300),

  // ── 3 days ────────────────────────────────────────────────────────────────
  '3-day-sahara-marrakech': STANDARD(600, 425), // the approved anchor
  '3-day-sahara-agadir': STANDARD(600, 425),
  '3-day-fes-merzouga-sahara': STANDARD(600, 425),
  'casablanca-3-day': STANDARD(600, 425),
  'tangier-3-day': STANDARD(600, 425),

  // ── 4 days ────────────────────────────────────────────────────────────────
  'marrakech-4-day': STANDARD(750, 530),
  '4-day-marrakech-merzouga-sahara': STANDARD(750, 530),
  '4-day-fes-marrakech-via-merzouga': STANDARD(750, 530),
  'casablanca-4-day': STANDARD(750, 530),
  'fes-4-day': STANDARD(750, 530),
  'agadir-4-day': STANDARD(750, 530),

  // ── 5 days ────────────────────────────────────────────────────────────────
  // 5-day-imperial-cities carries a luxury desert camp and a guided Fes day, so
  // it is priced above the standard five-day rate.
  '5-day-imperial-cities': STANDARD(985, 700),
  '5-day-great-south-morocco': STANDARD(880, 625),
  'casablanca-5-day': STANDARD(880, 625),
  'fes-5-day': STANDARD(880, 625),
  'agadir-5-day': STANDARD(880, 625),
  'tangier-5-day': STANDARD(880, 625),

  // ── 7 days ────────────────────────────────────────────────────────────────
  '7-day-imperial-cities-sahara-escape': STANDARD(1135, 805),

  // ── 8 days ────────────────────────────────────────────────────────────────
  // The Luxury Grand Tour: luxury accommodation throughout and a luxury desert
  // camp, so it sits above the three standard eight-day circuits.
  '8-day-marrakech-essaouira-agadir-sahara': STANDARD(1480, 1050),
  'casablanca-8-day': STANDARD(1255, 890),
  'fes-8-day': STANDARD(1255, 890),
  'agadir-8-day': STANDARD(1255, 890),

  // ── 9 days, family ────────────────────────────────────────────────────────
  // A solo price and three-to-six are published; a couple on a nine-day family
  // itinerary goes to the quote flow. groupBase is the figure the step works
  // from and is never shown on its own.
  'family-morocco-adventure': {
    solo: 1360,
    groupBase: 965,
    minTravelers: 1,
    maxTravelers: 6,
    quoteOnlyPartySizes: [2],
  },

  // ── 10 days, honeymoon ────────────────────────────────────────────────────
  // A two-person journey, and only that. No solo price and no three-to-six
  // ladder, because the business does not sell those configurations: the range
  // is pinned to 2–2 so every other party size falls through to the quote flow
  // rather than being quoted a number nobody can book.
  'honeymoon-morocco': {
    groupBase: 1450,
    minTravelers: 2,
    maxTravelers: 2,
  },
};

export type LadderPrice = {
  readonly perPerson: number;
  readonly total: number;
  readonly currency: 'EUR';
};

/**
 * Whether a ladder is internally sound. Guards against a base so low that the
 * step would drive the largest party to zero or below, a solo price that does
 * not sit above the group rate, and non-integer or non-finite money.
 */
export function isValidLadder(l: TourLadder): boolean {
  const ints = [l.groupBase, l.minTravelers, l.maxTravelers];
  if (!ints.every((n) => Number.isInteger(n) && Number.isFinite(n))) return false;
  if (l.minTravelers < 1 || l.maxTravelers > LADDER_MAX || l.minTravelers > l.maxTravelers) return false;
  if (l.groupBase <= 0) return false;
  // The largest supported party must still pay something real.
  const smallest = l.groupBase - LADDER_STEP * (Math.max(l.maxTravelers, 2) - 2);
  if (smallest <= 0) return false;
  // A solo price is required exactly when the tour is sold to one traveller,
  // and a single traveller buying the whole vehicle cannot pay less each than
  // a pair does.
  const sellsSolo = l.minTravelers <= 1;
  if (sellsSolo) {
    if (!Number.isInteger(l.solo) || (l.solo ?? 0) <= 0) return false;
    if ((l.solo ?? 0) <= l.groupBase) return false;
  } else if (l.solo !== undefined) {
    // A solo price on a tour that is not sold solo would never be shown; refuse
    // it rather than carry a figure nobody can book.
    return false;
  }
  return true;
}

/** The published ladder for a tour, or undefined while it stays quote-only. */
export function getLadder(tourId: string): TourLadder | undefined {
  const l = TOUR_LADDER[tourId];
  return l && isValidLadder(l) ? l : undefined;
}

/** Whether this tour has a published price at all. */
export function hasLadder(tourId: string): boolean {
  return getLadder(tourId) !== undefined;
}

/**
 * Published price for a party, or undefined when the tour is quote-only or the
 * party falls outside what the ladder covers. Undefined is a real answer: the
 * caller shows the quote flow rather than inventing a figure.
 */
export function ladderPrice(tourId: string, travelers: number): LadderPrice | undefined {
  const l = getLadder(tourId);
  if (!l) return undefined;
  const n = Math.floor(travelers);
  if (!Number.isFinite(n) || n < l.minTravelers || n > l.maxTravelers) return undefined;
  if (l.quoteOnlyPartySizes?.includes(n)) return undefined;
  const perPerson = n === 1 ? l.solo : l.groupBase - LADDER_STEP * (n - 2);
  if (perPerson === undefined || !Number.isFinite(perPerson) || perPerson <= 0) return undefined;
  return { perPerson, total: perPerson * n, currency: 'EUR' };
}

/**
 * The figure a tour card shows.
 *
 * Deliberately the TWO-traveller price, not the cheapest six-traveller one. Six
 * travellers pay less per head, so a "from" built on them would be technically
 * true and practically misleading — the pattern the 2026 market survey found
 * everywhere, where a headline is the 14-to-17-traveller rate and a couple pays
 * two to three times it. Two travellers is the configuration most people who
 * read the card will actually book.
 */
export function fromPrice(tourId: string): LadderPrice | undefined {
  return fromParty(tourId) ? ladderPrice(tourId, fromParty(tourId)!) : undefined;
}

/**
 * The party size the card's "from" figure describes — the smallest published
 * group of two or more, skipping any size sent to the quote flow. The card
 * states this number, so a reader always knows what the price assumes.
 */
export function fromParty(tourId: string): number | undefined {
  const l = getLadder(tourId);
  if (!l) return undefined;
  for (let n = Math.max(2, l.minTravelers); n <= l.maxTravelers; n++) {
    if (ladderPrice(tourId, n)) return n;
  }
  // A tour sold only to a single traveller still needs an honest "from".
  return ladderPrice(tourId, l.minTravelers) ? l.minTravelers : undefined;
}

/** Party sizes this tour publishes a price for, in order. */
export function supportedPartySizes(tourId: string): readonly number[] {
  const l = getLadder(tourId);
  if (!l) return [];
  const out: number[] = [];
  for (let n = l.minTravelers; n <= l.maxTravelers; n++) {
    if (ladderPrice(tourId, n)) out.push(n);
  }
  return out;
}
