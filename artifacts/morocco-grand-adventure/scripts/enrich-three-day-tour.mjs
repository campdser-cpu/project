import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const contentPath = path.join(root, 'src/data/content.ts');
const detailPath = path.join(root, 'src/pages/tour-detail.tsx');
const metadataPath = path.join(root, 'src/components/seo/route-metadata.ts');
const marker = 'MGA_THREE_DAY_ENRICHED_V2';

function replaceOnce(source, pattern, replacement, label) {
  if (!pattern.test(source)) throw new Error(`[3-day-enrichment] Could not find ${label}`);
  return source.replace(pattern, replacement);
}

let content = fs.readFileSync(contentPath, 'utf8');
if (!content.includes(marker)) {
  const replacement = `  {\n    id: "3-day-sahara-marrakech",\n    name: "3-Day Luxury Sahara Tour from Marrakech",\n    duration: "3 Days / 2 Nights",\n    category: "Desert & Adventure",\n    highlights: [\n      "Cross the High Atlas from Marrakech",\n      "Aït Ben Haddou — UNESCO World Heritage site",\n      "Dades Valley and Todra Gorge",\n      "Sunset camel trek in Erg Chebbi",\n      "Night in a Sahara desert camp",\n    ],\n    price: "450",\n    pricingTiers: { 1: 690, 2: 450, 3: 370, 4: 310, 5: 280 },\n    image: "/images/tours/3-day-sahara-marrakech.jpg",\n    aliases: ['3-days-marrakech-to-merzouga-desert-tour', 'merzouga-desert-tour'],\n    description: "A three-day private journey from Marrakech to the dunes of Merzouga, built for travelers who want a real Sahara experience without pretending the road is short. Cross the High Atlas, visit Aït Ben Haddou, travel through the Dades Valley and Todra Gorge, reach Merzouga and Erg Chebbi for a sunset camel trek and desert-camp night, then return to Marrakech through the changing landscapes of southern Morocco. Three days is the shortest practical format for this overland route; if you prefer slower travel or more time in the desert, ask us about a longer itinerary.",\n    routeIds: ["marrakech", "ait-ben-haddou", "ouarzazate", "dades-valley", "todra-gorge", "merzouga", "erg-chebbi"],\n    routeCaption: "Marrakech → High Atlas → Aït Ben Haddou → Dades Valley → Todra Gorge → Merzouga & Erg Chebbi → Marrakech. The road is part of the experience, not just a transfer.",\n    itineraryDays: [\n      {\n        day: 1,\n        title: "Marrakech → High Atlas → Aït Ben Haddou → Dades Valley",\n        desc: "Leave Marrakech in the morning and cross the High Atlas toward southern Morocco. Stop at Aït Ben Haddou, the historic earthen ksar and UNESCO World Heritage property, then continue through Ouarzazate and the changing landscapes of the Dades Valley for the first night.",\n        stops: ["Marrakech", "High Atlas Mountains", "Aït Ben Haddou (UNESCO)", "Ouarzazate", "Dades Valley"],\n      },\n      {\n        day: 2,\n        title: "Dades Valley → Todra Gorge → Rissani → Merzouga",\n        desc: "Continue east through the pre-Sahara, with time for Todra Gorge before heading toward Rissani and Merzouga. In the late afternoon, enter the Erg Chebbi dunes for the camel trek around sunset, then enjoy the desert camp experience and dinner under the open sky.",\n        stops: ["Dades Valley", "Todra Gorge", "Rissani area", "Merzouga", "Erg Chebbi", "Sunset camel trek", "Desert camp"],\n      },\n      {\n        day: 3,\n        title: "Merzouga → Ziz Valley area → Middle Atlas → Marrakech",\n        desc: "Wake for sunrise over the dunes, then begin the return journey to Marrakech. This is the longest road day, so the itinerary keeps the focus on a realistic return rather than promising a long list of rushed attractions. Travelers who want more time in Merzouga can extend the trip to four days or more.",\n        stops: ["Merzouga sunrise", "Rissani / Tafilalet area", "Ziz Valley area", "Middle Atlas", "Marrakech"],\n      },\n    ],\n    faq: [\n      { question: "Is three days really enough for Marrakech to Merzouga?", answer: "Three days is the shortest practical format for this overland route. It works when you want the key southern stops and one Sahara camp night, but you should expect long travel days. If you want a slower pace or more time in the dunes, four days or more is the better choice." },\n      { question: "How much driving should I expect?", answer: "This is a long road journey rather than a short transfer. The route crosses the High Atlas and southern valleys before reaching Merzouga, then returns to Marrakech. We prefer to explain that honestly so you can choose the right number of days for your travel style." },\n      { question: "Is the tour private?", answer: "This product is presented as a private tour in the booking experience. Your final route details, travel date and arrangements are confirmed with you before payment." },\n      { question: "What is the Sahara part of the trip like?", answer: "You reach Merzouga and the Erg Chebbi dune area on the second day, then head into the dunes for the sunset camel experience and a night at the desert camp. The exact camp setup and activity details are confirmed with you before booking rather than assumed." },\n      { question: "When is the best time for this Sahara tour?", answer: "Morocco's National Tourist Office highlights spring and autumn as especially suitable seasons for the southern Sahara. The tour can be planned year-round, but summer heat and winter nights are important considerations when choosing dates." },\n      { question: "Can I book now and pay later?", answer: "Yes. The first step is to contact us with your preferred dates and group size so we can confirm the itinerary and payment terms. Do not send payment until the agreed booking details are clear. Any deposit or balance arrangement is confirmed with you before payment." },\n      { question: "Are flights included?", answer: "International flights are not part of this tour price. There is no single month that guarantees the cheapest airfare for every traveler because prices depend on your departure country, airline and dates. Once your tour dates are chosen, we can help you think through the most practical arrival and departure plan." },\n      { question: "What should I pack?", answer: "Pack comfortable walking shoes, sun protection, a refillable water bottle, light daytime clothing and a warmer layer for the desert evening. A small overnight bag is easier to handle for the desert portion; keep larger luggage with the vehicle where the itinerary allows." },\n      { question: "What happens after I request a quote?", answer: "We review your dates and group size, confirm the practical itinerary and explain the applicable payment terms before you pay. The quote conversation is the place to clarify accommodation, meals and any customization that is relevant to your trip." },\n    ],\n    // ${marker}\n  },`;

  content = replaceOnce(
    content,
    /  \{\n    id: "3-day-sahara-marrakech",[\s\S]*?\n  \},\n  \{\n    id: "5-day-imperial-cities",/,
    replacement + '\n  {\n    id: "5-day-imperial-cities",',
    'the 3-day tour data block',
  );
  fs.writeFileSync(contentPath, content, 'utf8');
}

let detail = fs.readFileSync(detailPath, 'utf8');
if (!detail.includes(marker)) {
  detail = replaceOnce(
    detail,
    /  const itinerary = tour\.itineraryDays \?\? fallbackDays;/,
    `  const isThreeDaySahara = tour.id === '3-day-sahara-marrakech';\n  const itinerary = tour.itineraryDays ?? fallbackDays;`,
    'tour itinerary declaration',
  );

  detail = replaceOnce(
    detail,
    /            \{\/\* Included \/ Excluded \*\/\}/,
    `            {isThreeDaySahara && (\n              <div className="mb-16 rounded-3xl border border-primary/20 bg-primary/5 p-7 md:p-8">\n                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-3">Three days, honestly explained</p>\n                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">What should I expect from three days?</h2>\n                <p className="text-muted-foreground leading-relaxed mb-5">This is a real overland journey to the Sahara. The reward is the contrast between the High Atlas, kasbah country, gorges and the Erg Chebbi dunes, but the route also means early starts and substantial time on the road. We would rather tell you that before you book than make the journey sound easier than it is.</p>\n                <div className="grid sm:grid-cols-2 gap-3 text-sm">\n                  <div className="rounded-2xl bg-background border border-border p-4"><strong className="text-foreground">Best for:</strong><span className="text-muted-foreground"> travelers with limited time who want one genuine Sahara night.</span></div>\n                  <div className="rounded-2xl bg-background border border-border p-4"><strong className="text-foreground">Travel rhythm:</strong><span className="text-muted-foreground"> long road days with sightseeing stops along the way.</span></div>\n                  <div className="rounded-2xl bg-background border border-border p-4"><strong className="text-foreground">Desert:</strong><span className="text-muted-foreground"> sunset camel experience and overnight camp around Erg Chebbi.</span></div>\n                  <div className="rounded-2xl bg-background border border-border p-4"><strong className="text-foreground">Want it slower?</strong><span className="text-muted-foreground"> ask about extending the route to four days or more.</span></div>\n                </div>\n              </div>\n            )}\n\n            {/* Included / Excluded */}`,
    'included/excluded section',
  );

  detail = replaceOnce(
    detail,
    /              <h3 className="font-serif text-2xl text-foreground mb-4">\{t\('book_now'\)\}<\/h3>/,
    `              <h3 className="font-serif text-2xl text-foreground mb-4">{isThreeDaySahara ? 'Book Now · Pay Later' : t('book_now')}</h3>\n              {isThreeDaySahara && (\n                <div className="mb-5 rounded-2xl border border-primary/25 bg-primary/5 p-4">\n                  <p className="font-semibold text-foreground text-sm">Confirm the trip before you pay.</p>\n                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Send us your dates and group size first. We confirm the itinerary and payment terms with you before you make a payment.</p>\n                </div>\n              )}`,
    'booking heading',
  );

  detail = replaceOnce(
    detail,
    /                \{\/\* PayPal deposit \*\/\}[\s\S]*?                \)\}/,
    `                {isThreeDaySahara ? (\n                  <a\n                    href={promoOn\n                      ? waPromoLink(`${t('promo_wa_message')}\\n\\n${tour.name} · ${travelers}p${date ? ` · ${date}` : ''}`)\n                      : `${contactInfo.whatsapp}?text=${encodeURIComponent(`I'm interested in ${tour.name}. Please confirm the itinerary and payment terms before I pay.`)}`}\n                    target="_blank"\n                    rel="noreferrer"\n                    className="w-full bg-foreground text-background py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary transition-all hover:-translate-y-1 shadow-lg text-lg"\n                  >\n                    Request My Trip & Payment Terms\n                  </a>\n                ) : !isGroupQuote ? (\n                  <a\n                    href={\`${contactInfo.paypal}/\${promoOn ? discTotalPrice : totalPrice}\`}\n                    target="_blank"\n                    rel="noreferrer"\n                    className="w-full bg-[#003087] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#001f5e] transition-all hover:-translate-y-1 shadow-lg"\n                  >\n                    {t('book_paypal')}\n                  </a>\n                ) : (\n                  <a\n                    href={\`${contactInfo.whatsapp}?text=\${encodeURIComponent(`I'm interested in a group booking for ${tour.name}. Please send me a custom quote.`)}\`}\n                    target="_blank"\n                    rel="noreferrer"\n                    className="w-full bg-foreground text-background py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary transition-colors text-lg"\n                  >\n                    {t('book_group_quote')}\n                  </a>\n                )}`,
    'booking payment action',
  );

  fs.writeFileSync(detailPath, detail, 'utf8');
}

let metadata = fs.readFileSync(metadataPath, 'utf8');
metadata = metadata.replace(
  /'3-day-sahara-marrakech': \{ title: '[^']+', description: "[^"]+", ogImage:/,
  `'3-day-sahara-marrakech': { title: '3-Day Sahara Tour from Marrakech | Morocco', description: "3-day Sahara tour from Marrakech to Merzouga with the High Atlas, Aït Ben Haddou, Dades Valley, Erg Chebbi and a desert camp. See the real itinerary and travel expectations.", ogImage:`,
);
fs.writeFileSync(metadataPath, metadata, 'utf8');

console.log('[3-day-enrichment] 3-day Sahara tour content, trust messaging and metadata prepared for build.');