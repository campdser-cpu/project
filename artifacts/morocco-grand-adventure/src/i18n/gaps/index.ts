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
import { guideGaps } from './guides';
import type { Lang } from '../index';

export const i18nGaps: Partial<Record<Lang, Record<string, string>>> = {
  fr: { ...guideGaps.fr, ...chromeGaps.fr, ...fr, ...aboutGaps.fr, ...about2Gaps.fr },
  es: { ...guideGaps.es, ...chromeGaps.es, ...es, ...aboutGaps.es, ...about2Gaps.es },
  it: { ...guideGaps.it, ...chromeGaps.it, ...it, ...aboutGaps.it, ...about2Gaps.it },
  de: { ...guideGaps.de, ...chromeGaps.de, ...de, ...aboutGaps.de, ...about2Gaps.de },
  nl: { ...guideGaps.nl, ...chromeGaps.nl, ...nl, ...aboutGaps.nl, ...about2Gaps.nl },
  pt: { ...guideGaps.pt, ...chromeGaps.pt, ...pt, ...aboutGaps.pt, ...about2Gaps.pt },
  zh: { ...guideGaps.zh, ...chromeGaps.zh, ...zh, ...aboutGaps.zh, ...about2Gaps.zh },
  ja: { ...guideGaps.ja, ...chromeGaps.ja, ...ja, ...aboutGaps.ja, ...about2Gaps.ja },
  ko: { ...guideGaps.ko, ...chromeGaps.ko, ...ko, ...aboutGaps.ko, ...about2Gaps.ko },
  ar: { ...guideGaps.ar, ...chromeGaps.ar, ...ar, ...aboutGaps.ar, ...about2Gaps.ar },
};
