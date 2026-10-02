import assert from 'node:assert/strict';
import { tours } from '../src/data/content';
import { deriveTourInclusions } from '../src/data/tour-inclusions';
import { getLocalizedTour, registerOverlay } from '../src/i18n/content';
import { journeyGaps } from '../src/i18n/gaps/journey';
import fr from '../src/i18n/content/generated/fr.json';

function tour(id: string, duration: string, stops: string[], included: string[] = [], excluded: string[] = []): any {
  return {
    id,
    name: id,
    duration,
    highlights: [],
    price: '0',
    pricingTiers: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    image: '',
    itineraryDays: stops.map((stop, index) => ({
      day: index + 1,
      title: `Day ${index + 1}`,
      desc: '',
      stops: [stop],
    })),
    included,
    excluded,
  };
}

function mealState(duration: string, stops: string[], meal: 'breakfast' | 'dinner', included: string[] = [], excluded: string[] = []) {
  const id = `test-${meal}-${duration}`;
  const canonical = tour(id, duration, stops, included, excluded);
  return deriveTourInclusions(canonical, canonical).meals.map((row) => row[meal]);
}

registerOverlay('fr', fr as any);

// A–C: explicit dinner + breakfast markers at each accommodation type.
assert.deepEqual(mealState('1 Days / 1 Nights', ['Overnight: Luxury Desert Camp (Dinner & Breakfast)'], 'dinner'), ['included']);
assert.deepEqual(mealState('1 Days / 1 Nights', ['Overnight: Luxury Desert Camp (Dinner & Breakfast)'], 'breakfast'), ['included']);
assert.deepEqual(mealState('1 Days / 1 Nights', ['Overnight: Dades Valley (Dinner & Breakfast)'], 'dinner'), ['included']);
assert.deepEqual(mealState('1 Days / 1 Nights', ['Overnight: Dades Valley (Dinner & Breakfast)'], 'breakfast'), ['included']);
assert.deepEqual(mealState('1 Days / 1 Nights', ['Overnight: Merzouga Hotel (Dinner & Breakfast)'], 'dinner'), ['included']);
assert.deepEqual(mealState('1 Days / 1 Nights', ['Overnight: Merzouga Hotel (Dinner & Breakfast)'], 'breakfast'), ['included']);

// D–G: confirmed MGA policy — dinner is not included on an Imperial City
// night (Fes, Marrakech, Meknès, Casablanca, Rabat) absent real per-night
// evidence to the contrary. This is a definite 'not_included', not a guess.
assert.deepEqual(mealState('3 Days / 2 Nights', ['Overnight: Fes (Breakfast)', 'Overnight: Marrakech (Breakfast)'], 'dinner'), ['not_included', 'not_included']);
assert.deepEqual(mealState('4 Days / 3 Nights', ['Overnight: Fes (Breakfast)', 'Overnight: Fes (Breakfast)', 'Overnight: Marrakech (Breakfast)'], 'dinner'), ['not_included', 'not_included', 'not_included']);
assert.deepEqual(mealState('2 Days / 1 Nights', ['Overnight: Fes (Breakfast)'], 'dinner'), ['not_included']);

// G–H: optional activities and explicitly excluded entry costs remain separate.
const optional = tour('optional', '2 Days / 1 Nights', ['Overnight: Marrakech'], ['Sunset camel trek'], ['Optional quad biking', 'Monument entrance fees']);
const optionalResult = deriveTourInclusions(optional, optional);
assert.ok(optionalResult.included.some((item) => item.label === 'Sunset camel trek'));
assert.ok(optionalResult.notIncluded.some((item) => item.label === 'Optional quad biking'));
assert.ok(optionalResult.notIncluded.some((item) => item.label === 'Monument entrance fees'));
assert.equal(optionalResult.notIncluded.some((item) => item.label === 'International flights'), false);

// Canonical 3-day case: two nights only, both at desert/southern destinations
// (category 'Sahara Desert') — Dades Valley and the Erg Chebbi desert camp.
// Neither night's itinerary text carries an explicit meal marker, but the
// business rule defaults breakfast/dinner to included for a genuine overnight
// stay at a desert/southern destination, since half-board is the standard
// package there. 2 breakfasts + 2 dinners, matching what the price covers.
const sahara3 = tours.find((item) => item.id === '3-day-sahara-marrakech');
assert.ok(sahara3);
const sahara3Result = deriveTourInclusions(sahara3, sahara3);
assert.equal(sahara3Result.nights, 2);
assert.equal(sahara3Result.meals.length, 2);
assert.equal(sahara3Result.meals.some((row) => row.breakfast === 'not_included' || row.dinner === 'not_included'), false);
assert.deepEqual(sahara3Result.meals.map((row) => [row.place, row.placeId, row.breakfast, row.dinner]), [
  ['Dades Valley', 'dades-valley', 'included', 'included'],
  ['Desert camp', 'erg-chebbi', 'included', 'included'],
]);
assert.equal(sahara3Result.meals.filter((row) => row.breakfast === 'included').length, 2, '2 breakfasts included');
assert.equal(sahara3Result.dinnerSummary.count, 2, '2 dinners included');
assert.equal(sahara3Result.meals.some((row) => row.camp && row.dinner === 'included'), true);

// Canonical 7-day accuracy case: exact nights, no vague dinner line, and
// Imperial City nights (Fes, Marrakech) are now a definite dinner exclusion,
// surfaced through cityDinnersExcluded ("Dinner in Fes" / "Dinner in Marrakech").
const imperial = tours.find((item) => item.id === '7-day-imperial-cities-sahara-escape');
assert.ok(imperial);
const imperialResult = deriveTourInclusions(imperial, imperial);
assert.deepEqual(imperialResult.meals.map((row) => [row.place, row.breakfast, row.dinner]), [
  ['Dades Valley', 'included', 'included'],
  ['Luxury Desert Camp', 'included', 'included'],
  ['Merzouga Hotel', 'included', 'included'],
  ['Fes', 'included', 'not_included'],
  ['Fes', 'included', 'not_included'],
  ['Marrakech', 'included', 'not_included'],
]);
assert.equal(imperialResult.dinnerSummary.count, 3);
assert.deepEqual(imperialResult.dinnerSummary.nights.map((row) => row.place), ['Dades Valley', 'Luxury Desert Camp', 'Merzouga Hotel']);
assert.deepEqual(imperialResult.cityDinnersExcluded.map((g) => [g.place, g.nights.length]), [['Fes', 2], ['Marrakech', 1]]);
assert.equal(imperialResult.included.some((item) => /Dinners as per itinerary/i.test(item.label ?? '')), false);

// ── Confirmed MGA meal policy ────────────────────────────────────────────────
// Breakfast is included for every overnight stay in the tour. Dinner is
// included for every overnight stay EXCEPT a night in an Imperial City
// (Marrakech, Fes, Meknès, Casablanca, Rabat), where it is a definite
// 'not_included' rather than a guess. Real per-night evidence in the
// itinerary's own text always takes priority over this default.

// Merzouga: no meal marker at all — both meals resolve to included (Sahara Desert, not Imperial).
assert.deepEqual(mealState('1 Days / 1 Nights', ['Overnight: Merzouga'], 'breakfast'), ['included']);
assert.deepEqual(mealState('1 Days / 1 Nights', ['Overnight: Merzouga'], 'dinner'), ['included']);

// Zagora: same rule, different non-Imperial destination.
assert.deepEqual(mealState('1 Days / 1 Nights', ['Overnight: Zagora'], 'breakfast'), ['included']);
assert.deepEqual(mealState('1 Days / 1 Nights', ['Overnight: Zagora'], 'dinner'), ['included']);

// Regression guard: an Imperial City night with no marker gets a definite
// dinner exclusion — breakfast is unaffected (breakfast has no city exception).
assert.deepEqual(mealState('1 Days / 1 Nights', ['Overnight: Marrakech'], 'dinner'), ['not_included']);
assert.deepEqual(mealState('1 Days / 1 Nights', ['Overnight: Marrakech'], 'breakfast'), ['included']);
assert.deepEqual(mealState('1 Days / 1 Nights', ['Overnight: Fes'], 'dinner'), ['not_included']);

// Explicit exclusion overrides the policy default: a tour whose own `excluded`
// list names dinner must not have it silently promoted to included, even at a
// non-Imperial stay.
assert.deepEqual(
  mealState('1 Days / 1 Nights', ['Overnight: Merzouga'], 'dinner', [], ['Dinner at the desert camp']),
  ['not_included'],
);
// Breakfast is unaffected by a dinner-only exclusion.
assert.deepEqual(
  mealState('1 Days / 1 Nights', ['Overnight: Merzouga'], 'breakfast', [], ['Dinner at the desert camp']),
  ['included'],
);

// Ouarzazate against real canonical data: 'agadir-4-day' has a genuine,
// unmarked "Overnight: Ouarzazate" night (day 1, non-Imperial) followed by
// two Marrakech nights (Imperial City). Confirmed MGA policy: breakfast is
// included throughout; dinner is included at Ouarzazate but not at either
// Marrakech night — this tour's own included list no longer hedges either
// meal (updated as part of the confirmed-policy rollout), so the quote-first
// wording this test used to rely on no longer applies here.
const agadir4 = tours.find((item) => item.id === 'agadir-4-day');
assert.ok(agadir4, 'fixture tour missing: agadir-4-day');
const agadir4Result = deriveTourInclusions(agadir4, agadir4);
const ouarzazateNight = agadir4Result.meals.find((row) => row.placeId === 'ouarzazate');
assert.ok(ouarzazateNight, 'agadir-4-day must have a resolved Ouarzazate overnight');
assert.equal(ouarzazateNight!.breakfast, 'included');
assert.equal(ouarzazateNight!.dinner, 'included');
assert.notEqual(ouarzazateNight!.dinner, 'not_included');
const agadir4MarrakechNights = agadir4Result.meals.filter((row) => row.placeId === 'marrakech');
assert.equal(agadir4MarrakechNights.length, 2, 'agadir-4-day must have two resolved Marrakech overnights');
assert.ok(agadir4MarrakechNights.every((row) => row.breakfast === 'included'));
assert.ok(agadir4MarrakechNights.every((row) => row.dinner === 'not_included'));

// Overlay pass: French stop wording must not change the factual states or specific locations.
const imperialFr = getLocalizedTour(imperial.id, 'fr');
assert.ok(imperialFr);
const imperialFrResult = deriveTourInclusions(imperial, imperialFr);
assert.deepEqual(imperialFrResult.meals.map((row) => [row.breakfast, row.dinner]), imperialResult.meals.map((row) => [row.breakfast, row.dinner]));
assert.equal(imperialFrResult.dinnerSummary.count, 3);
assert.ok(imperialFrResult.meals.some((row) => row.place.toLowerCase().includes('merzouga')));
assert.ok(imperialFrResult.meals.some((row) => row.place.toLowerCase().includes('fès') || row.place.toLowerCase().includes('fes')));

// Guard against the exact bug class fixed in this project: a derived InclusionItem.key
// built or referenced dynamically that does not match any key actually defined in the
// English gap dictionary. verify-ui-keys.ts cannot catch this — it only scans literal
// t('...') calls in source, and item.key is resolved at runtime, not as a source literal.
// This walks every real tour's derived inclusions instead, so a mismatched key here fails
// the build the same way a missing literal key does.
const enGapKeys = new Set(Object.keys(journeyGaps.en ?? {}));
const keyMismatches: string[] = [];
for (const t of tours) {
  const result = deriveTourInclusions(t, t);
  for (const item of result.included) {
    if (item.key && !enGapKeys.has(item.key)) {
      keyMismatches.push(`${t.id}: included item key "${item.key}" has no English translation`);
    }
  }
}
assert.deepEqual(keyMismatches, [], `Dynamic inclusion keys with no matching translation:\n${keyMismatches.join('\n')}`);

console.log('Tour inclusion regression: PASS (A–H + canonical 7-day + French overlay + dynamic-key coverage)');
