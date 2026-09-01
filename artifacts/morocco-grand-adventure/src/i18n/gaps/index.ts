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
// Full-coverage overlays: complete every remaining English key with native copy.
import frFull from './full-fr';
import esFull from './full-es';
import itFull from './full-it';
import deFull from './full-de';
import nlFull from './full-nl';
import ptFull from './full-pt';
import zhFull from './full-zh';
import jaFull from './full-ja';
import koFull from './full-ko';
import arFull from './full-ar';
import type { Lang } from '../index';

export const i18nGaps: Partial<Record<Lang, Record<string, string>>> = {
  fr: { ...fr, ...frFull },
  es: { ...es, ...esFull },
  it: { ...it, ...itFull },
  de: { ...de, ...deFull },
  nl: { ...nl, ...nlFull },
  pt: { ...pt, ...ptFull },
  zh: { ...zh, ...zhFull },
  ja: { ...ja, ...jaFull },
  ko: { ...ko, ...koFull },
  ar: { ...ar, ...arFull },
};

