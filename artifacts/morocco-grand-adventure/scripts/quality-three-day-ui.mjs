import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const detailPath = path.join(root, 'src/pages/tour-detail.tsx');
let detail = fs.readFileSync(detailPath, 'utf8');

if (!detail.includes("const isThreeDaySahara = tour.id === '3-day-sahara-marrakech';")) {
  detail = detail.replace(
    /  const itinerary = tour\.itineraryDays \?\? \[\];/,
    `  const isThreeDaySahara = tour.id === '3-day-sahara-marrakech';\n  const itinerary = tour.itineraryDays ?? [];`,
  );
}

if (!detail.includes('Confirm the trip before you pay.')) {
  detail = detail.replace(
    /              <h3 className="font-serif text-2xl text-foreground mb-4">\{t\('book_now'\)\}<\/h3>/,
    `              <h3 className="font-serif text-2xl text-foreground mb-4">{isThreeDaySahara ? 'Book Now · Pay Later' : t('book_now')}</h3>\n              {isThreeDaySahara && (\n                <div className="mb-5 rounded-2xl border border-primary/25 bg-primary/5 p-4">\n                  <p className="font-semibold text-foreground text-sm">Confirm the trip before you pay.</p>\n                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Send us your dates and group size first. We confirm the itinerary and applicable payment terms with you before you make a payment.</p>\n                </div>\n              )}`,
  );
}

if (!detail.includes("!isGroupQuote && !isThreeDaySahara")) {
  detail = detail.replace(
    /                \{!isGroupQuote \? \(/,
    `                {!isGroupQuote && !isThreeDaySahara ? (`,
  );
}

if (!detail.includes("isThreeDaySahara ? 'Request booking confirmation' : t('book_group_quote')")) {
  detail = detail.replace(
    /\{t\('book_group_quote'\)\}/g,
    `{isThreeDaySahara ? 'Request booking confirmation' : t('book_group_quote')}`,
  );
}

const reassurance = `              {isThreeDaySahara ? (\n                <ul className="text-sm text-muted-foreground space-y-3 pt-6 border-t border-border">\n                  <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Your dates and group size are confirmed before payment.</li>\n                  <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /> The itinerary and applicable payment terms are agreed with you first.</li>\n                  <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Questions are answered by a local Morocco-based team.</li>\n                </ul>\n              ) : (\n                <ul className="text-sm text-muted-foreground space-y-3 pt-6 border-t border-border">\n                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {t('book_free_cancel')}</li>\n                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {t('book_no_fees')}</li>\n                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {t('book_secure_payment')}</li>\n                </ul>\n              )}`;

if (!detail.includes('Questions are answered by a local Morocco-based team.')) {
  detail = detail.replace(
    /              <ul className="text-sm text-muted-foreground space-y-3 pt-6 border-t border-border">[\s\S]*?              <\/ul>/,
    reassurance,
  );
}

fs.writeFileSync(detailPath, detail, 'utf8');
console.log('[3-day-ui] Honest three-day booking UX prepared.');
