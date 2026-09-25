// ─────────────────────────────────────────────────────────────────────────────
// Shared helpers for Vercel serverless functions under api/.
// Extracted from inquiry.ts so every endpoint enforces the same-origin CORS
// rule the same way — a security check duplicated per-file is a security
// check that silently drifts.
// ─────────────────────────────────────────────────────────────────────────────

export function allowedOrigin(request: Request): string | null {
  const origin = request.headers.get('origin');
  if (!origin) return null;
  try {
    const originUrl = new URL(origin);
    const requestHost = request.headers.get('host')?.split(':')[0]?.toLowerCase();
    const sameHost = Boolean(requestHost && originUrl.hostname.toLowerCase() === requestHost);
    const local = ['localhost', '127.0.0.1'].includes(originUrl.hostname.toLowerCase());
    return sameHost || local ? origin : null;
  } catch {
    return null;
  }
}

export function withCors(request: Request, res: Response, methods = 'POST, OPTIONS'): Response {
  const headers = new Headers(res.headers);
  const origin = allowedOrigin(request);
  if (origin) {
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Vary', 'Origin');
  }
  headers.set('Access-Control-Allow-Methods', methods);
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
  headers.set('X-Content-Type-Options', 'nosniff');
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
}

export function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}

/** Reads and size-caps the request body; returns null (with a Response already sent) on any violation. */
export async function readBoundedJsonBody(
  request: Request,
  maxBytes: number,
): Promise<{ ok: true; body: Record<string, unknown> } | { ok: false; response: Response }> {
  const declaredLength = Number(request.headers.get('content-length') || 0);
  if (declaredLength > maxBytes) {
    return { ok: false, response: withCors(request, json({ success: false, error: 'Request body is too large.' }, 413)) };
  }
  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return { ok: false, response: withCors(request, json({ success: false, error: 'Invalid request body.' }, 400)) };
  }
  if (new TextEncoder().encode(rawBody).byteLength > maxBytes) {
    return { ok: false, response: withCors(request, json({ success: false, error: 'Request body is too large.' }, 413)) };
  }
  try {
    const parsed: unknown = JSON.parse(rawBody);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Expected object');
    return { ok: true, body: parsed as Record<string, unknown> };
  } catch {
    return { ok: false, response: withCors(request, json({ success: false, error: 'Invalid JSON body.' }, 400)) };
  }
}
