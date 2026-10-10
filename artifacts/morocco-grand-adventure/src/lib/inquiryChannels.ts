// ─────────────────────────────────────────────────────────────────────────────
// Shared helpers for the two ways a finished inquiry/booking message can be
// sent: WhatsApp (always a wa.me deep link — no backend) and Email.
//
// Email has two real mechanisms, and callers must know which one they got:
//   1. A real backend submission via POST /api/inquiry (api/inquiry.ts at the
//      repo root — Resend-backed, already used by src/pages/book.tsx and
//      src/components/tours/TourInquiryForm.tsx). When this succeeds, an email
//      has genuinely been sent to the business inbox.
//   2. A `mailto:` link, when the backend call fails or isn't appropriate for
//      a given flow. This only OPENS the visitor's own email client with the
//      message prepared — nothing is sent until the visitor presses send
//      there themselves. Never describe this outcome as "sent".
//
// No API key or credential lives here or anywhere in client code — the Resend
// key is a server-side env var read only by api/inquiry.ts.
// ─────────────────────────────────────────────────────────────────────────────
import { contactInfo } from '@/data/content';

/** Same resolution order already used by TourInquiryForm.tsx: an env override, else same-origin /api. */
const API_BASE = (typeof import.meta !== 'undefined' && (import.meta as { env?: Record<string, string> }).env?.VITE_API_URL) || '/api';

export type InquiryPayload = {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  travelDates?: string;
  travelers?: string;
  destinations?: string;
  tourInterest?: string;
  accommodation?: string;
  message: string;
};

export type InquirySubmitResult = { success: true } | { success: false; error: string };

/**
 * Submits an inquiry to the real email backend. Resolves `{ success: true }`
 * only when the server has confirmed delivery — never inferred from the
 * fetch merely completing. Network failures, a non-2xx response and a
 * `{ success: false }` body are all reported back as a real failure so the
 * caller can offer the mailto: fallback rather than claim success.
 */
export async function submitInquiryEmail(payload: InquiryPayload): Promise<InquirySubmitResult> {
  try {
    const response = await fetch(`${API_BASE}/inquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) {
      return { success: false, error: typeof data.error === 'string' ? data.error : 'Request failed' };
    }
    return { success: true };
  } catch {
    return { success: false, error: 'network' };
  }
}

/**
 * A `mailto:` link to the real business address, with subject and body
 * properly percent-encoded. This only opens the visitor's mail client with
 * the message prepared — it does not send anything by itself.
 */
export function buildMailtoHref(subject: string, body: string, to: string = contactInfo.email): string {
  return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
