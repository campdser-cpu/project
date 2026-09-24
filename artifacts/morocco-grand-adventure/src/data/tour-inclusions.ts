// ─────────────────────────────────────────────────────────────────────────────
// Tour Inclusions — what a journey's price actually covers, and what it does not.
//
// WHERE EVERY LINE COMES FROM
// Two sources only, both already published on the tour itself:
//
//   1. the tour's own `included` / `excluded` lists in src/data/content.ts.
//      Those strings are authored per journey and are already localized by the
//      content overlays, so they are rendered verbatim — this module never
//      rewrites them, it only classifies and de-duplicates them.
//
//   2. the tour's own itinerary (`description`, `highlights`, `itineraryDays`).
//      An experience is offered as an inclusion only when the itinerary text
//      states it: the camel trek, the desert camp, the camp dinner, the sunrise
//      and so on. If a journey never mentions it, no line is added for it.
//
// The one rule that matters: nothing is invented. No vehicle, guide, camp,
// camel, meal or entrance ticket is ever assumed. Where a tour has no
// `included` list at all, the section is built from the itinerary alone, which
// is why the three-day Marrakech journey shows its real camp and camel instead
// of a generic template that claimed services it never listed.
//
// HEDGED WORDING IS NOT AN INCLUSION
// Several journeys are written quote-first ("private transport when included in
// the confirmed quote", "breakfasts as confirmed", "camel experience when
// specified"). Those lines are shown, but marked `confirmed`: agreed in the
// written quote before payment, rather than promised here. The same applies to
// an itinerary day whose own text hedges what it can provide.
//
// MEALS ARE DERIVED NIGHT BY NIGHT
// "Meals included" is not a fact this project can state. Each night is resolved
// from that night's own itinerary text:
//   · a marker on the night ("(Dinner & Breakfast)", "dinner under the open
//     sky", "Dinner under the stars", "before breakfast") → included;
//   · an unconditional tour-level statement ("Daily breakfast", "Breakfasts
//     daily") → included for every night;
//   · a hedged tour-level statement ("Breakfasts as confirmed") → confirmed;
//   · otherwise → not included, and the traveller is told they are free to
//     choose a local restaurant. A city night is never presented as
//     half-board, and a desert camp dinner is never assumed unless the camp
//     package states it.
// ─────────────────────────────────────────────────────────────────────────────
import type { Tour } from '@/data/content';
import { destinations } from '@/data/content';

export type InclusionKind = 'transport' | 'stay' | 'meal' | 'experience' | 'service' | 'other';
/** `confirmed` = the tour's own wording leaves it to the written quote. */
export type InclusionStatus = 'included' | 'confirmed';
/** Per-night meal state: included, agreed in the quote, or not provided. */
export type MealState = 'included' | 'confirmed' | 'not_included';

export type InclusionItem = {
  id: string;
  kind: InclusionKind;
  status: InclusionStatus;
  /** Verbatim text from the tour's own list, already localized by the overlay. */
  label?: string;
  /** i18n key (jx_inc_*) for an item derived from the itinerary. */
  key?: string;
  /** Nights, for the derived "accommodation as shown in the itinerary" line. */
  nights?: number;
};

export type MealRow = {
  night: number;
  /** Localized place label, read from that night's own itinerary stop. */
  place: string;
  /** Destination id when the night is at a place this site has a page for. */
  placeId?: string;
  breakfast: MealState;
  dinner: MealState;
  /** True when the night is spent in a desert camp. */
  camp: boolean;
};

export type TourInclusions = {
  nights: number;
  included: InclusionItem[];
  notIncluded: InclusionItem[];
  meals: MealRow[];
  /** True when anything is left to the written quote rather than stated. */
  hasConfirmed: boolean;
};

// ── Evidence patterns ───────────────────────────────────────────────────────

/** Wording that hands a detail to the written quote instead of guaranteeing it. */
const HEDGE =
  /\b(when included|when specified|as confirmed|as per the confirmed|per the confirmed|according to|if included|can include|where included|selected package|confirmed (itinerary|quote|package|plan|before payment|around your dates))\b/i;
/** The same hedge, applied to a single itinerary day. */
const DAY_HEDGE = /\b(if included|can include|when included|when specified|where included|according to)\b/i;
/** Meal words used to notice a hedged meal statement ("meals are confirmed before payment"). */
const MEAL_WORD = /\b(meal|meals|half.?board|breakfast|dinner)\b/i;

const BREAKFAST = /\bbreakfasts?\b/i;
const DINNER = /\bdinners?\b/i;
const DAILY_BREAKFAST = /\bdaily breakfasts?\b|\bbreakfasts? daily\b/i;
const DAILY_DINNER = /\bdaily dinners?\b|\bdinners? daily\b/i;

const CAMEL = /\bcamel|dromedar/i;
const CAMP = /desert camp|luxury camp|camp night|desert-camp|night in the dunes|night near the dunes|under the stars/;
const LUXURY_CAMP = /(luxury|deluxe)[^.]{0,24}camp|camp[^.]{0,16}luxury/;
const SUNRISE = /sunrise/;
const SUNSET = /sunset/;
const OFFROAD = /\b4x4\b|four[- ]wheel/;
const KHAMLIA = /khamlia|gnawa/;
const NOMAD = /nomad/;
const SANDBOARD = /sandboard/;
const GUIDED = /official local guide|local guide|guided (tour|visit|walk)/;
const VEHICLE = /vehicle|transport|minivan|minibus|\bcar\b|private driver|driver|fuel|tolls|pick-?up|drop-?off/;

/** Overnight stop, as the itineraries write it ("Overnight: Fes (Breakfast)"). */
const OVERNIGHT = /^overnight\b/i;
/** Stops that are something you do, not somewhere you sleep. */
const NOT_A_PLACE =
  /sunrise|sunset|experience|optional|evening|star|dinner|breakfast|music|tea|drive|transfer|arrival|arrive|departure|free time|leisure|end of tour|route|journey|travell?ers/i;

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Nights stated by the tour's own duration ("3 Days / 2 Nights"). */
export function nightsFromDuration(duration: string, itineraryLength = 0): number {
  const stated = Number((duration.match(/(\d+)\s*Nights?/i) ?? [])[1] ?? NaN);
  if (Number.isFinite(stated)) return stated;
  return Math.max(0, itineraryLength - 1);
}

/** A comparable signature, for spotting a list that says the same thing twice. */
function signature(text: string): string {
  return text
    .toLowerCase()
    .replace(/\b\d+\b/g, ' ')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Indexes to render from a tour's own list.
 *
 * A tour may state the same inclusion twice in different words ("Luxury desert
 * camp" and "1 night luxury desert camp"). The shorter duplicate is dropped so
 * the section reads as value rather than repetition; nothing is rewritten.
 */
function renderableIndexes(canonical: string[]): number[] {
  const sigs = canonical.map(signature);
  const keep: number[] = [];
  for (let i = 0; i < canonical.length; i += 1) {
    let duplicate = false;
    for (let j = 0; j < canonical.length && !duplicate; j += 1) {
      if (i === j) continue;
      const a = sigs[i];
      const b = sigs[j];
      if (!a || !b) continue;
      if (a === b) duplicate = j < i;
      else if (b.includes(a)) duplicate = true;
    }
    if (!duplicate) keep.push(i);
  }
  return keep;
}

function classifyKind(text: string): InclusionKind {
  const s = text.toLowerCase();
  if (/breakfast|dinner|lunch|meal/.test(s)) return 'meal';
  if (/camel|trek|sandboard|\b4x4\b|quad|gnawa|khamlia|nomad|music|desert experience|sunset|sunrise|excursion/.test(s)) {
    return 'experience';
  }
  if (/wifi|water|insurance|assistance|planning|support|\bhelp\b/.test(s)) return 'service';
  if (/riad|hotel|kasbah|guesthouse|camp|accommodation|room|nights?\b/.test(s)) return 'stay';
  if (VEHICLE.test(s)) return 'transport';
  if (/guide|route/.test(s)) return 'service';
  return 'other';
}

const KIND_ORDER: InclusionKind[] = ['transport', 'stay', 'meal', 'experience', 'service', 'other'];

/** Which stop of a night's own itinerary names where the traveller sleeps. */
function overnightIndex(stops: string[]): number {
  const stated = stops.findIndex((s) => OVERNIGHT.test(s.trim()));
  if (stated >= 0) return stated;
  const camp = stops.findIndex((s) => CAMP.test(s.toLowerCase()));
  if (camp >= 0) return camp;
  for (let i = stops.length - 1; i >= 0; i -= 1) {
    if (!NOT_A_PLACE.test(stops[i])) return i;
  }
  return stops.length - 1;
}

/** The place label a night's own stop already carries, cleaned for display. */
function placeLabel(raw: string | undefined): string {
  if (!raw) return '';
  return raw
    .replace(/^\s*overnight\s*(in|:)?\s*/i, '')
    .replace(/\([^)]*\)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * The destination a night's own words end up at, when this site has a page for
 * it. The last mention wins: itineraries run towards the place they sleep.
 * Reading the canonical text keeps the match independent of the translation,
 * and the component swaps the id for the localized place name.
 */
function lastDestinationIn(text: string): string | undefined {
  const haystack = text.toLowerCase();
  let bestId: string | undefined;
  let bestAt = -1;
  for (const d of destinations) {
    const at = haystack.lastIndexOf(d.name.toLowerCase());
    if (at > bestAt) {
      bestAt = at;
      bestId = d.id;
    }
  }
  return bestAt >= 0 ? bestId : undefined;
}

function mealStateFor(
  dayText: string,
  mealPattern: RegExp,
  hedgedMealsInText: boolean,
  daily: boolean,
  hedgedTourLevel: boolean,
): MealState {
  if (mealPattern.test(dayText)) return 'included';
  if (daily) return 'included';
  if (hedgedMealsInText || hedgedTourLevel) return 'confirmed';
  return 'not_included';
}


// ── Derivation ──────────────────────────────────────────────────────────────

/**
 * Derive what a tour's price covers.
 *
 * `canonical` is the English tour (the rules read English itinerary text);
 * `localized` is the same tour in the active language, used only to pick up
 * already-translated list entries and place names. Both are required because
 * matching stop text inside a translation would silently find nothing.
 */
export function deriveTourInclusions(canonical: Tour, localized: Tour): TourInclusions {
  const days = canonical.itineraryDays ?? [];
  const ownIncluded = canonical.included ?? [];
  const ownExcluded = canonical.excluded ?? [];
  const ownIncludedText = ownIncluded.join(' | ').toLowerCase();
  const ownExcludedText = ownExcluded.join(' | ').toLowerCase();
  const corpus = [
    canonical.description ?? '',
    ...(canonical.highlights ?? []),
    ...ownIncluded,
    ...days.flatMap((d) => [d.title, d.desc, ...d.stops]),
  ]
    .join(' | ')
    .toLowerCase();

  const nights = nightsFromDuration(canonical.duration, days.length);

  // ── Meals, night by night ────────────────────────────────────────────────
  const breakfastEntry = ownIncluded.find((s) => BREAKFAST.test(s));
  const dinnerEntry = ownIncluded.find((s) => DINNER.test(s));
  const breakfastDaily = ownIncluded.some((s) => DAILY_BREAKFAST.test(s));
  const dinnerDaily = ownIncluded.some((s) => DAILY_DINNER.test(s));
  const breakfastHedged = Boolean(breakfastEntry && HEDGE.test(breakfastEntry));
  const dinnerHedged = Boolean(dinnerEntry && HEDGE.test(dinnerEntry));

  const meals: MealRow[] = [];
  for (let night = 1; night <= nights; night += 1) {
    const index = night - 1;
    const day = days[index];
    if (!day) break;
    const dayText = `${day.title} ${day.desc} ${day.stops.join(' ')}`;
    const hedgedMeals = (DAY_HEDGE.test(dayText) || HEDGE.test(dayText)) && MEAL_WORD.test(dayText);
    const stops = day.stops ?? [];
    const localizedStops = localized.itineraryDays?.[index]?.stops ?? stops;
    const stopIndex = overnightIndex(stops);
    // Where this night is spent: the itinerary's own overnight stop when it
    // marks one, otherwise the destination the day ends at. Reading the
    // canonical text keeps the match independent of the translation; the
    // component swaps the id for the localized place name.
    const explicitStop =
      OVERNIGHT.test((stops[stopIndex] ?? '').trim()) || CAMP.test((stops[stopIndex] ?? '').toLowerCase());
    // Match destinations against where the day's own title ends (the place the
    // itinerary says it arrives at) and its last place-like stop — not the whole
    // description, which can name a valley the day only drives through, or the
    // city it departed from.
    const titleEnd = (day.title.split('→').pop() ?? day.title).trim();
    const placeId = explicitStop
      ? lastDestinationIn(stops[stopIndex] ?? '')
      : lastDestinationIn(titleEnd) ?? lastDestinationIn(stops[stopIndex] ?? '');
    meals.push({
      night,
      place: placeLabel(localizedStops[stopIndex] ?? localizedStops[localizedStops.length - 1] ?? day.title),
      ...(placeId ? { placeId } : {}),
      breakfast: mealStateFor(dayText, BREAKFAST, hedgedMeals, breakfastDaily, breakfastHedged),
      dinner: mealStateFor(dayText, DINNER, hedgedMeals, dinnerDaily, dinnerHedged),
      camp: CAMP.test(stops.join(' ').toLowerCase()),
    });
  }
  const campNights = meals.filter((m) => m.camp);


  // ── Included ─────────────────────────────────────────────────────────────
  const included: InclusionItem[] = [];
  for (const i of renderableIndexes(ownIncluded)) {
    included.push({
      id: `own-${i}`,
      kind: classifyKind(ownIncluded[i]),
      status: HEDGE.test(ownIncluded[i]) ? 'confirmed' : 'included',
      label: (localized.included ?? ownIncluded)[i] ?? ownIncluded[i],
    });
  }

  const derived: (InclusionItem & { covers: RegExp })[] = [];
  if (VEHICLE.test(corpus)) {
    derived.push({ id: 'transport', kind: 'transport', status: 'included', key: 'jx_inc_transport', covers: VEHICLE });
  }
  if (nights > 0 && /\b(night|camp|overnight)/.test(corpus)) {
    derived.push({
      id: 'stay',
      kind: 'stay',
      status: 'included',
      key: 'jx_inc_stay',
      nights,
      covers: /riad|hotel|kasbah|guesthouse|camp|accommodation|room|night/,
    });
  }
  if (CAMEL.test(corpus)) {
    derived.push({ id: 'camel', kind: 'experience', status: 'included', key: 'jx_inc_camel', covers: CAMEL });
  }
  if (CAMP.test(corpus)) {
    derived.push({
      id: 'camp',
      kind: 'stay',
      status: 'included',
      key: LUXURY_CAMP.test(corpus) ? 'jx_inc_luxury_camp' : 'jx_inc_camp',
      covers: CAMP,
    });
  }
  if (SUNRISE.test(corpus)) {
    derived.push({ id: 'sunrise', kind: 'experience', status: 'included', key: 'jx_inc_sunrise', covers: SUNRISE });
  }
  if (SUNSET.test(corpus) && !CAMEL.test(corpus)) {
    derived.push({ id: 'sunset', kind: 'experience', status: 'included', key: 'jx_inc_sunset', covers: SUNSET });
  }
  if (OFFROAD.test(corpus)) {
    derived.push({ id: 'offroad', kind: 'experience', status: 'included', key: 'jx_inc_4x4', covers: OFFROAD });
  }
  if (KHAMLIA.test(corpus)) {
    derived.push({ id: 'khamlia', kind: 'experience', status: 'included', key: 'jx_inc_khamlia', covers: KHAMLIA });
  }
  if (NOMAD.test(corpus)) {
    derived.push({ id: 'nomad', kind: 'experience', status: 'included', key: 'jx_inc_nomad', covers: NOMAD });
  }
  if (SANDBOARD.test(corpus)) {
    derived.push({
      id: 'sandboard',
      kind: 'experience',
      status: 'included',
      key: 'jx_inc_sandboard',
      covers: SANDBOARD,
    });
  }
  if (GUIDED.test(corpus)) {
    derived.push({ id: 'guided', kind: 'service', status: 'included', key: 'jx_inc_guided', covers: /guide/ });
  }

  // A meal becomes a headline inclusion only when it is genuinely provided: the
  // night-by-night table below carries the exceptions.
  const anyBreakfast = meals.some((m) => m.breakfast !== 'not_included');
  if (anyBreakfast && !breakfastEntry) {
    derived.push({
      id: 'breakfast',
      kind: 'meal',
      status: meals.some((m) => m.breakfast === 'included') ? 'included' : 'confirmed',
      key: 'jx_inc_breakfast',
      covers: BREAKFAST,
    });
  }
  const breakfastCamp = campNights.find((m) => m.breakfast !== 'not_included');
  if (breakfastCamp) {
    derived.push({
      id: 'breakfast-camp',
      kind: 'meal',
      status: breakfastCamp.breakfast === 'included' ? 'included' : 'confirmed',
      key: 'jx_inc_breakfast_camp',
      covers: /camp[^|]{0,40}breakfast|breakfast[^|]{0,40}camp/,
    });
  }
  const dinnerCamp = campNights.find((m) => m.dinner !== 'not_included');
  if (dinnerCamp) {
    derived.push({
      id: 'dinner-camp',
      kind: 'meal',
      status: dinnerCamp.dinner === 'included' ? 'included' : 'confirmed',
      key: 'jx_inc_dinner_camp',
      covers: /camp[^|]{0,40}dinner|dinner[^|]{0,40}camp/,
    });
  }

  // A derived line is added only when the itinerary states it AND the tour's own
  // list does not already cover the subject. A journey written quote-first
  // ("if included in the confirmed itinerary") marks its derived lines as
  // confirmed too, so the section never promises what the route itself hedges.
  const quoteFirst = HEDGE.test(corpus) && DAY_HEDGE.test(corpus);
  for (const item of derived) {
    if (item.covers.test(ownIncludedText)) continue;
    if (included.some((existing) => existing.id === item.id)) continue;
    included.push({
      id: item.id,
      kind: item.kind,
      status: item.status === 'confirmed' || quoteFirst ? 'confirmed' : 'included',
      key: item.key,
      ...(item.nights ? { nights: item.nights } : {}),
    });
  }

  const kindRank = (k: InclusionKind) => KIND_ORDER.indexOf(k);
  included.sort((a, b) => kindRank(a.kind) - kindRank(b.kind));

  // ── Not included ─────────────────────────────────────────────────────────
  const notIncluded: InclusionItem[] = [];
  for (const i of renderableIndexes(ownExcluded)) {
    notIncluded.push({
      id: `own-${i}`,
      kind: 'other',
      status: 'included',
      label: (localized.excluded ?? ownExcluded)[i] ?? ownExcluded[i],
    });
  }
  // Baseline exclusions that hold for every journey offered here, added only
  // when the tour's own list does not already say them. These are restrictions,
  // never services: nothing is claimed that the tour has not published.
  const baseline: { key: string; covers: RegExp }[] = [
    { key: 'tour_exc_flights', covers: /flight|airfare/ },
    { key: 'tour_exc_lunches', covers: /lunch|drink/ },
    { key: 'tour_exc_entrance', covers: /entrance|monument|museum|ticket/ },
    { key: 'tour_exc_tips', covers: /tip|gratuit|personal expense/ },
  ];
  for (const item of baseline) {
    if (item.covers.test(ownExcludedText)) continue;
    notIncluded.push({ id: `base-${item.key}`, kind: 'other', status: 'included', key: item.key });
  }

  return {
    nights,
    included,
    notIncluded,
    meals,
    hasConfirmed:
      included.some((i) => i.status === 'confirmed') ||
      meals.some((m) => m.breakfast === 'confirmed' || m.dinner === 'confirmed'),
  };
}

