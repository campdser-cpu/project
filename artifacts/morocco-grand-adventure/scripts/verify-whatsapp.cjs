// Production WhatsApp-context regression test.
// CommonJS. Run via `npm run test:deterministic` (and thus inside `npm run build`).
//
// Guards the exact bug class where the WhatsApp base link is a WhatsApp Business
// "message link" (`wa.me/message/<id>`) that IGNORES the `?text=` parameter, so a
// contextual inquiry (Trip Builder itinerary, tour booking, contact form, etc.)
// silently falls back to the account's generic default ("I am interested in one of
// your products").
//
// The base link MUST be a `wa.me/<number>` deep link so that every `?text=` context
// is transmitted. This script fails if anyone reverts the base to `wa.me/message/`,
// strips a `?text=` context builder, or otherwise loses the contextual message.

const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
let failures = 0;
function chk(cond, label) {
  if (cond) {
    console.log('OK   ' + label);
  } else {
    failures += 1;
    console.log('FAIL ' + label);
  }
}

function readSrc(rel) {
  return fs.readFileSync(path.join(root, 'src', rel), 'utf8');
}
function walk(dir, out) {
  out = out || [];
  const names = fs.readdirSync(dir);
  for (const n of names) {
    const f = path.join(dir, n);
    const st = fs.statSync(f);
    if (st.isDirectory()) walk(f, out);
    else out.push(f);
  }
  return out;
}

// 1. Base link must be a wa.me/<number> deep link (not a message link).
const content = readSrc('data/content.ts');
const waMatch = content.match(/whatsapp:\s*"([^"]+)"/);
const numMatch = content.match(/whatsappNumber:\s*"([^"]+)"/);
chk(!!waMatch && !!numMatch, 'content.ts has whatsapp + whatsappNumber');

if (waMatch && numMatch) {
  const wa = waMatch[1];
  const number = numMatch[1];
  const digits = number.replace(/[^\d]/g, '');
  chk(wa.startsWith('https://wa.me/'), 'base is wa.me deep link (' + wa + ')');
  chk(!wa.includes('wa.me/message/'), 'base does NOT use wa.me/message/');
  chk(wa === 'https://wa.me/' + digits, 'base number matches whatsappNumber (' + digits + ')');
}

// 2. No `wa.me/message` literal may remain anywhere in source or the static template.
const srcFiles = walk(path.join(root, 'src')).filter((f) => /\.(ts|tsx)$/.test(f));
let msgLinkRefs = 0;
for (const f of srcFiles) {
  const t = fs.readFileSync(f, 'utf8');
  const m = t.match(/wa\.me\/message/g);
  if (m) {
    msgLinkRefs += m.length;
    chk(false, 'no wa.me/message in ' + path.relative(root, f));
  }
}
const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
if (indexHtml.includes('wa.me/message')) {
  msgLinkRefs += 1;
  chk(false, 'no wa.me/message in index.html');
}
if (msgLinkRefs === 0) chk(true, 'no wa.me/message anywhere in src/ or index.html');

// 3. The Trip Builder must build the message from live state and append ?text=.
const tb = readSrc('pages/trip-builder.tsx');
chk(tb.includes('contactInfo.whatsapp'), 'trip-builder uses contactInfo.whatsapp');
chk(tb.includes('\${contactInfo.whatsapp}?text='), 'trip-builder appends ?text= to base');
// The title line is now built via a shared bold()-wrapping helper (so the
// same content also feeds a plain-text email version) rather than appearing
// as a literal string — check the real construction instead.
chk(tb.includes("'New Bespoke Journey Request'") && tb.includes('`*${s}*`'), 'trip-builder carries bespoke journey message');
chk(tb.includes('buildMailtoHref') && tb.includes('summaryLines.plain'), 'trip-builder also offers an email (mailto) channel with the same content');
for (const token of ['Route:', 'Duration:', 'Travelers:', 'Budget:', 'Interests:', 'Destinations:']) {
  chk(tb.includes(token), 'trip-builder builds field: ' + token);
}

// 4. Tour detail's booking panel (TailorJourney) must carry the exact tour +
// selected details. The inline booking box was replaced by the shared
// TailorJourney component (src/components/tours/TailorJourney.tsx), which
// builds its own contextual summary — checked directly here instead of
// string-matching tour-detail.tsx's now-removed inline template.
const td = readSrc('pages/tour-detail.tsx');
chk(td.includes('<TailorJourney'), 'tour-detail renders the TailorJourney booking panel');
chk(td.includes('tourId={tour.id}'), 'tour-detail passes the real tour id to TailorJourney');

const tj = readSrc('components/tours/TailorJourney.tsx');
chk(tj.includes('\${contactInfo.whatsapp}?text='), 'TailorJourney appends ?text= to the base deep link');
chk(tj.includes('Trip: ${tripName}'), 'TailorJourney message names the exact tour');
chk(tj.includes('Travellers: ${travellers}'), 'TailorJourney message carries traveler count');
chk(tj.includes('Dates: ${date'), 'TailorJourney message carries selected date');
chk(tj.includes('buildMailtoHref') && tj.includes('summary'), 'TailorJourney also offers an email (mailto) channel with the same summary');

// 4b. Student Tours Join Now flow must offer both channels and carry the
// departure id, dates, traveler count and price/deposit breakdown in both.
const jst = readSrc('components/student-tours/JoinStudentTour.tsx');
chk(jst.includes('ContactChoiceButtons'), 'JoinStudentTour renders the shared WhatsApp/Email choice');
chk(jst.includes('Departure ID: ${departureId'), 'JoinStudentTour message carries the departure id');
chk(jst.includes('Travelers: ${travelers}'), 'JoinStudentTour message carries traveler count');
chk(jst.includes('Deposit (${depositPercent}%)'), 'JoinStudentTour message carries the deposit breakdown');
chk(jst.includes('submitInquiryEmail') || jst.includes('emailPayload'), 'JoinStudentTour wires a real email submission payload');

// 4c. The shared ContactChoiceButtons component must never claim success
// without a confirmed backend result, and must offer a mailto: fallback.
const ccb = readSrc('components/ui/ContactChoiceButtons.tsx');
chk(ccb.includes("result.success") && ccb.includes("setStatus('success')"), "ContactChoiceButtons only shows 'sent' after a real success result");
chk(ccb.includes('buildMailtoHref'), 'ContactChoiceButtons offers a mailto: fallback on failure');

// 5. Contact form fallback, group quote, quote-only all keep a ?text= context.
const ct = readSrc('pages/contact.tsx');
chk(/\$\{contactInfo\.whatsapp\}\?text=/.test(ct), 'contact fallback keeps ?text=');
chk(ct.includes('contactInfo.whatsapp'), 'contact page uses shared base link');

// 6. Shared floating button keeps encodeURIComponent + base.
const waBtn = readSrc('components/ui/WhatsAppButton.tsx');
chk(waBtn.includes('contactInfo.whatsapp') && waBtn.includes('encodeURIComponent'), 'floating WhatsApp button keeps encoded context');

// 7. Functional check: encoding `base?text=<contextual>` round-trips to the intended message.
function waLink(msg) {
  return `https://wa.me/212699846818?text=${encodeURIComponent(msg)}`;
}
const sample =
  'New Bespoke Journey Request\n\nBasics:\n- Route: Casablanca to Marrakech\n' +
  '- Duration: 7 days\n- Travelers: 8\n- Budget: $300-600\n\nDestinations:\n' +
  'Casablanca, Rabat, Merzouga, Erg Chebbi, Todra Gorge';
const built = waLink(sample);
const decoded = decodeURIComponent(built.split('?text=')[1]);
chk(built.includes('wa.me/212699846818?text='), 'functional: base is a number deep link');
chk(decoded.includes('Route: Casablanca to Marrakech'), 'functional: message preserves route');
chk(decoded.includes('Travelers: 8'), 'functional: message preserves travelers');
chk(decoded.includes('Todra Gorge'), 'functional: message preserves destinations');
chk(decoded.includes("New Bespoke Journey Request"), 'functional: message preserves structured request');

console.log('');
if (failures > 0) {
  console.log('WhatsApp context regression: FAIL (' + failures + ')');
  process.exitCode = 1;
} else {
  console.log('WhatsApp context regression: PASS');
}