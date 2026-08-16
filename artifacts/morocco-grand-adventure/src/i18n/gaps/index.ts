// Aggregates per-language gap completions (keys added to English after the
// initial translation pass). Imported by ../index.ts to build the merged
// translations used by `t()` and the prerender/audit tooling.
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
import type { Lang } from '../index';

export const i18nGaps: Partial<Record<Lang, Record<string, string>>> = {
  fr, es, it, de, nl, pt, zh, ja, ko, ar,
};