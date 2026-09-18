// ─────────────────────────────────────────────────────────────────────────────
// Guide overlays — native localized content for the Merzouga SEO-hub guides.
//
// Canonical English copy lives in src/data/seoHub.ts. These overlays provide
// genuinely native (hand-authored, not machine-copied) translations keyed by
// guide slug + field. Any missing field falls back to English at merge time,
// so a partial overlay can never blank a page — and all sixteen Merzouga guide
// topics are now authored for all ten non-English locales.
// Arrays merge by index against the English arrays (same convention as the
// tour/destination content overlays in src/i18n/content).
// ─────────────────────────────────────────────────────────────────────────────

export type GuideSectionOverlay = {
  heading?: string;
  paragraphs?: (string | undefined)[];
  bullets?: (string | undefined)[];
};

export type GuideFaqOverlay = {
  question?: string;
  answer?: string;
};

export type GuideChromeOverlay = {
  /** Native label for the crumb + destination-guide block, if authored. */
  crumb?: string;
  /** Native alt text for inline figures, keyed by catalog imageId. */
  imageAlts?: Record<string, string>;
};

export type GuideOverlay = {
  title?: string;
  pageTitle?: string;
  description?: string;
  heroAlt?: string;
  intro?: string;
  sections?: GuideSectionOverlay[];
  faqs?: GuideFaqOverlay[];
  chrome?: GuideChromeOverlay;
};

// There was a LOCALIZED_GUIDE_SLUGS constant here naming the four guides that
// had overlays. Nothing consumed it, and every topic is now authored in every
// locale, so it would only have recorded a fact that is no longer true. Ask
// guideOverlayExists() in ./index.ts if you need to know whether a particular
// slug has an overlay for a locale.
