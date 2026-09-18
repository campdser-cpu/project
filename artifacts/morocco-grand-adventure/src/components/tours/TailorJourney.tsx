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

type Props = {
  t: (key: string) => string;
  /** Tour or journey being tailored; empty for the open-ended builder. */
  tripName?: string;
  /** Localized path to the request form, e.g. /fr/book. */
  bookHref: string;
  /** Starting day count — the tour's own duration where there is one. */
  defaultDays?: number;
  className?: string;
};

const MIN_DAYS = 1;
const MAX_DAYS = 30;

type Choice = { value: string; labelKey: string };
const STYLE: Choice[] = [
  { value: 'Private', labelKey: 'jx_f_private' },
  { value: 'Shared', labelKey: 'jx_f_shared' },
];
const COMFORT: Choice[] = [
  { value: 'Standard', labelKey: 'jx_f_comfort_standard' },
  { value: 'Luxury', labelKey: 'jx_f_comfort_luxury' },
];
const CAMP: Choice[] = [
  { value: 'Standard camp', labelKey: 'jx_f_camp_standard' },
  { value: 'Luxury camp', labelKey: 'jx_f_camp_luxury' },
];
const PACE: Choice[] = [
  { value: 'Relaxed', labelKey: 'jx_f_pace_relaxed' },
  { value: 'See as much as possible', labelKey: 'jx_f_pace_full' },
];

export function TailorJourney({ t, tripName = '', bookHref, defaultDays, className = '' }: Props) {
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

  // Operator-facing summary. Preferences the traveller left blank are omitted
  // rather than sent as a guess.
  const summary = useMemo(() => {
    const lines = [
      tripName ? `Trip: ${tripName}` : 'Trip: to be discussed',
      `Dates: ${date || 'flexible'}`,
      `Travellers: ${travellers}`,
      `Days: ${days}`,
    ];
    if (style) lines.push(`Style: ${style}`);
    if (comfort) lines.push(`Comfort: ${comfort}`);
    if (camp) lines.push(`Desert camp: ${camp}`);
    if (pace) lines.push(`Pace: ${pace}`);
    if (notes.trim()) lines.push(`Notes: ${notes.trim()}`);
    return lines.join('\n');
  }, [tripName, date, travellers, days, style, comfort, camp, pace, notes]);

  const whatsappHref = `${contactInfo.whatsapp}?text=${encodeURIComponent(summary)}`;
  const formHref = `${bookHref}?${new URLSearchParams({
    tour: tripName,
    date,
    travelers: String(travellers),
    days: String(days),
    notes: summary,
  }).toString()}`;

  const field = 'w-full rounded-xl border border-border bg-background px-4 py-3.5 text-base text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20';
  const legend = 'mb-2 block text-sm font-bold text-foreground';

  function OptionGroup({
    name,
    label,
    options,
    value,
    onChange,
  }: {
    name: string;
    label: string;
    options: Choice[];
    value: string;
    onChange: (v: string) => void;
  }) {
    return (
      <fieldset className="min-w-0">
        <legend className={legend}>{label}</legend>
        <div className="flex flex-wrap gap-2">
          {[{ value: '', labelKey: 'jx_f_any' }, ...options].map((o) => {
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
                  {t(o.labelKey)}
                </label>
              </span>
            );
          })}
        </div>
      </fieldset>
    );
  }

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
          <OptionGroup name="style" label={t('jx_f_style')} options={STYLE} value={style} onChange={setStyle} />
          <OptionGroup name="comfort" label={t('jx_f_comfort')} options={COMFORT} value={comfort} onChange={setComfort} />
          <OptionGroup name="camp" label={t('jx_f_camp')} options={CAMP} value={camp} onChange={setCamp} />
          <OptionGroup name="pace" label={t('jx_f_pace')} options={PACE} value={pace} onChange={setPace} />
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

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
