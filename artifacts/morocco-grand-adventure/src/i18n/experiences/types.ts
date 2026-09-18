// Shape of a per-language experience overlay.
// Keys are experience ids from src/data/tour-experiences.ts. Both fields are
// optional: a missing one falls back to the canonical English text, so a
// partially translated locale still renders correctly.
export type ExperienceOverlay = {
  label?: string;
  blurb?: string;
};
