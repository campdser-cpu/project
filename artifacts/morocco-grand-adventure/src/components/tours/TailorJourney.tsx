// ─────────────────────────────────────────────────────────────────────────────
// Tailor This Journey — progressive disclosure over the existing request flow.
//
// What a traveller must fill in is deliberately small: dates, how many people,
// how many days. Everything else sits behind one button and is optional, so a
// first-time visitor sees three fields and a large "Send request — free"
// button, while someone who knows what they want can open the rest.
//
// This adds no booking engine and no payment: it composes a structured message
// and hands off to the two channels the site already uses — WhatsApp, and the
// /book request form (pre-filled through query parameters). Sending is free,
// and the button says so.
//
// Duration runs 1–30 days. Long journeys are a request, not a product: the
// architecture carries the number through to MGA rather than inventing a
// 30-day itinerary page.
//
// Accessibility: every control has a real <label>; the option groups are
// <fieldset>/<legend> with radio inputs (large tap targets, arrow-key
// navigable); the disclosure button carries aria-expanded/aria-controls; focus
// rings are visible; nothing depends on hover; no animation.
// ─────────────────────────────────────────────────────────────────────────────
import { useId, useMemo, useState } from 'react';
import { CalendarDays, ChevronDown, Users } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { contactInfo } from '@/data/content';
import type { AccommodationTier, CampTier } from '@/data/pricing/rates';
import {
  arrangementLabel,
  arrangementLabelEn,
  findArrangement,
  roomArrangements,
} from '@/data/pricing/rooms';
import { LADDER_MAX, getLadder, ladderPrice } from '@/data/pricing/ladder';
import { formatMoney } from '@/lib/pricing';

type Props = {
  t: (key: string) => string;
  /** Tour or journey being tailored; empty for the open-ended builder. */
  tripName?: string;
  /**
   * Tour id, used to look up pricing configuration. Journeys with no costed
   * configuration — which today is every one of them — stay quote-only.
   */
  tourId?: string;
  /** Locale, for formatting a price once one exists. */
  lang?: string;
  /** Localized path to the request form, e.g. /fr/book. */
  bookHref: string;
  /** Starting day count — the tour's own duration where there is one. */
  defaultDays?: number;
  className?: string;
};

const MIN_DAYS = 1;
const MAX_DAYS = 30;

type Tier = AccommodationTier | CampTier;
type Choice = { value: string; labelKey: string; tier?: Tier };
const STYLE: Choice[] = [
  { value: 'Private', labelKey: 'jx_f_private' },
  { value: 'Shared', labelKey: 'jx_f_shared' },
];
const COMFORT: Choice[] = [
  { value: 'Standard', labelKey: 'jx_f_comfort_standard', tier: 'standard' },
  { value: 'Luxury', labelKey: 'jx_f_comfort_luxury', tier: 'luxury' },
];
const CAMP: Choice[] = [
  { value: 'Standard camp', labelKey: 'jx_f_camp_standard', tier: 'standard' },
  { value: 'Luxury camp', labelKey: 'jx_f_camp_luxury', tier: 'luxury' },
];
const PACE: Choice[] = [
  { value: 'Relaxed', labelKey: 'jx_f_pace_relaxed' },
  { value: 'See as much as possible', labelKey: 'jx_f_pace_full' },
];

const LEGEND = 'mb-2 block text-sm font-bold text-foreground';

/** One line of the selection summary. */
function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-0 items-baseline justify-between gap-3 border-b border-border/50 pb-1.5">
      <dt className="shrink-0 text-sm text-muted-foreground">{label}</dt>
      <dd className="min-w-0 break-words text-right text-sm font-semibold text-foreground">{value}</dd>
    </div>
  );
}

/**
 * Radio group rendered as chips. Hoisted out of the component body on purpose:
 * declared inline it was a fresh component type on every render, so React
 * unmounted and remounted the inputs each time one was chosen and keyboard focus
 * was lost after every selection — the opposite of what this file's own
 * accessibility notes promise.
 */
function OptionGroup({
  uid,
  name,
  label,
  options,
  value,
  onChange,
  t,
  includeAny = true,
  labelFor,
}: {
  uid: string;
  name: string;
  label: string;
  options: Choice[];
  value: string;
  onChange: (v: string) => void;
  t: (key: string) => string;
  includeAny?: boolean;
  /** Overrides the default `t(labelKey)` — used where labels are assembled. */
  labelFor?: (o: Choice) => string;
}) {
  const all = includeAny ? [{ value: '', labelKey: 'jx_f_any' }, ...options] : options;
  return (
    <fieldset className="min-w-0">
      <legend className={LEGEND}>{label}</legend>
      <div className="flex flex-wrap gap-2">
        {all.map((o) => {
          const id = `${uid}-${name}-${o.value || 'any'}`;
          return (
            <span key={id}>
              <input
                type="radio"
                id={id}
                name={`${uid}-${name}`}
                className="peer sr-only"
                checked={value === o.value}
                onChange={() => onChange(o.value)}
              />
              <label
                htmlFor={id}
                className="inline-block cursor-pointer rounded-full border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary"
              >
                {labelFor ? labelFor(o) : t(o.labelKey)}
              </label>
            </span>
          );
        })}
      </div>
    </fieldset>
  );
}

export function TailorJourney({
  t,
  tripName = '',
  tourId,
  lang = 'en',
  bookHref,
  defaultDays,
  className = '',
}: Props) {
  const uid = useId();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');
  const [travellers, setTravellers] = useState(2);
  const [days, setDays] = useState(
    Math.min(MAX_DAYS, Math.max(MIN_DAYS, defaultDays ?? 4)),
  );
  const [style, setStyle] = useState('');
  const [comfort, setComfort] = useState('');
  const [camp, setCamp] = useState('');
  const [pace, setPace] = useState('');
  const [notes, setNotes] = useState('');
  // Only the arrangement's id is held. Resolving it against the current party
  // size each render means changing the traveller count cannot leave a stale
  // arrangement selected: one that no longer fits simply resolves back to the
  // deferred option.
  const [roomId, setRoomId] = useState('defer');

  const arrangements = useMemo(() => roomArrangements(travellers), [travellers]);
  const arrangement = useMemo(() => findArrangement(travellers, roomId), [travellers, roomId]);
  const roomChoices: Choice[] = useMemo(
    () => arrangements.map((a) => ({ value: a.id, labelKey: a.id })),
    [arrangements],
  );

  // Price, or the reason there isn't one. Today every tour is quote-only: the
  // rate card is unconfigured and no tour is costed, so this is always null and
  // the panel below renders the tailored-quote line instead of a figure.
  // The published price for this party, straight from the ladder. Undefined for
  // a tour that has no published price, and for a party outside what the ladder
  // covers — both fall through to the quote line rather than to a guess.
  const ladder = tourId ? getLadder(tourId) : undefined;
  const price = useMemo(
    () => (tourId ? ladderPrice(tourId, travellers) ?? null : null),
    [tourId, travellers],
  );
  /** A priced tour, but this party is too large for the published ladder. */
  const overLadder = Boolean(ladder) && travellers > (ladder?.maxTravelers ?? LADDER_MAX);

  // Operator-facing summary. Preferences the traveller left blank are omitted
  // rather than sent as a guess. The estimate is included only when one exists —
  // never a placeholder, and never the internal cost breakdown.
  const summary = useMemo(() => {
    const lines = [
      tripName ? `Trip: ${tripName}` : 'Trip: to be discussed',
      `Dates: ${date || 'flexible'}`,
      `Travellers: ${travellers}`,
      `Days: ${days}`,
    ];
    if (style) lines.push(`Style: ${style}`);
    if (comfort) lines.push(`Comfort: ${comfort}`);
    lines.push(`Room arrangement: ${arrangementLabelEn(arrangement)}`);
    if (camp) lines.push(`Desert camp: ${camp}`);
    if (pace) lines.push(`Pace: ${pace}`);
    if (price) {
      // The published selling price only. No cost, no margin, no breakdown.
      lines.push(`Price per person: €${price.perPerson}`);
      lines.push(`Total: €${price.total}`);
    }
    if (notes.trim()) lines.push(`Notes: ${notes.trim()}`);
    return lines.join('\n');
  }, [tripName, date, travellers, days, style, comfort, arrangement, camp, pace, price, notes]);

  const whatsappHref = `${contactInfo.whatsapp}?text=${encodeURIComponent(summary)}`;
  const formHref = `${bookHref}?${new URLSearchParams({
    tour: tripName,
    date,
    travelers: String(travellers),
    days: String(days),
    rooms: arrangementLabelEn(arrangement),
    notes: summary,
  }).toString()}`;

  const field = 'w-full rounded-xl border border-border bg-background px-4 py-3.5 text-base text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20';
  const legend = LEGEND;

  return (
    <section
      aria-labelledby={`${uid}-title`}
      className={`rounded-3xl border border-border bg-card p-6 md:p-8 ${className}`}
    >
      <h2 id={`${uid}-title`} className="font-serif text-3xl text-foreground mb-2">
        {t('jx_tailor_title')}
      </h2>
      <p className="mb-6 text-muted-foreground leading-relaxed">{t('jx_tailor_lead')}</p>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor={`${uid}-date`} className={legend}>
            {t('book_select_date')}
          </label>
          <div className="relative">
            <CalendarDays
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary"
              aria-hidden="true"
            />
            <input
              id={`${uid}-date`}
              type="date"
              min={new Date().toISOString().slice(0, 10)}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`${field} pl-12`}
            />
          </div>
        </div>
        <div>
          <label htmlFor={`${uid}-travellers`} className={legend}>
            {t('book_travelers')}
          </label>
          <div className="relative">
            <Users
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary"
              aria-hidden="true"
            />
            <input
              id={`${uid}-travellers`}
              type="number"
              inputMode="numeric"
              min={1}
              max={50}
              value={travellers}
              onChange={(e) => setTravellers(Math.max(1, Math.min(50, Number(e.target.value) || 1)))}
              className={`${field} pl-12`}
            />
          </div>
        </div>
        <div>
          <label htmlFor={`${uid}-days`} className={legend}>
            {t('jx_f_days')}
          </label>
          <input
            id={`${uid}-days`}
            type="number"
            inputMode="numeric"
            min={MIN_DAYS}
            max={MAX_DAYS}
            value={days}
            onChange={(e) =>
              setDays(Math.max(MIN_DAYS, Math.min(MAX_DAYS, Number(e.target.value) || MIN_DAYS)))
            }
            aria-describedby={`${uid}-days-hint`}
            className={field}
          />
        </div>
      </div>
      <p id={`${uid}-days-hint`} className="mt-2 text-sm text-muted-foreground">
        {t('jx_f_days_hint')}
      </p>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`${uid}-more`}
        className="mt-6 inline-flex items-center gap-2 rounded-xl border-2 border-foreground px-5 py-3 text-base font-bold text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {open ? t('jx_tailor_less') : t('jx_tailor_more')}
        <ChevronDown className={`h-4 w-4 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      <div id={`${uid}-more`} hidden={!open} className="mt-6 space-y-6 border-t border-border pt-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <OptionGroup uid={uid} t={t} name="style" label={t('jx_f_style')} options={STYLE} value={style} onChange={setStyle} />
          <OptionGroup uid={uid} t={t} name="comfort" label={t('jx_f_comfort')} options={COMFORT} value={comfort} onChange={setComfort} />
          <OptionGroup uid={uid} t={t} name="camp" label={t('jx_f_camp')} options={CAMP} value={camp} onChange={setCamp} />
          <OptionGroup uid={uid} t={t} name="pace" label={t('jx_f_pace')} options={PACE} value={pace} onChange={setPace} />
        </div>

        {/* Rooms. The options are generated from the party size, so the group
            re-shapes itself as the traveller count changes, and it never offers
            a room type this project cannot evidence (no triples, no family
            rooms). The deferred option is always present and is the default:
            Morocco Grand Adventure books these rooms with the guesthouses on the
            route rather than holding inventory of its own. */}
        <div>
          <OptionGroup
            uid={uid}
            t={t}
            name="rooms"
            label={t('px_rooms')}
            options={roomChoices}
            value={arrangement.id}
            onChange={setRoomId}
            includeAny={false}
            labelFor={(o) => arrangementLabel(findArrangement(travellers, o.value), t)}
          />
          <p className="mt-2 text-sm text-muted-foreground">{t('px_rooms_hint')}</p>
        </div>

        <div>
          <label htmlFor={`${uid}-notes`} className={legend}>
            {t('jx_f_notes')}
          </label>
          <textarea
            id={`${uid}-notes`}
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={t('jx_f_notes_ph')}
            className={`${field} resize-y`}
          />
        </div>
      </div>

      {/* What the traveller has chosen, and what it costs — or, while no tour is
          costed, the plain statement that the figure comes from us. There is no
          placeholder amount, no "€0" and no "from" label here: an unpriced
          journey shows the quote line, which is what actually happens. */}
      <div className="mt-8 rounded-2xl border border-border bg-background p-5 md:p-6">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          {t('px_summary')}
        </h3>
        <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
          <SummaryRow label={t('book_travelers')} value={String(travellers)} />
          <SummaryRow label={t('jx_f_days')} value={String(days)} />
          {style && <SummaryRow label={t('jx_f_style')} value={t(STYLE.find((o) => o.value === style)!.labelKey)} />}
          {comfort && <SummaryRow label={t('jx_f_comfort')} value={t(COMFORT.find((o) => o.value === comfort)!.labelKey)} />}
          <SummaryRow label={t('px_rooms')} value={arrangementLabel(arrangement, t)} />
          {camp && <SummaryRow label={t('jx_f_camp')} value={t(CAMP.find((o) => o.value === camp)!.labelKey)} />}
        </dl>

        <div className="mt-5 border-t border-border pt-5">
          {price ? (
            <>
              {/* Per person first, then the total: the traveller compares the
                  per-head figure, and the total answers "so what do we pay?". */}
              <p className="font-serif text-4xl font-bold text-foreground">
                {formatMoney(price.perPerson, price.currency, lang)}{' '}
                <span className="text-base font-sans font-normal text-muted-foreground">
                  {t('px_per_person')}
                </span>
              </p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                {formatMoney(price.total, price.currency, lang)}{' '}
                <span className="text-base font-normal text-muted-foreground">
                  {t('px_total')}
                </span>
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{t('px_price_note')}</p>
            </>
          ) : overLadder ? (
            <>
              {/* A priced tour, but a party bigger than the published ladder.
                  We say so and hand over to the quote flow rather than
                  extrapolating a seventh, eighth or fortieth traveller. */}
              <p className="font-serif text-2xl text-foreground">{t('px_price_pending')}</p>
              <p className="mt-2 text-sm text-muted-foreground">{t('px_quote_above')}</p>
            </>
          ) : (
            <>
              <p className="font-serif text-2xl text-foreground">{t('px_price_pending')}</p>
              <p className="mt-2 text-sm text-muted-foreground">{t('px_price_pending_note')}</p>
            </>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 text-lg font-bold text-[#0d2b1d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <SiWhatsapp className="h-6 w-6" aria-hidden="true" />
          {t('jx_tailor_send')}
        </a>
        <a
          href={formHref}
          className="inline-flex flex-1 items-center justify-center rounded-xl border-2 border-foreground px-6 py-4 text-lg font-bold text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {t('book_form_cta')}
        </a>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{t('jx_tailor_free')}</p>
    </section>
  );
}
