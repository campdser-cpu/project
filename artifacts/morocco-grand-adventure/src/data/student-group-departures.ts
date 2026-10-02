// ─────────────────────────────────────────────────────────────────────────────
// Student Group Departures — the data model for scheduled student/university
// group departures with dates and seat capacity.
//
// MGA does not yet operate a real booking/availability database. This file is
// the foundation for one: a real `StudentGroupDeparture` is only ever added
// here once MGA has actually confirmed a scheduled group (real dates, a real
// capacity agreed with the group leader). Nothing here is invented — the
// array below is intentionally empty until that happens, and the UI that
// reads it (src/pages/student-tour-detail.tsx) is written to show an honest
// "no scheduled departures yet" state rather than fabricate one.
//
// When a future booking/inquiry system can report real seat counts, this file
// is the integration point: replace `studentGroupDepartures` with data loaded
// from that system (or keep it as a thin cache refreshed from it) — every
// consumer already reads through `departuresForTour()` / `seatsAvailable()`
// / `isFull()` below, so no UI changes would be required.
// ─────────────────────────────────────────────────────────────────────────────

export type StudentGroupDepartureStatus = 'open' | 'full' | 'cancelled';

export type StudentGroupDeparture = {
  /** Stable id, e.g. "10-day-morocco-student-tour-2026-12-15". */
  id: string;
  /** Matches a StudentTour['slug'] in src/data/student-tours.ts. */
  tourSlug: string;
  /** ISO date (YYYY-MM-DD), the group's first day. */
  startDate: string;
  /** ISO date (YYYY-MM-DD), the group's last day. */
  endDate: string;
  /** One of the verified MGA departure cities (src/data/tour-hierarchy.ts). */
  departureCity: string;
  /** Total seats the group leader has agreed for this departure. */
  capacity: number;
  /** Seats already confirmed/booked for this departure. */
  bookedSeats: number;
  status: StudentGroupDepartureStatus;
  /** Optional free-text operational note (e.g. "led by University X"). */
  notes?: string;
};

/**
 * No scheduled group departures exist yet. Do not add a placeholder or
 * example entry here — an empty array is the honest, current state, and the
 * UI is built to handle it gracefully (see UpcomingGroupDepartures usage in
 * student-tour-detail.tsx).
 */
export const studentGroupDepartures: StudentGroupDeparture[] = [];

/** Real, non-cancelled departures for one student tour, soonest first. */
export function departuresForTour(tourSlug: string): StudentGroupDeparture[] {
  return studentGroupDepartures
    .filter((d) => d.tourSlug === tourSlug && d.status !== 'cancelled')
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
}

export function seatsAvailable(d: StudentGroupDeparture): number {
  return Math.max(0, d.capacity - d.bookedSeats);
}

export function isFull(d: StudentGroupDeparture): boolean {
  return d.status === 'full' || seatsAvailable(d) <= 0;
}
