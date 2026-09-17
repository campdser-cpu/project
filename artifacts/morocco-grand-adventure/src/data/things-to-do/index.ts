// Runtime loader for the "25 things to do" copy. English ships with the page;
// every other locale is its own chunk, fetched only when that locale's page is
// rendered, so no other page pays for this copy.
import { use } from 'react';
import type { Lang } from '@/i18n/index';
import type { ThingsCopy } from './types';
import en from './en';

export * from './types';

type Loader = () => Promise<{ default: ThingsCopy }>;
const LOADERS: Record<Exclude<Lang, 'en'>, Loader> = {
  fr: () => import('./fr'),
  es: () => import('./es'),
  it: () => import('./it'),
  de: () => import('./de'),
  nl: () => import('./nl'),
  pt: () => import('./pt'),
  zh: () => import('./zh'),
  ja: () => import('./ja'),
  ko: () => import('./ko'),
  ar: () => import('./ar'),
};

const EN_PROMISE: Promise<ThingsCopy> = Promise.resolve(en);
const promises: Partial<Record<Lang, Promise<ThingsCopy>>> = { en: EN_PROMISE };

function load(lang: Lang): Promise<ThingsCopy> {
  if (!promises[lang]) {
    const loader = LOADERS[lang as Exclude<Lang, 'en'>];
    // An unknown locale or a failed chunk falls back to English rather than
    // leaving the page suspended.
    promises[lang] = loader ? loader().then((m) => m.default, () => en) : EN_PROMISE;
  }
  return promises[lang]!;
}

/** Suspends until the active locale's copy is available. */
export function useThingsCopy(lang: Lang): ThingsCopy {
  return use(load(lang));
}
