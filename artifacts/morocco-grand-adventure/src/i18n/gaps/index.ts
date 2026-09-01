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
import type { Lang } from '../index';

export const i18nGaps: Partial<Record<Lang, Record<string, string>>> = {
  fr: { ...fr, ...aboutGaps.fr },
  es: { ...es, ...aboutGaps.es },
  it: { ...it, ...aboutGaps.it },
  de: { ...de, ...aboutGaps.de },
  nl: { ...nl, ...aboutGaps.nl },
  pt: { ...pt, ...aboutGaps.pt },
  zh: { ...zh, ...aboutGaps.zh },
  ja: { ...ja, ...aboutGaps.ja },
  ko: { ...ko, ...aboutGaps.ko },
  ar: { ...ar, ...aboutGaps.ar },
};
