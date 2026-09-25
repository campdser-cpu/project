// Deterministic fact matrix — verifies the KNOWLEDGE LAYER itself (what the
// concierge is grounded in), not model reasoning. Each assertion checks that
// concierge-knowledge.json actually contains the fact a correct answer to the
// paired question would need. This cannot prove the model answers correctly
// (that needs live inference — see test-concierge-live.ts) but it proves the
// ground truth is present, complete and not silently wrong or missing.
import assert from 'node:assert/strict';
import knowledge from '../../../api/concierge-knowledge.json';

const byId = (id: string) => {
  const t = knowledge.tours.find((x) => x.id === id);
  assert.ok(t, `fixture tour missing from knowledge base: ${id}`);
  return t!;
};

let n = 0;
function fact(question: string, check: () => void) {
  n += 1;
  try {
    check();
    console.log(`  [${n}] OK    ${question}`);
  } catch (err) {
    console.error(`  [${n}] FAIL  ${question}`);
    throw err;
  }
}

const sahara3 = byId('3-day-sahara-marrakech');
const fes3 = byId('3-day-sahara-fes');
const agadir3 = byId('3-day-sahara-agadir');
const imperial7 = byId('7-day-imperial-cities-sahara-escape');
const honeymoon = byId('honeymoon-morocco');

fact('3-day Marrakech Sahara: what is included (transport/accommodation/experiences)?', () => {
  assert.ok(sahara3.accommodation.some((s) => /desert camp/i.test(s)));
  assert.ok(sahara3.desertExperiences.some((s) => /camel/i.test(s)));
  assert.ok(sahara3.visitsAndLandscapes.some((s) => /Todra/i.test(s)));
  assert.ok(sahara3.visitsAndLandscapes.some((s) => /Dades/i.test(s)));
});

fact('3-day Marrakech Sahara: how many meal nights?', () => {
  assert.equal(sahara3.meals.length, 2, '3 Days / 2 Nights must never produce 3 meal nights');
  assert.equal(sahara3.nights, 2);
});

fact('3-day Marrakech Sahara: what is excluded?', () => {
  assert.deepEqual(sahara3.notIncluded, [
    'International flights',
    'Lunches and drinks',
    'Monument and museum entrance fees',
    'Tips and personal expenses',
  ]);
});

fact('3-day Fes Sahara: what is the route?', () => {
  assert.equal(fes3.startCity, 'fes');
  assert.ok(fes3.itinerary.some((d) => /Merzouga/i.test(d.title)));
  assert.ok(fes3.itinerary.some((d) => /Ifrane|Middle Atlas/i.test(d.title)));
});

fact('3-day Agadir Sahara: what is the route?', () => {
  assert.equal(agadir3.startCity, 'agadir');
  assert.ok(agadir3.itinerary.some((d) => /Ouarzazate/i.test(d.title)));
  assert.ok(agadir3.itinerary.some((d) => /Merzouga/i.test(d.title)));
});

fact('7-day tour: what is the route (loop or one-way)?', () => {
  assert.equal(imperial7.startCity, 'marrakech');
  assert.ok(/begins and ends in Marrakech/i.test(imperial7.route ?? ''));
});

fact('7-day tour: what city does it end in?', () => {
  const lastDay = imperial7.itinerary[imperial7.itinerary.length - 1];
  assert.ok(/Marrakech/i.test(lastDay.title), 'must end in Marrakech, not Fes — the historical AIAssistant.tsx bug');
  assert.ok(!/ending in Fes|ends in Fes/i.test(lastDay.title));
});

fact('7-day tour: how many meal nights?', () => {
  assert.equal(imperial7.meals.length, 6);
  assert.equal(imperial7.nights, 6);
});

fact('7-day tour: which dinners are included vs. unspecified?', () => {
  assert.deepEqual(
    imperial7.meals.map((m) => m.dinner),
    ['included', 'included', 'included', 'unspecified', 'unspecified', 'unspecified'],
  );
  // None may ever be the raw string "not_included" — the whole point of the
  // 3-state model is that absence is never silently promoted to exclusion.
  assert.ok(imperial7.meals.every((m) => m.dinner !== 'not_included' && m.breakfast !== 'not_included'));
});

fact('7-day tour: 2-person price?', () => {
  assert.equal(imperial7.pricing.published, true);
  if (imperial7.pricing.published) assert.equal(imperial7.pricing.perPersonByPartySize['2'], 805);
});

fact('Is transport private? (business-wide fact, not per-tour)', () => {
  assert.ok(knowledge.tours.every((t) => t.private === true));
});

fact('7-day tour: accommodation?', () => {
  assert.ok(imperial7.accommodation.includes('Luxury desert camp'));
  assert.ok(imperial7.accommodation.includes('Private rooms throughout'));
});

fact('Is the camel trek included? (7-day and 3-day Marrakech)', () => {
  assert.ok(imperial7.desertExperiences.some((s) => /camel/i.test(s)));
  assert.ok(sahara3.desertExperiences.some((s) => /camel/i.test(s)));
});

fact('Is sandboarding included? (7-day yes, 3-day Marrakech not established)', () => {
  assert.ok(imperial7.desertExperiences.some((s) => /sandboard/i.test(s)));
  assert.ok(!sahara3.desertExperiences.some((s) => /sandboard/i.test(s)), 'must not be invented for a tour that never mentions it');
});

fact('Are quad bikes included on the 7-day tour?', () => {
  assert.ok(imperial7.notIncluded.some((s) => /quad bikes/i.test(s)), 'quad bikes are explicitly EXCLUDED, not a silent gap');
  assert.ok(!imperial7.desertExperiences.some((s) => /quad/i.test(s)));
});

fact('Are lunches included on the 7-day tour?', () => {
  assert.ok(imperial7.notIncluded.includes('Lunches'));
});

fact('Are drinks included on the 7-day tour?', () => {
  assert.ok(imperial7.notIncluded.includes('Drinks'));
});

fact('Are entrance fees included?', () => {
  assert.ok(imperial7.notIncluded.some((s) => /entrance fees/i.test(s)));
  assert.ok(sahara3.notIncluded.some((s) => /entrance fees/i.test(s)));
});

fact('Are tips included?', () => {
  assert.ok(imperial7.notIncluded.some((s) => /tips/i.test(s)));
  assert.ok(sahara3.notIncluded.some((s) => /tips/i.test(s)));
});

fact('What is the price for an unsupported/custom party size? (must be absent, never invented)', () => {
  // Honeymoon is a 2-person-only product: no solo price, no 3-6 ladder.
  assert.equal(honeymoon.pricing.published, true);
  if (honeymoon.pricing.published) {
    assert.deepEqual(Object.keys(honeymoon.pricing.perPersonByPartySize), ['2']);
    assert.equal(honeymoon.pricing.solo, undefined, 'no solo price must exist for a 2-person-only product');
  }
});

console.log(`\nConcierge knowledge fact matrix: PASS (${n} facts verified against concierge-knowledge.json, 0 live model calls)`);
