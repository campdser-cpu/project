// Runtime loader for the Merzouga guide hub copy. English ships with the page;
// every other locale is its own small chunk, fetched only when that locale's
// hub is rendered, so no other page pays for this copy.
import { use } from 'react';
import type { Lang } from '@/i18n/index';
import type { MgHubCopy } from './types';
import en from './en';

export * from './types';

type Loader = () => Promise<{ default: MgHubCopy }>;
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

const EN_PROMISE: Promise<MgHubCopy> = Promise.resolve(en);
const promises: Partial<Record<Lang, Promise<MgHubCopy>>> = { en: EN_PROMISE };

function load(lang: Lang): Promise<MgHubCopy> {
  if (!promises[lang]) {
    const loader = LOADERS[lang as Exclude<Lang, 'en'>];
    // An unknown locale or a failed chunk falls back to English rather than
    // leaving the page suspended.
    promises[lang] = loader ? loader().then((m) => m.default, () => en) : EN_PROMISE;
  }
  return promises[lang]!;
}

/** Suspends until the active locale's hub copy is available. */
export function useMerzougaHubCopy(lang: Lang): MgHubCopy {
  return use(load(lang));
}
