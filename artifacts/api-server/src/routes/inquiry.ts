import { Router, type IRouter } from "express";

const router: IRouter = Router();

// ─────────────────────────────────────────────────────────────────────────────
// Inquiry submission endpoint — receives form data from the website.
//
// IMPORTANT (honest capability): The frontend is deployed as a static site on
// Vercel and this API server is a separate workspace package that is NOT part
// of the deployed output. Email delivery therefore requires:
//   - deploying this api-server alongside the site, and
//   - configuring SMTP credentials (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS).
// Without those, this endpoint validates + logs the inquiry server-side so it
// is never silently lost. The website also offers a WhatsApp fallback (the
// official booking channel) so inquiries always reach the team.
// ─────────────────────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\-\s\d]{7,20}$/;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 10;
const requestsByIp = new Map<string, { count: number; resetAt: number }>();

function clientIp(req: { ip?: string; headers: Record<string, string | string[] | undefined> }): string {
  const forwarded = req.headers["x-forwarded-for"];
  const firstForwarded = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(",")[0];
  return (firstForwarded?.trim() || req.ip || "unknown").slice(0, 100);
}

function isRateLimited(ip: string): { limited: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const current = requestsByIp.get(ip);
  if (!current || current.resetAt <= now) {
    requestsByIp.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { limited: false, retryAfterSeconds: 0 };
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return {
      limited: true,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return { limited: false, retryAfterSeconds: 0 };
}

function validateInquiry(body: Record<string, unknown>): { ok: true; data: Record<string, string> } | { ok: false; errors: { field: string; message: string }[] } {
  const errors: { field: string; message: string }[] = [];
  const s = (v: unknown, maxLength = 500) => {
    if (typeof v !== "string") return "";
    return v.trim().slice(0, maxLength);
  };

  const firstName = s(body.firstName, 80);
  if (!firstName) errors.push({ field: "firstName", message: "First name is required." });
  if (firstName && firstName.length > 80) errors.push({ field: "firstName", message: "First name is too long." });

  const email = s(body.email, 254);
  if (!EMAIL_RE.test(email)) errors.push({ field: "email", message: "A valid email address is required." });

  const phone = s(body.phone, 20);
  if (phone && !PHONE_RE.test(phone)) errors.push({ field: "phone", message: "A valid phone number is required." });

  const lastName = s(body.lastName, 80);
  const travelDates = s(body.travelDates, 120);
  const travelers = s(body.travelers, 20);
  const destinations = s(body.destinations, 300);
  const tourInterest = s(body.tourInterest, 200);
  const accommodation = s(body.accommodation, 80);
  const message = s(body.message, 2000);

  if (errors.length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      firstName,
      lastName,
      email,
      phone,
      travelDates,
      travelers,
      destinations,
      tourInterest,
      accommodation,
      message,
    },
  };
}

router.post("/inquiry", (req, res) => {
  const limit = isRateLimited(clientIp(req));
  if (limit.limited) {
    res.setHeader("Retry-After", String(limit.retryAfterSeconds));
    res.status(429).json({
      success: false,
      error: "Too many inquiries from this network. Please try again later or contact us on WhatsApp.",
    });
    return;
  }

  const result = validateInquiry((req.body ?? {}) as Record<string, unknown>);

  if (!result.ok) {
    res.status(400).json({ success: false, errors: result.errors });
    return;
  }

  // Persist the inquiry to the server log so it is never silently lost,
  // even when no email transport is configured.
  const inquiry = result.data;
  console.log(JSON.stringify({
    type: "travel-inquiry",
    ts: new Date().toISOString(),
    source: "website-contact-form",
    inquiry,
  }));

  res.json({
    success: true,
    method: "logged",
    note: "Inquiry received. Email delivery requires SMTP configuration on the API deployment.",
  });
});

export default router;
