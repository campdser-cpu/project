// ─────────────────────────────────────────────────────────────────────────────
// Per-tour pricing configuration — what a given journey actually consumes.
//
// THE REGISTRY IS DELIBERATELY EMPTY. Pricing activates one tour at a time: a
// tour absent from `TOUR_PRICING` is quote-only no matter what ./rates.ts says,
// so the business can switch on the routes it has costed and leave the rest
// untouched.
//
// Nothing here is inferred from the itinerary text. It is tempting — a tour
// called "3 Days / 2 Nights" plainly has two nights — but the figures that
// matter are not in the copy. Auditing all 24 tours showed the evidence is
// partial and contradictory: eight tours name a desert camp in `included[]`,
// two more only imply one through an overnight stop, and several that certainly
// spend a night in the dunes (3-day-sahara-marrakech among them) carry no
// `included[]` list at all. Guessing a camp night is guessing a cost. Every
// field below is therefore supplied by the business, or the tour is not priced.
// ─────────────────────────────────────────────────────────────────────────────
import type { ActivityId, RegionId, VehicleClass } from './rates';

/** One night of the journey, and what it is billed against. */
export type NightConfig =
  /** A room in a hotel, riad or guesthouse — billed per room per night by region. */
  | { readonly kind: 'hotel'; readonly region: RegionId }
  /** A tent at a desert camp — billed per tent per night by camp tier. */
  | { readonly kind: 'camp' };

export type TourPricingConfig = {
  /** Travelling days used for vehicle, driver and fuel. */
  readonly days: number;
  /** One entry per overnight, in itinerary order. Length is the night count. */
  readonly nights: readonly NightConfig[];
  /** Days that actually engage an official local city guide. */
  readonly guidedDays: number;
  /** Activities billed per head; ids must exist in the rate card's `activities`. */
  readonly perPersonActivities: readonly ActivityId[];
  /**
   * Smallest vehicle class this route may use regardless of party size — some
   * roads rule out a sedan. Omitted means the engine picks purely on capacity.
   */
  readonly minVehicleClass?: VehicleClass;
  /** Party sizes this tour can actually take, inclusive. */
  readonly minTravelers: number;
  readonly maxTravelers: number;
};

/**
 * PRODUCTION TOUR PRICING — empty on purpose. See the file header.
 *
 * The shape a configured entry takes, for whoever fills this in:
 *
 *   '3-day-sahara-marrakech': {
 *     days: 3,
 *     nights: [{ kind: 'hotel', region: 'dades' }, { kind: 'camp' }],
 *     guidedDays: 0,
 *     perPersonActivities: ['camel-trek'],
 *     minTravelers: 1,
 *     maxTravelers: 6,
 *   },
 *
 * Add an entry only when every figure it refers to is confirmed and present in
 * the rate card, then re-run the pricing tests before shipping.
 */
export const TOUR_PRICING: Readonly<Record<string, TourPricingConfig>> = {};

/** Pricing configuration for a tour, or undefined while it stays quote-only. */
export function getTourPricing(tourId: string): TourPricingConfig | undefined {
  return TOUR_PRICING[tourId];
}

/** Whether this tour has been costed and may show a price at all. */
export function isTourPriceable(tourId: string): boolean {
  return getTourPricing(tourId) !== undefined;
}

/** Nights of this tour spent at a desert camp. */
export function campNights(cfg: TourPricingConfig): number {
  return cfg.nights.filter((n) => n.kind === 'camp').length;
}

/** Nights of this tour spent in a hotel, riad or guesthouse. */
export function hotelNights(cfg: TourPricingConfig): readonly Extract<NightConfig, { kind: 'hotel' }>[] {
  return cfg.nights.filter((n): n is Extract<NightConfig, { kind: 'hotel' }> => n.kind === 'hotel');
}
