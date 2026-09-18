// ─────────────────────────────────────────────────────────────────────────────
// How Booking Works — the one place the payment sequence is shown visually.
//
// The four steps are the policy confirmed by the owner:
//   request (free) → we confirm → 20% deposit → 80% on arrival in Morocco.
// The cancellation line below them is the same 7-day rule the FAQ states.
// Wording lives in src/i18n/gaps/journey.ts for all eleven languages; this
// component holds no copy of its own so the policy cannot drift between here
// and the FAQ.
//
// Each step is numbered in text as well as position, so the sequence survives
// a screen reader, a narrow phone, and a reader who does not read left to
// right. Nothing here takes a payment — the site has no checkout.
// ─────────────────────────────────────────────────────────────────────────────
import { FileText, MessageSquare, Wallet, PlaneLanding } from 'lucide-react';

const STEPS = [
  { n: 1, icon: FileText, title: 'jx_hbw_1_t', desc: 'jx_hbw_1_d' },
  { n: 2, icon: MessageSquare, title: 'jx_hbw_2_t', desc: 'jx_hbw_2_d' },
  { n: 3, icon: Wallet, title: 'jx_hbw_3_t', desc: 'jx_hbw_3_d' },
  { n: 4, icon: PlaneLanding, title: 'jx_hbw_4_t', desc: 'jx_hbw_4_d' },
] as const;

export function HowBookingWorks({ t, className = '' }: { t: (key: string) => string; className?: string }) {
  return (
    <section
      aria-labelledby="how-booking-works"
      className={`rounded-3xl border border-border bg-card p-6 md:p-8 ${className}`}
    >
      <h2 id="how-booking-works" className="font-serif text-3xl text-foreground mb-6">
        {t('jx_hbw_title')}
      </h2>
      <ol className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {STEPS.map(({ n, icon: Icon, title, desc }) => (
          <li key={n} className="rounded-2xl border border-border bg-background p-5">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground">
                {n}
              </span>
              <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <h3 className="font-semibold text-lg leading-snug text-foreground">{t(title)}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t(desc)}</p>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{t('jx_hbw_cancel')}</p>
    </section>
  );
}
