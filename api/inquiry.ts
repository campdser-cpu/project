// ─────────────────────────────────────────────────────────────────────────────
// Vercel Serverless Function — POST /api/inquiry
//
// Contact-form inquiry delivery for Morocco Grand Adventure.
// ─────────────────────────────────────────────────────────────────────────────

const INQUIRY_TO_EMAIL = 'inquiries@moroccograndadventure.com';
const INQUIRY_FROM_EMAIL = 'inquiries@moroccograndadventure.com';
const RESEND_API_URL = 'https://api.resend.com/emails';
const MAX_BODY_BYTES = 32 * 1024;
const MAX_FIELD_LENGTH = 2000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\-\s\d]{7,20}$/;

type ValidationResult =
  | { ok: true; data: Record<string, string> }
  | { ok: false; errors: { field: string; message: string }[] };

function bounded(value: string, field: string, errors: { field: string; message: string }[]): string {
  if (value.length > MAX_FIELD_LENGTH) {
    errors.push({ field, message: `${field} is too long.` });
    return value.slice(0, MAX_FIELD_LENGTH);
  }
  return value;
}

export function validateInquiry(body: Record<string, unknown>): ValidationResult {
  const errors: { field: string; message: string }[] = [];
  const s = (v: unknown): string => (typeof v === 'string' ? v.trim() : '');

  const firstName = bounded(s(body.firstName), 'firstName', errors);
  if (!firstName) errors.push({ field: 'firstName', message: 'First name is required.' });
  const email = bounded(s(body.email), 'email', errors);
  if (!EMAIL_RE.test(email)) errors.push({ field: 'email', message: 'A valid email address is required.' });
  const phone = bounded(s(body.phone), 'phone', errors);
  if (phone && !PHONE_RE.test(phone)) errors.push({ field: 'phone', message: 'A valid phone number is required.' });

  for (const field of ['lastName', 'travelDates', 'travelers', 'destinations', 'tourInterest', 'accommodation', 'message']) {
    bounded(s(body[field]), field, errors);
  }

  if (errors.length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      firstName,
      lastName: bounded(s(body.lastName), 'lastName', []),
      email,
      phone,
      travelDates: bounded(s(body.travelDates), 'travelDates', []),
      travelers: bounded(s(body.travelers), 'travelers', []),
      destinations: bounded(s(body.destinations), 'destinations', []),
      tourInterest: bounded(s(body.tourInterest), 'tourInterest', []),
      accommodation: bounded(s(body.accommodation), 'accommodation', []),
      message: bounded(s(body.message), 'message', []),
    },
  };
}

function escapeHtml(text: string): string {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

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
    row('First name', i.firstName) + row('Last name', i.lastName) + row('Email', i.email) +
    row('Phone', i.phone) + row('Travel dates', i.travelDates) + row('Travelers', i.travelers) +
    row('Destinations', i.destinations) + row('Tour / activity', i.tourInterest) +
    row('Accommodation', i.accommodation) + row('Message', i.message) + '</table></div>'
  );
}

function allowedOrigin(request: Request): string | null {
  const origin = request.headers.get('origin');
  if (!origin) return null;
  try {
    const originUrl = new URL(origin);
    const requestHost = request.headers.get('host')?.split(':')[0]?.toLowerCase();
    const sameHost = requestHost && originUrl.hostname.toLowerCase() === requestHost;
    const local = ['localhost', '127.0.0.1'].includes(originUrl.hostname.toLowerCase());
    return sameHost || local ? origin : null;
  } catch {
    return null;
  }
}

function withCors(request: Request, res: Response): Response {
  const headers = new Headers(res.headers);
  const origin = allowedOrigin(request);
  if (origin) {
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Vary', 'Origin');
  }
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
  headers.set('X-Content-Type-Options', 'nosniff');
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method === 'OPTIONS') return withCors(request, new Response(null, { status: 204 }));

    if (request.method !== 'POST') {
      return withCors(request, json({ success: false, error: 'Method not allowed. Use POST.' }, 405));
    }

    const declaredLength = Number(request.headers.get('content-length') || 0);
    if (declaredLength > MAX_BODY_BYTES) {
      return withCors(request, json({ success: false, error: 'Request body is too large.' }, 413));
    }

    let rawBody: string;
    try {
      rawBody = await request.text();
    } catch {
      return withCors(request, json({ success: false, error: 'Invalid request body.' }, 400));
    }
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return withCors(request, json({ success: false, error: 'Request body is too large.' }, 413));
    }

    let body: Record<string, unknown>;
    try {
      const parsed: unknown = JSON.parse(rawBody);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Expected object');
      body = parsed as Record<string, unknown>;
    } catch {
      return withCors(request, json({ success: false, error: 'Invalid JSON body.' }, 400));
    }

    // Simple honeypot for unsophisticated automated submissions. The real form never sends this field.
    if (typeof body.website === 'string' && body.website.trim()) {
      return withCors(request, json({ success: false, error: 'Invalid inquiry.' }, 400));
    }

    const validation = validateInquiry(body);
    if (!validation.ok) return withCors(request, json({ success: false, errors: validation.errors }, 400));
    const inquiry = validation.data;

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.error('[inquiry] RESEND_API_KEY not configured — inquiry NOT delivered.');
      return withCors(request, json({ success: false, error: 'Email delivery is not configured. Please use WhatsApp instead.' }, 503));
    }

    const to = process.env.INQUIRY_TO_EMAIL ?? INQUIRY_TO_EMAIL;
    const from = process.env.INQUIRY_FROM_EMAIL ?? INQUIRY_FROM_EMAIL;
    const payload = {
      from,
      to,
      subject: `New Website Inquiry from ${inquiry.firstName}`,
      html: buildEmailHtml(inquiry),
      reply_to: inquiry.email,
    };

    let provider: Response;
    try {
      provider = await fetch(RESEND_API_URL, {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error('[inquiry] delivery transport error', err);
      return withCors(request, json({ success: false, error: 'We could not reach our email service. Please try WhatsApp instead.' }, 502));
    }

    if (!provider.ok) {
      const detail = await provider.text().catch(() => '');
      console.error(`[inquiry] provider rejected (${provider.status})`, detail);
      return withCors(request, json({ success: false, error: 'Our email service rejected this inquiry. Please try WhatsApp instead.' }, 502));
    }

    return withCors(request, json({ success: true, message: 'Inquiry received.' }, 200));
  },
};
