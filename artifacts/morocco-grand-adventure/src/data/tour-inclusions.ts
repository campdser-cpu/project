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
  dinnerSummary: { count: number; nights: { night: number; place: string; placeId?: string }[] };
  cityDinnersExcluded: { place: string; placeId?: string; nights: number[] }[];
  /** True when anything is left to the written quote rather than stated. */
  hasConfirmed: boolean;
};

// ── Evidence patterns ───────────────────────────────────────────────────────

const VAGUE_DINNER =
  /\bdinners?\s+(as per|according to|per)\s+(the\s+)?itinerary\b/i;

/** Wording that hands a detail to the written quote instead of guaranteeing it. */
const HEDGE =
  /\b(when included|when specified|as confirmed|as per the confirmed|per the confirmed|according to|if included|can include|where included|selected package|confirmed (itinerary|quote|package|plan|before payment|around your dates))\b/i;
/** The same hedge, applied to a single itinerary day. */
const DAY_HEDGE = /\b(if included|can include|when included|when specified|where included|according to)\b/i;
/** Meal words used to notice a hedged meal statement ("meals are confirmed before payment"). */
const MEAL_WORD = /\b(meal|meals|half.?board|breakfast|dinner)\b/i;

/** Meal words, multilingual: the tour-level lists are localized by overlays. */
const BREAKFAST_WORD =
  /breakfasts?|petit[-\s]?d[ée]jeuner|desayuno|colazione|fr[üu]hst[üu]ck|ontbijt|pequeno|早餐|朝食|아침| ?إفطار|فطور/i;
const DINNER_WORD =
  /dinners?|d[uû]ners?|cenas?|abendessen|diners?|jantares?|晚餐|夕食|저녁| ?عشاء/i;
/** Markers on the night's own stop: "(Dinner & Breakfast)" / "(Breakfast)". */
const BREAKFAST_MARKER = new RegExp(`\\((?:${BREAKFAST_WORD.source})[^)]*\\)`, 'i');
const DINNER_MARKER = new RegExp(`\\((?:${DINNER_WORD.source})[^)]*\\)|\\([^)]*(?:${DINNER_WORD.source})\\)`, 'i');
const BREAKFAST = BREAKFAST_WORD;
const DINNER = DINNER_WORD;
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
/** The same marker inside a content overlay (non-English "overnight"). */
const OVERNIGHT_LOCALIZED =
  /overnight|nuit[eé]e?|noche|nott[ea]|nacht|übernachtung|noite|overnachting|overnattning|overnattelse|yöpyminen|éjszaka| overnatning|nocleg|noćenje|nočitev|innoptare| overnighter| övernattning|nat[:\s]|ночь|ночлег| overnachten| overnachting| overnatter| overnatt|نوم|مبيت|ليلة|过夜|住宿|泊|박|숙박|宿泊/i;
/** Meal evidence and itinerary matching ─────────────────────────────────────── */

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
function overnightIndex(stops: string[], localizedStops: string[] = stops): number {
  // Match against the canonical AND the localized stops: an overlay whose
  // translation drops the "Overnight" wording must not lose the night.
  const stated = stops.findIndex((s) => OVERNIGHT.test(s.trim()));
  if (stated >= 0) return stated;
  const localizedStated = localizedStops.findIndex((s) => OVERNIGHT_LOCALIZED.test(s.trim()));
  if (localizedStated >= 0) return localizedStated;
  const camp = stops.findIndex((s) => CAMP.test(s.toLowerCase()));
  if (camp >= 0) return camp;
  const accommodation = stops.findIndex((s) => /\b(hotel|riad|camp|riad|kasbah|guesthouse|desert camp|luxury desert camp)\b/i.test(s));
  if (accommodation >= 0) return accommodation;
  // No actual overnight/accommodation stop is named. Return -1 so the caller
  // uses the day's arrival destination rather than an activity stop such as
  // "Souks & pottery workshops".
  return -1;
}

/** The place label a night's own stop already carries, cleaned for display.
 * Accommodation qualifiers are kept ("Luxury Desert Camp", "Merzouga Hotel")
 * so nights in different beds never collapse to one destination name. Only
 * the overnight prefix (in any overlay language) and the meal marker
 * ("(Dinner & Breakfast)") are removed. */
function placeLabel(raw: string | undefined): string {
  if (!raw) return '';
  const cleaned = raw
    .replace(/^\s*(overnight|nuit[eé]e?|noche|nott[ea]|nacht|übernachtung|noite|overnachting|overnattning|overnattelse|yöpyminen|éjszaka|overnatning|nocleg|noćenje|nočitev|innoptare|overnighter|övernattning|نوم|مبيت|ليلة|过夜|住宿|第.{0,4}晚|泊目|박째|숙박|宿泊)(?:\s+in)?\s*[:：]?\s*/iu, '')
    .replace(/\([^)]*\)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return /^merzouga(\s+hotel)?$/i.test(cleaned) ? 'Merzouga Hotel' : cleaned;
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
  nightText: string,
  meal: 'breakfast' | 'dinner',
  hedgedMealsInText: boolean,
  daily: boolean,
  hedgedTourLevel: boolean,
): MealState {
  // Evidence for THIS night only: its own stop's marker ("(Dinner &
  // Breakfast)", "(Breakfast)"), or prose that serves the meal AT the stay
  // ("traditional Moroccan dinner ... before sleeping ... in the camp";
  // "wake for sunrise ... and breakfast in Merzouga"). A bare meal word
  // elsewhere, or a meal served in another city, is never enough on its own.
  const marker = meal === 'breakfast' ? BREAKFAST_MARKER : DINNER_MARKER;
  if (marker.test(nightText)) return 'included';
  const serves =
    meal === 'breakfast' ? servesBreakfastAtStay(dayText, nightText) : servesDinnerAtStay(dayText, nightText);
  if (serves) return 'included';
  if (daily) return 'included';
  if (hedgedMealsInText || hedgedTourLevel) return 'confirmed';
  return 'not_included';
}


// ── Word-boundary + multilingual night matching ─────────────────────────────

/** True when `text` contains `word` as a standalone token (Unicode-aware). */
function hasWord(text: string, word: string): boolean {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}([^\\p{L}\\p{N}]|$)`, 'iu').test(text);
}

/** The stay a night's own stop names ("Luxury Desert Camp", "Fes"). */
function nightStayName(nightText: string): string {
  return placeLabel(nightText).toLowerCase();
}

/**
 * True when the day's prose serves dinner AT this night's stay.
 *
 * The meal and the stay must appear in the same sentence: "enjoy a
 * traditional Moroccan dinner ... before sleeping under the stars in a
 * luxury desert camp". A dinner served in another city never qualifies.
 */
function servesDinnerAtStay(dayText: string, nightText: string): boolean {
  const stay = nightStayName(nightText);
  const sentences = dayText.split(/(?<=[.!?])\s+/u);
  const stayWords = stay.split(/[^a-z0-9\u00c0-\u024f\u1e00-\u1eff]+/iu).filter((w) => w.length > 3);
  const stayIn = (s: string) => {
    const low = s.toLowerCase();
    if (stay && low.includes(stay)) return true;
    if (/\bcamp\b/i.test(stay) && /\bcamp\b/i.test(s)) return true;
    if (/\bhotel\b/i.test(stay) && /\bhotel\b/i.test(s)) return true;
    if (/\bdesert\b/i.test(stay) && /\bdesert\b/i.test(s)) return true;
    return stayWords.length > 0 && stayWords.some((w) => low.includes(w));
  };
  for (const s of sentences) {
    if (!hasWord(s, 'dinner') && !/d[uû]ner|cena|abendessen|diner|jantar|晚餐|夕食|저녁| عشاء/i.test(s)) continue;
    // A dinner word by itself is not enough. It must be tied to this night's
    // stay (camp/hotel/riad), or explicitly be a camp meal. This prevents a
    // dinner mentioned in a city description from becoming a city inclusion.
    if (!stayIn(s) && !/camp[^.]{0,50}(dinner|meal)|(?:dinner|meal)[^.]{0,50}camp/i.test(s)) continue;
    if (
      /camp[^.]{0,60}dinner|dinner[^.]{0,60}camp|campfire[^.]{0,40}dinner|dinner[^.]{0,40}campfire|half.?board|full.?board|demi.?pension|pensi[oó]n|mezza pensione|halvpension|volpension/i.test(
        s,
      ) ||
      /traditional[^.]{0,40}dinner|dinner[^.]{0,40}berber|berber[^.]{0,40}dinner|moroccan dinner/i.test(s) ||
      (/sleep|overnight|stay/i.test(s) && stayIn(s))
    ) {
      return true;
    }
  }
  return false;
}

/**
 * True when the day's prose serves breakfast AT this night's stay.
 *
 * Same-sentence rule as dinner: "wake for sunrise over the dunes and
 * breakfast in Merzouga", "after breakfast, marvel at ... then ... before
 * sleeping ... in the camp".
 */
function servesBreakfastAtStay(dayText: string, nightText: string): boolean {
  const stay = nightStayName(nightText);
  const stayWords = stay.split(/[^a-z0-9\u00c0-\u024f\u1e00-\u1eff]+/iu).filter((w) => w.length > 3);
  const mentionsStay = (s: string) => {
    const low = s.toLowerCase();
    if (stay && low.includes(stay)) return true;
    if (stayWords.length > 0 && stayWords.some((w) => low.includes(w))) return true;
    return /\bcamp\b/i.test(stay) && /\bcamp\b/i.test(s);
  };
  if (/half.?board|full.?board|bed[^&]*&[^&]*breakfast|breakfast included/i.test(dayText)) return true;
  const sentences = dayText.split(/(?<=[.!?])\s+/u);
  for (const s of sentences) {
    if (!/breakfast|petit[-\s]?d[ée]jeuner|desayuno|colazione|fr[üu]hst[üu]ck|ontbijt|pequeno|早餐|朝食|아침| إفطار|فطور/i.test(s)) {
      continue;
    }
    // Breakfast must be connected to this stay. A generic "after breakfast"
    // at the start of a travel day is not enough by itself.
    if (mentionsStay(s) && /breakfast|petit[-\s]?d[ée]jeuner|desayuno|colazione|fr[üu]hst[üu]ck|ontbijt|pequeno|早餐|朝食|아침| إفطار|فطور/i.test(s)) {
      return true;
    }
  }
  return false;
}

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
  const breakfastEntry = ownIncluded.find((s) => BREAKFAST.test(s) && !DAILY_BREAKFAST.test(s));
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
    const nextDay = days[index + 1];
    const nextText = nextDay ? `${nextDay.title} ${nextDay.desc} ${nextDay.stops.join(' ')}` : '';
    const stops = day.stops ?? [];
    const localizedStops = localized.itineraryDays?.[index]?.stops ?? stops;
    // Match the overnight stop against the canonical AND the localized text:
    // when an overlay drops the English "Overnight" wording, the localized
    // stop still names the same night.
    const stopIndex = overnightIndex(stops, localizedStops);
    // The night's own text is where its meals are stated: its overnight stop
    // first, then — only when the stop carries no marker — the day's own
    // prose that serves a meal AT that stay. Never the whole corpus: a
    // "dinner" mentioned for another city must not leak into this night.
    const nightStop = stops[stopIndex] ?? '';
    const localizedNightStop = localizedStops[stopIndex] ?? nightStop;
    const nightText = `${nightStop} ${localizedNightStop}`;
    const dayText = `${day.title} ${day.desc} ${stops.join(' ')}`;
    const hedgedMeals = (DAY_HEDGE.test(dayText) || HEDGE.test(dayText)) && MEAL_WORD.test(dayText);
    // The place shown for this night is the itinerary's own overnight stop
    // when it names one. Otherwise use the destination the day actually
    // arrives at, never the last activity stop ("Souks & pottery workshops").
    const explicitStop =
      OVERNIGHT.test((stops[stopIndex] ?? '').trim()) ||
      OVERNIGHT_LOCALIZED.test((localizedStops[stopIndex] ?? '').trim()) ||
      CAMP.test((stops[stopIndex] ?? '').toLowerCase());
    const titleEnd = (day.title.split('→').pop() ?? day.title).trim();
    const placeId = explicitStop
      ? lastDestinationIn(stops[stopIndex] ?? '')
      : lastDestinationIn(titleEnd) ?? lastDestinationIn(stops[stopIndex] ?? '');
    const rawPlace = explicitStop
      ? localizedStops[stopIndex] ?? stops[stopIndex]
      : placeId
        ? destinations.find((d) => d.id === placeId)?.name
        : titleEnd;
    meals.push({
      night,
      place: placeLabel(rawPlace) || placeLabel(localizedStops[stopIndex] ?? localizedStops[localizedStops.length - 1] ?? ''),
      ...(placeId ? { placeId } : {}),
      // The morning meal at a stay is served the NEXT morning: "Wake for
      // sunrise over the dunes and breakfast in Merzouga" belongs to the
      // night that ends at the stay, not to the day that starts there.
      breakfast: mealStateFor(`${dayText} ${nextText}`, nightText, 'breakfast', hedgedMeals, breakfastDaily, breakfastHedged),
      dinner: mealStateFor(dayText, nightText, 'dinner', hedgedMeals, dinnerDaily, dinnerHedged),
      camp: CAMP.test(stops.join(' ').toLowerCase()),
    });
  }
  const campNights = meals.filter((m) => m.camp);


  // The night-by-night table is the transparent source of truth for dinners:
  // the vague tour-level line ("Dinners as per itinerary", localized as
  // "Dîners selon l'itinéraire", etc.) is never rendered alongside the table,
  // which already shows which nights include dinner.
  const included: InclusionItem[] = [];
  for (const i of renderableIndexes(ownIncluded)) {
    // The exact breakfast count is rendered from the night table. Do not show
    // the canonical "Daily breakfasts" shorthand a second time beside it.
    if (DAILY_BREAKFAST.test(ownIncluded[i]) && meals.length > 0) continue;
    if (DAILY_DINNER.test(ownIncluded[i]) && meals.length > 0) continue;
    if (VAGUE_DINNER.test(ownIncluded[i]) && meals.length > 0) continue;
    if (VAGUE_DINNER.test((localized.included ?? [])[i] ?? '') && meals.length > 0) continue;
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
  if (anyBreakfast && !breakfastEntry && !breakfastDaily) {
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

  // ── Dinner summary: the exact nights, from the night table ────────────────
  // Replaces the vague "Dinners as per itinerary" with the factual list:
  // "3 dinners: Dades Valley, Luxury Desert Camp, Merzouga Hotel". City
  // nights without dinner ("Overnight: Fes (Breakfast)") group into
  // "Dinner in Fes / Dinner in Marrakech" exclusion lines instead of a
  // blanket "Dinner not included" that would contradict the included ones.
  const dinnerNights = meals
    .filter((m) => m.dinner === 'included')
    .map((m) => ({ night: m.night, place: m.place, ...(m.placeId ? { placeId: m.placeId } : {}) }));
  const dinnerSummary = { count: dinnerNights.length, nights: dinnerNights };
  const cityGroups = new Map<string, { place: string; placeId?: string; nights: number[] }>();
  for (const m of meals.filter((m) => m.dinner === 'not_included' && !m.camp)) {
    // Only summarize imperial-city nights as "Dinner in Fes" / "Dinner in
    // Marrakech". A missing dinner in a non-city overnight is already clear in
    // the night table; do not mislabel it as a city dinner.
    const destination = m.placeId ? destinations.find((d) => d.id === m.placeId) : undefined;
    if (!destination || destination.category !== 'Imperial Cities') continue;
    const key = (m.placeId ?? m.place).toLowerCase();
    const existing = cityGroups.get(key);
    if (existing) existing.nights.push(m.night);
    else cityGroups.set(key, { place: m.place, ...(m.placeId ? { placeId: m.placeId } : {}), nights: [m.night] });
  }
  const cityDinnersExcluded = [...cityGroups.values()];

  // ── Not included ─────────────────────────────────────────────────────────
  // Only the tour's own excluded list is shown. Nothing is added from a
  // universal policy: a tour that does not state flights, lunches, fees, or
  // tips in its canonical `excluded` list must not be told it excludes them.
  const notIncluded: InclusionItem[] = [];
  for (const i of renderableIndexes(ownExcluded)) {
    notIncluded.push({
      id: `own-${i}`,
      kind: 'other',
      status: 'included',
      label: (localized.excluded ?? ownExcluded)[i] ?? ownExcluded[i],
    });
  }

  return {
    nights,
    included,
    notIncluded,
    meals,
    dinnerSummary,
    cityDinnersExcluded,
    hasConfirmed:
      included.some((i) => i.status === 'confirmed') ||
      meals.some((m) => m.breakfast === 'confirmed' || m.dinner === 'confirmed'),
  };
}

