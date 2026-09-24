// ─────────────────────────────────────────────────────────────────────────────
// What's Included / Not Included — the value of a journey, and its limits.
//
// The component renders; it decides nothing. Every line comes from
// src/data/tour-inclusions.ts, which reads the tour's own `included` /
// `excluded` lists and the tour's own itinerary. Entries taken from the tour's
// list are already localized by the content overlays and are printed verbatim;
// only derived lines carry an i18n key.
//
// Colour carries one meaning each:
//   green            — part of what this journey provides
//   primary outline  — agreed in the written quote, not promised here
//   neutral / red    — not included in the price
//
// Typography and layout follow the rest of the tour page: serif headings,
// bordered cards, no animation, and a night-by-night meal table that stacks on
// a phone instead of scrolling sideways.
// ─────────────────────────────────────────────────────────────────────────────
import { Check, Minus, X } from 'lucide-react';
import type { InclusionItem, MealRow, MealState, TourInclusions as Inclusions } from '@/data/tour-inclusions';

type Props = {
  inclusions: Inclusions;
  /** Destination id → localized name, for night-by-night place labels. */
  destinationNames: Record<string, string>;
  t: (key: string) => string;
  className?: string;
};

function itemLabel(item: InclusionItem, t: (key: string) => string): string {
  if (item.label) return item.label;
  const text = item.key ? t(item.key) : '';
  return item.nights ? text.split('{n}').join(String(item.nights)) : text;
}

/** A night's meal, as the itinerary states it. */
function MealChip({ label, state, t }: { label: string; state: MealState; t: (key: string) => string }) {
  if (state === 'included') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/25 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-700">
        <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {label} · {t('jx_inc_meal_included')}
      </span>
    );
  }
  if (state === 'confirmed') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold text-foreground">
        <Minus className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
        {label} · {t('jx_exp_confirmed')}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
      <X className="h-3.5 w-3.5 shrink-0 text-destructive/60" aria-hidden="true" />
      {label} · {t('jx_inc_meal_not_included')}
    </span>
  );
}

export function TourInclusions({ inclusions, destinationNames, t, className }: Props) {
  const { included, notIncluded, meals, dinnerSummary, cityDinnersExcluded } = inclusions;
  if (!included.length && !notIncluded.length) return null;

  const place = (row: MealRow) => {
    const dest = row.placeId ? destinationNames[row.placeId] : undefined;
    // Keep the itinerary's own accommodation wording whenever it says more
    // than the destination ("Merzouga Hotel" vs "Merzouga", "Luxury Desert
    // Camp" vs "Erg Chebbi"); only fall back to the destination name when
    // the row carries none.
    if (dest && row.place && row.place.toLowerCase().includes(dest.toLowerCase())) return row.place;
    return row.place || dest || '';
  };
  const breakfastCount = meals.filter((row) => row.breakfast === 'included').length;

  return (
    <section className={className ?? 'mb-16'} aria-labelledby="journey-inclusions">
      <h2 id="journey-inclusions" className="font-serif text-4xl text-foreground mb-3">
        {t('tour_included')}
      </h2>
      <p className="mb-4 max-w-3xl leading-relaxed text-muted-foreground">{t('jx_inc_lead')}</p>
      {inclusions.hasConfirmed && (
        <p className="mb-8 max-w-3xl rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm leading-relaxed text-foreground">
          {t('jx_inc_confirmed_note')}
        </p>
      )}

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          {included.length > 0 && (
            <ul className="space-y-3">
              {included.map((item) => (
                <li key={item.id} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10">
                    <Check className="h-4 w-4 text-green-600" aria-hidden="true" />
                  </span>
                  <span className="leading-relaxed text-foreground">
                    {itemLabel(item, t)}
                    {item.status === 'confirmed' && (
                      <span className="ml-2 whitespace-nowrap rounded-full border border-primary/30 bg-primary/5 px-2 py-0.5 text-[11px] font-semibold text-foreground">
                        {t('jx_exp_confirmed')}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {breakfastCount > 0 && (
            <div className="mb-6 flex items-start gap-2 rounded-2xl border border-green-500/20 bg-green-500/5 p-4 text-sm font-semibold text-green-800">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" aria-hidden="true" />
              {t('jx_inc_breakfasts_count').split('{n}').join(String(breakfastCount))}
            </div>
          )}

          {dinnerSummary.count > 0 && (
            <div className="mb-6 space-y-2 rounded-2xl border border-green-500/20 bg-green-500/5 p-4">
              <p className="text-sm font-semibold text-green-800">
                {t('jx_inc_dinners_count').split('{n}').join(String(dinnerSummary.count))}
              </p>
              <ul className="space-y-2">
                {dinnerSummary.nights.map((row) => (
                  <li key={`included-dinner-${row.night}`} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" aria-hidden="true" />
                    {t('jx_inc_dinner_at').split('{place}').join(place({ place: row.place, placeId: row.placeId, night: row.night, breakfast: 'not_included', dinner: 'included', camp: false }))}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {meals.length > 0 && (
            <div className="mt-10 rounded-3xl border border-border bg-card p-6 md:p-8">
              <h3 className="mb-2 font-serif text-2xl text-foreground">{t('jx_inc_meals_title')}</h3>
              <p className="mb-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{t('jx_inc_meals_lead')}</p>
              <ul className="divide-y divide-border">
                {meals.map((row) => (
                  <li key={row.night} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                        {t('jx_inc_night').split('{n}').join(String(row.night))}
                      </span>
                      <span className="font-semibold text-foreground">{place(row)}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <MealChip label={t('jx_inc_meal_breakfast')} state={row.breakfast} t={t} />
                      <MealChip label={t('jx_inc_meal_dinner')} state={row.dinner} t={t} />
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{t('jx_inc_meal_note')}</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-border bg-muted/40 p-6 md:p-8">
            <h3 className="mb-6 flex items-center gap-3 font-serif text-2xl text-foreground">
              <span className="rounded-full bg-destructive/10 p-2">
                <X className="h-5 w-5 text-destructive" aria-hidden="true" />
              </span>
              {t('tour_not_included')}
            </h3>
            <ul className="space-y-3 text-sm">
              {notIncluded.map((item) => (
                <li key={item.id} className="flex items-start gap-3 text-muted-foreground">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive/50" aria-hidden="true" />
                  {itemLabel(item, t)}
                </li>
              ))}
              {cityDinnersExcluded.map((group) => (
                <li key={`excluded-dinner-${group.place}`} className="flex items-start gap-3 text-muted-foreground">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive/50" aria-hidden="true" />
                  {t('jx_inc_dinner_in').split('{place}').join(place({ place: group.place, placeId: group.placeId, night: group.nights[0], breakfast: 'included', dinner: 'not_included', camp: false }))}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
