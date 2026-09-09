// ─────────────────────────────────────────────────────────────────────────────
// Tour Depth — authored per-tour depth blocks and contextual guide links.
//
// Consumed by BOTH the runtime SPA (src/pages/tour-detail.tsx) and the
// prerenderer (scripts/prerender.ts), so crawlable HTML matches client output.
//
// • Every entry is grounded in the tour's own published facts in
//   src/data/content.ts (routeIds, itineraryDays, inclusions, duration).
//   Nothing here invents hotels, prices, group sizes or guarantees.
// • guideLinks reference hub slugs from src/data/seoHub.ts (unique across all
//   hub arrays); renderers resolve each slug to path + title via allHubs.
// ─────────────────────────────────────────────────────────────────────────────

export type TourDepth = {
  /** Why choose this itinerary — bullets grounded in the tour's own facts. */
  whyChoose: string[];
  /** Who this tour is best for — one honest sentence or two. */
  bestFor: string;
  /** Hub slugs for contextual "plan with our guides" links. */
  guideLinks: string[];
};

const MARRAKECH_CORE = ['marrakech-to-merzouga', 'camel-trekking', 'luxury-desert-camps', 'how-many-days', 'best-time-to-visit', 'what-to-pack', 'marrakech-vs-fes'];
const FES_CORE = ['fes-to-merzouga', 'camel-trekking', 'luxury-desert-camps', 'how-many-days', 'best-time-to-visit', 'what-to-pack', 'marrakech-vs-fes'];

export const TOUR_DEPTH: Record<string, TourDepth> = {
  '3-day-sahara-marrakech': {
    whyChoose: [
      'The shortest format we consider genuinely practical for the Marrakech–Merzouga overland route — honest about being a full schedule.',
      'Hits the corridor\'s headline stops: the High Atlas crossing, Aït Ben Haddou (UNESCO), the Dades Valley and Todra Gorge.',
      'A private journey throughout — your own vehicle and driver-guide, with the desert night built around a sunset camel trek into Erg Chebbi.',
    ],
    bestFor: 'First-time Sahara visitors from Marrakech who want the classic southern route and one night between the dunes, and who accept two full driving days for it. If you can spare a fourth day, the 4-day version buys you a real Merzouga desert day.',
    guideLinks: MARRAKECH_CORE,
  },
  '4-day-marrakech-merzouga-sahara': {
    whyChoose: [
      'The comfortable version of the Marrakech–Merzouga route: the return leg stops being a marathon.',
      'Adds a proper half-day around Merzouga itself — the desert is a place, not just an overnight stop.',
      'Private vehicle and driver-guide throughout, with stops shaped around your party.',
    ],
    bestFor: 'Travellers who want the southern route without rushing: couples and families who would rather enjoy Aït Ben Haddou, the gorges and a full Merzouga day than endure back-to-back long drives.',
    guideLinks: MARRAKECH_CORE,
  },
  '2-day-zagora-desert-marrakech': {
    whyChoose: [
      'The compact southern desert option: High Atlas, Aït Ben Haddou, Ouarzazate and the Draa Valley in two days.',
      'A different desert from Merzouga — Zagora and the Draa Valley, quieter and closer.',
      'Private vehicle and driver-guide throughout.',
    ],
    bestFor: 'Travellers with exactly two days who want a genuine desert night without the longer Merzouga drive. If the tall Erg Chebbi dunes are your priority, choose a Merzouga itinerary instead.',
    guideLinks: ['marrakech-to-merzouga', 'desert-camps', 'camel-trekking', 'best-time-to-visit', 'what-to-pack', 'how-many-days'],
  },
  '3-day-sahara-fes': {
    whyChoose: [
      'The shorter drive to the dunes: Fes → Middle Atlas → Ziz Valley → Merzouga, timed for the sunset camel trek.',
      'Scenic stops through Ifrane, the cedar forests and the Ziz palm oases — real stops, not drive-bys.',
      'Private journey with your own driver-guide.',
    ],
    bestFor: 'Northbound travellers based in Fes who want the Sahara without the longer Marrakech road. Pairs naturally with a southern continuation — ask about the one-way formats.',
    guideLinks: FES_CORE,
  },
  // __TOUR_DEPTH_2__
  '3-day-fes-merzouga-sahara': {
    whyChoose: [
      'A focused Fes–Merzouga–Fes loop with the Middle Atlas and Ziz Valley crossings built in.',
      'Desert night in the Erg Chebbi dunes with sunset camel trek and camp.',
      'Private vehicle and driver-guide throughout.',
    ],
    bestFor: 'Travellers starting and finishing in Fes who want the dunes plus the Atlas landscapes between — a compact loop that avoids the longer southern road.',
    guideLinks: FES_CORE,
  },
  '4-day-fes-marrakech-via-merzouga': {
    whyChoose: [
      'The best-shaped Sahara itinerary in Morocco: a one-way crossing that never repeats a road.',
      'Fes → Middle Atlas → Merzouga & Erg Chebbi → Todra Gorge → Dades Valley → Aït Ben Haddou → Marrakech.',
      'Private vehicle and driver-guide; the desert, the gorges and the UNESCO ksar in one journey.',
    ],
    bestFor: 'Anyone travelling between Morocco\'s two great tourist cities who wants the Sahara as the bridge. Especially strong for visitors arriving in the north and finishing in Marrakech.',
    guideLinks: FES_CORE,
  },
  '5-day-great-south-morocco': {
    whyChoose: [
      'The southern Morocco grand tour: Marrakech, the Atlas, Aït Ben Haddou, the valleys and gorges, and the Sahara.',
      'Five days give every major stop real time instead of photo stops.',
      'Private vehicle and driver-guide throughout.',
    ],
    bestFor: 'Travellers who want the deep south — kasbahs, gorges, oases and dunes — at a pace that does each landscape justice.',
    guideLinks: ['marrakech-to-merzouga', 'camel-trekking', 'things-to-do', 'how-many-days', 'best-time-to-visit', 'what-to-pack'],
  },
  '7-day-imperial-cities-sahara-escape': {
    whyChoose: [
      'Combines the imperial cities with a proper Sahara leg — Merzouga gets a full desert day, not an overnight dash.',
      'One coherent private journey covering Morocco\'s cultural north and desert south.',
      'Private vehicle and driver-guide throughout.',
    ],
    bestFor: 'First-time visitors to Morocco with a week to spend who want the medinas and the dunes in a single, well-paced route.',
    guideLinks: ['how-many-days', 'camel-trekking', 'luxury-desert-camps', 'things-to-do', 'best-time-to-visit', 'what-to-pack'],
  },
  '5-day-imperial-cities': {
    whyChoose: [
      'The imperial cities route — Rabat, Meknes, Fes and Marrakech — as one private journey.',
      'Five days allow unhurried medina time with expert local guidance.',
      'Private vehicle and driver-guide throughout.',
    ],
    bestFor: 'Culture-first travellers. Adding the Sahara? Ask us about the 7-day Imperial Cities & Sahara Escape, which extends this route to the dunes.',
    guideLinks: ['how-many-days', 'camel-trekking', 'best-time-to-visit', 'what-to-pack'],
  },
  'honeymoon-morocco': {
    whyChoose: [
      'A private couples\' journey shaped around romantic stays — riads, luxury desert camps and coastal finishes.',
      'The Sahara night in a luxury camp is the centrepiece, not an add-on.',
      'Entirely private: your vehicle, your driver, your pace.',
    ],
    bestFor: 'Couples and honeymooners who want intimacy and comfort — private camps, quiet riads and the desert night done properly.',
    guideLinks: ['luxury-desert-camps', 'camel-trekking', 'things-to-do', 'how-many-days', 'best-time-to-visit', 'what-to-pack'],
  },
  'family-morocco-adventure': {
    whyChoose: [
      'Built for families: manageable driving days, varied activities and family-friendly stays.',
      'Includes the desert night with the camel trek that works for almost every age.',
      'Private vehicle and driver-guide throughout.',
    ],
    bestFor: 'Families with children — the itinerary paces the long distances honestly and keeps the activity mix varied enough for different ages.',
    guideLinks: ['how-many-days', 'camel-trekking', 'things-to-do', 'best-time-to-visit', 'what-to-pack'],
  },
  '8-day-marrakech-essaouira-agadir-sahara': {
    whyChoose: [
      'The wide-sweeping private journey: Marrakech, the Atlantic coast (Essaouira, Agadir) and the Sahara in one route.',
      'Eight days keep every leg comfortable, including the desert crossing.',
      'Private vehicle and driver-guide throughout.',
    ],
    bestFor: 'Travellers with a full week-plus who want coast and desert without choosing between them.',
    guideLinks: ['how-many-days', 'camel-trekking', 'luxury-desert-camps', 'things-to-do', 'best-time-to-visit', 'what-to-pack'],
  },
};

/** Fallback guide links for tours without an authored entry. */
export const DEFAULT_GUIDE_LINKS = ['how-many-days', 'camel-trekking', 'best-time-to-visit', 'what-to-pack'];

export function tourDepthFor(id: string): TourDepth {
  return (
    TOUR_DEPTH[id] ?? {
      whyChoose: [],
      bestFor: '',
      guideLinks: DEFAULT_GUIDE_LINKS,
    }
  );
}
