import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const contentPath = path.join(root, 'src/data/content.ts');
const detailPath = path.join(root, 'src/pages/tour-detail.tsx');
const marker = 'MGA_THREE_DAY_ENRICHED_V2';

function replaceOnce(source, pattern, replacement, label) {
  if (!pattern.test(source)) throw new Error(`[3-day-enrichment] Could not find ${label}`);
  return source.replace(pattern, replacement);
}

let content = fs.readFileSync(contentPath, 'utf8');
if (!content.includes(marker)) {
  const replacement = `  {
    id: "3-day-sahara-marrakech",
    name: "3-Day Luxury Sahara Tour from Marrakech",
    duration: "3 Days / 2 Nights",
    category: "Desert & Adventure",
    highlights: [
      "Cross the High Atlas from Marrakech",
      "Visit Aït Ben Haddou, a UNESCO World Heritage property",
      "Travel through the Dades Valley and Todra Gorge",
      "Sunset camel experience in Erg Chebbi",
      "Night in a Sahara desert camp",
      "Sunrise over the dunes before the long return to Marrakech",
    ],
    price: "450",
    pricingTiers: { 1: 690, 2: 450, 3: 370, 4: 310, 5: 280 },
    image: "/images/pdf/img_1-optimized.webp",
    aliases: ['3-days-marrakech-to-merzouga-desert-tour', 'merzouga-desert-tour'],
    description: "A real Marrakech-to-Merzouga road journey in three days: cross the High Atlas, visit Aït Ben Haddou, continue through the southern valleys and reach Merzouga for the Erg Chebbi desert experience. The three-day format is deliberately compact and involves long driving days, especially on the return to Marrakech. If you want more time for the desert, slower mornings or extra stops, ask us about extending the route.",
    routeIds: ["marrakech", "ait-ben-haddou", "ouarzazate", "skoura", "dades-valley", "todra-gorge", "merzouga", "erg-chebbi"],
    routeCaption: "Marrakech → High Atlas → Aït Ben Haddou → Ouarzazate / Skoura → Dades Valley → Todra Gorge → Merzouga & Erg Chebbi → Marrakech. The road is part of the experience, not just a transfer.",
    itineraryDays: [
      {
        day: 1,
        title: "Marrakech → High Atlas → Aït Ben Haddou → Dades Valley",
        desc: "Leave Marrakech in the morning and cross the High Atlas via the Tizi n'Tichka route. Stop at Aït Ben Haddou, the historic earthen ksar recognised by UNESCO, then continue toward Ouarzazate and the Skoura oasis before reaching the Dades Valley for the first overnight stay.",
        stops: ["Marrakech", "High Atlas Mountains", "Tizi n'Tichka", "Aït Ben Haddou (UNESCO)", "Ouarzazate", "Skoura Oasis", "Overnight: Dades Valley"],
      },
      {
        day: 2,
        title: "Dades Valley → Todra Gorge → Merzouga → Erg Chebbi",
        desc: "Continue east through the pre-Saharan landscape, with time around the Dades Valley and Todra Gorge before heading toward Merzouga. In the afternoon, the focus shifts to the dunes: camel transfer into Erg Chebbi around sunset, followed by the desert-camp night. Dinner and breakfast are included according to the tour inclusions shown below.",
        stops: ["Dades Valley", "Todra Gorge", "Rissani area", "Merzouga", "Erg Chebbi", "Sunset camel experience", "Desert camp"],
      },
      {
        day: 3,
        title: "Merzouga sunrise → return journey → Marrakech",
        desc: "Start with sunrise over the dunes, then leave the Merzouga area for the long return to Marrakech. This is intentionally described as a long road day: the three-day option prioritises completing the loop while still giving you a genuine Sahara night. If you dislike long travel days, choose a longer itinerary instead.",
        stops: ["Merzouga sunrise", "Rissani / Tafilalet area", "Ziz Valley area", "Middle Atlas route", "Marrakech"],
      },
    ],
    included: [
      "Private air-conditioned vehicle",
      "Professional English-speaking driver",
      "Fuel",
      "Luxury desert camp",
      "Camel experience in Erg Chebbi",
      "1 night accommodation in the Dades Valley",
      "1 night luxury desert camp",
      "Dinners & breakfasts as per itinerary",
      "Hotel pick-up & drop-off",
    ],
    excluded: [
      "International flights",
      "Lunches",
      "Drinks",
      "Monument & museum entrance fees where applicable",
      "Tips & gratuities",
      "Personal expenses",
    ],
    gallery: [
      { src: "/images/pdf/img_1-optimized.webp", caption: "The southern Morocco landscapes and Sahara experience on this three-day route" },
      { src: "/images/dest/ait-ben-haddou.webp", caption: "Aït Ben Haddou on the road south from Marrakech" },
      { src: "/images/dest/erg-chebbi.webp", caption: "Erg Chebbi dunes near Merzouga" },
    ],
    faq: [
      { question: "Is three days enough for Marrakech to Merzouga?", answer: "Three days is the shortest practical format for this overland loop. It gives you one Sahara camp night and the major southern stops, but it is not a slow trip. Expect substantial road time, particularly on day 3. If you want a calmer pace, more time in Merzouga or extra stops, four days or more is the better choice." },
      { question: "How much driving should I expect?", answer: "A lot. Marrakech and Merzouga are far apart and the route crosses mountain and pre-Saharan roads rather than staying on a motorway. We show the long road days clearly because the journey itself is part of the experience and we would rather you choose the right trip than be surprised after booking." },
      { question: "What happens during the camel experience?", answer: "On the Merzouga afternoon you head into the Erg Chebbi dunes by camel around sunset, then spend the night at the desert camp. The exact camp setup and camel logistics are confirmed with you as part of the final booking details." },
      { question: "Where do I sleep?", answer: "The published itinerary includes one night in the Dades Valley and one night at a luxury desert camp in the Erg Chebbi area. The exact accommodation names are confirmed with the booking details rather than guessed on the website." },
      { question: "When is a good time to visit the Sahara?", answer: "The Moroccan National Tourist Office identifies spring and autumn as especially suitable seasons for the southern Sahara. Summer can be very hot in the desert, while winter nights can be cold, so your packing and expectations should match the season." },
      { question: "Can I book now and pay later?", answer: "Yes, but the honest process is: send us your dates and group size, we confirm the itinerary and applicable payment terms, and only then do you make the agreed payment. This page does not promise financing or automatic deferred payment." },
      { question: "Are flights included?", answer: "No. International flights are not included in this tour. Airfare varies by departure country, airline and travel dates, so there is no single month that guarantees the cheapest ticket for every traveller. We can help you plan the arrival and departure cities once your itinerary is confirmed." },
      { question: "Can I make the three-day trip less rushed?", answer: "The most effective change is adding a day. A four-day or longer itinerary gives you more room for the southern valleys and more time around Merzouga instead of using day 3 mainly for the return to Marrakech." },
      { question: "What should I pack?", answer: "Bring comfortable shoes, light layers for daytime, a warmer layer for the desert evening, sun protection, water and a small overnight bag for the camp. Keep your main luggage organised so the desert portion stays simple." },
      { question: "What happens after I request the trip?", answer: "We ask for your dates, group size and preferences, confirm what can be arranged, and then send the itinerary and applicable payment terms. You should have the important details clear before making a payment." },
    ],
    // ${marker}
  },`;

  content = replaceOnce(
    content,
    /  \{\n    id: "3-day-sahara-marrakech",[\s\S]*?\n  \},\n  \{\n    id: "5-day-imperial-cities",/,
    replacement + '\n  {\n    id: "5-day-imperial-cities",',
    'the existing Marrakech three-day tour data block',
  );
  fs.writeFileSync(contentPath, content, 'utf8');
}

let detail = fs.readFileSync(detailPath, 'utf8');
if (!detail.includes("MGA_THREE_DAY_BOOKING_V2")) {
  detail = replaceOnce(
    detail,
    /  const itinerary = tour\.itineraryDays \?\? \[\];/,
    `  const isThreeDaySahara = tour.id === '3-day-sahara-marrakech';\n  const itinerary = tour.itineraryDays ?? [];`,
    'tour itinerary declaration',
  );

  detail = replaceOnce(
    detail,
    /              <h3 className="font-serif text-2xl text-foreground mb-4">\{t\('book_now'\)\}<\/h3>/,
    `              <h3 className="font-serif text-2xl text-foreground mb-4">{isThreeDaySahara ? 'Book Now · Pay Later' : t('book_now')}</h3>\n              {isThreeDaySahara && (\n                <div className="mb-5 rounded-2xl border border-primary/25 bg-primary/5 p-4">\n                  <p className="font-semibold text-foreground text-sm">Confirm the trip before you pay.</p>\n                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Send us your dates and group size first. We confirm the itinerary and applicable payment terms with you before you make a payment.</p>\n                </div>\n              )}`,
    'booking heading',
  );

  detail = replaceOnce(
    detail,
    /                \{!isGroupQuote \? \(\n                  <a[\s\S]*?\n                  \) : \(/,
    `                {!isGroupQuote && !isThreeDaySahara ? (\n                  <a`,
    'PayPal booking branch',
  );

  detail = replaceOnce(
    detail,
    /                    \{t\('book_paypal'\)\}\n                  <\/a>\n                \) : \(\n                  <a[\s\S]*?\n                    \{t\('book_group_quote'\)\}\n                  <\/a>\n                \)\}/,
    `                    {t('book_paypal')}\n                  </a>\n                ) : (\n                  <a\n                    href={isThreeDaySahara ? `${contactInfo.whatsapp}?text=${encodeURIComponent(`I'd like to book ${tour.name}. Please confirm the itinerary and payment terms before I pay.`)}` : `${contactInfo.whatsapp}?text=${encodeURIComponent(`I'm interested in a group booking for ${tour.name}. Please send me a custom quote.`)}`}\n                    target="_blank"\n                    rel="noreferrer"\n                    className="w-full bg-foreground text-background py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary transition-colors text-lg"\n                  >\n                    {isThreeDaySahara ? 'Request booking confirmation' : t('book_group_quote')}\n                  </a>\n                )}`,
    'PayPal/group booking branch body',
  );

  detail = replaceOnce(
    detail,
    /              <ul className="text-sm text-muted-foreground space-y-3 pt-6 border-t border-border">[\s\S]*?              <\/ul>/,
    `              {isThreeDaySahara ? (\n                <ul className="text-sm text-muted-foreground space-y-3 pt-6 border-t border-border">\n                  <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Your dates and group size are confirmed before payment.</li>\n                  <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /> The itinerary and applicable payment terms are agreed with you first.</li>\n                  <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Questions are answered by a local Morocco-based team.</li>\n                </ul>\n              ) : (\n                <ul className="text-sm text-muted-foreground space-y-3 pt-6 border-t border-border">\n                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {t('book_free_cancel')}</li>\n                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {t('book_no_fees')}</li>\n                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {t('book_secure_payment')}</li>\n                </ul>\n              )}`,
    'booking reassurance list',
  );

  fs.writeFileSync(detailPath, detail, 'utf8');
}

console.log('[3-day-enrichment] Three-day Sahara content and booking flow prepared for build.');
