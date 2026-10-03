// ─────────────────────────────────────────────────────────────────────────────
// Per-language content translation overlays.
// English (src/data/content.ts) is the canonical source; overlays provide
// translations keyed by item id + field. Any missing field falls back to English.
// Arrays are matched by index against the English array.
// ─────────────────────────────────────────────────────────────────────────────

export type DestinationOverlay = {
  name?: string;
  shortDesc?: string;
  description?: string;
  bestTime?: string;
  region?: string;
  highlights?: (string | undefined)[];
};

export type TourOverlay = {
  name?: string;
  duration?: string;
  category?: string;
  description?: string;
  routeCaption?: string;
  highlights?: (string | undefined)[];
  included?: (string | undefined)[];
  excluded?: (string | undefined)[];
  itineraryDays?: { title?: string; desc?: string; stops?: (string | undefined)[] }[];
  gallery?: { caption?: string }[];
  /**
   * Indexed against the English FAQ array. Entries may be null so a locale can
   * translate one answer without having to restate the whole list: the merge
   * reads `faq?.[i]?.question` per index and falls back to English wherever the
   * overlay has nothing. zh, ja, ko and ar use this for the price FAQ.
   */
  faq?: ({ question?: string; answer?: string } | null)[];
  /** Indexed against the English `suitableFor` array (Day Trip products). */
  suitableFor?: (string | undefined)[];
};

/**
 * "Why choose this itinerary" / "Who this tour is best for" — the authored
 * depth copy in src/data/tourDepth.ts. Keyed by the same tour id; `whyChoose`
 * is matched by index against the English array, like every other array here.
 * guideLinks are NOT localized: they are hub slugs, and the guide overlay
 * already translates each hub's title.
 */
export type TourDepthOverlay = {
  whyChoose?: (string | undefined)[];
  bestFor?: string;
};

export type BlogPostOverlay = {
  title?: string;
  excerpt?: string;
  alt?: string;
  canonicalTitle?: string;
  canonicalExcerpt?: string;
  /** Localized long-form article body, matched by index against BLOG_ARTICLE_SECTIONS. */
  sections?: { heading?: string; paragraphs?: (string | undefined)[] }[];
};

/** One itinerary day of a Student Tour product, matched by index. */
export type StudentTourDayOverlay = {
  title?: string;
  chapter?: string;
  body?: (string | undefined)[];
  notes?: (string | undefined)[];
};

/** A Student Tour product (src/data/student-tours.ts), keyed by slug. */
export type StudentTourOverlay = {
  duration?: string;
  title?: string;
  cardSummary?: string;
  heroLead?: string;
  metaTitle?: string;
  metaDescription?: string;
  overview?: { start?: string; end?: string; regions?: string; style?: string; groups?: string };
  whyStudents?: (string | undefined)[];
  itinerary?: StudentTourDayOverlay[];
  experiences?: { title?: string; body?: string }[];
  learning?: { subject?: string; body?: string }[];
  dayInTheJourney?: { label?: string; body?: string }[];
  groupExperience?: (string | undefined)[];
  included?: (string | undefined)[];
  notIncluded?: (string | undefined)[];
  practical?: { title?: string; body?: string }[];
  support?: (string | undefined)[];
  faqs?: { q?: string; a?: string }[];
  keyPlaces?: (string | undefined)[];
  related?: { label?: string }[];
};

export type ContentOverlay = {
  /** Display labels for the (canonical-English) destination category keys. */
  categories?: Record<string, string>;
  /** Experience tags (indexed against the English `experiences` array). */
  experiences?: (string | undefined)[];
  destinations?: Record<string, DestinationOverlay>;
  tours?: Record<string, TourOverlay>;
  /** Authored per-tour depth copy, keyed by tour id. */
  tourDepth?: Record<string, TourDepthOverlay>;
  /** Global FAQ (indexed against the English `faqData` array). */
  faq?: { question?: string; answer?: string }[];
  /** Blog posts keyed by slug. */
  blog?: Record<string, BlogPostOverlay>;
  /** Student Tour products (src/data/student-tours.ts), keyed by slug. */
  studentTours?: Record<string, StudentTourOverlay>;
};
