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

function validateInquiry(body: Record<string, unknown>): { ok: true; data: Record<string, string> } | { ok: false; errors: { field: string; message: string }[] } {
  const errors: { field: string; message: string }[] = [];
  const s = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  const firstName = s(body.firstName);
  if (!firstName) errors.push({ field: "firstName", message: "First name is required." });
  if (firstName && firstName.length > 80) errors.push({ field: "firstName", message: "First name is too long." });

  const email = s(body.email);
  if (!EMAIL_RE.test(email)) errors.push({ field: "email", message: "A valid email address is required." });

  const phone = s(body.phone);
  if (phone && !PHONE_RE.test(phone)) errors.push({ field: "phone", message: "A valid phone number is required." });

  const lastName = s(body.lastName);
  const travelDates = s(body.travelDates);
  const travelers = s(body.travelers);
  const destinations = s(body.destinations);
  const tourInterest = s(body.tourInterest);
  const accommodation = s(body.accommodation);
  const message = s(body.message);

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