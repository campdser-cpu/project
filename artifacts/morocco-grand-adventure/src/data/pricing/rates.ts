// ─────────────────────────────────────────────────────────────────────────────
// Rate card — the single file the business edits to turn pricing on.
//
// IT IS DELIBERATELY UNCONFIGURED. Morocco Grand Adventure prices every journey
// per party after a conversation, and no verified vehicle, driver, guide, room,
// camp, activity or margin figure exists in this project. Nothing here is a
// guess, a placeholder or a competitor's number: the rate card is an explicit
// `{ configured: false }`, and src/lib/pricing.ts refuses to produce a
// customer-facing price while it stays that way.
//
// Why `configured: false` rather than zeros: a zero is a number. It divides, it
// formats, and it renders as "€0" — a fake price wearing the costume of a real
// one. A discriminated union cannot be mistaken for a total by accident, and
// TypeScript forces every caller to handle the unconfigured case.
//
// To switch pricing on, replace `RATE_CARD` with a `{ configured: true, … }`
// literal built from figures the business has confirmed, then configure the
// individual tours in ./tours.ts. Pricing activates per tour: a tour with no
// entry there stays quote-only even once this card is filled in.
//
// Before publishing any rate card, run `validateRateBehaviour()` from
// src/lib/pricing.ts against it. It proves the six commercial rules the site
// promises travellers actually hold for those numbers — most importantly that
// the per-person price falls as a party grows, which is NOT automatic: it holds
// only while the party-level cost of a day (vehicle + driver + fuel) exceeds the
// room cost of a night. A rate card that breaks that must not go live.
// ─────────────────────────────────────────────────────────────────────────────

/** Presentation currency. The site quotes in EUR; the engine never converts. */
export type Currency = 'EUR';

/** Vehicle classes are capacity bands, not models. Capacities come from the business. */
export type VehicleClass = 'sedan' | 'minivan' | 'minibus';

/** Accommodation comfort tier offered on the tour pages. */
export type AccommodationTier = 'standard' | 'luxury';

/** Desert camp tier offered on the tour pages. */
export type CampTier = 'standard' | 'luxury';

/**
 * A stay region — a group of nights that share a room rate (a Marrakech riad and
 * a Dades valley guesthouse do not cost the same). Region ids are free strings
 * so the business can name its own bands; ./tours.ts refers to them per night.
 */
export type RegionId = string;

/** A per-person activity billed by head rather than by party (e.g. a camel trek). */
export type ActivityId = string;

// ── The unconfigured wrapper ─────────────────────────────────────────────────

/** A value the business has not supplied yet. Never priced, never rendered. */
export type Unconfigured = { readonly configured: false };

/** A value the business has confirmed. */
export type Configured<T> = { readonly configured: true } & T;

/** Either a confirmed value or an explicit absence — never a silent zero. */
export type Maybe<T> = Unconfigured | Configured<T>;

/** The canonical "not supplied yet" marker. */
export const UNCONFIGURED: Unconfigured = { configured: false };

// ── Rate shapes ──────────────────────────────────────────────────────────────

/**
 * One vehicle band. `maxTravelers` is the largest party the class seats
 * comfortably with luggage; the engine picks the smallest class that fits.
 */
export type VehicleRate = {
  readonly class: VehicleClass;
  readonly maxTravelers: number;
  /** Vehicle hire per travelling day, for the whole party. */
  readonly perDay: number;
};

/** Costs that belong to the party as a whole and do not scale with head count. */
export type PartyRates = {
  /** Ordered smallest-first; the engine picks the first class that fits. */
  readonly vehicles: readonly VehicleRate[];
  readonly driverPerDay: number;
  /** Official local city guide, charged only on days a tour actually uses one. */
  readonly guidePerDay: number;
  readonly fuelTollsPerDay: number;
};

/** Room cost per room per night, by comfort tier and stay region. */
export type RoomRates = Readonly<Record<AccommodationTier, Readonly<Record<RegionId, number>>>>;

/** Desert camp cost per tent per night, by camp tier. */
export type CampRates = Readonly<Record<CampTier, number>>;

/** Per-person activity costs, keyed by the ids ./tours.ts lists per tour. */
export type ActivityRates = Readonly<Record<ActivityId, number>>;

export type CommercialRates = {
  /**
   * Added per room per night when a room is held for one traveller. This is the
   * single supplement; it is what makes "more single occupancy → higher total".
   */
  readonly singleOccupancyPerNight: number;
  /** Operating margin applied to the assembled cost, as a fraction (0.2 = 20%). */
  readonly marginPct: number;
};

export type RateCard = {
  readonly currency: Currency;
  readonly party: PartyRates;
  readonly rooms: RoomRates;
  readonly camp: CampRates;
  readonly activities: ActivityRates;
  readonly commercial: CommercialRates;
};

// ── The live rate card ───────────────────────────────────────────────────────

/**
 * PRODUCTION RATE CARD — unconfigured on purpose.
 *
 * Every tour therefore stays quote-only, `PriceTag` keeps rendering the tailored
 * -quote line, and no "From €…" can reach a page. Supplying this object is the
 * one deliberate act that turns customer-facing pricing on.
 *
 * The annotation is the union type (not `Unconfigured`) so callers must branch;
 * without it TypeScript would narrow the constant and let a caller skip the
 * unconfigured path that production actually takes.
 */
export const RATE_CARD: Maybe<RateCard> = UNCONFIGURED;

/** Whether the business has supplied rates at all. */
export function hasRates(card: Maybe<RateCard> = RATE_CARD): card is Configured<RateCard> {
  return card.configured;
}

/**
 * Smallest vehicle class that seats the party, or undefined when no configured
 * class is large enough — a real limit for big groups, not an error to paper over.
 */
export function vehicleFor(party: PartyRates, travelers: number): VehicleRate | undefined {
  return [...party.vehicles]
    .sort((a, b) => a.maxTravelers - b.maxTravelers)
    .find((v) => v.maxTravelers >= travelers);
}
