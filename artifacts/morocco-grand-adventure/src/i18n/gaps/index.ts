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
import { trustGaps } from './trust';
import { guideGaps } from './guides';
import { studentToursGaps } from './student-tours';
import { journeyGaps } from './journey';
import { filtersGaps } from './filters';
import { faqToursGaps } from './faq-tours';
import { studentBookingGaps } from './student-booking';
import { contactChoiceGaps } from './contact-choice';
import { guideCtaGaps } from './guide-cta';
import type { Lang } from '../index';

export const i18nGaps: Partial<Record<Lang, Record<string, string>>> = {
  // English gap completions: keys authored in the gap layer that are absent from
  // locales/en.ts (e.g. pwig_* on the Merzouga Guide hub). Without this entry,
  // t('en', 'pwig_heading') falls through registry.en → gap layer (undefined) →
  // literal key, leaking "pwig_heading" into /en/merzouga-guide.
  // Student Tours body copy (src/data/student-tours.ts) is authored for
  // en + pt + es so far; the remaining locales deliberately fall through to
  // English for that long-form content until translated in a later batch.
  // The shorter st_sd_* detail-page UI keys, however, are authored for every
  // locale (see student-tours.ts) — each line below spreads its own
  // studentToursGaps.<lang> on top of the English base so those resolve.
  en: { ...guideGaps.en, ...studentToursGaps.en, ...pricingGaps.en, ...discoveryGaps.en, ...trustGaps.en, ...journeyGaps.en, ...studentBookingGaps.en, ...contactChoiceGaps.en, ...guideCtaGaps.en },
  fr: { ...studentToursGaps.en, ...studentToursGaps.fr, ...guideGaps.fr, ...chromeGaps.fr, ...fr, ...aboutGaps.fr, ...about2Gaps.fr, ...pricingGaps.fr, ...discoveryGaps.fr, ...trustGaps.fr, ...journeyGaps.fr, ...filtersGaps.fr, ...studentBookingGaps.en, ...studentBookingGaps.fr, ...contactChoiceGaps.en, ...contactChoiceGaps.fr, ...guideCtaGaps.en, ...guideCtaGaps.fr },
  es: { ...studentToursGaps.en, ...guideGaps.es, ...chromeGaps.es, ...es, ...aboutGaps.es, ...about2Gaps.es, ...studentToursGaps.es, ...pricingGaps.es, ...discoveryGaps.es, ...trustGaps.es, ...journeyGaps.es, ...filtersGaps.es, ...faqToursGaps.es, ...studentBookingGaps.en, ...studentBookingGaps.es, ...contactChoiceGaps.en, ...contactChoiceGaps.es, ...guideCtaGaps.en, ...guideCtaGaps.es },
  it: { ...studentToursGaps.en, ...studentToursGaps.it, ...guideGaps.it, ...chromeGaps.it, ...it, ...aboutGaps.it, ...about2Gaps.it, ...pricingGaps.it, ...discoveryGaps.it, ...trustGaps.it, ...journeyGaps.it, ...filtersGaps.it, ...faqToursGaps.it, ...studentBookingGaps.en, ...studentBookingGaps.it, ...contactChoiceGaps.en, ...contactChoiceGaps.it, ...guideCtaGaps.en, ...guideCtaGaps.it },
  de: { ...studentToursGaps.en, ...studentToursGaps.de, ...guideGaps.de, ...chromeGaps.de, ...de, ...aboutGaps.de, ...about2Gaps.de, ...pricingGaps.de, ...discoveryGaps.de, ...trustGaps.de, ...journeyGaps.de, ...filtersGaps.de, ...faqToursGaps.de, ...studentBookingGaps.en, ...studentBookingGaps.de, ...contactChoiceGaps.en, ...contactChoiceGaps.de, ...guideCtaGaps.en, ...guideCtaGaps.de },
  nl: { ...studentToursGaps.en, ...studentToursGaps.nl, ...guideGaps.nl, ...chromeGaps.nl, ...nl, ...aboutGaps.nl, ...about2Gaps.nl, ...pricingGaps.nl, ...discoveryGaps.nl, ...trustGaps.nl, ...journeyGaps.nl, ...filtersGaps.nl, ...faqToursGaps.nl, ...studentBookingGaps.en, ...studentBookingGaps.nl, ...contactChoiceGaps.en, ...contactChoiceGaps.nl, ...guideCtaGaps.en, ...guideCtaGaps.nl },
  pt: { ...studentToursGaps.en, ...guideGaps.pt, ...chromeGaps.pt, ...pt, ...aboutGaps.pt, ...about2Gaps.pt, ...studentToursGaps.pt, ...pricingGaps.pt, ...discoveryGaps.pt, ...trustGaps.pt, ...journeyGaps.pt, ...filtersGaps.pt, ...studentBookingGaps.en, ...studentBookingGaps.pt, ...contactChoiceGaps.en, ...contactChoiceGaps.pt, ...guideCtaGaps.en, ...guideCtaGaps.pt },
  zh: { ...studentToursGaps.en, ...studentToursGaps.zh, ...guideGaps.zh, ...chromeGaps.zh, ...zh, ...aboutGaps.zh, ...about2Gaps.zh, ...pricingGaps.zh, ...discoveryGaps.zh, ...trustGaps.zh, ...journeyGaps.zh, ...filtersGaps.zh, ...studentBookingGaps.en, ...studentBookingGaps.zh, ...contactChoiceGaps.en, ...contactChoiceGaps.zh, ...guideCtaGaps.en, ...guideCtaGaps.zh },
  ja: { ...studentToursGaps.en, ...studentToursGaps.ja, ...guideGaps.ja, ...chromeGaps.ja, ...ja, ...aboutGaps.ja, ...about2Gaps.ja, ...pricingGaps.ja, ...discoveryGaps.ja, ...trustGaps.ja, ...journeyGaps.ja, ...filtersGaps.ja, ...studentBookingGaps.en, ...studentBookingGaps.ja, ...contactChoiceGaps.en, ...contactChoiceGaps.ja, ...guideCtaGaps.en, ...guideCtaGaps.ja },
  ko: { ...studentToursGaps.en, ...studentToursGaps.ko, ...guideGaps.ko, ...chromeGaps.ko, ...ko, ...aboutGaps.ko, ...about2Gaps.ko, ...pricingGaps.ko, ...discoveryGaps.ko, ...trustGaps.ko, ...journeyGaps.ko, ...filtersGaps.ko, ...studentBookingGaps.en, ...studentBookingGaps.ko, ...contactChoiceGaps.en, ...contactChoiceGaps.ko, ...guideCtaGaps.en, ...guideCtaGaps.ko },
  ar: { ...studentToursGaps.en, ...studentToursGaps.ar, ...guideGaps.ar, ...chromeGaps.ar, ...ar, ...aboutGaps.ar, ...about2Gaps.ar, ...pricingGaps.ar, ...discoveryGaps.ar, ...trustGaps.ar, ...journeyGaps.ar, ...filtersGaps.ar, ...studentBookingGaps.en, ...studentBookingGaps.ar, ...contactChoiceGaps.en, ...contactChoiceGaps.ar, ...guideCtaGaps.en, ...guideCtaGaps.ar },
};
