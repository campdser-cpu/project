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
  faq?: { question?: string; answer?: string }[];
};

export type ContentOverlay = {
  /** Display labels for the (canonical-English) destination category keys. */
  categories?: Record<string, string>;
  /** Experience tags (indexed against the English `experiences` array). */
  experiences?: (string | undefined)[];
  destinations?: Record<string, DestinationOverlay>;
  tours?: Record<string, TourOverlay>;
  /** Global FAQ (indexed against the English `faqData` array). */
  faq?: { question?: string; answer?: string }[];
};
