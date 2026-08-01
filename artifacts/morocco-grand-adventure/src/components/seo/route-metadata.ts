/**
 * Per-route SEO metadata configuration.
 *
 * Each entry maps an app path (without the language prefix) to a unique
 * title template and meta description.  The LocalizedHead component reads
 * this map at runtime to emit unique, page-specific <title> and meta
 * description tags for every route — essential for Google indexing.
 *
 * Titles follow the pattern:  "<Page-specific title> — Morocco Grand Adventure"
 * Descriptions are kept under 160 characters for optimal SERP display.
 */

export type RouteMeta = {
  /** Page-specific title (brand appended automatically). */
  title: string;
  /** Meta description (≤ 160 chars). */
  description: string;
  /** OG/Twitter image override (absolute or root-relative). */
  ogImage?: string;
};

/** Homepage meta is used as the fallback for unknown routes. */
const HOME_META: RouteMeta = {
  title: "Luxury Desert Tours & Private Morocco Experiences",
  description:
    "Morocco Grand Adventure offers luxury private tours across Morocco — Sahara Desert camel trekking, Marrakech medinas, Chefchaouen blue city, Fes, Atlas Mountains & more. Book with local experts.",
  ogImage: "/images/hero/desert-pano.jpg",
};

/**
 * Map of app-path → RouteMeta.
 * Keys are the "rest" portion of the URL (after the /lang/ prefix),
 * normalised to start with "/" and without trailing slashes.
 */
export const routeMetadata: Record<string, RouteMeta> = {
  "/": HOME_META,

  // ── Listing pages ──────────────────────────────────────────────────────
  "/destinations": {
    title: "Morocco Destinations — Sahara, Imperial Cities, Atlas Mountains",
    description:
      "Explore Morocco's top destinations — Merzouga Sahara dunes, Marrakech medina, Chefchaouen blue city, Fes, Atlas Mountains, Essaouira coast & more. Plan your journey with local experts.",
    ogImage: "/images/dest/merzouga.jpg",
  },
  "/tours": {
    title: "Morocco Tours & Private Itineraries — 3 to 10 Day Adventures",
    description:
      "Browse private Morocco tours — 3-day Sahara desert tours, 5-day imperial cities, 7-day grand Morocco, family adventures, luxury honeymoons. Private guides, luxury camps, camel trekking.",
    ogImage: "/images/tours/7-day-grand-morocco.jpg",
  },
  "/gallery": {
    title: "Morocco Photo & Video Gallery — Sahara, Medinas, Atlas Mountains",
    description:
      "Stunning photos and videos from Morocco — Sahara desert sunsets, Marrakech souks, Chefchaouen blue streets, Atlas Mountains, luxury desert camps. See the journey before you book.",
    ogImage: "/images/hero/medina-pano.jpg",
  },
  "/trip-builder": {
    title: "Custom Morocco Trip Builder — Design Your Bespoke Itinerary",
    description:
      "Build your perfect Morocco trip step by step. Choose destinations, interests, budget and travel dates — our local experts craft a personalised itinerary just for you.",
    ogImage: "/images/personal/luxury-camp-dusk.jpg",
  },
  "/about": {
    title: "About Morocco Grand Adventure — Local Sahara Experts Since 2000",
    description:
      "Born and raised in the Sahara, our team of local guides has been crafting authentic Morocco journeys for 25+ years. Learn our story, philosophy, and commitment to sustainable tourism.",
    ogImage: "/images/personal/guide-guest-tea.jpg",
  },
  "/contact": {
    title: "Contact Morocco Grand Adventure — Plan Your Morocco Journey",
    description:
      "Contact Morocco Grand Adventure via WhatsApp, email, or phone. Our local experts in Merzouga respond within 24 hours to help plan your dream Morocco journey.",
    ogImage: "/images/dest/merzouga.jpg",
  },
};

/**
 * Resolve the RouteMeta for a given app path.
 * Falls back to the homepage meta for unknown routes (including
 * dynamic /tours/:id and /destinations/:id — those are enriched
 * separately by the detail-page StructuredData components).
 */
export function getRouteMeta(rest: string): RouteMeta {
  const normalised = rest === "" || rest === "/" ? "/" : rest.replace(/\/$/, "");
  return routeMetadata[normalised] ?? HOME_META;
}