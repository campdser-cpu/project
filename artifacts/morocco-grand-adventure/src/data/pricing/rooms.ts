// ─────────────────────────────────────────────────────────────────────────────
// Room arrangements — which sleeping arrangements a party can actually be offered.
//
// This file carries no money. It answers one question: given N travellers, what
// may we honestly put on screen?
//
// The hard rule is that we never invent a room type. Morocco Grand Adventure
// does not own the guesthouses and riads on its routes and this project holds no
// room inventory for them — a repository-wide search for "triple room", "family
// room", "occupancy" and "room type" returns nothing. So:
//
//   · Double and twin are offered. Every property on these routes sleeps two in
//     a room, and the choice between one bed and two is a real one a traveller
//     cares about.
//   · Single occupancy is offered. It is an occupancy, not a room type — any
//     room can hold one person — and it is what an odd-numbered party or a
//     traveller who wants their own room actually books.
//   · Triple and family rooms are NOT offered. They are distinct room types that
//     a given property either has or does not, and we have no inventory to check.
//     A five-traveller party is therefore shown two shared rooms plus a single,
//     never an invented "1 Double + 1 Triple".
//
// Every party size also gets the deferred option, and it is the default: we
// confirm the arrangement with the properties on the route before anyone pays.
// That is what actually happens, and it is the honest answer while inventory is
// unknown. Choosing a concrete arrangement is a preference we carry to the
// operator, not a reservation the site can hold.
// ─────────────────────────────────────────────────────────────────────────────

/** A room type we can honestly offer. `single` is one traveller in a room. */
export type RoomType = 'double' | 'twin' | 'single';

/** A count of one room type within an arrangement. */
export type RoomBlock = { readonly type: RoomType; readonly count: number };

export type RoomArrangement =
  /** No concrete arrangement chosen — we confirm it with the properties. */
  | { readonly kind: 'defer'; readonly id: 'defer' }
  /** A specific set of rooms the traveller asked for. */
  | { readonly kind: 'rooms'; readonly id: string; readonly blocks: readonly RoomBlock[] };

/** A concrete arrangement, i.e. not the deferred one. */
export type ConcreteArrangement = Extract<RoomArrangement, { kind: 'rooms' }>;

/** The deferred arrangement — always available, always the default. */
export const DEFER: RoomArrangement = { kind: 'defer', id: 'defer' };

/** Build a concrete arrangement from its room blocks. */
export function rooms(blocks: readonly RoomBlock[]): ConcreteArrangement {
  return { kind: 'rooms', id: arrangementId(blocks), blocks };
}

/**
 * Above this party size we stop enumerating combinations. A party of ten has
 * dozens of shapes, none of which we can check against real inventory, and a
 * wall of radio buttons is worse than the honest answer. Larger groups get the
 * deferred option alone and we work it out with them.
 */
export const MAX_ENUMERATED_TRAVELERS = 8;

/** Travellers a `single` room sleeps, versus a shared room. */
const SLEEPS: Record<RoomType, number> = { double: 2, twin: 2, single: 1 };

/** Whether the arrangement is the deferred one. */
export function isDeferred(a: RoomArrangement): a is Extract<RoomArrangement, { kind: 'defer' }> {
  return a.kind === 'defer';
}

/** Rooms in an arrangement; 0 for the deferred option, which commits to none. */
export function roomCount(a: RoomArrangement): number {
  return isDeferred(a) ? 0 : a.blocks.reduce((n, b) => n + b.count, 0);
}

/** Rooms held for a single traveller — what a single supplement is charged on. */
export function singleRoomCount(a: RoomArrangement): number {
  return isDeferred(a) ? 0 : a.blocks.filter((b) => b.type === 'single').reduce((n, b) => n + b.count, 0);
}

/** Travellers an arrangement sleeps; used to check it matches the party. */
export function sleeps(a: RoomArrangement): number {
  return isDeferred(a) ? 0 : a.blocks.reduce((n, b) => n + b.count * SLEEPS[b.type], 0);
}

/** Whether a concrete arrangement sleeps exactly this party. */
export function fitsParty(a: RoomArrangement, travelers: number): boolean {
  return isDeferred(a) || sleeps(a) === travelers;
}

/** Stable id for an arrangement, e.g. `2double` or `1double+1twin+1single`. */
function arrangementId(blocks: readonly RoomBlock[]): string {
  return blocks.map((b) => `${b.count}${b.type}`).join('+');
}

/**
 * Every arrangement we can honestly offer a party of this size, deferred first.
 *
 * For an even party the shared rooms can be split any way between doubles and
 * twins; an odd party takes the same shared rooms plus one single. Parties of
 * two or more also get the all-single option, for travellers who each want their
 * own room. Nothing here depends on a room type we cannot evidence.
 */
export function roomArrangements(travelers: number): readonly RoomArrangement[] {
  const n = Math.floor(travelers);
  if (!Number.isFinite(n) || n < 1) return [DEFER];
  if (n > MAX_ENUMERATED_TRAVELERS) return [DEFER];

  const out: RoomArrangement[] = [DEFER];
  const pairs = Math.floor(n / 2);
  const leftover = n % 2; // 0 or 1 — the traveller with no one to share with

  for (let doubles = pairs; doubles >= 0; doubles--) {
    const blocks: RoomBlock[] = [];
    if (doubles > 0) blocks.push({ type: 'double', count: doubles });
    if (pairs - doubles > 0) blocks.push({ type: 'twin', count: pairs - doubles });
    if (leftover > 0) blocks.push({ type: 'single', count: leftover });
    if (blocks.length === 0) continue;
    out.push(rooms(blocks));
  }

  // A room each. For an odd party this is already the last entry above only when
  // n === 1, so guard against listing it twice.
  if (n >= 2) {
    const allSingle = rooms([{ type: 'single', count: n }]);
    if (!out.some((a) => a.id === allSingle.id)) out.push(allSingle);
  }

  return out;
}

/** Look one up by id, falling back to the deferred option. */
export function findArrangement(travelers: number, id: string): RoomArrangement {
  return roomArrangements(travelers).find((a) => a.id === id) ?? DEFER;
}

/**
 * Human label, assembled from localized room-type names.
 *
 * Deliberately built as "2 × Double" rather than pluralised prose: the site runs
 * in eleven languages whose plural rules differ (Arabic alone has a dual), and
 * inventing plural forms per locale is exactly the sort of fake terminology the
 * content rules forbid. A count, a multiplication sign and a localized noun read
 * correctly in every one of them, in both text directions.
 */
export function arrangementLabel(a: RoomArrangement, t: (key: string) => string): string {
  if (isDeferred(a)) return t('px_room_defer');
  return a.blocks.map((b) => `${b.count} × ${t(`px_room_${b.type}`)}`).join(' + ');
}

/** Room-type names for the operator-facing inquiry, which is always English. */
const EN_ROOM: Record<RoomType, string> = {
  double: 'Double',
  twin: 'Twin',
  single: 'Single occupancy',
};

/**
 * Label for the message sent to Morocco Grand Adventure. The traveller reads the
 * localized label; the operator reads this one, in one language, always.
 */
export function arrangementLabelEn(a: RoomArrangement): string {
  if (isDeferred(a)) return 'To be confirmed with us';
  return a.blocks.map((b) => `${b.count} × ${EN_ROOM[b.type]}`).join(' + ');
}
