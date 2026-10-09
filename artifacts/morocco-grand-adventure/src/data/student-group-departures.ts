// ─────────────────────────────────────────────────────────────────────────────
// Student Group Departures — the data model for scheduled student/university
// group departures with dates, seat capacity and pricing.
//
// Two sources feed into one merged list:
//
//  1. `WEEKLY_SCHEDULE` (below) — a small, configurable set of recurring
//     weekly rules (tour, weekday, duration, price). `generateWeeklyDepartures()`
//     expands these into real calendar dates for the next 12 months, computed
//     fresh on every call — nothing is pre-baked or hand-typed per week, so the
//     schedule never goes stale and never needs manual regeneration as time
//     passes. These are PROPOSED slots: `confirmed` is always false, no seat
//     count is invented, and the UI is required to show "Request to join" /
//     "Spaces available — booking confirmation required" rather than implying
//     a guaranteed, staffed departure.
//
//  2. `studentGroupDepartures` — real, operator-confirmed departures (actual
//     booked seats, `confirmed: true`). Empty until MGA has actually taken a
//     booking against a real or generated date. An entry here for the same
//     (tourSlug, startDate) as a generated one overrides it — that is how a
//     generated proposal becomes a confirmed, trackable departure.
//
// `allDepartures()` is the single merged source every UI reads through
// (`departuresForTour`, `upcomingDepartures`). When a future booking/admin
// system can report real seat counts, replace `studentGroupDepartures` with
// data loaded from it — every consumer already reads through the functions
// below, so no UI changes would be required.
// ─────────────────────────────────────────────────────────────────────────────

/** Status an operator sets directly. Seat-derived display status (below) is separate. */
export type StudentGroupDepartureStatus = 'open' | 'full' | 'cancelled';

/**
 * The status actually shown to a visitor.
 *   request      — not yet operator-confirmed (every auto-generated weekly
 *                  slot starts here): no real booking data exists for it, so
 *                  we neither claim nor deny availability — we ask the
 *                  traveler to request a seat, which is also literally how
 *                  the Join Now flow already works (a request, not a payment).
 *   available / almost-full / full / sold-out — derived from real seats once
 *                  a departure is confirmed and MGA is tracking real bookings.
 *   closed       — cancelled.
 * Never hand-set beyond `confirmed`/`status`/the real seat count — this
 * function is the only place that turns those into a label.
 */
export type DepartureDisplayStatus = 'request' | 'available' | 'almost-full' | 'full' | 'sold-out' | 'closed';

export type StudentGroupDeparture = {
  /** Stable id, e.g. "3-day-morocco-student-tour-2026-12-15" (tourSlug + startDate). */
  id: string;
  /** Matches a StudentTour['slug'] in src/data/student-tours.ts. */
  tourSlug: string;
  /** ISO date (YYYY-MM-DD), the group's first day. */
  startDate: string;
  /** ISO date (YYYY-MM-DD), the group's last day. */
  endDate: string;
  /** One of the verified MGA departure cities (src/data/tour-hierarchy.ts). */
  departureCity: string;
  /** Maximum group size for this departure (operational limit, not a promise of fill). */
  capacity: number;
  /** Seats actually confirmed/booked for this departure. Always 0 until a real booking exists. */
  bookedSeats: number;
  status: StudentGroupDepartureStatus;
  /**
   * Whether MGA has operationally confirmed this specific date (real transport,
   * guide and camp availability checked) and is tracking real bookings against
   * it. False for every auto-generated weekly slot. A departure only becomes
   * `confirmed: true` by being entered into `studentGroupDepartures` below.
   */
  confirmed: boolean;
  /**
   * Published per-person price for this departure. Omitted (not zero, not
   * guessed) when the price is still to be confirmed — the UI falls back to
   * "price on request" rather than inventing a figure.
   */
  pricePerPerson?: number;
  /** A real former/standard price, only when a genuine discount applies to this departure. */
  originalPricePerPerson?: number;
  currency?: 'EUR' | 'USD' | 'GBP';
  /** Overrides DEFAULT_DEPOSIT_PERCENT for this departure specifically. */
  depositPercent?: number;
  /** Real meeting point for this departure, when it differs from the tour's norm. */
  meetingPoint?: string;
  /** Optional free-text operational note (e.g. "led by University X"). */
  notes?: string;
};

/** Deposit percentage used when a departure does not set its own. Configurable in one place. */
export const DEFAULT_DEPOSIT_PERCENT = 20;

/** Below this fraction of capacity remaining, a confirmed departure reads as "almost full". */
const ALMOST_FULL_THRESHOLD = 0.25;

// ── Weekly recurring schedule ───────────────────────────────────────────────
// The only place departure day-of-week, trip length and starting price are
// set. Everything else (which calendar dates exist, id, capacity, deposit) is
// derived. To change a price or add a fourth weekly product, edit here only.

export type WeeklyScheduleRule = {
  /** Must match a real StudentTour['slug'] — verified against src/data/student-tours.ts. */
  tourSlug: string;
  /** Day the group departs. 0=Sunday .. 6=Saturday (matches Date#getUTCDay()). */
  departureWeekday: number;
  /** Trip length in days, inclusive of both the departure and return day (Fri→Sun = 3). */
  durationDays: number;
  /** Starting price per person. A proposed figure, not a verified profitability number — change freely. */
  pricePerPerson: number;
  currency?: 'EUR' | 'USD' | 'GBP';
  /** Maximum operational group size for this product. Defaults to DEFAULT_WEEKLY_CAPACITY. */
  capacity?: number;
  depositPercent?: number;
  departureCity?: string;
};

/** Operational seat ceiling for a weekly departure — a vehicle/camp planning limit, not a booking count. */
export const DEFAULT_WEEKLY_CAPACITY = 18;

/**
 * Slugs, durations and routes verified directly against src/data/student-tours.ts
 * before wiring (each itinerary's real day count and Marrakech-start/Marrakech-end
 * route were checked to match the weekday rule below):
 *   3-day-morocco-student-tour — 3 itinerary days, Marrakech → Marrakech
 *   4-day-morocco-student-tour — 4 itinerary days, Marrakech → Marrakech
 *   5-day-morocco-student-tour — 5 itinerary days, Marrakech → Marrakech
 */
export const WEEKLY_SCHEDULE: WeeklyScheduleRule[] = [
  // Friday → Sunday (3 days: Fri, Sat, Sun).
  { tourSlug: '3-day-morocco-student-tour', departureWeekday: 5, durationDays: 3, pricePerPerson: 219 },
  // Thursday → Sunday (4 days: Thu, Fri, Sat, Sun).
  { tourSlug: '4-day-morocco-student-tour', departureWeekday: 4, durationDays: 4, pricePerPerson: 289 },
  // Thursday → Monday (5 days: Thu, Fri, Sat, Sun, Mon).
  { tourSlug: '5-day-morocco-student-tour', departureWeekday: 4, durationDays: 5, pricePerPerson: 349 },
];

/** How far ahead to generate recurring departures. */
const SCHEDULE_HORIZON_MONTHS = 12;

// ── Timezone-safe date arithmetic ───────────────────────────────────────────
// Every date below is anchored to UTC noon rather than local midnight, so
// adding/subtracting days can never land on the previous or next calendar day
// because of a DST transition or a viewer/build-server timezone offset — the
// classic "new Date('2026-12-18')" off-by-one. Calendar dates are read back
// with the matching UTC getters, never local ones.

function utcNoon(year: number, monthIndex: number, day: number): Date {
  return new Date(Date.UTC(year, monthIndex, day, 12, 0, 0));
}

function addUtcDays(d: Date, days: number): Date {
  const copy = new Date(d.getTime());
  copy.setUTCDate(copy.getUTCDate() + days);
  return copy;
}

function addUtcMonths(d: Date, months: number): Date {
  const copy = new Date(d.getTime());
  copy.setUTCMonth(copy.getUTCMonth() + months);
  return copy;
}

function toIsoDate(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** The next date with the given UTC weekday that is strictly after `from`. */
function nextWeekdayAfter(from: Date, weekday: number): Date {
  let candidate = addUtcDays(from, 1);
  // At most 7 iterations; a plain while-loop is clearer here than modular arithmetic.
  while (candidate.getUTCDay() !== weekday) candidate = addUtcDays(candidate, 1);
  return candidate;
}

/**
 * Expands `WEEKLY_SCHEDULE` into real calendar departures from the next valid
 * occurrence of each rule through `SCHEDULE_HORIZON_MONTHS` ahead. Pure and
 * deterministic for a given `now` — calling it again later naturally produces
 * the same past dates excluded and new future weeks included, so there is
 * nothing to "regenerate" or deduplicate by hand. `now` defaults to the real
 * current time; a fixed value can be passed for testing.
 */
export function generateWeeklyDepartures(
  rules: WeeklyScheduleRule[] = WEEKLY_SCHEDULE,
  now: Date = new Date(),
): StudentGroupDeparture[] {
  const today = utcNoon(now.getFullYear(), now.getMonth(), now.getDate());
  const horizon = addUtcMonths(today, SCHEDULE_HORIZON_MONTHS);
  const out: StudentGroupDeparture[] = [];

  for (const rule of rules) {
    let start = nextWeekdayAfter(today, rule.departureWeekday);
    while (start.getTime() <= horizon.getTime()) {
      const end = addUtcDays(start, rule.durationDays - 1);
      const startIso = toIsoDate(start);
      out.push({
        id: `${rule.tourSlug}-${startIso}`,
        tourSlug: rule.tourSlug,
        startDate: startIso,
        endDate: toIsoDate(end),
        departureCity: rule.departureCity ?? 'Marrakech',
        capacity: rule.capacity ?? DEFAULT_WEEKLY_CAPACITY,
        bookedSeats: 0,
        status: 'open',
        confirmed: false,
        pricePerPerson: rule.pricePerPerson,
        currency: rule.currency ?? 'EUR',
        depositPercent: rule.depositPercent ?? DEFAULT_DEPOSIT_PERCENT,
      });
      start = addUtcDays(start, 7);
    }
  }
  return out;
}

/**
 * No manually-confirmed departures exist yet. Do not add a placeholder or
 * example entry — an empty array is the honest, current state.
 *
 * To confirm a specific date (real booking taken, real capacity agreed),
 * add an entry here with the SAME id the generator would produce
 * (`${tourSlug}-${startDate}`) to override that proposed slot, e.g.:
 *   {
 *     id: '3-day-morocco-student-tour-2026-12-18',
 *     tourSlug: '3-day-morocco-student-tour',
 *     startDate: '2026-12-18', endDate: '2026-12-20',
 *     departureCity: 'Marrakech',
 *     capacity: 18, bookedSeats: 3,
 *     status: 'open', confirmed: true,
 *     pricePerPerson: 219, currency: 'EUR',
 *   }
 */
export const studentGroupDepartures: StudentGroupDeparture[] = [];

/**
 * The single merged departure source every UI reads through: the recurring
 * weekly schedule, with any manually-confirmed entry for the same id
 * (tourSlug + date) taking precedence over the generated proposal.
 */
export function allDepartures(now: Date = new Date()): StudentGroupDeparture[] {
  const generated = generateWeeklyDepartures(WEEKLY_SCHEDULE, now);
  const manualIds = new Set(studentGroupDepartures.map((d) => d.id));
  return [...generated.filter((d) => !manualIds.has(d.id)), ...studentGroupDepartures];
}

/** Real, non-cancelled departures for one student tour, soonest first. */
export function departuresForTour(tourSlug: string): StudentGroupDeparture[] {
  return allDepartures()
    .filter((d) => d.tourSlug === tourSlug && d.status !== 'cancelled')
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
}

/**
 * Every non-cancelled departure across every student tour, ending on or after
 * `today`, soonest first — the source the hub-page departure calendar reads
 * from. `today` (ISO date) is a parameter rather than computed internally so
 * the result is deterministic and testable; callers pass the real current date.
 */
export function upcomingDepartures(today: string): StudentGroupDeparture[] {
  return allDepartures()
    .filter((d) => d.status !== 'cancelled' && d.endDate >= today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
}

export function seatsAvailable(d: StudentGroupDeparture): number {
  return Math.max(0, d.capacity - d.bookedSeats);
}

/** True when this departure cannot be joined at all, for any reason. */
export function isFull(d: StudentGroupDeparture): boolean {
  return d.confirmed && (d.status === 'full' || seatsAvailable(d) <= 0);
}

/**
 * The status actually shown in the UI, derived purely from real data:
 *   cancelled                                     → closed
 *   not yet operator-confirmed                    → request
 *   operator-marked full, or 0 seats left          → sold-out
 *   remaining seats ≤ 25% of capacity               → almost-full
 *   otherwise                                       → available
 */
export function departureDisplayStatus(d: StudentGroupDeparture): DepartureDisplayStatus {
  if (d.status === 'cancelled') return 'closed';
  if (!d.confirmed) return 'request';
  const seats = seatsAvailable(d);
  if (d.status === 'full' || seats <= 0) return 'sold-out';
  if (d.capacity > 0 && seats / d.capacity <= ALMOST_FULL_THRESHOLD) return 'almost-full';
  return 'available';
}

/** Whether a departure can currently be joined/requested (used to gate the Join Now CTA). */
export function isJoinable(d: StudentGroupDeparture): boolean {
  const s = departureDisplayStatus(d);
  return s === 'request' || s === 'available' || s === 'almost-full';
}

/** The deposit percentage that actually applies to this departure. */
export function effectiveDepositPercent(d: StudentGroupDeparture): number {
  return d.depositPercent ?? DEFAULT_DEPOSIT_PERCENT;
}

export type DepositBreakdown = {
  total: number;
  deposit: number;
  remaining: number;
  currency: string;
};

/**
 * Deposit math for `travelers` people on departure `d`, or undefined when
 * this departure has no published price — the caller shows "price on
 * request" rather than a computed zero.
 */
export function depositBreakdown(d: StudentGroupDeparture, travelers: number): DepositBreakdown | undefined {
  if (!d.pricePerPerson || d.pricePerPerson <= 0) return undefined;
  const n = Math.max(1, Math.floor(travelers));
  const total = d.pricePerPerson * n;
  const percent = effectiveDepositPercent(d);
  const deposit = Math.round(total * (percent / 100) * 100) / 100;
  const remaining = Math.round((total - deposit) * 100) / 100;
  return { total, deposit, remaining, currency: d.currency ?? 'EUR' };
}

/** Distinct tour durations actually present among real departures, for the calendar's filter chips. */
export function durationsWithDepartures(
  departures: StudentGroupDeparture[],
  durationForSlug: (slug: string) => string | undefined,
): string[] {
  const set = new Set<string>();
  for (const d of departures) {
    const duration = durationForSlug(d.tourSlug);
    if (duration) set.add(duration);
  }
  return [...set].sort();
}
