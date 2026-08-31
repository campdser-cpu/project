import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const contentPath = path.join(root, 'src/data/content.ts');
const detailPath = path.join(root, 'src/pages/tour-detail.tsx');

const marker = 'MGA_THREE_DAY_ENRICHED_V1';

function replaceOnce(source, pattern, replacement, label) {
  if (!pattern.test(source)) throw new Error(`[3-day-enrichment] Could not find ${label}`);
  return source.replace(pattern, replacement);
}

let content = fs.readFileSync(contentPath, 'utf8');
if (!content.includes(marker)) {
  const replacement = `  {\n    id: "3-day-sahara-marrakech",\n    name: "3-Day Luxury Sahara Tour from Marrakech",\n    duration: "3 Days / 2 Nights",\n    category: "Desert & Adventure",\n    highlights: [\n      "Cross the High Atlas from Marrakech",\n      "Aït Ben Haddou — UNESCO World Heritage site",\n      "Dades Valley and Todra Gorge",\n      "Sunset camel trek in Erg Chebbi",\n      "Night in a Sahara desert camp",\n    ],\n    price: "450",\n    pricingTiers: { 1: 690, 2: 450, 3: 370, 4: 310, 5: 280 },\n    image: "/images/tours/3-day-sahara-marrakech.jpg",\n    aliases: ['3-days-marrakech-to-merzouga-desert-tour', 'merzouga-desert-tour'],\n    description: "A three-day private journey from Marrakech to the dunes of Merzouga, built for travelers who want a real Sahara experience without pretending the road is short. Cross the High Atlas, visit Aït Ben Haddou, travel through the Dades Valley and Todra Gorge, reach Merzouga and Erg Chebbi for a sunset camel trek and desert-camp night, then return to Marrakech through the changing landscapes of southern Morocco. Three days is the shortest practical format for this overland route; if you prefer slower travel or more time in the desert, ask us about a longer itinerary.",\n    routeIds: ["marrakech", "ait-ben-haddou", "ouarzazate", "dades-valley", "todra-gorge", "merzouga", "erg-chebbi"],\n    routeCaption: "Marrakech → High Atlas → Aït Ben Haddou → Dades Valley → Todra Gorge → Merzouga & Erg Chebbi → Marrakech. The road is part of the experience, not just a transfer.",\n    itineraryDays: [\n      {\n        day: 1,\n        title: "Marrakech → High Atlas → Aït Ben Haddou → Dades Valley",\n        desc: "Leave Marrakech in the morning and cross the High Atlas toward southern Morocco. Stop at Aït Ben Haddou, the historic earthen ksar and UNESCO World Heritage property, then continue through Ouarzazate and the changing landscapes of the Dades Valley for the first night.",\n        stops: ["Marrakech", "High Atlas Mountains", "Aït Ben Haddou (UNESCO)", "Ouarzazate", "Dades Valley"],\n      },\n      {\n        day: 2,\n        title: "Dades Valley → Todra Gorge → Rissani → Merzouga",\n        desc: "Continue east through the pre-Sahara, with time for Todra Gorge before heading toward Rissani and Merzouga. In the late afternoon, enter the Erg Chebbi dunes for the camel trek around sunset, then enjoy the desert camp experience and dinner under the open sky.",\n        stops: ["Dades Valley", "Todra Gorge", "Rissani area", "Merzouga", "Erg Chebbi", "Sunset camel trek", "Desert camp"],\n      },\n      {\n        day: 3,\n        title: "Merzouga → Eastern Morocco → Middle Atlas → Marrakech",\n        desc: "Wake for sunrise over the dunes, then begin the return journey to Marrakech. This is the longest road day, so the itinerary keeps the focus on a realistic return rather than promising a long list of rushed attractions. Travelers who want more time in Merzouga can extend the trip to four days or more.",\n        stops: ["Merzouga sunrise", "Rissani / Tafilalet area", "Ziz Valley area", "Middle Atlas", "Marrakech"],\n      },\n    ],\n    faq: [\n      {\n        question: "Is three days really enough for Marrakech to Merzouga?",\n        answer: "Three days is the shortest practical format for this overland route. It works when you want the key southern stops and one Sahara camp night, but you should expect long travel days. If you want a slower pace or more time in the dunes, four days or more is the better choice.",\n      },\n      {\n        question: "How much driving should I expect?",\n        answer: "This is a long road journey rather than a short transfer. The route crosses the High Atlas and southern valleys before reaching Merzouga, then returns to Marrakech. We prefer to explain that honestly so you can choose the right number of days for your travel style.",\n      },\n      {\n        question: "What is the Sahara part of the trip like?",\n        answer: "You reach Merzouga and the Erg Chebbi dune area on the second day, then head into the dunes for the sunset camel experience and a night at the desert camp. The exact camp setup and activity details are confirmed with you before booking rather than assumed.",\n      },\n      {\n        question: "When is the best time for this Sahara tour?",\n        answer: "Morocco's National Tourist Office highlights spring and autumn as especially suitable seasons for the southern Sahara. The tour can be planned year-round, but summer heat and winter nights are important considerations when choosing dates.",\n      },\n      {\n        question: "Can I book now and pay later?",\n        answer: "Yes, the first step is to contact us with your preferred dates and group size so we can confirm the itinerary and payment terms. Do not send payment until the agreed booking details are clear. Any deposit or balance arrangement is confirmed with you before payment.",\n      },\n      {\n        question: "Are flights included?",\n        answer: "International flights are not part of this tour price. There is no single month that guarantees the cheapest airfare for every traveler because prices depend on your departure country, airline and dates. Once your tour dates are chosen, we can help you think through the most practical arrival and departure plan.",\n      },\n    ],\n    // ${marker}\n  },`;

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
    /  const itinerary = tour\.itineraryDays \?\? \[\];/,
    `  const isThreeDaySahara = tour.id === '3-day-sahara-marrakech';\n  const itinerary = tour.itineraryDays ?? [];`,
    'tour itinerary declaration',
  );

  detail = replaceOnce(
    detail,
    /            \{tour\.description && \(\n              <div className="mb-12">[\s\S]*?            \)\}/,
    `            {tour.description && (\n              <div className="mb-12">\n                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-5">Tour Overview</h2>\n                <p className="text-muted-foreground text-lg leading-relaxed">{tour.description}</p>\n              </div>\n            )}\n\n            {isThreeDaySahara && (\n              <div className="mb-12 grid gap-6 md:grid-cols-2">\n                <div className="md:col-span-2 rounded-3xl border border-primary/20 bg-primary/5 p-7 md:p-9">\n                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">The honest version</div>\n                  <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Three days is the shortest practical Sahara route from Marrakech.</h2>\n                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed">The desert is not a quick transfer from Marrakech. The High Atlas, southern valleys and long overland road are part of the journey. This route is designed to give you the essential experience without hiding the reality of the travel time. If you want slower days or more time around Merzouga, choose four days or more.</p>\n                </div>\n                <div className="rounded-3xl border border-border bg-card p-7 shadow-sm">\n                  <h3 className="font-serif text-2xl text-foreground mb-3">When to travel</h3>\n                  <p className="text-muted-foreground leading-relaxed">The Moroccan National Tourist Office highlights spring and autumn as especially suitable seasons for the southern Sahara. Summer can be very hot; winter nights can be cold. We help you choose dates around your priorities.</p>\n                </div>\n                <div className="rounded-3xl border border-border bg-card p-7 shadow-sm">\n                  <h3 className="font-serif text-2xl text-foreground mb-3">About flight prices</h3>\n                  <p className="text-muted-foreground leading-relaxed">There is no honest single month that guarantees the cheapest flight for every traveler. Airfare depends on your departure country, airline, school holidays and exact dates. Choose the travel dates that suit your Morocco plan, then compare flights for those dates.</p>\n                </div>\n              </div>\n            )}`,
    'tour overview block',
  );

  detail = replaceOnce(
    detail,
    /              <h3 className="font-serif text-2xl text-foreground mb-4">\{t\('book_now'\)\}<\/h3>/,
    `              <h3 className="font-serif text-2xl text-foreground mb-4">{isThreeDaySahara ? 'Book Now · Pay Later' : t('book_now')}</h3>\n              {isThreeDaySahara && (\n                <div className="mb-5 rounded-2xl border border-primary/25 bg-primary/5 p-4">\n                  <p className="font-semibold text-foreground text-sm">Confirm the trip before you pay.</p>\n                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Send us your dates and group size first. We confirm the itinerary and payment terms with you before you make a payment.</p>\n                </div>\n              )}`,
    'booking heading',
  );

  fs.writeFileSync(detail, 'utf8');
}

console.log('[3-day-enrichment] 3-day Sahara tour content prepared for build.');
