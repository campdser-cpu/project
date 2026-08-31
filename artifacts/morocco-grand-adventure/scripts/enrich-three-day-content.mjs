import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentPath = path.join(root, 'src/data/content.ts');
const marker = 'MGA_THREE_DAY_ENRICHED_V3';

function replaceOnce(source, pattern, replacement, label) {
  if (!pattern.test(source)) throw new Error(`[3-day-content] Could not find ${label}`);
  return source.replace(pattern, replacement);
}

let content = fs.readFileSync(contentPath, 'utf8');
if (content.includes(marker)) {
  console.log('[3-day-content] Already applied.');
  process.exit(0);
}

const replacement = `  {
    id: "3-day-sahara-marrakech",
    name: "3-Day Luxury Sahara Tour from Marrakech",
    duration: "3 Days / 2 Nights",
    category: "Desert & Adventure",
    highlights: ["High Atlas Crossing", "Aït Ben Haddou (UNESCO)", "Dades Valley & Todra Gorge", "Erg Chebbi Sunset Camel Experience", "Luxury Desert Camp", "Merzouga Sunrise"],
    price: "450",
    pricingTiers: { 1: 690, 2: 450, 3: 370, 4: 310, 5: 280 },
    image: "/images/pdf/img_1-optimized.webp",
    aliases: ['3-days-marrakech-to-merzouga-desert-tour', 'merzouga-desert-tour'],
    description: "A real Marrakech-to-Merzouga road journey in three days: cross the High Atlas, visit Aït Ben Haddou, continue through the southern valleys and reach Merzouga for the Erg Chebbi desert experience. The three-day format is deliberately compact and involves long driving days, especially on the return to Marrakech. If you want more time for the desert, slower mornings or extra stops, ask us about extending the route.",
    routeIds: ["marrakech", "ait-ben-haddou", "ouarzazate", "skoura", "dades-valley", "todra-gorge", "merzouga", "erg-chebbi"],
    routeCaption: "Marrakech → High Atlas → Aït Ben Haddou → Ouarzazate / Skoura → Dades Valley → Todra Gorge → Merzouga & Erg Chebbi → Marrakech. The road is part of the experience, not just a transfer.",
    itineraryDays: [
      { day: 1, title: "Marrakech → High Atlas → Aït Ben Haddou → Dades Valley", desc: "Leave Marrakech in the morning and cross the High Atlas via the Tizi n'Tichka route. Stop at Aït Ben Haddou, the historic earthen ksar recognised by UNESCO, then continue toward Ouarzazate and the Skoura oasis before reaching the Dades Valley for the first overnight stay.", stops: ["Marrakech", "High Atlas Mountains", "Tizi n'Tichka", "Aït Ben Haddou (UNESCO)", "Ouarzazate", "Skoura Oasis", "Overnight: Dades Valley"] },
      { day: 2, title: "Dades Valley → Todra Gorge → Merzouga → Erg Chebbi", desc: "Continue east through the pre-Saharan landscape, with time around the Dades Valley and Todra Gorge before heading toward Merzouga. In the afternoon, the focus shifts to the dunes: camel transfer into Erg Chebbi around sunset, followed by the desert-camp night. Dinner and breakfast are included according to the tour inclusions shown below.", stops: ["Dades Valley", "Todra Gorge", "Rissani area", "Merzouga", "Erg Chebbi", "Sunset camel experience", "Desert camp"] },
      { day: 3, title: "Merzouga sunrise → return journey → Marrakech", desc: "Start with sunrise over the dunes, then leave the Merzouga area for the long return to Marrakech. This is intentionally described as a long road day: the three-day option prioritises completing the loop while still giving you a genuine Sahara night. If you dislike long travel days, choose a longer itinerary instead.", stops: ["Merzouga sunrise", "Rissani / Tafilalet area", "Ziz Valley area", "Middle Atlas route", "Marrakech"] }
    ],
    included: ["Private air-conditioned vehicle", "Professional English-speaking driver", "Fuel", "Luxury desert camp", "Camel experience in Erg Chebbi", "1 night accommodation in the Dades Valley", "1 night luxury desert camp", "Dinners & breakfasts as per itinerary", "Hotel pick-up & drop-off"],
    excluded: ["International flights", "Lunches", "Drinks", "Monument & museum entrance fees where applicable", "Tips & gratuities", "Personal expenses"],
    gallery: [
      { src: "/images/pdf/img_1-optimized.webp", caption: "Southern Morocco landscapes on the three-day route" },
      { src: "/images/dest/ait-ben-haddou.webp", caption: "Aït Ben Haddou on the road south from Marrakech" },
      { src: "/images/dest/erg-chebbi.webp", caption: "Erg Chebbi dunes near Merzouga" }
    ],
    faq: [
      { question: "Is three days enough for Marrakech to Merzouga?", answer: "Three days is the shortest practical format for this overland loop. It gives you one Sahara camp night and the major southern stops, but it is not a slow trip. Expect substantial road time, particularly on day 3. If you want a calmer pace, more time in Merzouga or extra stops, four days or more is the better choice." },
      { question: "How much driving should I expect?", answer: "A lot. Marrakech and Merzouga are far apart and the route crosses mountain and pre-Saharan roads rather than staying on a motorway. We show the long road days clearly because the journey itself is part of the experience and we would rather you choose the right trip than be surprised after booking." },
      { question: "What happens during the camel experience?", answer: "On the Merzouga afternoon you head into the Erg Chebbi dunes by camel around sunset, then spend the night at the desert camp. The exact camp setup and camel logistics are confirmed with you as part of the final booking details." },
      { question: "Where do I sleep?", answer: "The published itinerary includes one night in the Dades Valley and one night at a luxury desert camp in the Erg Chebbi area. Exact accommodation names are confirmed with the booking details rather than guessed on the website." },
      { question: "When is a good time to visit the Sahara?", answer: "The Moroccan National Tourist Office identifies spring and autumn as especially suitable seasons for the southern Sahara. Summer can be very hot in the desert, while winter nights can be cold, so your packing and expectations should match the season." },
      { question: "Can I book now and pay later?", answer: "Yes, but the honest process is: send us your dates and group size, we confirm the itinerary and applicable payment terms, and only then do you make the agreed payment. This page does not promise financing or automatic deferred payment." },
      { question: "Are flights included?", answer: "No. International flights are not included in this tour. Airfare varies by departure country, airline and travel dates, so there is no single month that guarantees the cheapest ticket for every traveller." },
      { question: "Can I make the three-day trip less rushed?", answer: "The most effective change is adding a day. A four-day or longer itinerary gives you more room for the southern valleys and more time around Merzouga instead of using day 3 mainly for the return to Marrakech." },
      { question: "What should I pack?", answer: "Bring comfortable shoes, light layers for daytime, a warmer layer for the desert evening, sun protection, water and a small overnight bag for the camp." },
      { question: "What happens after I request the trip?", answer: "We ask for your dates, group size and preferences, confirm what can be arranged, and then send the itinerary and applicable payment terms. You should have the important details clear before making a payment." }
    ],
    // ${marker}
  },`;

content = replaceOnce(
  content,
  /  \{\n    id: "3-day-sahara-marrakech",[\s\S]*?\n  \},\n  \{\n    id: "5-day-imperial-cities",/,
  replacement + '\n  {\n    id: "5-day-imperial-cities",',
  'existing Marrakech three-day tour block',
);
fs.writeFileSync(contentPath, content, 'utf8');
console.log('[3-day-content] Marrakech three-day content enriched.');
