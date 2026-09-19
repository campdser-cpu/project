// ─────────────────────────────────────────────────────────────────────────────
// Pricing engine — pure, dependency-free, and silent until it has real rates.
//
// The engine decomposes a journey into four kinds of cost, because that
// decomposition is what makes the commercial behaviour the site promises come
// out of arithmetic instead of out of a fudge factor:
//
//   party cost   vehicle + driver + fuel + tolls, per travelling day, plus the
//                official city guide on guided days. Does NOT scale with heads,
//                which is the whole reason a bigger party pays less each.
//   room cost    per room per night. Scales with ROOMS, not travellers, which is
//                why two people sharing pay less each than two people in two
//                rooms, and why single occupancy costs more.
//   camp cost    per tent per night, by camp tier.
//   head cost    per-person activities, which scale with travellers.
//
//   total = (party + rooms + camp + heads) × (1 + margin)
//
// It returns a discriminated result and refuses to price anything while a figure
// it needs is missing. There is no default rate, no fallback number and no zero
// standing in for an unknown: an unpriced journey comes back as
// `{ status: 'unconfigured', missing: [...] }` and the UI shows the quote line.
//
// A note on monotonicity, which matters when real rates arrive. "More travellers
// → lower per person" is NOT free. Adding a third traveller to a party of two
// adds a second room, so the per-person price falls only while the party cost of
// a day exceeds the room cost of a night. That is true of a private vehicle with
// a driver against one guesthouse room, but a rate card could be entered that
// breaks it. `validateRateBehaviour()` below proves the six promised rules hold
// for a given card, and it should gate every rate change before it ships.
// ─────────────────────────────────────────────────────────────────────────────
import {
  RATE_CARD,
  UNCONFIGURED,
  vehicleFor,
  type AccommodationTier,
  type CampTier,
  type Configured,
  type Currency,
  type Maybe,
  type RateCard,
  type VehicleClass,
} from '@/data/pricing/rates';
import {
  TOUR_PRICING,
  campNights,
  hotelNights,
  type TourPricingConfig,
} from '@/data/pricing/tours';
import {
  DEFER,
  fitsParty,
  isDeferred,
  roomArrangements,
  roomCount,
  rooms as roomsOf,
  singleRoomCount,
  type RoomArrangement,
} from '@/data/pricing/rooms';

export type { RoomArrangement };

/** Everything the engine needs from the traveller's selection. */
export type PricingInput = {
  readonly tourId: string;
  readonly travelers: number;
  readonly accommodation: AccommodationTier;
  readonly camp: CampTier;
  readonly rooms: RoomArrangement;
};

/** Why a journey could not be priced. Reported, never guessed around. */
export type MissingInput =
  | 'rate-card'
  | 'tour-pricing'
  | 'party-size'
  | 'room-arrangement'
  | 'room-arrangement-mismatch'
  | 'vehicle-class'
  | `room-rate:${string}`
  | `activity-rate:${string}`;

export type PriceBreakdown = {
  readonly party: number;
  readonly rooms: number;
  readonly camp: number;
  readonly singleOccupancy: number;
  readonly activities: number;
  readonly margin: number;
};

export type PriceResult =
  | { readonly status: 'unconfigured'; readonly missing: readonly MissingInput[] }
  | {
      readonly status: 'priced';
      readonly currency: Currency;
      readonly total: number;
      readonly perPerson: number;
      readonly breakdown: PriceBreakdown;
    };

/** Vehicle classes smallest-first, so a route floor can be applied. */
const CLASS_ORDER: readonly VehicleClass[] = ['sedan', 'minivan', 'minibus'];

function atLeastClass(picked: VehicleClass, floor: VehicleClass | undefined): VehicleClass {
  if (!floor) return picked;
  return CLASS_ORDER.indexOf(picked) >= CLASS_ORDER.indexOf(floor) ? picked : floor;
}

/**
 * Price a journey, or say exactly what is missing.
 *
 * The rate card and tour registry are parameters so tests can drive the engine
 * with clearly-labelled fixtures without production ever seeing them.
 */
export function estimate(
  input: PricingInput,
  card: Maybe<RateCard> = RATE_CARD,
  registry: Readonly<Record<string, TourPricingConfig>> = TOUR_PRICING,
): PriceResult {
  const missing: MissingInput[] = [];

  const cfg = registry[input.tourId];
  if (!cfg) missing.push('tour-pricing');
  if (!card.configured) missing.push('rate-card');

  const travelers = Math.floor(input.travelers);
  if (!Number.isFinite(travelers) || travelers < 1) missing.push('party-size');
  if (isDeferred(input.rooms)) missing.push('room-arrangement');

  // Without both of these nothing further can be checked.
  if (!cfg || !card.configured || missing.length > 0) {
    if (cfg && travelers >= 1 && (travelers < cfg.minTravelers || travelers > cfg.maxTravelers)) {
      missing.push('party-size');
    }
    return { status: 'unconfigured', missing: dedupe(missing) };
  }

  if (travelers < cfg.minTravelers || travelers > cfg.maxTravelers) missing.push('party-size');
  if (!fitsParty(input.rooms, travelers)) missing.push('room-arrangement-mismatch');

  const fitted = vehicleFor(card.party, travelers);
  if (!fitted) missing.push('vehicle-class');

  const wantedClass = fitted ? atLeastClass(fitted.class, cfg.minVehicleClass) : undefined;
  const vehicle = wantedClass
    ? card.party.vehicles.find((v) => v.class === wantedClass)
    : undefined;
  if (!vehicle) missing.push('vehicle-class');

  const roomTier = card.rooms[input.accommodation];
  const hotels = hotelNights(cfg);
  let roomsCost = 0;
  const rooms = roomCount(input.rooms);
  for (const night of hotels) {
    const rate = roomTier?.[night.region];
    if (typeof rate !== 'number') {
      missing.push(`room-rate:${input.accommodation}/${night.region}`);
      continue;
    }
    roomsCost += rate * rooms;
  }

  let activitiesCost = 0;
  for (const id of cfg.perPersonActivities) {
    const rate = card.activities[id];
    if (typeof rate !== 'number') {
      missing.push(`activity-rate:${id}`);
      continue;
    }
    activitiesCost += rate * travelers;
  }

  if (missing.length > 0) return { status: 'unconfigured', missing: dedupe(missing) };

  const v = vehicle as NonNullable<typeof vehicle>;
  const party =
    (v.perDay + card.party.driverPerDay + card.party.fuelTollsPerDay) * cfg.days +
    card.party.guidePerDay * cfg.guidedDays;

  // A tent per room, so a party that takes more rooms also takes more tents.
  const camp = card.camp[input.camp] * campNights(cfg) * rooms;

  // The single supplement is charged for every night a room is held for one
  // person — nights under canvas included.
  const singleOccupancy =
    card.commercial.singleOccupancyPerNight * singleRoomCount(input.rooms) * cfg.nights.length;

  const subtotal = party + roomsCost + camp + singleOccupancy + activitiesCost;
  const margin = subtotal * card.commercial.marginPct;
  const total = Math.round(subtotal + margin);

  return {
    status: 'priced',
    currency: card.currency,
    total,
    perPerson: Math.round(total / travelers),
    breakdown: {
      party: Math.round(party),
      rooms: Math.round(roomsCost),
      camp: Math.round(camp),
      singleOccupancy: Math.round(singleOccupancy),
      activities: Math.round(activitiesCost),
      margin: Math.round(margin),
    },
  };
}

function dedupe<T>(xs: readonly T[]): T[] {
  return [...new Set(xs)];
}

/**
 * Cheapest arrangement that shares every room it can — the shape a "from" price
 * must be built on, since it is the least a real party of this size can book.
 */
export function cheapestArrangement(travelers: number): RoomArrangement {
  const all = roomArrangements(travelers).filter((a) => !isDeferred(a) && fitsParty(a, travelers));
  // Fewest rooms first, then fewest singles: sharing is always the lower cost.
  return (
    [...all].sort(
      (a, b) => roomCount(a) - roomCount(b) || singleRoomCount(a) - singleRoomCount(b),
    )[0] ?? DEFER
  );
}

/**
 * The honest "From €…" for a tour: the lowest total any bookable configuration
 * reaches, expressed per person. Unconfigured until the tour is costed, which is
 * what keeps a "From" label off a page that cannot honour it.
 */
export function fromPricePerPerson(
  tourId: string,
  card: Maybe<RateCard> = RATE_CARD,
  registry: Readonly<Record<string, TourPricingConfig>> = TOUR_PRICING,
): Maybe<{ perPerson: number; total: number; travelers: number; currency: Currency }> {
  const cfg = registry[tourId];
  if (!cfg || !card.configured) return UNCONFIGURED;

  let best: { perPerson: number; total: number; travelers: number; currency: Currency } | undefined;
  for (let n = cfg.minTravelers; n <= cfg.maxTravelers; n++) {
    const r = estimate(
      { tourId, travelers: n, accommodation: 'standard', camp: 'standard', rooms: cheapestArrangement(n) },
      card,
      registry,
    );
    if (r.status !== 'priced') continue;
    if (!best || r.perPerson < best.perPerson) {
      best = { perPerson: r.perPerson, total: r.total, travelers: n, currency: r.currency };
    }
  }
  return best ? { configured: true, ...best } : UNCONFIGURED;
}

// ── Behavioural validation ───────────────────────────────────────────────────

export type BehaviourViolation = { readonly rule: string; readonly detail: string };

/**
 * Prove the six commercial rules the site promises hold for a rate card before
 * it goes live. This is not a unit test of the engine — the engine is fixed; it
 * is a check on the NUMBERS, because a rate card can be arithmetically valid and
 * still behave in a way the tour pages would be lying about.
 *
 * Run it against every rate card before publishing, for every tour configured.
 */
export function validateRateBehaviour(
  tourId: string,
  card: Configured<RateCard>,
  registry: Readonly<Record<string, TourPricingConfig>>,
): readonly BehaviourViolation[] {
  const out: BehaviourViolation[] = [];
  const cfg = registry[tourId];
  if (!cfg) return [{ rule: 'tour-configured', detail: `no pricing config for ${tourId}` }];

  const priced = (n: number, opts: Partial<PricingInput> = {}) =>
    estimate(
      {
        tourId,
        travelers: n,
        accommodation: 'standard',
        camp: 'standard',
        rooms: cheapestArrangement(n),
        ...opts,
      },
      card,
      registry,
    );

  const series: { n: number; total: number; perPerson: number }[] = [];
  for (let n = cfg.minTravelers; n <= cfg.maxTravelers; n++) {
    const r = priced(n);
    if (r.status !== 'priced') {
      out.push({ rule: 'priceable', detail: `party of ${n} is not priceable: ${r.missing.join(', ')}` });
      continue;
    }
    series.push({ n, total: r.total, perPerson: r.perPerson });
  }

  for (let i = 1; i < series.length; i++) {
    const prev = series[i - 1];
    const cur = series[i];
    if (cur.perPerson >= prev.perPerson) {
      out.push({
        rule: 'per-person-falls-with-party-size',
        detail: `${prev.n} travellers → ${prev.perPerson}/person, ${cur.n} → ${cur.perPerson}/person`,
      });
    }
    // A joining traveller must never make the trip cheaper overall — with one
    // real exception. An odd-numbered party always leaves one traveller holding
    // a room alone, and that room carries the single supplement; the next
    // traveller to join fills the empty bed and the supplement disappears. Where
    // the supplement is worth more than the per-head costs the new traveller
    // brings, the total genuinely falls at every odd → even step. That is how a
    // single supplement works, not a defect in the model, so it is allowed
    // exactly there and only when a supplement is actually charged. Every other
    // step is absolute: the total must never fall.
    //
    // Whether a FORCED single (the unpaired traveller in an odd party) should be
    // surcharged at all is a commercial decision, not an arithmetic one. If the
    // business decides it should not, this exception stops arising by itself.
    const supplementDropStep =
      prev.n % 2 === 1 &&
      cur.n === prev.n + 1 &&
      card.commercial.singleOccupancyPerNight > 0;
    if (cur.total < prev.total && !supplementDropStep) {
      out.push({
        rule: 'total-never-falls-when-a-traveller-joins',
        detail: `${prev.n} travellers → ${prev.total} total, ${cur.n} → ${cur.total}`,
      });
    }
  }

  // Rooms: sharing must beat a room each, for any party that can do both.
  for (let n = 2; n <= Math.min(cfg.maxTravelers, 8); n++) {
    if (n < cfg.minTravelers) continue;
    const shared = priced(n);
    const each = priced(n, { rooms: roomsOf([{ type: 'single', count: n }]) });
    if (shared.status !== 'priced' || each.status !== 'priced') continue;
    if (each.total <= shared.total) {
      out.push({
        rule: 'more-rooms-and-single-occupancy-cost-more',
        detail: `${n} travellers: sharing ${shared.total}, a room each ${each.total}`,
      });
    }
  }

  // Tiers: luxury must cost more than standard, for stay and for camp.
  const n0 = Math.max(cfg.minTravelers, 2);
  const base = priced(n0);
  const lux = priced(n0, { accommodation: 'luxury' });
  const luxCamp = priced(n0, { camp: 'luxury' });
  if (base.status === 'priced' && lux.status === 'priced' && hotelNights(cfg).length > 0 && lux.total <= base.total) {
    out.push({ rule: 'luxury-stay-costs-more', detail: `standard ${base.total}, luxury ${lux.total}` });
  }
  if (base.status === 'priced' && luxCamp.status === 'priced' && campNights(cfg) > 0 && luxCamp.total <= base.total) {
    out.push({ rule: 'luxury-camp-costs-more', detail: `standard camp ${base.total}, luxury camp ${luxCamp.total}` });
  }

  return out;
}

/** Localized money, using the platform formatter rather than a dependency. */
export function formatMoney(amount: number, currency: Currency, lang: string): string {
  try {
    return new Intl.NumberFormat(lang, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `€${Math.round(amount)}`;
  }
}
