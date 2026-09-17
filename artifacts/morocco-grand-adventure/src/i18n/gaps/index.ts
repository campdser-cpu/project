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
import { pricingGaps } from './pricing';
import { discoveryGaps } from './discovery';
import { guideGaps } from './guides';
import { studentToursGaps } from './student-tours';
import type { Lang } from '../index';

export const i18nGaps: Partial<Record<Lang, Record<string, string>>> = {
  // English gap completions: keys authored in the gap layer that are absent from
  // locales/en.ts (e.g. pwig_* on the Merzouga Guide hub). Without this entry,
  // t('en', 'pwig_heading') falls through registry.en → gap layer (undefined) →
  // literal key, leaking "pwig_heading" into /en/merzouga-guide.
  // Student Tours body copy is authored for en + pt only; the other nine locales
  // deliberately fall through to English until a dedicated localization batch.
  en: { ...guideGaps.en, ...studentToursGaps.en, ...pricingGaps.en, ...discoveryGaps.en },
  fr: { ...studentToursGaps.en, ...guideGaps.fr, ...chromeGaps.fr, ...fr, ...aboutGaps.fr, ...about2Gaps.fr, ...pricingGaps.fr, ...discoveryGaps.fr },
  es: { ...studentToursGaps.en, ...guideGaps.es, ...chromeGaps.es, ...es, ...aboutGaps.es, ...about2Gaps.es, ...pricingGaps.es, ...discoveryGaps.es },
  it: { ...studentToursGaps.en, ...guideGaps.it, ...chromeGaps.it, ...it, ...aboutGaps.it, ...about2Gaps.it, ...pricingGaps.it, ...discoveryGaps.it },
  de: { ...studentToursGaps.en, ...guideGaps.de, ...chromeGaps.de, ...de, ...aboutGaps.de, ...about2Gaps.de, ...pricingGaps.de, ...discoveryGaps.de },
  nl: { ...studentToursGaps.en, ...guideGaps.nl, ...chromeGaps.nl, ...nl, ...aboutGaps.nl, ...about2Gaps.nl, ...pricingGaps.nl, ...discoveryGaps.nl },
  pt: { ...studentToursGaps.en, ...guideGaps.pt, ...chromeGaps.pt, ...pt, ...aboutGaps.pt, ...about2Gaps.pt, ...studentToursGaps.pt, ...pricingGaps.pt, ...discoveryGaps.pt },
  zh: { ...studentToursGaps.en, ...guideGaps.zh, ...chromeGaps.zh, ...zh, ...aboutGaps.zh, ...about2Gaps.zh, ...pricingGaps.zh, ...discoveryGaps.zh },
  ja: { ...studentToursGaps.en, ...guideGaps.ja, ...chromeGaps.ja, ...ja, ...aboutGaps.ja, ...about2Gaps.ja, ...pricingGaps.ja, ...discoveryGaps.ja },
  ko: { ...studentToursGaps.en, ...guideGaps.ko, ...chromeGaps.ko, ...ko, ...aboutGaps.ko, ...about2Gaps.ko, ...pricingGaps.ko, ...discoveryGaps.ko },
  ar: { ...studentToursGaps.en, ...guideGaps.ar, ...chromeGaps.ar, ...ar, ...aboutGaps.ar, ...about2Gaps.ar, ...pricingGaps.ar, ...discoveryGaps.ar },
};
