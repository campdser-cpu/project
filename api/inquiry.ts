// ─────────────────────────────────────────────────────────────────────────────
// Vercel Serverless Function — POST /api/inquiry
//
// Contact-form inquiry delivery for Morocco Grand Adventure.
//
// WHY THIS EXISTS
//   The static site is deployed to Vercel with `outputDirectory` set to the
//   prerendered `dist/`. Vercel treats this file (project-root `api/inquiry.ts`)
//   as a Serverless Function and routes `POST /api/inquiry` to it — it is NOT
//   the always-running Express server (that artifact is not deployed).
//
// HONEST DELIVERY CONTRACT
//   This endpoint NEVER returns a success unless the inquiry has been accepted
//   by the configured email provider. If email delivery is not configured it
//   returns a clear non-success (503) so the Contact form shows a useful error
//   and activates the WhatsApp fallback. It never fakes "Message sent".
//
// CREDENTIALS (server-side only, never exposed to the client)
//   RESEND_API_KEY      (required) Resend API key for transactional email.
//   INQUIRY_FROM_EMAIL  (optional) verified sender, e.g. noreply@… (default
//                       "inquiries@moroccograndadventure.com" — MUST be a
//                       verified sender in the Resend account).
//   INQUIRY_TO_EMAIL    (optional) delivery target (default
//                       "inquiries@moroccograndadventure.com").
//
// No new dependencies: uses Node 18+ global `fetch` and the Resend REST API.
// ─────────────────────────────────────────────────────────────────────────────

const INQUIRY_TO_EMAIL = 'inquiries@moroccograndadventure.com';
const INQUIRY_FROM_EMAIL = 'inquiries@moroccograndadventure.com';
const RESEND_API_URL = 'https://api.resend.com/emails';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\-\s\d]{7,20}$/;

type ValidationResult =
  | { ok: true; data: Record<string, string> }
  | { ok: false; errors: { field: string; message: string }[] };

function validateInquiry(body: Record<string, unknown>): ValidationResult {
  const errors: { field: string; message: string }[] = [];
  const s = (v: unknown): string => (typeof v === 'string' ? v.trim() : '');

  const firstName = s(body.firstName);
  if (!firstName) errors.push({ field: 'firstName', message: 'First name is required.' });
  if (firstName && firstName.length > 80) errors.push({ field: 'firstName', message: 'First name is too long.' });

  const email = s(body.email);
  if (!EMAIL_RE.test(email)) errors.push({ field: 'email', message: 'A valid email address is required.' });

  const phone = s(body.phone);
  if (phone && !PHONE_RE.test(phone)) errors.push({ field: 'phone', message: 'A valid phone number is required.' });

  if (errors.length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      firstName,
      lastName: s(body.lastName),
      email,
      phone,
      travelDates: s(body.travelDates),
      travelers: s(body.travelers),
      destinations: s(body.destinations),
      tourInterest: s(body.tourInterest),
      accommodation: s(body.accommodation),
      message: s(body.message),
    },
  };
}
// ── Basic HTML escaping (no extra dependencies) ─────────────────────────────

function escapeHtml(text: string): string {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ── Build a readable HTML email from the validated inquiry record ────────────

function buildEmailHtml(i: Record<string, string>): string {
  const row = (k: string, v: string): string =>
    v
      ? `<tr><td style="padding:6px 0;font-weight:bold;white-space:nowrap;padding-right:16px;">${escapeHtml(k)}</td><td style="padding:6px 0;">${escapeHtml(v)}</td></tr>`
      : '';

  return (
    '<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#222;">' +
    '<h2 style="margin:0 0 12px;">New Website Inquiry</h2>' +
    '<p style="margin:0 0 12px;">A traveler submitted the contact form on moroccograndadventure.com.</p>' +
    '<table style="border-collapse:collapse;">' +
    row('First name', i.firstName) +
    row('Last name', i.lastName) +
    row('Email', i.email) +
    row('Phone', i.phone) +
    row('Travel dates', i.travelDates) +
    row('Travelers', i.travelers) +
    row('Destinations', i.destinations) +
    row('Tour / activity', i.tourInterest) +
    row('Accommodation', i.accommodation) +
    row('Message', i.message) +
    '</table>' +
    '</div>'
  );
}

// ── Vercel Function: add Access-Control-Allow-Origin to every response ──────

function withCors(res: Response): Response {
  const headers = new Headers(res.headers);
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// ── Vercel Handler entrypoint ───────────────────────────────────────────────

export default {
  async fetch(request: Request): Promise<Response> {
    // CORS preflight (the production form posts same-origin, but keep it robust).
    if (request.method === 'OPTIONS') {
      return withCors(new Response(null, { status: 204 }));
    }

    if (request.method !== 'POST') {
      return withCors(json({ success: false, error: 'Method not allowed. Use POST.' }, 405));
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return withCors(json({ success: false, error: 'Invalid JSON body.' }, 400));
    }

    const validation = validateInquiry(body);
    if (!validation.ok) {
      return withCors(json({ success: false, errors: validation.errors }, 400));
    }
    const inquiry = validation.data;

    // ── Email delivery (Resend REST API; zero new dependencies) ──────────────
    const resendKey = process.env.RESEND_API_KEY;

    if (!resendKey) {
      // Delivery is NOT configured → clear non-success. The frontend must show
      // the WhatsApp fallback instead of any fake success.
      console.error('[inquiry] RESEND_API_KEY not configured — inquiry NOT delivered.');
      return withCors(
        json(
          {
            success: false,
            error:
              'We could not send your inquiry right now because email delivery is not configured on this environment. Please use WhatsApp instead.',
          },
          503,
        ),
      );
    }

    const to = process.env.INQUIRY_TO_EMAIL ?? INQUIRY_TO_EMAIL;
    const from = process.env.INQUIRY_FROM_EMAIL ?? INQUIRY_FROM_EMAIL;
    const subject = `New Website Inquiry from ${inquiry.firstName}`;
    const payload = {
      from,
      to,
      subject,
      html: buildEmailHtml(inquiry),
      reply_to: inquiry.email,
    };

    let provider: Response;
    try {
      provider = await fetch(RESEND_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error('[inquiry] delivery transport error', err);
      return withCors(
        json({ success: false, error: 'We could not reach our email service. Please try WhatsApp instead.' }, 502),
      );
    }

    if (!provider.ok) {
      const detail = await provider.text().catch(() => '');
      console.error(`[inquiry] provider rejected (${provider.status})`, detail);
      return withCors(
        json({ success: false, error: 'Our email service rejected this inquiry. Please try WhatsApp instead.' }, 502),
      );
    }

    // Success ONLY after the provider accepted the email.
    return withCors(json({ success: true, message: 'Inquiry received.' }, 200));
  },
};
