// Canonical English TravelerDecisionGuide content.
// GENERATED MECHANICALLY from src/components/TravelerDecisionGuide.tsx (Phase 6D).
// Do not hand-edit strings here: re-run the extractor if the source changes.
// Per-locale overlays (fr, es, ...) will live alongside this canonical source.

export type TravelerDecisionSegment =
  | { type: 'text'; text: string }
  | { type: 'link'; text: string; to: string };

export interface TravelerDecisionItem {
  q: string;
  a: TravelerDecisionSegment[];
}

export interface TravelerDecisionContent {
  eyebrow: string;
  title: string;
  intro: string;
  items: TravelerDecisionItem[];
  links: string;
  linksList: ReadonlyArray<readonly [string, string]>;
}

export const travelerDecisionGuideEn: TravelerDecisionContent = {
  eyebrow: "Before You Book",
  title: "Questions a first-time visitor usually has",
  intro: "If Morocco is new to you, these are the practical questions we would want answered before spending money on a trip. We keep the answers honest and connect each answer to the page where you can go deeper.",
  items: [
    {
      q: "How many days do I really need for Morocco?",
      a: [
        { type: 'text', text: "For a first visit, there is a big difference between seeing highlights and trying to see everything. A shorter trip can work well if you focus on one region; a longer trip gives you time for cities, mountains and the Sahara without turning every day into a transfer. If you already know your dates, use our " },
        { type: 'link', text: "trip builder", to: "/trip-builder" },
        { type: 'text', text: " and tell us what matters most." },
      ],
    },
    {
      q: "Is Marrakech to Merzouga a quick transfer?",
      a: [
        { type: 'text', text: "No. It is a substantial journey, and treating it as a simple point-to-point transfer can make a holiday feel rushed. The better question is how to use the route: the Atlas, Aït Ben Haddou, the Dades area and Todra can turn the drive into part of the experience. Our " },
        { type: 'link', text: "Marrakech–Merzouga guide", to: "/blog/marrakech-to-merzouga-roadtrip" },
        { type: 'text', text: " explains the practical reality." },
      ],
    },
    {
      q: "What is the difference between Merzouga and Erg Chebbi?",
      a: [
        { type: 'text', text: "Merzouga is the settlement and tourism base; Erg Chebbi is the dune field around it. In practical terms, travelers usually stay or arrive around Merzouga and then enter the dunes for desert activities. Start with the " },
        { type: 'link', text: "Merzouga Guide", to: "/merzouga-guide" },
        { type: 'text', text: " and then explore our " },
        { type: 'link', text: "camel trekking", to: "/camel-trekking" },
        { type: 'text', text: " experience." },
      ],
    },
    {
      q: "Should I choose a ready-made tour or build my own?",
      a: [
        { type: 'text', text: "Choose a ready-made tour when the route and pace already suit you. Choose " },
        { type: 'link', text: "Design Your Tour", to: "/trip-builder" },
        { type: 'text', text: " when your dates, interests or starting point need a different combination. We should never pretend a generic itinerary is personal when it is not. The builder is for multi-day journeys; " },
        { type: 'link', text: "Build Your Day Trip", to: "/build-your-day-trip" },
        { type: 'text', text: " is specifically for one-day requests." },
      ],
    },
    {
      q: "Is the Sahara comfortable for families?",
      a: [
        { type: 'text', text: "It can be, but the right route matters more than a generic “family friendly” label. Parents should look at driving days, walking, activity intensity, meal arrangements and where the overnight stay happens. Start with our " },
        { type: 'link', text: "Morocco tours", to: "/tours" },
        { type: 'text', text: " and ask us to clarify the route before booking." },
      ],
    },
    {
      q: "What should I expect from a night in the desert?",
      a: [
        { type: 'text', text: "A desert night is not simply a hotel moved into the dunes. Expect a change of environment: open space, a different temperature after sunset, limited surroundings and a much slower evening. Read the " },
        { type: 'link', text: "Luxury Desert Camp", to: "/luxury-camp" },
        { type: 'text', text: " page so you know what the experience is intended to be, and ask us about any facility that matters to you before you book." },
      ],
    },
    {
      q: "When is a good time to visit the Sahara?",
      a: [
        { type: 'text', text: "There is no single perfect month for every traveler, but spring and autumn are generally favorable seasons for the southern Sahara. The right choice also depends on whether you prefer warmer days, cooler nights or a particular travel schedule. We recommend comparing the season with your own comfort and itinerary rather than relying on a single “best month”." },
      ],
    },
    {
      q: "Do I need cash in Morocco if I have a bank card?",
      a: [
        { type: 'text', text: "Bring a card, but do not plan your entire trip around card payments. ATMs are widespread and Visa/Mastercard are accepted by many hotels and some restaurants, shops and fuel stations, while some situations still require Moroccan dirhams. Keep a practical cash reserve and confirm important payment details before leaving the city." },
      ],
    },
  ],
  links: "Useful next steps",
  linksList: [
    ["/tours", "Compare Morocco tours"],
    ["/destinations", "Explore destinations"],
    ["/day-trips", "Understand day trips"],
    ["/contact", "Ask a real person"],
  ],
};
