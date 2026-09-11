// ─────────────────────────────────────────────────────────────────────────────
// Per-locale guide translation aggregator (BUILD-TIME TOOLING ONLY).
// -----------------------------------------------------------------------------
// Imported exclusively by Node tooling that needs every locale at once
// (scripts/prerender.ts, audits). The browser NEVER imports this module — the
// runtime registers only the active locale via `loadGuides()` in ./index.ts,
// so Vite stays free of this static import graph and every guide locale
// remains a separate, on-demand chunk.
// ─────────────────────────────────────────────────────────────────────────────
import type { Lang } from '@/i18n/index';
import type { GuideOverlay } from './types';
import { registerGuideOverlay } from './index';

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

export const guideOverlays: Partial<Record<Lang, Record<string, GuideOverlay>>> = {
  fr: fr as Record<string, GuideOverlay>,
  es: es as Record<string, GuideOverlay>,
  it: it as Record<string, GuideOverlay>,
  de: de as Record<string, GuideOverlay>,
  nl: nl as Record<string, GuideOverlay>,
  pt: pt as Record<string, GuideOverlay>,
  zh: zh as Record<string, GuideOverlay>,
  ja: ja as Record<string, GuideOverlay>,
  ko: ko as Record<string, GuideOverlay>,
  ar: ar as Record<string, GuideOverlay>,
};

/**
 * Register every guide overlay into the runtime registry.
 * Build-time tooling only (prerender/audits). The browser registers only the
 * active locale at runtime via `loadGuides()` in ./index.ts.
 */
export function registerAllGuideOverlays(): void {
  Object.entries(guideOverlays).forEach(([code, data]) => {
    if (data) registerGuideOverlay(code as Lang, data);
  });
}
