// ─────────────────────────────────────────────────────────────────────────────
// Pricing engine tests.
//
// ┌───────────────────────────────────────────────────────────────────────────┐
// │  EVERY NUMBER IN THIS FILE IS A TEST FIXTURE.                             │
// │  None of it is a Morocco Grand Adventure rate, a quote, or a price.       │
// │  Nothing here is exported, and production imports nothing from scripts/.  │
// │  Real rates live in src/data/pricing/rates.ts, which is unconfigured.     │
// └───────────────────────────────────────────────────────────────────────────┘
//
// Two things are under test, and they are different:
//
//  1. The ENGINE — that it prices what it can, refuses what it cannot, and never
//     invents a figure. Driven with the fixtures below.
//  2. The GUARD — that `validateRateBehaviour` actually catches a rate card
//     which breaks the commercial promises the tour pages make. A validator that
//     passes everything is worse than none, so it is tested against a card
//     deliberately built to fail.
//
// Plus a production regression: with the real rate card and the real tour
// registry, nothing is priceable and no euro figure can reach a page.
// ─────────────────────────────────────────────────────────────────────────────
import assert from 'node:assert/strict';
import {
  RATE_CARD,
  type Configured,
  type RateCard,
} from '../src/data/pricing/rates';
import { TOUR_PRICING, type TourPricingConfig } from '../src/data/pricing/tours';
import {
  DEFER,
  MAX_ENUMERATED_TRAVELERS,
  arrangementLabelEn,
  fitsParty,
  isDeferred,
  roomArrangements,
  roomCount,
  rooms as roomsOf,
  singleRoomCount,
  sleeps,
  type RoomArrangement,
} from '../src/data/pricing/rooms';
import {
  cheapestArrangement,
  estimate,
  fromPricePerPerson,
  validateRateBehaviour,
} from '../src/lib/pricing';
import {
  LADDER_STEP,
  TOUR_LADDER,
  fromParty,
  fromPrice,
  getLadder,
  hasLadder,
  isValidLadder,
  ladderPrice,
  supportedPartySizes,
} from '../src/data/pricing/ladder';

// ── FIXTURES — invented for this test only ───────────────────────────────────

/**
 * Party costs deliberately exceed room costs per day/night. That relationship is
 * what makes the per-person price fall as a party grows, and a real rate card
 * must satisfy it too — see the note in src/lib/pricing.ts.
 */
const FIXTURE_RATES: Configured<RateCard> = {
  configured: true,
  currency: 'EUR',
  party: {
    vehicles: [
      { class: 'sedan', maxTravelers: 3, perDay: 100 },
      { class: 'minivan', maxTravelers: 6, perDay: 140 },
      { class: 'minibus', maxTravelers: 15, perDay: 220 },
    ],
    driverPerDay: 60,
    guidePerDay: 80,
    fuelTollsPerDay: 40,
  },
  rooms: {
    standard: { valley: 50, city: 60 },
    luxury: { valley: 110, city: 130 },
  },
  camp: { standard: 45, luxury: 120 },
  activities: { 'camel-trek': 15 },
  commercial: { singleOccupancyPerNight: 30, marginPct: 0.25 },
};

const FIXTURE_TOURS: Record<string, TourPricingConfig> = {
  'fixture-3-day': {
    days: 3,
    nights: [{ kind: 'hotel', region: 'valley' }, { kind: 'camp' }],
    guidedDays: 0,
    perPersonActivities: ['camel-trek'],
    minTravelers: 1,
    maxTravelers: 6,
  },
  'fixture-8-day': {
    days: 8,
    nights: [
      { kind: 'hotel', region: 'city' },
      { kind: 'hotel', region: 'city' },
      { kind: 'hotel', region: 'valley' },
      { kind: 'camp' },
      { kind: 'hotel', region: 'valley' },
      { kind: 'hotel', region: 'city' },
      { kind: 'hotel', region: 'city' },
    ],
    guidedDays: 2,
    perPersonActivities: ['camel-trek'],
    minTravelers: 1,
    maxTravelers: 8,
  },
  'fixture-missing-rate': {
    days: 2,
    // 'atlantic' has no rate in FIXTURE_RATES — the engine must refuse, not guess.
    nights: [{ kind: 'hotel', region: 'atlantic' }],
    guidedDays: 0,
    perPersonActivities: [],
    minTravelers: 1,
    maxTravelers: 4,
  },
};

const shared = (n: number) => cheapestArrangement(n);
const eachOwnRoom = (n: number): RoomArrangement => roomsOf([{ type: 'single', count: n }]);

function priced(tourId: string, n: number, over: Partial<Parameters<typeof estimate>[0]> = {}) {
  const r = estimate(
    { tourId, travelers: n, accommodation: 'standard', camp: 'standard', rooms: shared(n), ...over },
    FIXTURE_RATES,
    FIXTURE_TOURS,
  );
  assert.equal(r.status, 'priced', `expected a price for ${tourId} × ${n}`);
  if (r.status !== 'priced') throw new Error('unreachable');
  return r;
}

// ── 1. Room arrangements: only what we can evidence ──────────────────────────

{
  // 2 travellers → defer, 1 double, 1 twin, 2 singles.
  const two = roomArrangements(2);
  assert.ok(isDeferred(two[0]), 'the deferred option comes first and is the default');
  const twoIds = two.map((a) => a.id);
  assert.deepEqual(twoIds, ['defer', '1double', '1twin', '2single']);

  // 4 travellers → the three shared shapes the brief calls for, plus a room each.
  assert.deepEqual(
    roomArrangements(4).map((a) => a.id),
    ['defer', '2double', '1double+1twin', '2twin', '4single'],
  );

  // 5 travellers → two shared rooms plus one single. NEVER a triple or a family
  // room: this project holds no inventory that could evidence one.
  const five = roomArrangements(5);
  const fiveLabels = five.map(arrangementLabelEn).join(' | ');
  assert.ok(!/triple/i.test(fiveLabels), 'no triple room may ever be offered');
  assert.ok(!/family/i.test(fiveLabels), 'no family room may ever be offered');
  assert.deepEqual(
    five.map((a) => a.id),
    ['defer', '2double+1single', '1double+1twin+1single', '2twin+1single', '5single'],
  );

  // Every enumerated arrangement sleeps exactly the party it is offered to.
  for (let n = 1; n <= MAX_ENUMERATED_TRAVELERS; n++) {
    for (const a of roomArrangements(n)) {
      if (isDeferred(a)) continue;
      assert.equal(sleeps(a), n, `arrangement ${a.id} must sleep exactly ${n}`);
      assert.ok(fitsParty(a, n));
    }
  }

  // Large parties are not enumerated: we say so rather than invent shapes.
  assert.deepEqual(roomArrangements(MAX_ENUMERATED_TRAVELERS + 1).map((a) => a.id), ['defer']);
  assert.deepEqual(roomArrangements(0).map((a) => a.id), ['defer']);

  // Sharing always uses fewer rooms than a room each.
  assert.equal(roomCount(shared(4)), 2);
  assert.equal(roomCount(eachOwnRoom(4)), 4);
  assert.equal(singleRoomCount(shared(4)), 0);
  assert.equal(singleRoomCount(shared(5)), 1);
}

// ── 2. The six commercial rules, on the fixture rates ────────────────────────

for (const tourId of ['fixture-3-day', 'fixture-8-day']) {
  const max = FIXTURE_TOURS[tourId].maxTravelers;
  const series = [];
  for (let n = 1; n <= Math.min(max, 6); n++) series.push({ n, ...priced(tourId, n) });

  for (let i = 1; i < series.length; i++) {
    const prev = series[i - 1];
    const cur = series[i];

    // More travellers → lower price per person.
    assert.ok(
      cur.perPerson < prev.perPerson,
      `${tourId}: ${cur.n} travellers must cost less each than ${prev.n} ` +
        `(${cur.perPerson} vs ${prev.perPerson})`,
    );

    // Adding a traveller can never reduce the total — except at an odd → even
    // step, where the unpaired traveller's single supplement is dropped as the
    // newcomer fills the empty bed. See validateRateBehaviour for why exactly
    // those steps are allowed and no others.
    if (prev.n % 2 === 0) {
      assert.ok(
        cur.total >= prev.total,
        `${tourId}: total must not fall from ${prev.n} to ${cur.n} travellers ` +
          `(${prev.total} → ${cur.total})`,
      );
    }
  }

  // With no single supplement charged, the total must rise from the very first
  // traveller — proving the 1→2 exception above is caused by the supplement
  // alone and is not hiding a defect in the model.
  {
    const noSupplement: Configured<RateCard> = {
      ...FIXTURE_RATES,
      commercial: { ...FIXTURE_RATES.commercial, singleOccupancyPerNight: 0 },
    };
    let last = 0;
    for (let n = 1; n <= Math.min(max, 6); n++) {
      const r = estimate(
        { tourId, travelers: n, accommodation: 'standard', camp: 'standard', rooms: shared(n) },
        noSupplement,
        FIXTURE_TOURS,
      );
      assert.equal(r.status, 'priced');
      if (r.status !== 'priced') throw new Error('unreachable');
      assert.ok(r.total >= last, `${tourId}: without a single supplement the total must never fall`);
      last = r.total;
    }
  }

  // Per-person falls while the total rises — both at once, which is the point.
  const one = series[0];
  const six = series[series.length - 1];
  assert.ok(six.total > one.total, `${tourId}: total rises with the party`);
  assert.ok(six.perPerson < one.perPerson, `${tourId}: per person falls with the party`);

  // More rooms / single occupancy → higher total.
  for (let n = 2; n <= Math.min(max, 6); n++) {
    const sharedTotal = priced(tourId, n).total;
    const ownRoomTotal = priced(tourId, n, { rooms: eachOwnRoom(n) }).total;
    assert.ok(
      ownRoomTotal > sharedTotal,
      `${tourId}: ${n} travellers in their own rooms must cost more than sharing ` +
        `(${ownRoomTotal} vs ${sharedTotal})`,
    );
  }

  // Luxury stay → higher. Luxury camp → higher.
  const base = priced(tourId, 2);
  assert.ok(priced(tourId, 2, { accommodation: 'luxury' }).total > base.total, `${tourId}: luxury stay costs more`);
  assert.ok(priced(tourId, 2, { camp: 'luxury' }).total > base.total, `${tourId}: luxury camp costs more`);

  // Standard is the cheaper of the two, which is what a "from" price rests on.
  assert.ok(priced(tourId, 2, { accommodation: 'standard' }).total === base.total);
}

// ── 3. The engine refuses rather than guesses ────────────────────────────────

{
  // A missing room rate is reported by name, not silently treated as free.
  const r = estimate(
    { tourId: 'fixture-missing-rate', travelers: 2, accommodation: 'standard', camp: 'standard', rooms: shared(2) },
    FIXTURE_RATES,
    FIXTURE_TOURS,
  );
  assert.equal(r.status, 'unconfigured');
  if (r.status === 'unconfigured') {
    assert.ok(r.missing.includes('room-rate:standard/atlantic'), 'names the rate it lacks');
  }

  // The deferred arrangement is not priceable: we have not agreed the rooms yet.
  const deferred = estimate(
    { tourId: 'fixture-3-day', travelers: 2, accommodation: 'standard', camp: 'standard', rooms: DEFER },
    FIXTURE_RATES,
    FIXTURE_TOURS,
  );
  assert.equal(deferred.status, 'unconfigured');
  if (deferred.status === 'unconfigured') assert.ok(deferred.missing.includes('room-arrangement'));

  // An arrangement that does not sleep the party is rejected.
  const mismatch = estimate(
    { tourId: 'fixture-3-day', travelers: 5, accommodation: 'standard', camp: 'standard', rooms: shared(2) },
    FIXTURE_RATES,
    FIXTURE_TOURS,
  );
  assert.equal(mismatch.status, 'unconfigured');
  if (mismatch.status === 'unconfigured') assert.ok(mismatch.missing.includes('room-arrangement-mismatch'));

  // A party larger than the tour takes is refused, not quietly priced.
  const tooBig = estimate(
    { tourId: 'fixture-3-day', travelers: 7, accommodation: 'standard', camp: 'standard', rooms: shared(7) },
    FIXTURE_RATES,
    FIXTURE_TOURS,
  );
  assert.equal(tooBig.status, 'unconfigured');

  // A tour with no pricing configuration is never priced, whatever the rates say.
  const unknown = estimate(
    { tourId: 'not-configured', travelers: 2, accommodation: 'standard', camp: 'standard', rooms: shared(2) },
    FIXTURE_RATES,
    FIXTURE_TOURS,
  );
  assert.equal(unknown.status, 'unconfigured');
  if (unknown.status === 'unconfigured') assert.ok(unknown.missing.includes('tour-pricing'));
}

// ── 4. "From" price is a real, bookable configuration ────────────────────────

{
  const from = fromPricePerPerson('fixture-3-day', FIXTURE_RATES, FIXTURE_TOURS);
  assert.ok(from.configured, 'a costed tour has a from price');
  if (from.configured) {
    // It must be reachable: re-pricing that exact party reproduces it.
    const back = priced('fixture-3-day', from.travelers);
    assert.equal(back.perPerson, from.perPerson, 'the from price is an actual bookable configuration');
    // And it must be the lowest of them.
    for (let n = 1; n <= FIXTURE_TOURS['fixture-3-day'].maxTravelers; n++) {
      assert.ok(priced('fixture-3-day', n).perPerson >= from.perPerson);
    }
  }

  // An uncosted tour has no from price at all — which is what keeps "From €…"
  // off every page today.
  assert.equal(fromPricePerPerson('not-configured', FIXTURE_RATES, FIXTURE_TOURS).configured, false);
}

// ── 5. The behaviour guard catches a bad rate card ───────────────────────────

{
  // Good rates pass.
  assert.deepEqual(validateRateBehaviour('fixture-3-day', FIXTURE_RATES, FIXTURE_TOURS), []);

  // Now a card where a room night costs far more than a day of vehicle, driver
  // and fuel. It is arithmetically fine and commercially nonsense: the third
  // traveller adds a room that costs more than the vehicle saves, so the
  // per-person price RISES. The guard must refuse it.
  const badRates: Configured<RateCard> = {
    ...FIXTURE_RATES,
    party: { ...FIXTURE_RATES.party, vehicles: [{ class: 'sedan', maxTravelers: 8, perDay: 5 }], driverPerDay: 5, fuelTollsPerDay: 0, guidePerDay: 0 },
    rooms: { standard: { valley: 900, city: 900 }, luxury: { valley: 950, city: 950 } },
  };
  const violations = validateRateBehaviour('fixture-3-day', badRates, FIXTURE_TOURS);
  assert.ok(violations.length > 0, 'the guard must reject a card that breaks the promise');
  assert.ok(
    violations.some((v) => v.rule === 'per-person-falls-with-party-size'),
    'and must say which promise it breaks',
  );

  // An unknown tour is reported rather than silently passing.
  assert.equal(validateRateBehaviour('nope', FIXTURE_RATES, FIXTURE_TOURS)[0].rule, 'tour-configured');
}

// ── 6. PRODUCTION REGRESSION — only the anchor is priced ─────────────────────
//
// The customer-facing price now comes from the LADDER, not from the cost engine.
// The cost engine must stay switched off: it exists for internal validation, and
// a rate card left configured by accident would put a cost-derived number on a
// page.

const ANCHOR = '3-day-sahara-marrakech';

{
  assert.equal(RATE_CARD.configured, false, 'the cost-engine rate card must stay unconfigured');
  assert.equal(
    Object.keys(TOUR_PRICING).length,
    0,
    'no tour may be costed in the cost engine — prices come from the ladder',
  );

  const { tours } = await import('../src/data/content');
  assert.equal(tours.length, 24, 'the catalogue is 24 tours');

  // Every tour in the catalogue is now published.
  const PENDING: string[] = [];
  const priced = tours.filter((t) => t.quoteOnly === false);
  assert.equal(priced.length, 24, 'all 24 tours are published');
  assert.equal(tours.length - priced.length, PENDING.length, 'no tour is left quote-only');
  assert.equal(tours.find((t) => t.id === ANCHOR)!.price, '425', 'the anchor card shows the two-traveller price');

  // Card price and ladder must agree on every published tour, and a quote-only
  // tour must have neither.
  for (const tour of tours) {
    if (PENDING.includes(tour.id)) continue;
    assert.equal(tour.quoteOnly, false, `${tour.id} is published`);
    assert.ok(hasLadder(tour.id), `${tour.id} must have a published ladder`);
    const from = fromPrice(tour.id)!;
    assert.equal(
      Number(tour.price), from.perPerson,
      `${tour.id}: the card price must equal the ladder's from price`,
    );
    assert.ok(Number(tour.price) > 0, `${tour.id}: card price must be positive`);
  }

  // The cost engine still refuses everything, anchor included.
  for (const tour of tours) {
    for (const n of [1, 2, 3, 4, 5, 6]) {
      const r = estimate(
        { tourId: tour.id, travelers: n, accommodation: 'luxury', camp: 'luxury', rooms: shared(n) },
      );
      assert.equal(r.status, 'unconfigured', `${tour.id} × ${n}: the cost engine must not price anything`);
    }
    assert.equal(fromPricePerPerson(tour.id).configured, false, `${tour.id}: cost engine has no "from" price`);
  }
}

// ── 6b. THE LADDER ───────────────────────────────────────────────────────────

{
  // The approved anchor, exactly.
  const expected: Record<number, { pp: number; total: number }> = {
    1: { pp: 600, total: 600 },
    2: { pp: 425, total: 850 },
    3: { pp: 410, total: 1230 },
    4: { pp: 395, total: 1580 },
    5: { pp: 380, total: 1900 },
    6: { pp: 365, total: 2190 },
  };
  for (const [nStr, want] of Object.entries(expected)) {
    const n = Number(nStr);
    const got = ladderPrice(ANCHOR, n);
    assert.ok(got, `${n} travellers must be priced`);
    assert.equal(got.perPerson, want.pp, `${n} travellers: per person`);
    assert.equal(got.total, want.total, `${n} travellers: total`);
    assert.equal(got.total, got.perPerson * n, `${n} travellers: total = per person × travellers`);
    assert.ok(Number.isInteger(got.perPerson) && got.perPerson > 0, `${n}: price is a positive whole number`);
  }

  // The €15 rule, stated independently of the numbers above.
  for (let n = 3; n <= 6; n++) {
    const a = ladderPrice(ANCHOR, n - 1)!;
    const b = ladderPrice(ANCHOR, n)!;
    assert.equal(a.perPerson - b.perPerson, LADDER_STEP, `${n - 1}→${n}: exactly €${LADDER_STEP} less per person`);
  }

  // Per person falls, total rises — at every step including 1→2.
  for (let n = 2; n <= 6; n++) {
    const a = ladderPrice(ANCHOR, n - 1)!;
    const b = ladderPrice(ANCHOR, n)!;
    assert.ok(b.perPerson < a.perPerson, `${n - 1}→${n}: per person must fall`);
    assert.ok(b.total > a.total, `${n - 1}→${n}: total must rise`);
  }

  // Parties outside the ladder are not priced — they are not extrapolated.
  for (const n of [0, 7, 8, 12, 50, -1, NaN, Infinity]) {
    assert.equal(ladderPrice(ANCHOR, n), undefined, `party of ${n} must not be priced`);
  }
  // A fractional count floors, matching estimate() and roomArrangements() — the
  // traveller input is an integer field, so this is defence, not a feature.
  assert.deepEqual(ladderPrice(ANCHOR, 2.9), ladderPrice(ANCHOR, 2), 'a fractional party floors');
  assert.equal(ladderPrice('not-a-tour', 2), undefined, 'an unknown tour is never priced');

  // The card's "from" price is the TWO-traveller price, never the cheapest.
  const from = fromPrice(ANCHOR);
  assert.ok(from, 'the anchor has a from price');
  assert.equal(from.perPerson, 425, 'from price is the 2-traveller rate');
  assert.notEqual(from.perPerson, ladderPrice(ANCHOR, 6)!.perPerson, 'from price is NOT the 6-traveller rate');
  assert.equal(from.perPerson, Number((await import('../src/data/content')).tours.find((t) => t.id === ANCHOR)!.price),
    'the card price and the ladder agree');

  // ── Restricted-party products ──────────────────────────────────────────────
  // The honeymoon is a two-person journey and only that. No solo price, no
  // three-to-six ladder: every other size must fall through to the quote flow.
  {
    const HM = 'honeymoon-morocco';
    assert.deepEqual(supportedPartySizes(HM), [2], 'the honeymoon publishes exactly one party size');
    const two = ladderPrice(HM, 2)!;
    assert.equal(two.perPerson, 1450);
    assert.equal(two.total, 2900);
    for (const n of [1, 3, 4, 5, 6, 7]) {
      assert.equal(ladderPrice(HM, n), undefined, `honeymoon must not price ${n} travellers`);
    }
    assert.equal(fromParty(HM), 2, 'the honeymoon card describes two travellers');
    assert.equal(fromPrice(HM)!.perPerson, 1450);
    assert.equal(getLadder(HM)!.solo, undefined, 'the honeymoon carries no solo price');
  }

  // The family tour publishes a solo price and three-to-six, but quotes a couple.
  {
    const FAM = 'family-morocco-adventure';
    assert.deepEqual(supportedPartySizes(FAM), [1, 3, 4, 5, 6], 'family skips two travellers');
    assert.equal(ladderPrice(FAM, 2), undefined, 'a couple on the family tour goes to the quote flow');
    assert.equal(ladderPrice(FAM, 3)!.perPerson, 950);
    assert.equal(fromParty(FAM), 3, 'the family card describes three travellers');
    assert.equal(fromPrice(FAM)!.perPerson, 950);
  }

  // The two premium tours, exactly as approved.
  {
    const cases: [string, number, number][] = [
      ['8-day-marrakech-essaouira-agadir-sahara', 1480, 1050],
      ['5-day-imperial-cities', 985, 700],
    ];
    for (const [id, solo, base] of cases) {
      assert.equal(ladderPrice(id, 1)!.perPerson, solo, `${id}: solo`);
      for (let n = 2; n <= 6; n++) {
        assert.equal(ladderPrice(id, n)!.perPerson, base - LADDER_STEP * (n - 2), `${id}: ${n} travellers`);
      }
      assert.equal(ladderPrice(id, 7), undefined, `${id}: 7+ is quote flow`);
    }
    // The anchor was NOT raised because its name contains "Luxury".
    assert.equal(ladderPrice(ANCHOR, 2)!.perPerson, 425, 'the anchor stays at the approved 425');
  }

  // Guards reject a ladder that cannot hold.
  assert.equal(isValidLadder({ solo: 600, groupBase: 425, minTravelers: 1, maxTravelers: 6 }), true);
  assert.equal(isValidLadder({ solo: 400, groupBase: 425, minTravelers: 1, maxTravelers: 6 }), false, 'solo below group base');
  assert.equal(isValidLadder({ solo: 600, groupBase: 50, minTravelers: 1, maxTravelers: 6 }), false, 'step would drive price to zero');
  assert.equal(isValidLadder({ solo: 600, groupBase: 0, minTravelers: 1, maxTravelers: 6 }), false, 'zero base');
  assert.equal(isValidLadder({ solo: 600, groupBase: -10, minTravelers: 1, maxTravelers: 6 }), false, 'negative base');
  assert.equal(isValidLadder({ solo: 600, groupBase: 425.5, minTravelers: 1, maxTravelers: 6 }), false, 'non-integer money');
  assert.equal(isValidLadder({ solo: 600, groupBase: 425, minTravelers: 1, maxTravelers: 9 }), false, 'beyond the ladder max');

  // Every published ladder in production must satisfy those guards and produce
  // sane money at every size it claims to cover.
  for (const [id, l] of Object.entries(TOUR_LADDER)) {
    assert.ok(isValidLadder(l), `${id}: published ladder must be valid`);
    for (const n of supportedPartySizes(id)) {
      const p = ladderPrice(id, n)!;
      assert.ok(p && p.perPerson > 0 && p.total > 0, `${id} × ${n}: no zero or negative price`);
      assert.ok(!Number.isNaN(p.perPerson) && !Number.isNaN(p.total), `${id} × ${n}: no NaN`);
    }
  }
}

// ── 7. REGRESSION — no discount messaging anywhere ───────────────────────────
//
// The tours now carry published premium private prices. A "Save 10%" badge next
// to a price that is not discounted would be a claim the booking never honours,
// and a struck-through "original" nobody was ever charged would be a fake. The
// promotion is therefore off at its single gate, and PriceTag has no discount
// path left at all. This pins both shut.

{
  const { isPromoActive, hasPublishedPrice, PROMO_ENABLED } = await import('../src/lib/promo');
  const { tours } = await import('../src/data/content');

  assert.equal(PROMO_ENABLED, false, 'the promotion must stay switched off');
  assert.equal(isPromoActive(), false, 'no promo UI may render while prices are published');
  // Even with the deadline far in the future, the master switch wins.
  assert.equal(isPromoActive(new Date('2026-01-01').getTime()), false, 'the switch beats the deadline');

  // Every tour publishes a price, and none of them may show a discount.
  const withPrice = tours.filter((t) => hasPublishedPrice(t.price));
  assert.equal(withPrice.length, 24, 'all 24 tours publish a price');

  // Sanity-check the gate itself, so this cannot pass because hasPublishedPrice
  // is broken and returns false for everything.
  assert.equal(hasPublishedPrice('450'), true);
  assert.equal(hasPublishedPrice(450), true);
  assert.equal(hasPublishedPrice('Request a quote'), false);

  // Structural: PriceTag must NOT discount. The published prices are the
  // premium private rates the business charges; crossing out a higher figure
  // that was never charged would be a fake discount. No DOM in this runner, so
  // this reads the component source and proves the discount path is gone.
  const { readFileSync } = await import('node:fs');
  const src = readFileSync(new URL('../src/components/promo/PriceTag.tsx', import.meta.url), 'utf8');
  assert.ok(src.includes('if (!hasPublishedPrice(price))'), 'PriceTag still gates on hasPublishedPrice');
  assert.ok(!src.includes('discountedPrice'), 'PriceTag must not apply the promo discount to a published price');
  assert.ok(!src.includes('line-through'), 'PriceTag must not render a struck-through original');
  assert.ok(!src.includes('usePromoActive'), 'PriceTag must not depend on the promo at all');
}

console.log('Pricing engine tests: PASS');
