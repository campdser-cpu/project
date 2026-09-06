// Aggregates per-language gap completions used by t() and prerender/audit tooling.
import fr from './fr';
import es from './es';
import it from './it';
import de from './de';
import nl from './nl';
import pt from './pt';
import zh from './zh';
import ja from './ja';
import ko from './ko';
import ar from './ar';
import { aboutGaps } from './about';
import { about2Gaps } from './about2';
import type { Lang } from '../index';

export const i18nGaps: Partial<Record<Lang, Record<string, string>>> = {
  fr: { ...fr, ...aboutGaps.fr, ...about2Gaps.fr },
  es: { ...es, ...aboutGaps.es, ...about2Gaps.es },
  it: { ...it, ...aboutGaps.it, ...about2Gaps.it },
  de: { ...de, ...aboutGaps.de, ...about2Gaps.de },
  nl: { ...nl, ...aboutGaps.nl, ...about2Gaps.nl },
  pt: { ...pt, ...aboutGaps.pt, ...about2Gaps.pt },
  zh: { ...zh, ...aboutGaps.zh, ...about2Gaps.zh },
  ja: { ...ja, ...aboutGaps.ja, ...about2Gaps.ja },
  ko: { ...ko, ...aboutGaps.ko, ...about2Gaps.ko },
  ar: { ...ar, ...aboutGaps.ar, ...about2Gaps.ar },
};
