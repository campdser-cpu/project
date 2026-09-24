// ─────────────────────────────────────────────────────────────────────────────
// Send an Inquiry by Email — the second, written channel beside WhatsApp.
//
// The traveller never has to explain which journey they mean: the tour name is
// carried in the payload and shown, locked, in the form. Sending is free and no
// payment is taken (the same promise the /book page makes).
//
// The fields and every message are the ones this project already uses for the
// booking request: src/data/book-copy.ts carries the labels in all eleven
// languages, and the submit goes to the existing POST /api/inquiry endpoint that
// delivers to the configured business inbox. Nothing new is introduced — this is
// the same inquiry path, opened from the tour page with the tour attached.
//
// If the endpoint is unreachable, the same details are handed to the WhatsApp
// channel in one click, so an inquiry is never lost.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useId, useState, type FormEvent } from 'react';
import { CheckCircle2, Mail } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { BOOK_COPY } from '@/data/book-copy';
import { waPromoLink } from '@/lib/promo';

/** Same resolution order as the contact page: an env override, else same-origin /api. */
const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env.VITE_API_URL) || '/api';

type Props = {
  tourName: string;
  lang: string;
  /** Carried over from the booking panel so nothing is typed twice. */
  travelDate?: string;
  travelers?: number;
  t: (key: string) => string;
  className?: string;
};

type Status = 'idle' | 'sending' | 'success' | 'error';

const inputClass =
  'w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15';

export function TourInquiryForm({ tourName, lang, travelDate = '', travelers: party = 2, t, className }: Props) {
  const c = BOOK_COPY[lang] ?? BOOK_COPY.en;
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(travelDate);
  const [travelers, setTravelers] = useState(party);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const fieldId = useId();

  // The booking panel's date and party size stay the source of truth.
  useEffect(() => setDate(travelDate), [travelDate]);
  useEffect(() => setTravelers(party), [party]);

  const summary = [
    `${t('jx_inq_tour_label')}: ${tourName}`,
    `${c.date}: ${date || '—'}`,
    `${c.travelers}: ${travelers}`,
    `${c.name}: ${name || '—'}`,
    `${c.email}: ${email || '—'}`,
    `${c.message}: ${message || '—'}`,
  ].join('\n');
  const whatsappHref = waPromoLink(`${tourName}\n\n${summary}`);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    const parts = name.trim().split(/\s+/);
    try {
      const response = await fetch(`${API_BASE}/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: parts[0] ?? '',
          lastName: parts.slice(1).join(' '),
          email: email.trim(),
          travelDates: date,
          travelers: String(travelers),
          destinations: '',
          tourInterest: tourName,
          tour: tourName,
          accommodation: '',
          message: message.trim(),
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.success) throw new Error(data.error || 'Request failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        aria-expanded={open}
        aria-controls={`${fieldId}-panel`}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-foreground px-6 py-4 text-lg font-bold text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <Mail className="h-5 w-5" aria-hidden="true" />
        {t('jx_inq_cta')}
      </button>

      {open && (
        <div id={`${fieldId}-panel`} className="mt-4 rounded-2xl border border-border bg-muted/30 p-5">
          {status === 'success' ? (
            <div className="text-center">
              <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-green-600" aria-hidden="true" />
              <p className="font-serif text-xl text-foreground">{t('jx_inq_sent_title')}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.successText}</p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-bold text-[#0d2b1d]"
              >
                <SiWhatsapp className="h-5 w-5" aria-hidden="true" />
                {c.successWhatsapp}
              </a>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4" dir={lang === 'ar' ? 'rtl' : undefined}>
              <p className="text-xs leading-relaxed text-muted-foreground">{t('jx_inq_note')}</p>

              <div className="rounded-xl border border-border bg-background px-4 py-3">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  {t('jx_inq_tour_label')}
                </span>
                <span className="font-semibold text-foreground">{tourName}</span>
              </div>

              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {c.name} *
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  className={inputClass}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {c.email} *
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className={inputClass}
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {c.date}
                  </span>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {c.travelers}
                  </span>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={travelers}
                    onChange={(e) => setTravelers(Math.max(1, Math.min(50, Number(e.target.value) || 1)))}
                    className={inputClass}
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {c.message}
                </span>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={c.messagePlaceholder}
                  className={`${inputClass} resize-y`}
                />
              </label>

              {/* Honeypot: the endpoint rejects any submission that fills it. */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              {status === 'error' && (
                <div role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm">
                  {c.error}
                  <div className="mt-3">
                    <a href={whatsappHref} target="_blank" rel="noreferrer" className="font-bold text-primary underline">
                      {t('jx_inq_whatsapp')}
                    </a>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full rounded-xl bg-foreground px-6 py-3.5 font-bold text-background transition-colors hover:bg-primary hover:text-primary-foreground disabled:cursor-wait disabled:opacity-60"
              >
                {status === 'sending' ? t('jx_inq_sending') : t('contact_send_btn')}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}


