// Every locale's hub copy, imported statically. Build tooling only
// (scripts/prerender.ts) — the runtime loads one locale via ./index.ts.
import type { Lang } from '@/i18n/index';
import type { MgHubCopy } from './types';
import en from './en';
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

export const MERZOUGA_HUB_COPY: Record<Lang, MgHubCopy> = { en, fr, es, it, de, nl, pt, zh, ja, ko, ar };
