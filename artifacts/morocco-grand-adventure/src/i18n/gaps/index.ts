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
import { chromeGaps } from './chrome';
import type { Lang } from '../index';

export const i18nGaps: Partial<Record<Lang, Record<string, string>>> = {
  fr: { ...chromeGaps.fr, ...fr, ...aboutGaps.fr, ...about2Gaps.fr },
  es: { ...chromeGaps.es, ...es, ...aboutGaps.es, ...about2Gaps.es },
  it: { ...chromeGaps.it, ...it, ...aboutGaps.it, ...about2Gaps.it },
  de: { ...chromeGaps.de, ...de, ...aboutGaps.de, ...about2Gaps.de },
  nl: { ...chromeGaps.nl, ...nl, ...aboutGaps.nl, ...about2Gaps.nl },
  pt: { ...chromeGaps.pt, ...pt, ...aboutGaps.pt, ...about2Gaps.pt },
  zh: { ...chromeGaps.zh, ...zh, ...aboutGaps.zh, ...about2Gaps.zh },
  ja: { ...chromeGaps.ja, ...ja, ...aboutGaps.ja, ...about2Gaps.ja },
  ko: { ...chromeGaps.ko, ...ko, ...aboutGaps.ko, ...about2Gaps.ko },
  ar: { ...chromeGaps.ar, ...ar, ...aboutGaps.ar, ...about2Gaps.ar },
};
