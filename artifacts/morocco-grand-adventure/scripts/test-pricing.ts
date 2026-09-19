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

// ── 6. PRODUCTION REGRESSION — nothing is priceable today ────────────────────

{
  assert.equal(RATE_CARD.configured, false, 'the production rate card must stay unconfigured');
  assert.equal(
    Object.keys(TOUR_PRICING).length,
    0,
    'no tour may be costed until the business supplies its rates',
  );

  // With the real card and registry, every tour in the catalogue refuses to
  // price — including through the public helpers the UI actually calls.
  const { tours } = await import('../src/data/content');
  assert.equal(tours.length, 24, 'the catalogue is 24 tours');
  for (const tour of tours) {
    assert.equal(tour.quoteOnly, true, `${tour.id} must stay quote-only`);
    assert.equal(tour.price, 'Request a quote', `${tour.id} must carry no published price`);
    for (const n of [1, 2, 3, 4, 5, 6]) {
      const r = estimate({
        tourId: tour.id,
        travelers: n,
        accommodation: 'luxury',
        camp: 'luxury',
        rooms: shared(n),
      });
      assert.equal(r.status, 'unconfigured', `${tour.id} × ${n} must not produce a price`);
    }
    assert.equal(fromPricePerPerson(tour.id).configured, false, `${tour.id} must have no "from" price`);
  }
}

// ── 7. REGRESSION — the 10% promo stays dormant on quote-only tours ──────────
//
// The site carries a live "save 10%" promotion. PriceTag only renders the
// struck-through original and the discounted figure when a tour has a published
// price, so today the promo is invisible on every tour card — not because it is
// switched off, but because there is no number to discount. Publishing a price
// without deciding about the promo would therefore silently light up a discount
// on all 24 tours. This pins that door shut.

{
  const { isPromoActive, hasPublishedPrice, discountedPrice } = await import('../src/lib/promo');
  const { tours } = await import('../src/data/content');

  // The guard is only meaningful while the promotion is actually running.
  assert.equal(isPromoActive(), true, 'the promo is live, so this regression matters');

  for (const tour of tours) {
    assert.equal(
      hasPublishedPrice(tour.price),
      false,
      `${tour.id} must have no published price, or the promo would render a discount on it`,
    );
  }

  // Sanity-check the gate itself, so this test cannot pass because
  // hasPublishedPrice is broken and returns false for everything.
  assert.equal(hasPublishedPrice('450'), true);
  assert.equal(hasPublishedPrice(450), true);
  assert.equal(discountedPrice('450'), 405);

  // Structural: PriceTag must take its no-price branch BEFORE it computes a
  // discount. This reads the component source rather than rendering it — there
  // is no DOM in this test runner — so it proves the ordering, not the pixels.
  const { readFileSync } = await import('node:fs');
  const src = readFileSync(new URL('../src/components/promo/PriceTag.tsx', import.meta.url), 'utf8');
  const guard = src.indexOf('if (!hasPublishedPrice(price))');
  const discount = src.indexOf('discountedPrice(');
  assert.ok(guard > -1, 'PriceTag must gate on hasPublishedPrice');
  assert.ok(discount > -1, 'PriceTag must be the component that applies the discount');
  assert.ok(guard < discount, 'PriceTag must return the tailored-quote line before discounting');
}

console.log('Pricing engine tests: PASS');
