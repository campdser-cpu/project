import type { Lang } from '@/i18n/index';
import type { ContentOverlay } from './types';

// Per-language content translations. These files are GENERATED (do not hand-edit)
// by `npx tsx scripts/i18n-translate.ts` from the canonical English content in
// src/data/content.ts. The translation step is incremental — only new/changed
// strings are re-translated — so adding a tour or destination later and re-running
// automatically produces all languages. Any missing language/field falls back to
// the English source at runtime (see ./index.ts).
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

export const contentOverlays: Partial<Record<Lang, ContentOverlay>> = {
  fr: fr as ContentOverlay,
  es: es as ContentOverlay,
  it: it as ContentOverlay,
  de: de as ContentOverlay,
  nl: nl as ContentOverlay,
  pt: pt as ContentOverlay,
  zh: zh as ContentOverlay,
  ja: ja as ContentOverlay,
  ko: ko as ContentOverlay,
  ar: ar as ContentOverlay,
};
