// ─────────────────────────────────────────────────────────────────────────────
// Per-locale experience translation aggregator (BUILD-TIME TOOLING ONLY).
// -----------------------------------------------------------------------------
// Imported exclusively by Node tooling that needs every locale at once
// (scripts/prerender.ts, audits). The browser NEVER imports this module — the
// runtime registers only the active locale via `loadExperiences()`, keeping
// each locale a separate on-demand chunk.
// ─────────────────────────────────────────────────────────────────────────────
import type { Lang } from '@/i18n/index';
import type { ExperienceOverlay } from './types';
import { registerExperienceOverlay } from './index';

import fr from './generated/fr.json';
import es from './generated/es.json';
import it from './generated/it.json';
import de from './generated/de.json';
import nl from './generated/nl.json';
import pt from './generated/pt.json';
import zh from './generated/zh.json';
import ja from './generated/ja.json';
import ko from './generated/ko.json';
import ar from './generated/ar.json';

export const experienceOverlays: Partial<Record<Lang, Record<string, ExperienceOverlay>>> = {
  fr: fr as Record<string, ExperienceOverlay>,
  es: es as Record<string, ExperienceOverlay>,
  it: it as Record<string, ExperienceOverlay>,
  de: de as Record<string, ExperienceOverlay>,
  nl: nl as Record<string, ExperienceOverlay>,
  pt: pt as Record<string, ExperienceOverlay>,
  zh: zh as Record<string, ExperienceOverlay>,
  ja: ja as Record<string, ExperienceOverlay>,
  ko: ko as Record<string, ExperienceOverlay>,
  ar: ar as Record<string, ExperienceOverlay>,
};

/** Register every experience overlay. Build-time tooling only. */
export function registerAllExperienceOverlays(): void {
  Object.entries(experienceOverlays).forEach(([code, data]) => {
    if (data) registerExperienceOverlay(code as Lang, data);
  });
}
