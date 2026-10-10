// ─────────────────────────────────────────────────────────────────────────────
// Contact Choice Buttons — the shared "WhatsApp or Email" pair shown wherever
// a visitor has finished preparing a tour inquiry or booking request.
//
// WhatsApp opens immediately (it always has — a deep link, not a submission).
// Email tries the real backend (POST /api/inquiry) first; "Sent" is only ever
// shown once the server has confirmed delivery. If that call fails for any
// reason (network, RESEND_API_KEY not configured, etc.), this falls back to
// a `mailto:` link and says so plainly — a mailto: link only opens the
// visitor's own mail client with the message prepared, it does not send
// anything by itself, and the copy here never blurs that distinction.
//
// One component, reused by JoinStudentTour, TailorJourney and trip-builder,
// so the labels, styling and success/error behaviour can never drift between
// flows (the project's existing pattern of a single component for a UI
// element reused in several places — e.g. HowBookingWorks).
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import { CheckCircle2, Loader2, Mail } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { submitInquiryEmail, buildMailtoHref, type InquiryPayload } from '@/lib/inquiryChannels';

type Status = 'idle' | 'sending' | 'success' | 'error';

type Props = {
  t: (key: string) => string;
  whatsappHref: string;
  onWhatsapp?: () => void;
  /** Structured payload for the real POST /api/inquiry submission. */
  emailPayload: InquiryPayload;
  /** Subject + plain-text body used only for the mailto: fallback. */
  emailSubject: string;
  emailBody: string;
  onEmailResult?: (method: 'api' | 'mailto', success: boolean) => void;
  className?: string;
};

export function ContactChoiceButtons({
  t,
  whatsappHref,
  onWhatsapp,
  emailPayload,
  emailSubject,
  emailBody,
  onEmailResult,
  className = '',
}: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const mailtoHref = buildMailtoHref(emailSubject, emailBody);

  async function sendEmail() {
    setStatus('sending');
    const result = await submitInquiryEmail(emailPayload);
    if (result.success) {
      setStatus('success');
      onEmailResult?.('api', true);
    } else {
      setStatus('error');
      onEmailResult?.('api', false);
    }
  }

  return (
    <div className={className}>
      <p className="mb-3 text-sm font-semibold text-foreground">{t('cc_choose_heading')}</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          onClick={onWhatsapp}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-base font-bold text-[#0d2b1d] transition-colors hover:bg-[#128C7E]"
        >
          <SiWhatsapp className="h-5 w-5" aria-hidden="true" />
          {t('cc_whatsapp_btn')}
        </a>
        <button
          type="button"
          onClick={sendEmail}
          disabled={status === 'sending' || status === 'success'}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-foreground px-6 py-3.5 text-base font-bold text-foreground transition-colors hover:bg-foreground hover:text-background disabled:cursor-default disabled:opacity-70 disabled:hover:bg-transparent disabled:hover:text-foreground"
        >
          {status === 'sending' ? (
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
          ) : status === 'success' ? (
            <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden="true" />
          ) : (
            <Mail className="h-5 w-5" aria-hidden="true" />
          )}
          {status === 'sending' ? t('cc_email_sending') : status === 'success' ? t('cc_email_sent') : t('cc_email_btn')}
        </button>
      </div>

      {status === 'success' && (
        <p className="mt-2 text-sm text-muted-foreground">{t('cc_email_sent_note')}</p>
      )}

      {status === 'error' && (
        <div role="alert" className="mt-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-foreground">
          <p>{t('cc_email_error')}</p>
          <a
            href={mailtoHref}
            onClick={() => onEmailResult?.('mailto', true)}
            className="mt-2 inline-block font-bold text-primary underline underline-offset-2"
          >
            {t('cc_email_mailto_fallback')}
          </a>
          <p className="mt-1 text-xs text-muted-foreground">{t('cc_email_mailto_note')}</p>
        </div>
      )}
    </div>
  );
}
