import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const marker = 'MGA_TOUR_CATALOG_V1';

function patchOnce(file, find, replacement, label) {
  let source = fs.readFileSync(file, 'utf8');
  if (source.includes(marker) && label !== 'content') return;
  if (!find.test(source)) throw new Error(`[tour-catalog] Could not find ${label}`);
  source = source.replace(find, replacement);
  fs.writeFileSync(file, source, 'utf8');
}

const contentPath = path.join(root, 'src/data/content.ts');
let content = fs.readFileSync(contentPath, 'utf8');
if (!content.includes(marker)) {
  // Quote-only tours intentionally do not carry fabricated prices. The detail
  // page renders "Quote on request" and routes travellers to the real contact
  // flow instead of inventing a commercial figure.
  const newTours = `
  {
    id: "2-day-zagora-desert-marrakech",
    name: "2-Day Zagora Desert Tour from Marrakech",
    duration: "2 Days / 1 Night",
    category: "Desert & Adventure",
    highlights: [
      "Cross the High Atlas Mountains",
      "Aït Ben Haddou (UNESCO)",
      "Ouarzazate and the Draa Valley",
      "Sunset camel experience near Zagora",
      "Night in a desert camp",
    ],
    price: "On request",
    pricingTiers: undefined,
    quoteOnly: true,
    image: "/images/dest/zagora.webp",
    aliases: ["2-days-marrakech-zagora-desert-tour", "2-day-zagora-desert-tour"],
    description: "A compact private desert journey from Marrakech to Zagora for travellers who want a Sahara-style experience without committing to the longer Merzouga route. Cross the High Atlas, visit Aït Ben Haddou and Ouarzazate, continue through the Draa Valley to Zagora, and return to Marrakech the following day.",
    routeIds: ["marrakech", "ait-ben-haddou", "ouarzazate", "draa-valley", "zagora"],
    routeCaption: "Marrakech → High Atlas → Aït Ben Haddou → Ouarzazate → Draa Valley → Zagora → Marrakech.",
    itineraryDays: [
      { day: 1, title: "Marrakech → High Atlas → Aït Ben Haddou → Ouarzazate → Zagora", desc: "Leave Marrakech and cross the High Atlas before visiting the UNESCO-listed ksar of Aït Ben Haddou. Continue through Ouarzazate and the Draa Valley to Zagora, where the desert landscape becomes increasingly open and arid. The evening is reserved for the desert camp experience and sunset around the dunes.", stops: ["Marrakech", "High Atlas Mountains", "Aït Ben Haddou (UNESCO)", "Ouarzazate", "Draa Valley", "Zagora", "Desert camp"] },
      { day: 2, title: "Zagora → Draa Valley → High Atlas → Marrakech", desc: "Start the return journey after breakfast, following the Draa Valley back toward Ouarzazate and crossing the High Atlas to Marrakech. This is a fast two-day format, so travellers who prefer more time in the desert should consider a longer itinerary.", stops: ["Zagora", "Draa Valley", "Ouarzazate", "High Atlas", "Marrakech"] },
    ],
    included: ["Private air-conditioned vehicle", "Professional English-speaking driver", "Fuel", "Accommodation according to the selected package", "Desert experience described in the confirmed itinerary", "Hotel pick-up & drop-off"],
    excluded: ["International flights", "Lunches", "Drinks", "Monument and museum entrance fees", "Optional activities not listed in the confirmed itinerary", "Tips & gratuities", "Personal expenses"],
    gallery: [
      { src: "/images/dest/zagora.webp", caption: "Zagora and the gateway to Morocco's Draa Valley" },
      { src: "/images/dest/draa-valley.webp", caption: "Palm groves and kasbah landscapes of the Draa Valley" },
      { src: "/images/dest/ait-ben-haddou.webp", caption: "Aït Ben Haddou on the route south from Marrakech" },
    ],
    faq: [
      { question: "Is the 2-day Zagora tour private?", answer: "Yes. The itinerary is designed as a private journey for your party, with your own vehicle and driver." },
      { question: "Is this the same Sahara experience as Merzouga?", answer: "No. Zagora is a different desert region from Erg Chebbi near Merzouga. Choose this shorter route for the Draa Valley and Zagora; choose a Merzouga itinerary when the Erg Chebbi dunes are your priority." },
      { question: "Is the desert camp included?", answer: "The confirmed package will specify the accommodation and desert experience included for your dates. We do not assume a particular camp or upgrade before booking." },
      { question: "Can I extend the trip?", answer: "Yes. If two days feels too compressed, ask us to build a longer private route through the Draa Valley or onward to Merzouga." },
      { question: "Are lunches included?", answer: "Lunches are not included unless they are specifically stated in the confirmed itinerary." },
      { question: "How is the price confirmed?", answer: "This tour is quote-only because the final price depends on your dates, group size and selected accommodation. Contact us first and we will confirm the itinerary and commercial terms before payment." },
    ],
  },
  {
    id: "4-day-marrakech-merzouga-sahara",
    name: "4-Day Marrakech to Merzouga Sahara Desert Tour",
    duration: "4 Days / 3 Nights",
    category: "Desert & Adventure",
    highlights: ["High Atlas crossing", "Aït Ben Haddou and Ouarzazate", "Dades Valley and Todra Gorge", "Erg Chebbi sunset camel trek", "Extra time in Merzouga", "Desert camp night"],
    price: "On request",
    pricingTiers: undefined,
    quoteOnly: true,
    image: "/images/dest/merzouga.webp",
    aliases: ["4-days-marrakech-to-merzouga-desert-tour", "4-day-marrakech-merzouga-desert-tour"],
    description: "A more comfortable alternative to the classic three-day Marrakech–Merzouga loop. The four-day format keeps the same southern highlights but gives the journey more breathing room, with a dedicated Merzouga day before the return to Marrakech.",
    routeIds: ["marrakech", "ait-ben-haddou", "ouarzazate", "dades-valley", "todra-gorge", "merzouga", "erg-chebbi"],
    routeCaption: "Marrakech → High Atlas → Aït Ben Haddou → Ouarzazate → Dades Valley → Todra Gorge → Merzouga & Erg Chebbi → Marrakech.",
    itineraryDays: [
      { day: 1, title: "Marrakech → High Atlas → Aït Ben Haddou → Dades Valley", desc: "Cross the High Atlas and stop at Aït Ben Haddou before continuing through Ouarzazate and the southern valleys to the Dades Valley. The overnight stay breaks the long road south into a manageable first day.", stops: ["Marrakech", "High Atlas", "Aït Ben Haddou", "Ouarzazate", "Dades Valley"] },
      { day: 2, title: "Dades Valley → Todra Gorge → Erfoud → Merzouga", desc: "Follow the road through the Dades landscape to Todra Gorge, then continue east through the pre-Sahara toward Erfoud and Merzouga. Arrive in time for the camel transfer into the Erg Chebbi dunes and sunset at camp.", stops: ["Dades Valley", "Todra Gorge", "Erfoud", "Merzouga", "Erg Chebbi", "Sunset camel trek", "Desert camp"] },
      { day: 3, title: "Merzouga and Erg Chebbi — Sahara Day", desc: "Use the extra day to experience the Merzouga area at a slower pace. Depending on the confirmed plan, explore the dunes and nearby communities, enjoy local hospitality, and leave room for sunrise or sunset rather than spending the whole day on the road.", stops: ["Merzouga", "Erg Chebbi", "Desert sunrise", "Local communities", "Overnight: Merzouga"] },
      { day: 4, title: "Merzouga → Ziz Valley → High Atlas → Marrakech", desc: "After breakfast, begin the return drive through the Ziz Valley and across the Atlas. The final day is a substantial road journey back to Marrakech, with stops paced around road conditions and your agreed itinerary.", stops: ["Merzouga", "Ziz Valley", "High Atlas", "Marrakech"] },
    ],
    included: ["Private air-conditioned vehicle", "Professional English-speaking driver", "Fuel", "Accommodation according to selected package", "Desert camp experience according to confirmed itinerary", "Camel trek when included in the confirmed package", "Hotel pick-up & drop-off"],
    excluded: ["International flights", "Lunches", "Drinks", "Entrance fees", "Optional activities", "Tips & gratuities", "Personal expenses"],
    gallery: [
      { src: "/images/dest/dades-valley.webp", caption: "Dades Valley on the road to Merzouga" },
      { src: "/images/dest/todra-gorge.webp", caption: "Todra Gorge in the eastern High Atlas" },
      { src: "/images/dest/merzouga.webp", caption: "Merzouga at the edge of Erg Chebbi" },
      { src: "/images/dest/erg-chebbi.webp", caption: "The dunes of Erg Chebbi" },
    ],
    faq: [
      { question: "Why choose four days instead of three?", answer: "Four days reduces the sense of a continuous road race and gives you a dedicated day around Merzouga. It is the better choice when the Sahara itself matters as much as the route to it." },
      { question: "Does this tour include Erg Chebbi?", answer: "Yes. The route reaches Merzouga and the Erg Chebbi dune area. The exact desert-camp and camel arrangements are confirmed with you before booking." },
      { question: "Is accommodation included?", answer: "Accommodation is included according to the selected package and confirmed availability. Exact properties are not promised before booking." },
      { question: "Can the route be customized?", answer: "Yes. This is a private itinerary and can be adjusted around your preferred pace, interests and finish point." },
      { question: "Is the return to Marrakech long?", answer: "Yes. Merzouga is a long drive from Marrakech. The four-day format adds time in the desert but the final return remains a substantial road day." },
      { question: "How is the price confirmed?", answer: "This tour is quote-only. We confirm your dates, party size, accommodation category and itinerary before providing the final commercial terms." },
    ],
  },
  {
    id: "5-day-great-south-morocco",
    name: "5-Day Great South Morocco Tour",
    duration: "5 Days / 4 Nights",
    category: "Grand South",
    highlights: ["High Atlas and Tizi n'Tichka", "Aït Ben Haddou", "Dades and Todra gorges", "Merzouga and Erg Chebbi", "Draa Valley and southern kasbah landscapes", "Return to Marrakech"],
    price: "On request",
    pricingTiers: undefined,
    quoteOnly: true,
    image: "/images/dest/draa-valley.webp",
    aliases: ["5-days-great-south-morocco-tour", "5-day-great-south-morocco-tour"],
    description: "A five-day private circuit through southern Morocco, combining the High Atlas, the kasbah country around Aït Ben Haddou and Dades, the Todra Gorge and the Sahara around Merzouga with the palm-filled Draa Valley on the return. The route is designed to favour landscapes and time on the road over a checklist of city stops.",
    routeIds: ["marrakech", "ait-ben-haddou", "ouarzazate", "dades-valley", "todra-gorge", "merzouga", "erg-chebbi", "draa-valley", "zagora"],
    routeCaption: "Marrakech → High Atlas → Aït Ben Haddou → Ouarzazate → Dades → Todra → Merzouga → Draa Valley → Marrakech.",
    itineraryDays: [
      { day: 1, title: "Marrakech → High Atlas → Aït Ben Haddou → Dades", desc: "Cross the High Atlas, visit Aït Ben Haddou and continue through Ouarzazate and the southern valleys to the Dades Valley for the first overnight stay.", stops: ["Marrakech", "High Atlas", "Aït Ben Haddou", "Ouarzazate", "Dades Valley"] },
      { day: 2, title: "Dades → Todra Gorge → Erfoud → Merzouga", desc: "Explore the Dades landscape, continue to Todra Gorge and travel east through the pre-Sahara to Merzouga. Reach the Erg Chebbi dunes for the desert experience and overnight camp.", stops: ["Dades Valley", "Todra Gorge", "Erfoud", "Merzouga", "Erg Chebbi", "Desert camp"] },
      { day: 3, title: "Merzouga → Erg Chebbi → Rissani and desert surroundings", desc: "Keep a slower Sahara day around Merzouga. Depending on the agreed plan, include dune viewpoints, local communities, Rissani and time for the desert at sunrise or sunset.", stops: ["Merzouga", "Erg Chebbi", "Rissani", "Desert surroundings", "Overnight: Merzouga area"] },
      { day: 4, title: "Merzouga → Alnif → Nkob → Draa Valley → Ouarzazate", desc: "Leave the dunes and travel west through the volcanic landscapes around Alnif and Nkob, then follow the Draa Valley with its palm groves and kasbah country before continuing to Ouarzazate.", stops: ["Merzouga", "Alnif", "Nkob", "Draa Valley", "Ouarzazate"] },
      { day: 5, title: "Ouarzazate → Aït Ben Haddou → High Atlas → Marrakech", desc: "Return toward Marrakech via Aït Ben Haddou and the High Atlas. The final day is paced around the road and your preferred stops before arrival in Marrakech.", stops: ["Ouarzazate", "Aït Ben Haddou", "High Atlas", "Marrakech"] },
    ],
    included: ["Private air-conditioned vehicle", "Professional English-speaking driver", "Fuel", "Accommodation according to selected package", "Desert camp according to confirmed itinerary", "Camel experience when specified", "Hotel pick-up & drop-off"],
    excluded: ["International flights", "Lunches", "Drinks", "Entrance fees", "Optional activities", "Tips & gratuities", "Personal expenses"],
    gallery: [
      { src: "/images/dest/ait-ben-haddou.webp", caption: "Aït Ben Haddou" },
      { src: "/images/dest/dades-valley.webp", caption: "Dades Valley" },
      { src: "/images/dest/merzouga.webp", caption: "Merzouga and Erg Chebbi" },
      { src: "/images/dest/draa-valley.webp", caption: "Draa Valley palm groves" },
    ],
    faq: [
      { question: "What makes this a Great South itinerary?", answer: "The route focuses on the landscapes and cultural corridors south of the High Atlas: Aït Ben Haddou, the Dades and Todra gorges, Merzouga and the Draa Valley." },
      { question: "Is Merzouga included?", answer: "Yes. The route reaches Merzouga and the Erg Chebbi area, with the exact desert experience confirmed as part of your booking." },
      { question: "Is this private?", answer: "Yes. It is structured as a private journey for your party." },
      { question: "Can we spend more time in the Sahara?", answer: "Yes. The route can be adjusted, and a four- or longer-day Merzouga format may suit you better if desert time is the priority." },
      { question: "Are meals included?", answer: "Meals depend on the confirmed accommodation package. The final itinerary will state which breakfasts and dinners are included." },
      { question: "How is the price confirmed?", answer: "This tour is quote-only. We confirm dates, group size and accommodation choices before confirming the final price." },
    ],
  },
  {
    id: "3-day-fes-merzouga-sahara",
    name: "3-Day Fes to Merzouga Sahara Desert Tour",
    duration: "3 Days / 2 Nights",
    category: "Sahara & Culture",
    highlights: ["Fes departure", "Middle Atlas and cedar forests", "Ziz Valley", "Merzouga and Erg Chebbi", "Sunset camel experience", "Desert camp night"],
    price: "On request",
    pricingTiers: undefined,
    quoteOnly: true,
    image: "/images/dest/fes.webp",
    aliases: ["3-days-fes-to-merzouga-sahara-tour", "3-day-fes-merzouga-desert-tour"],
    description: "A focused private journey from Fes to the Sahara at Merzouga. Travel south through the Middle Atlas and Ziz Valley, reach Erg Chebbi for the desert experience, then return to Fes. The route is intentionally compact; travellers wanting more time around the dunes should extend it.",
    routeIds: ["fes", "ifrane", "merzouga", "erg-chebbi"],
    routeCaption: "Fes → Ifrane and Middle Atlas → Ziz Valley → Merzouga → Erg Chebbi → Fes.",
    itineraryDays: [
      { day: 1, title: "Fes → Ifrane → Cedar Forest → Midelt → Ziz Valley", desc: "Leave Fes and cross the Middle Atlas through Ifrane and the cedar-forest landscapes. Continue toward Midelt and the Ziz Valley, with the road itself providing the changing scenery from northern Morocco to the pre-Sahara.", stops: ["Fes", "Ifrane", "Cedar Forest", "Midelt", "Ziz Valley"] },
      { day: 2, title: "Ziz Valley → Erfoud → Merzouga → Erg Chebbi", desc: "Continue toward Erfoud and Merzouga. Arrive at the dunes in time for the planned desert experience, such as a sunset camel transfer when included, followed by the night at the confirmed camp.", stops: ["Ziz Valley", "Erfoud", "Merzouga", "Erg Chebbi", "Sunset camel experience", "Desert camp"] },
      { day: 3, title: "Merzouga → Middle Atlas → Fes", desc: "After the desert morning, begin the long return drive north toward Fes, retracing the changing landscapes of the Middle Atlas. Stops are kept realistic so the return remains practical.", stops: ["Merzouga", "Ziz Valley", "Middle Atlas", "Fes"] },
    ],
    included: ["Private air-conditioned vehicle", "Professional English-speaking driver", "Fuel", "Accommodation according to selected package", "Desert camp according to confirmed itinerary", "Camel experience when specified", "Hotel pick-up & drop-off"],
    excluded: ["International flights", "Lunches", "Drinks", "Entrance fees", "Optional activities", "Tips & gratuities", "Personal expenses"],
    gallery: [
      { src: "/images/dest/fes.webp", caption: "Fes, the starting point for the southern journey" },
      { src: "/images/dest/ifrane.webp", caption: "Ifrane in the Middle Atlas" },
      { src: "/images/dest/merzouga.webp", caption: "Merzouga at the edge of Erg Chebbi" },
    ],
    faq: [
      { question: "Is this route possible in three days?", answer: "Yes, but it is a compact overland itinerary with substantial driving. If you want a slower Sahara experience, ask for a longer version." },
      { question: "Is camel trekking included?", answer: "The desert experience can include a camel transfer when that option is selected and confirmed. We do not assume optional activities before booking." },
      { question: "Where do we sleep?", answer: "Accommodation is selected according to the chosen package and availability, with the desert night confirmed before booking." },
      { question: "Can we finish somewhere other than Fes?", answer: "Yes. As a private journey, the finish point can be discussed when you request your quote." },
      { question: "Are lunches included?", answer: "Not unless explicitly included in the confirmed itinerary." },
      { question: "How is the price confirmed?", answer: "This tour is quote-only because dates, group size and accommodation affect the final arrangement. We confirm the terms before payment." },
    ],
  },
  {
    id: "4-day-fes-marrakech-via-merzouga",
    name: "4-Day Fes to Marrakech via Merzouga",
    duration: "4 Days / 3 Nights",
    category: "Sahara & Grand Tour",
    highlights: ["Fes departure", "Middle Atlas and Ziz Valley", "Erg Chebbi Sahara experience", "Todra Gorge", "Dades Valley", "Aït Ben Haddou", "Marrakech finish"],
    price: "On request",
    pricingTiers: undefined,
    quoteOnly: true,
    image: "/images/dest/ait-ben-haddou.webp",
    aliases: ["4-days-fes-to-marrakech-via-merzouga", "4-day-fes-marrakech-merzouga-tour"],
    description: "A one-way private route linking Fes and Marrakech through the Sahara. Travel from the Middle Atlas to Merzouga and Erg Chebbi, then cross the Todra and Dades landscapes before Aït Ben Haddou and the High Atlas finish in Marrakech.",
    routeIds: ["fes", "ifrane", "merzouga", "erg-chebbi", "todra-gorge", "dades-valley", "ait-ben-haddou", "marrakech"],
    routeCaption: "Fes → Middle Atlas → Merzouga & Erg Chebbi → Todra Gorge → Dades Valley → Aït Ben Haddou → High Atlas → Marrakech.",
    itineraryDays: [
      { day: 1, title: "Fes → Ifrane → Midelt → Ziz Valley → Merzouga", desc: "Leave Fes and cross the Middle Atlas through Ifrane and the cedar forests, continuing via Midelt and the Ziz Valley to Merzouga. The desert dunes arrive at the end of the road south, where the evening desert experience begins.", stops: ["Fes", "Ifrane", "Cedar Forest", "Midelt", "Ziz Valley", "Merzouga"] },
      { day: 2, title: "Merzouga → Erg Chebbi → Todra Gorge → Dades Valley", desc: "Enjoy the desert in the morning before travelling west through the pre-Sahara. Continue to Todra Gorge and the Dades Valley for the overnight stay, keeping the route focused on the major landscapes rather than excessive detours.", stops: ["Merzouga", "Erg Chebbi", "Todra Gorge", "Dades Valley"] },
      { day: 3, title: "Dades Valley → Ouarzazate → Aït Ben Haddou", desc: "Follow the southern road through Ouarzazate and continue to Aït Ben Haddou. Take time to explore the historic ksar before the overnight stay in the surrounding area.", stops: ["Dades Valley", "Ouarzazate", "Aït Ben Haddou (UNESCO)"] },
      { day: 4, title: "Aït Ben Haddou → High Atlas → Marrakech", desc: "Cross the High Atlas on the final leg to Marrakech. The finish is in the Red City, with the arrival point and timing confirmed around your plans.", stops: ["Aït Ben Haddou", "High Atlas", "Marrakech"] },
    ],
    included: ["Private air-conditioned vehicle", "Professional English-speaking driver", "Fuel", "Accommodation according to selected package", "Desert camp according to confirmed itinerary", "Camel experience when specified", "Hotel pick-up and drop-off"],
    excluded: ["International flights", "Lunches", "Drinks", "Entrance fees", "Optional activities", "Tips & gratuities", "Personal expenses"],
    gallery: [
      { src: "/images/dest/fes.webp", caption: "Fes medina" },
      { src: "/images/dest/merzouga.webp", caption: "Merzouga and the Sahara" },
      { src: "/images/dest/todra-gorge.webp", caption: "Todra Gorge" },
      { src: "/images/dest/ait-ben-haddou.webp", caption: "Aït Ben Haddou" },
    ],
    faq: [
      { question: "Does this tour finish in Marrakech?", answer: "Yes. It is designed as a one-way private route from Fes to Marrakech through Merzouga and southern Morocco." },
      { question: "Is Erg Chebbi included?", answer: "Yes. The route reaches Merzouga and the Erg Chebbi dune area. The exact camp and camel arrangements are confirmed before booking." },
      { question: "Why is the route four days?", answer: "Four days gives the one-way journey enough room for the Middle Atlas, Sahara and southern valleys without trying to force the entire route into a single rushed transfer." },
      { question: "Can we add nights?", answer: "Yes. Additional nights or a slower itinerary can be discussed as part of the private trip plan." },
      { question: "Are entrance fees included?", answer: "Monument and museum entrance fees are excluded unless specifically stated in the confirmed itinerary." },
      { question: "How is the price confirmed?", answer: "This is a quote-only itinerary. We confirm your dates, party size and accommodation choices before confirming the final price." },
    ],
  },
  // ${marker}
`;

  const tourStart = content.indexOf('export const tours: Tour[] = [');
  const tourEnd = content.indexOf('\n];', tourStart);
  if (tourStart < 0 || tourEnd < 0) throw new Error('[tour-catalog] tours array not found');
  content = content.slice(0, tourEnd) + newTours + content.slice(tourEnd);

  // Add quoteOnly to the canonical Tour type and allow tours without pricing tiers.
  content = content.replace('  pricingTiers: PricingTier;\n  image: string;', '  pricingTiers?: PricingTier;\n  quoteOnly?: boolean;\n  image: string;');

  // Keep the legacy alias map aligned with the aliases stored on each tour.
  const aliasMarker = 'export const tourSlugAliases: Record<string, string> = {';
  const aliasStart = content.indexOf(aliasMarker);
  const aliasEnd = content.indexOf('\n};', aliasStart);
  if (aliasStart < 0 || aliasEnd < 0) throw new Error('[tour-catalog] alias map not found');
  const aliasInsert = `\n  '2-days-marrakech-zagora-desert-tour': '2-day-zagora-desert-marrakech',\n  '2-day-zagora-desert-tour': '2-day-zagora-desert-marrakech',\n  '4-days-marrakech-to-merzouga-desert-tour': '4-day-marrakech-merzouga-sahara',\n  '4-day-marrakech-merzouga-desert-tour': '4-day-marrakech-merzouga-sahara',\n  '5-days-great-south-morocco-tour': '5-day-great-south-morocco',\n  '5-day-great-south-morocco-tour': '5-day-great-south-morocco',\n  '3-days-fes-to-merzouga-sahara-tour': '3-day-fes-merzouga-sahara',\n  '3-day-fes-merzouga-desert-tour': '3-day-fes-merzouga-sahara',\n  '4-days-fes-to-marrakech-via-merzouga': '4-day-fes-marrakech-via-merzouga',\n  '4-day-fes-marrakech-merzouga-tour': '4-day-fes-marrakech-via-merzouga',`;
  content = content.slice(0, aliasEnd) + aliasInsert + content.slice(aliasEnd);
  fs.writeFileSync(contentPath, content, 'utf8');
}

// Extend the departure-city hierarchy so the city hubs and their duration pages
// can discover the newly published tours from one canonical source.
const hierarchyPath = path.join(root, 'src/data/tour-hierarchy.ts');
let hierarchy = fs.readFileSync(hierarchyPath, 'utf8');
if (!hierarchy.includes(marker)) {
  hierarchy = hierarchy.replace(
    "  '8-day-marrakech-essaouira-agadir-sahara': 'marrakech',",
    "  '8-day-marrakech-essaouira-agadir-sahara': 'marrakech',\n  '2-day-zagora-desert-marrakech': 'marrakech',\n  '4-day-marrakech-merzouga-sahara': 'marrakech',\n  '5-day-great-south-morocco': 'marrakech',\n  '3-day-fes-merzouga-sahara': 'fes',\n  '4-day-fes-marrakech-via-merzouga': 'fes',"
  );
  hierarchy = hierarchy.replace(
    "  // ─────────────────────────────────────────────────────────────────────────────\n  // Duration hubs available per departure city",
    `  // ${marker}\n\n  // ─────────────────────────────────────────────────────────────────────────────\n  // Duration hubs available per departure city`
  );
  fs.writeFileSync(hierarchyPath, hierarchy, 'utf8');
}

// Add explicit SEO metadata for the new canonical tour URLs.
const metaPath = path.join(root, 'src/components/seo/route-metadata.ts');
let meta = fs.readFileSync(metaPath, 'utf8');
if (!meta.includes(marker)) {
  const anchor = "  'family-morocco-adventure': { title: 'Family Morocco Adventure — 9 Day Private Tour', description: 'A private family Morocco journey combining cultural discoveries, desert experiences and memorable activities.', ogImage: '/images/tours/family-morocco-adventure.jpg' },";
  const addition = `${anchor}\n  '2-day-zagora-desert-marrakech': { title: '2-Day Zagora Desert Tour from Marrakech | Morocco', description: 'A private two-day route from Marrakech through Aït Ben Haddou, Ouarzazate and the Draa Valley to Zagora.', ogImage: '/images/dest/zagora.webp' },\n  '4-day-marrakech-merzouga-sahara': { title: '4-Day Marrakech to Merzouga Sahara Tour | Morocco', description: 'Take four days from Marrakech to Merzouga via Aït Ben Haddou, Dades and Todra, with more time around Erg Chebbi.', ogImage: '/images/dest/merzouga.webp' },\n  '5-day-great-south-morocco': { title: '5-Day Great South Morocco Tour | Private Desert Journey', description: 'Explore Aït Ben Haddou, Dades, Todra, Merzouga and the Draa Valley on a private five-day southern Morocco route.', ogImage: '/images/dest/draa-valley.webp' },\n  '3-day-fes-merzouga-sahara': { title: '3-Day Fes to Merzouga Sahara Desert Tour | Morocco', description: 'Travel privately from Fes through the Middle Atlas and Ziz Valley to Merzouga and Erg Chebbi.', ogImage: '/images/dest/merzouga.webp' },\n  '4-day-fes-marrakech-via-merzouga': { title: '4-Day Fes to Marrakech via Merzouga | Morocco Tour', description: 'A private one-way journey from Fes to Marrakech via Merzouga, Todra Gorge, Dades Valley and Aït Ben Haddou.', ogImage: '/images/dest/ait-ben-haddou.webp' },`;
  meta = meta.replace(anchor, addition);
  const aliasAnchor = "  'morocco-desert-tour':'7-day-imperial-cities-sahara-escape',";
  meta = meta.replace(aliasAnchor, `${aliasAnchor}\n  '2-days-marrakech-zagora-desert-tour':'2-day-zagora-desert-marrakech',\n  '2-day-zagora-desert-tour':'2-day-zagora-desert-marrakech',\n  '4-days-marrakech-to-merzouga-desert-tour':'4-day-marrakech-merzouga-sahara',\n  '4-day-marrakech-merzouga-desert-tour':'4-day-marrakech-merzouga-sahara',\n  '5-days-great-south-morocco-tour':'5-day-great-south-morocco',\n  '5-day-great-south-morocco-tour':'5-day-great-south-morocco',\n  '3-days-fes-to-merzouga-sahara-tour':'3-day-fes-merzouga-sahara',\n  '3-day-fes-merzouga-desert-tour':'3-day-fes-merzouga-sahara',\n  '4-days-fes-to-marrakech-via-merzouga':'4-day-fes-marrakech-via-merzouga',\n  '4-day-fes-marrakech-merzouga-tour':'4-day-fes-marrakech-via-merzouga',`);
  meta = meta.replace('export function getRouteMeta(rest:string):RouteMeta {', `// ${marker}\n\nexport function getRouteMeta(rest:string):RouteMeta {`);
  fs.writeFileSync(metaPath, meta, 'utf8');
}

// Make the prerenderer derive tour routes from the canonical data rather than a
// hand-maintained six-item list. This prevents future published tours from
// becoming client-only pages or silently missing the sitemap.
const prerenderPath = path.join(root, 'scripts/prerender.ts');
let prerender = fs.readFileSync(prerenderPath, 'utf8');
if (!prerender.includes(marker)) {
  const old = /const TOUR_ROUTES = \[[\s\S]*?\n\];/;
  const replacement = `const TOUR_ROUTES = getLocalizedTours('en').map((tour) => tour.id);\n\n// ${marker}`;
  if (!old.test(prerender)) throw new Error('[tour-catalog] TOUR_ROUTES declaration not found');
  prerender = prerender.replace(old, replacement);
  fs.writeFileSync(prerenderPath, prerender, 'utf8');
}

// Quote-only rendering: never display a fabricated €0/NaN value or offer a
// PayPal amount for a tour whose price has not been confirmed.
const detailPath = path.join(root, 'src/pages/tour-detail.tsx');
let detail = fs.readFileSync(detailPath, 'utf8');
if (!detail.includes(marker)) {
  detail = detail.replace(
    '  const tiers = tour.pricingTiers;\n  const pricePerPerson: number = travelers >= 6',
    "  const isQuoteOnly = tour.quoteOnly === true;\n  const tiers = tour.pricingTiers;\n  const pricePerPerson: number = isQuoteOnly ? 0 : travelers >= 6"
  );
  detail = detail.replace('  const isGroupQuote = travelers >= 6;', '  const isGroupQuote = isQuoteOnly || travelers >= 6;');
  detail = detail.replace(
    "              <h3 className=\"font-serif text-2xl text-foreground mb-4\">{t('book_now')}</h3>",
    "              <h3 className=\"font-serif text-2xl text-foreground mb-4\">{isQuoteOnly ? 'Request a quote' : t('book_now')}</h3>"
  );
  detail = detail.replace(
    "                {isGroupQuote ? (\n                  <span className=\"font-serif text-2xl text-foreground font-bold\">{t('book_group_quote')}</span>",
    "                {isQuoteOnly ? (\n                  <span className=\"font-serif text-2xl text-foreground font-bold\">Quote on request</span>\n                ) : isGroupQuote ? (\n                  <span className=\"font-serif text-2xl text-foreground font-bold\">{t('book_group_quote')}</span>"
  );
  detail = detail.replace('              {tiers && !isGroupQuote && (', '              {tiers && !isGroupQuote && !isQuoteOnly && (');
  detail = detail.replace(
    "                  {isGroupQuote\n                    ? <span className=\"text-sm font-bold text-primary\">{t('group_6_plus')}</span>",
    "                  {isQuoteOnly\n                    ? <span className=\"text-sm font-bold text-primary\">Quote on request</span>\n                    : isGroupQuote\n                    ? <span className=\"text-sm font-bold text-primary\">{t('group_6_plus')}</span>"
  );
  detail = detail.replace(
    "                {!isGroupQuote ? (",
    "                {!isGroupQuote ? ("
  );
  detail = detail.replace(
    "                ) : (\n                  <a\n                    href={`${contactInfo.whatsapp}?text=${encodeURIComponent(`I'm interested in a group booking for ${tour.name}. Please send me a custom quote.`)}`}",
    "                ) : (\n                  <a\n                    href={`${contactInfo.whatsapp}?text=${encodeURIComponent(isQuoteOnly ? `I'm interested in ${tour.name}. Please send me a custom quote.` : `I'm interested in a group booking for ${tour.name}. Please send me a custom quote.`)}`}`
  );
  detail = detail.replace('              <ul className="text-sm text-muted-foreground space-y-3 pt-6 border-t border-border">', `              {isQuoteOnly && (\n                <p className="mb-6 text-xs leading-relaxed text-muted-foreground">We confirm the itinerary, accommodation category, group size and final price with you before payment.</p>\n              )}\n\n              <ul className="text-sm text-muted-foreground space-y-3 pt-6 border-t border-border">`);
  detail = detail.replace('  return (\n    <Layout>', `  // ${marker}\n\n  return (\n    <Layout>`);
  fs.writeFileSync(detailPath, detail, 'utf8');
}

const priceTagPath = path.join(root, 'src/components/promo/PriceTag.tsx');
let priceTag = fs.readFileSync(priceTagPath, 'utf8');
if (!priceTag.includes(marker)) {
  priceTag = priceTag.replace(
    "  const orig = typeof price === 'string' ? parseInt(price.replace(/[^\\d.]/g, ''), 10) : price;\n  const disc = discountedPrice(orig);",
    "  const isQuoteOnly = typeof price === 'string' && !/[\\d]/.test(price);\n  const orig = typeof price === 'string' ? parseInt(price.replace(/[^\\d.]/g, ''), 10) : price;\n  const disc = discountedPrice(orig);\n\n  if (isQuoteOnly) {\n    return <span className={`font-serif font-bold ${tone === 'onDark' ? 'text-white' : 'text-foreground'} ${NUM[size]} ${className}`}>{price}</span>;\n  }"
  );
  priceTag = priceTag.replace('  if (!active) {', `  // ${marker}\n\n  if (!active) {`);
  fs.writeFileSync(priceTagPath, priceTag, 'utf8');
}

console.log('[tour-catalog] Added five quote-only canonical tours, hierarchy, metadata, dynamic prerendering and safe quote rendering.');
