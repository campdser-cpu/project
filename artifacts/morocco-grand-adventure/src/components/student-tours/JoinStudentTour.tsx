// ─────────────────────────────────────────────────────────────────────────────
// Join Now — the student-tour booking request flow.
//
// Four short steps inside one accessible dialog (Radix, via src/components/ui/
// dialog.tsx — focus trap and ESC-to-close come from the primitive): choose a
// real scheduled departure, say how many travelers, give contact details, see
// a summary with the real price/deposit (or an honest "price to be confirmed"
// when the departure has none), then submit.
//
// At the summary step, the customer explicitly chooses how this reaches the
// business — WhatsApp (always a deep link, pre-filled, using the site's real
// number from src/data/content.ts — never a new/invented one) or Email (a
// real POST /api/inquiry submission, the same backend src/pages/book.tsx and
// TourInquiryForm.tsx already use, with a mailto: fallback if that call
// fails). See src/components/ui/ContactChoiceButtons.tsx. No payment is taken
// here either way; the deposit figure shown is informational, matching the
// "Book Now, Pay Later" promise made everywhere else on the site.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useId, useMemo, useState } from 'react';
import { CheckCircle2, ChevronLeft } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { contactInfo } from '@/data/content';
import { trackEvent } from '@/lib/analytics';
import { ContactChoiceButtons } from '@/components/ui/ContactChoiceButtons';
import type { InquiryPayload } from '@/lib/inquiryChannels';
import {
  type StudentGroupDeparture,
  seatsAvailable,
  depositBreakdown,
  effectiveDepositPercent,
  isJoinable,
  departureDisplayStatus,
} from '@/data/student-group-departures';

type Step = 'departure' | 'travelers' | 'details' | 'summary' | 'done';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tourSlug: string;
  tourTitle: string;
  departures: StudentGroupDeparture[];
  initialDepartureId?: string;
  lang: string;
  t: (key: string) => string;
};

const inputClass =
  'w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15';
const labelClass = 'mb-1.5 block text-sm font-semibold text-foreground';

function formatMoney(amount: number, currency: string, lang?: string): string {
  try {
    return new Intl.NumberFormat(lang, { style: 'currency', currency, maximumFractionDigits: 2 }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

export function JoinStudentTour({ open, onOpenChange, tourSlug, tourTitle, departures, initialDepartureId, lang, t }: Props) {
  const uid = useId();
  const joinable = useMemo(() => departures.filter(isJoinable), [departures]);
  const [step, setStep] = useState<Step>('departure');
  const [departureId, setDepartureId] = useState(initialDepartureId ?? joinable[0]?.id ?? '');
  const [travelers, setTravelers] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [nationality, setNationality] = useState('');
  const [university, setUniversity] = useState('');
  const [notes, setNotes] = useState('');

  // Re-open the flow fresh every time, on the departure the visitor actually clicked.
  useEffect(() => {
    if (open) {
      setStep(joinable.length > 0 ? (joinable.length === 1 ? 'travelers' : 'departure') : 'details');
      setDepartureId(initialDepartureId ?? joinable[0]?.id ?? '');
      trackEvent('booking_started', { tour_slug: tourSlug, departure_id: initialDepartureId ?? '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const departure = joinable.find((d) => d.id === departureId);
  const breakdown = departure ? depositBreakdown(departure, travelers) : undefined;
  const depositPercent = departure ? effectiveDepositPercent(departure) : undefined;

  // Operator-facing, always English — matches the project's existing convention
  // (e.g. arrangementLabelEn in src/data/pricing/rooms.ts) of sending the
  // business a single consistent language regardless of the visitor's locale.
  const whatsappSummaryLines = useMemo(() => {
    const lines = [
      `Student tour: ${tourTitle}`,
      departure ? `Departure: ${departure.startDate} to ${departure.endDate} (${departure.departureCity})` : 'Departure: to be confirmed with us',
      `Departure ID: ${departureId || 'Not selected'}`,
      `Travelers: ${travelers}`,
      `Name: ${fullName || '—'}`,
      `Email: ${email || '—'}`,
      `WhatsApp / phone: ${whatsappNumber || '—'}`,
      `Nationality: ${nationality || '—'}`,
    ];
    if (university.trim()) lines.push(`University: ${university.trim()}`);
    if (breakdown) {
      lines.push(`Total: ${formatMoney(breakdown.total, breakdown.currency)}`);
      lines.push(`Deposit (${depositPercent}%): ${formatMoney(breakdown.deposit, breakdown.currency)}`);
      lines.push(`Remaining on arrival: ${formatMoney(breakdown.remaining, breakdown.currency)}`);
    }
    if (notes.trim()) lines.push(`Special requests: ${notes.trim()}`);
    return lines;
  }, [tourTitle, departure, departureId, travelers, fullName, email, whatsappNumber, nationality, university, notes, breakdown, depositPercent]);

  // Visitor-facing, localized — what the on-screen summary step actually renders.
  const displaySummary = useMemo(() => {
    const rows = [
      { label: t('st_jn_sum_tour'), value: tourTitle },
      { label: t('st_jn_sum_departure'), value: departure ? `${departure.startDate} → ${departure.endDate}` : t('st_jn_sum_departure_tbc') },
      { label: t('book_travelers'), value: String(travelers) },
      { label: t('st_jn_full_name'), value: fullName || '—' },
      { label: t('st_jn_email'), value: email || '—' },
      { label: t('st_jn_whatsapp'), value: whatsappNumber || '—' },
      { label: t('st_jn_nationality'), value: nationality || '—' },
    ];
    if (university.trim()) rows.push({ label: t('st_jn_university'), value: university.trim() });
    if (breakdown) {
      rows.push({ label: t('st_jn_sum_total'), value: formatMoney(breakdown.total, breakdown.currency, lang) });
      rows.push({ label: `${t('st_jn_sum_deposit')} (${depositPercent}%)`, value: formatMoney(breakdown.deposit, breakdown.currency, lang) });
      rows.push({ label: t('st_jn_sum_remaining'), value: formatMoney(breakdown.remaining, breakdown.currency, lang) });
    }
    if (notes.trim()) rows.push({ label: t('st_jn_requests'), value: notes.trim() });
    return rows;
  }, [t, tourTitle, departure, travelers, fullName, email, whatsappNumber, nationality, university, notes, breakdown, depositPercent, lang]);

  const whatsappHref = `${contactInfo.whatsapp}?text=${encodeURIComponent(
    [`Hi Morocco Grand Adventure! I'd like to join: ${tourTitle}`, ...whatsappSummaryLines.slice(1)].join('\n'),
  )}`;

  const emailSubject = `New Student Tour Booking Request — ${tourTitle}`;
  const emailBody = whatsappSummaryLines.join('\n');
  const emailPayload: InquiryPayload = useMemo(() => {
    const parts = fullName.trim().split(/\s+/);
    return {
      firstName: parts[0] ?? '',
      lastName: parts.slice(1).join(' '),
      email: email.trim(),
      phone: whatsappNumber.trim(),
      travelDates: departure ? `${departure.startDate} to ${departure.endDate}` : '',
      travelers: String(travelers),
      destinations: '',
      tourInterest: tourTitle,
      accommodation: '',
      message: emailBody,
    };
  }, [fullName, email, whatsappNumber, departure, travelers, tourTitle, emailBody]);

  function handleWhatsapp() {
    trackEvent('booking_submitted', { tour_slug: tourSlug, departure_id: departureId, travelers, method: 'whatsapp' });
    setStep('done');
  }

  function handleEmailResult(method: 'api' | 'mailto', success: boolean) {
    trackEvent('booking_submitted', { tour_slug: tourSlug, departure_id: departureId, travelers, method: `email_${method}`, success });
    if (method === 'api' && success) setStep('done');
  }

  const steps: Step[] = joinable.length > 1 ? ['departure', 'travelers', 'details', 'summary'] : ['travelers', 'details', 'summary'];
  const stepIndex = steps.indexOf(step);
  const back = () => { if (stepIndex > 0) setStep(steps[stepIndex - 1]); };
  const next = () => { if (stepIndex >= 0 && stepIndex < steps.length - 1) setStep(steps[stepIndex + 1]); };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl w-[calc(100%-2rem)]">
        {step !== 'done' && (
          <DialogHeader>
            {stepIndex > 0 && (
              <button
                type="button"
                onClick={back}
                className="mb-1 inline-flex items-center gap-1 self-start text-sm font-semibold text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" /> {t('st_jn_back')}
              </button>
            )}
            <DialogTitle>{t('st_jn_title')}</DialogTitle>
            <DialogDescription>{tourTitle}</DialogDescription>
            {stepIndex >= 0 && (
              <ol className="mt-1 flex gap-1.5" aria-label={t('st_jn_step_label')}>
                {steps.map((s, i) => (
                  <li
                    key={s}
                    aria-current={i === stepIndex ? 'step' : undefined}
                    className={`h-1.5 flex-1 rounded-full ${i <= stepIndex ? 'bg-primary' : 'bg-muted'}`}
                  />
                ))}
              </ol>
            )}
          </DialogHeader>
        )}

        {step === 'departure' && (
          <fieldset>
            <legend className={labelClass}>{t('st_jn_step_departure')}</legend>
            <div className="space-y-2">
              {joinable.map((d) => {
                const status = departureDisplayStatus(d);
                const seats = seatsAvailable(d);
                return (
                  <label
                    key={d.id}
                    className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3 transition-colors ${departureId === d.id ? 'border-primary bg-primary/5' : 'border-border'}`}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name={`${uid}-departure`}
                        checked={departureId === d.id}
                        onChange={() => setDepartureId(d.id)}
                        className="h-4 w-4 accent-primary"
                      />
                      <span className="text-sm font-semibold text-foreground">{d.startDate} → {d.endDate}</span>
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {status === 'request' ? t('st_dc_status_request') : `${seats} ${t('st_jn_seats_left')}`}
                    </span>
                  </label>
                );
              })}
            </div>
            <button
              type="button"
              disabled={!departureId}
              onClick={next}
              className="mt-5 w-full rounded-xl bg-primary py-3.5 font-bold text-primary-foreground disabled:opacity-50"
            >
              {t('st_jn_continue')}
            </button>
          </fieldset>
        )}

        {step === 'travelers' && (
          <div>
            {joinable.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-5 text-center">
                <p className="text-sm text-muted-foreground">{t('st_jn_no_departures')}</p>
              </div>
            ) : null}
            <label htmlFor={`${uid}-travelers`} className={labelClass}>{t('book_travelers')}</label>
            <div className="flex items-center justify-between rounded-xl border border-border bg-background p-2">
              <button
                type="button"
                onClick={() => setTravelers((n) => Math.max(1, n - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-foreground hover:bg-primary/20"
                aria-label={t('td_decrease')}
              >−</button>
              <span id={`${uid}-travelers`} className="text-lg font-bold">{travelers}</span>
              <button
                type="button"
                onClick={() => setTravelers((n) => Math.min(50, n + 1))}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-foreground hover:bg-primary/20"
                aria-label={t('td_increase')}
              >+</button>
            </div>
            <button type="button" onClick={next} className="mt-5 w-full rounded-xl bg-primary py-3.5 font-bold text-primary-foreground">
              {t('st_jn_continue')}
            </button>
          </div>
        )}

        {step === 'details' && (
          <form onSubmit={(e) => { e.preventDefault(); next(); }} className="space-y-4">
            <div>
              <label htmlFor={`${uid}-name`} className={labelClass}>{t('st_jn_full_name')}</label>
              <input id={`${uid}-name`} required value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label htmlFor={`${uid}-email`} className={labelClass}>{t('st_jn_email')}</label>
              <input id={`${uid}-email`} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label htmlFor={`${uid}-wa`} className={labelClass}>{t('st_jn_whatsapp')}</label>
              <input id={`${uid}-wa`} type="tel" required value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label htmlFor={`${uid}-nat`} className={labelClass}>{t('st_jn_nationality')}</label>
              <input id={`${uid}-nat`} required value={nationality} onChange={(e) => setNationality(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label htmlFor={`${uid}-uni`} className={labelClass}>{t('st_jn_university')}</label>
              <input id={`${uid}-uni`} value={university} onChange={(e) => setUniversity(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label htmlFor={`${uid}-notes`} className={labelClass}>{t('st_jn_requests')}</label>
              <textarea id={`${uid}-notes`} rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className={`${inputClass} resize-y`} />
            </div>
            <button type="submit" className="w-full rounded-xl bg-primary py-3.5 font-bold text-primary-foreground">
              {t('st_jn_continue')}
            </button>
          </form>
        )}

        {step === 'summary' && (
          <div>
            <dl className="space-y-2 rounded-xl border border-border bg-background p-4 text-sm">
              {displaySummary.map((row) => (
                <div key={row.label} className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">{row.label}</dt>
                  <dd className="text-right font-semibold text-foreground">{row.value}</dd>
                </div>
              ))}
            </dl>
            {!breakdown && (
              <p className="mt-3 text-xs text-muted-foreground">{t('st_jn_price_on_request')}</p>
            )}
            <ContactChoiceButtons
              t={t}
              className="mt-5"
              whatsappHref={whatsappHref}
              onWhatsapp={handleWhatsapp}
              emailPayload={emailPayload}
              emailSubject={emailSubject}
              emailBody={emailBody}
              onEmailResult={handleEmailResult}
            />
          </div>
        )}

        {step === 'done' && (
          <div className="py-4 text-center">
            <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-primary" aria-hidden="true" />
            <h2 className="font-serif text-2xl text-foreground">{t('st_jn_done_title')}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t('st_jn_done_text')}</p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('whatsapp_student_click', { tour_slug: tourSlug, placement: 'booking_confirmation' })}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 font-bold text-[#0d2b1d] hover:bg-[#128C7E]"
            >
              <SiWhatsapp className="h-5 w-5" aria-hidden="true" /> {t('st_jn_whatsapp_continue')}
            </a>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
