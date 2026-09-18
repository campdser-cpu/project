// ─────────────────────────────────────────────────────────────────────────────
// Localized tour experiences.
//
// Merges the canonical English catalogue (src/data/tour-experiences.ts) with
// the per-language overlays in ./generated/*.json. Only the two display strings
// are localized — id, kind, destination link, hub link and image stay canonical,
// exactly as the guide and content overlays work.
//
// Locale code-splitting mirrors src/i18n/guides: the active locale's overlay is
// loaded on demand via `loadExperiences(lang)`, or registered all-at-once by
// build tooling via ./overlays.ts. English is canonical and has no overlay; an
// unloaded locale falls back to English rather than rendering a blank card.
// ─────────────────────────────────────────────────────────────────────────────
import type { Lang } from '@/i18n/index';
import { EXPERIENCES, type ExperienceDef } from '@/data/tour-experiences';
import type { ExperienceOverlay } from './types';

export type { ExperienceOverlay };

const registry: Partial<Record<Lang, Record<string, ExperienceOverlay>>> = {};

export function registerExperienceOverlay(lang: Lang, data: Record<string, ExperienceOverlay>): void {
  registry[lang] = data;
}

const LOADERS: Partial<Record<Lang, () => Promise<{ default: Record<string, ExperienceOverlay> }>>> = {
  fr: () => import('./generated/fr.json'),
  es: () => import('./generated/es.json'),
  it: () => import('./generated/it.json'),
  de: () => import('./generated/de.json'),
  nl: () => import('./generated/nl.json'),
  pt: () => import('./generated/pt.json'),
  zh: () => import('./generated/zh.json'),
  ja: () => import('./generated/ja.json'),
  ko: () => import('./generated/ko.json'),
  ar: () => import('./generated/ar.json'),
};

/** Load (and register) one locale's overlay. English resolves immediately. */
export async function loadExperiences(lang: Lang): Promise<void> {
  if (lang === 'en' || registry[lang]) return;
  const loader = LOADERS[lang];
  if (!loader) return;
  const mod = await loader();
  registerExperienceOverlay(lang, mod.default as Record<string, ExperienceOverlay>);
}

function pick(base: string, over: string | undefined): string {
  return over != null && over !== '' ? over : base;
}

/** Canonical experience with `label`/`blurb` swapped for the locale's text. */
export function localizeExperience<T extends ExperienceDef>(exp: T, lang: Lang): T {
  const o = registry[lang]?.[exp.id];
  if (!o) return exp;
  return { ...exp, label: pick(exp.label, o.label), blurb: pick(exp.blurb, o.blurb) };
}

/** Localized label only — for compact contexts such as route chips. */
export function experienceLabel(id: string, lang: Lang): string {
  const base = EXPERIENCES[id];
  if (!base) return id;
  return pick(base.label, registry[lang]?.[id]?.label);
}
