// Completeness reporter (audit tooling only).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..', '..');

type Lang = 'fr' | 'es' | 'it' | 'de' | 'nl' | 'pt' | 'zh' | 'ja' | 'ko' | 'ar';
const LOCALES: Lang[] = ['fr', 'es', 'it', 'de', 'nl', 'pt', 'zh', 'ja', 'ko', 'ar'];

const isTranslated = (v: unknown): v is string =>
  typeof v === 'string' && v.trim() !== '';

function loadJson(rel: string): any {
  return JSON.parse(readFileSync(resolve(root, rel), 'utf8'));
}

interface MissingEntry {
  contentType: string;
  itemId: string;
  missingFields: string[];
}

function countDestinationFields(dest: any, overlay: any, missing: string[]) {
  let total = 0;
  let translated = 0;
  const check = (path: string, val: unknown) => {
    total += 1;
    if (isTranslated(val)) translated += 1;
    else missing.push(path);
  };
  check('name', overlay?.name);
  check('shortDesc', overlay?.shortDesc);
  check('description', overlay?.description);
  check('bestTime', overlay?.bestTime);
  check('region', overlay?.region);
  const baseH: unknown[] = Array.isArray(dest?.highlights) ? dest.highlights : [];
  const overH: unknown[] = Array.isArray(overlay?.highlights) ? overlay.highlights : [];
  baseH.forEach((_, i) => check(`highlights.${i}`, overH[i]));
  return { total, translated };
}

function countTourFields(tour: any, overlay: any, missing: string[]) {
  let total = 0;
  let translated = 0;
  const check = (path: string, val: unknown) => {
    total += 1;
    if (isTranslated(val)) translated += 1;
    else missing.push(path);
  };
  check('name', overlay?.name);
  check('duration', overlay?.duration);
  check('category', overlay?.category);
  check('description', overlay?.description);
  check('routeCaption', overlay?.routeCaption);
  const arrFields = ['highlights', 'included', 'excluded'] as const;
  for (const f of arrFields) {
    const base: unknown[] = Array.isArray(tour?.[f]) ? tour[f] : [];
    const over: unknown[] = Array.isArray(overlay?.[f]) ? overlay[f] : [];
    base.forEach((_, i) => check(`${f}.${i}`, over[i]));
  }
  const baseDays: any[] = Array.isArray(tour?.itineraryDays) ? tour.itineraryDays : [];
  const overDays: any[] = Array.isArray(overlay?.itineraryDays) ? overlay.itineraryDays : [];
  baseDays.forEach((d, i) => {
    const o = overDays[i] ?? {};
    check(`itineraryDays.${i}.title`, o.title);
    check(`itineraryDays.${i}.desc`, o.desc);
    const baseStops: unknown[] = Array.isArray(d?.stops) ? d.stops : [];
    const overStops: unknown[] = Array.isArray(o?.stops) ? o.stops : [];
    baseStops.forEach((_, s) => check(`itineraryDays.${i}.stops.${s}`, overStops[s]));
  });
  const baseGal: unknown[] = Array.isArray(tour?.gallery) ? tour.gallery : [];
  const overGal: any[] = Array.isArray(overlay?.gallery) ? overlay.gallery : [];
  baseGal.forEach((_, i) => check(`gallery.${i}.caption`, overGal[i]?.caption));
  const baseFaq: unknown[] = Array.isArray(tour?.faq) ? tour.faq : [];
  const overFaq: any[] = Array.isArray(overlay?.faq) ? overlay.faq : [];
  baseFaq.forEach((_, i) => {
    check(`faq.${i}.question`, overFaq[i]?.question);
    check(`faq.${i}.answer`, overFaq[i]?.answer);
  });
  return { total, translated };
}

async function main() {
  const dataMod = await import('../../src/data/content.ts');
  const destinations: any[] = dataMod.destinations ?? [];
  const tours: any[] = dataMod.tours ?? [];
  const faqData: any[] = dataMod.faqData ?? [];
  const experiences: any[] = dataMod.experiences ?? [];
  const contentIdx = await import('../../src/i18n/content/index.ts');
  const blogPosts: any[] = contentIdx.blogPosts ?? [];
  const out: any = {
    generatedAt: new Date().toISOString(),
    supportedLocales: LOCALES,
    canonicalContentCounts: {
      destinations: destinations.length,
      tours: tours.length,
      experiences: experiences.length,
      globalFaq: faqData.length,
      blogPosts: blogPosts.length,
    },
    localeResults: {},
  };
  for (const lang of LOCALES) {
    const overlay = loadJson(`src/i18n/content/generated/${lang}.json`);
    let totalFields = 0;
    let translatedFields = 0;
    const missingEntries: MissingEntry[] = [];
    const canonicalCats = [...new Set(destinations.map((d: any) => d.category).filter(Boolean))];
    for (const c of canonicalCats) {
      totalFields += 1;
      if (isTranslated(overlay?.categories?.[c])) translatedFields += 1;
      else missingEntries.push({ contentType: 'category', itemId: String(c), missingFields: ['label'] });
    }
    experiences.forEach((_, i) => {
      totalFields += 1;
      const v = Array.isArray(overlay?.experiences) ? overlay.experiences[i] : undefined;
      if (isTranslated(v)) translatedFields += 1;
      else missingEntries.push({ contentType: 'experience', itemId: String(i), missingFields: [`experiences.${i}`] });
    });
    faqData.forEach((_, i) => {
      const o = Array.isArray(overlay?.faq) ? overlay.faq[i] : undefined;
      totalFields += 2;
      const miss: string[] = [];
      if (isTranslated(o?.question)) translatedFields += 1;
      else miss.push(`faq.${i}.question`);
      if (isTranslated(o?.answer)) translatedFields += 1;
      else miss.push(`faq.${i}.answer`);
      if (miss.length) missingEntries.push({ contentType: 'faq', itemId: String(i), missingFields: miss });
    });
    for (const d of destinations) {
      const miss: string[] = [];
      const r = countDestinationFields(d, overlay?.destinations?.[d.id], miss);
      totalFields += r.total;
      translatedFields += r.translated;
      if (miss.length) missingEntries.push({ contentType: 'destination', itemId: d.id, missingFields: miss });
    }
    for (const t of tours) {
      const miss: string[] = [];
      const r = countTourFields(t, overlay?.tours?.[t.id], miss);
      totalFields += r.total;
      translatedFields += r.translated;
      if (miss.length) missingEntries.push({ contentType: 'tour', itemId: t.id, missingFields: miss });
    }
    for (const b of blogPosts) {
      const o = overlay?.blog?.[b.slug];
      const miss: string[] = [];
      totalFields += 5;
      if (isTranslated(o?.title)) translatedFields += 1;
      else miss.push('title');
      if (isTranslated(o?.excerpt)) translatedFields += 1;
      else miss.push('excerpt');
      if (isTranslated(o?.alt)) translatedFields += 1;
      else miss.push('alt');
      if (isTranslated(o?.canonicalTitle)) translatedFields += 1;
      else miss.push('canonicalTitle');
      if (isTranslated(o?.canonicalExcerpt)) translatedFields += 1;
      else miss.push('canonicalExcerpt');
      if (miss.length) missingEntries.push({ contentType: 'blog', itemId: b.slug, missingFields: miss });
    }
    const missingFields = totalFields - translatedFields;
    out.localeResults[lang] = {
      totalLocalizableFields: totalFields,
      translatedFields,
      missingFields,
      completenessPct: totalFields ? Math.round((translatedFields / totalFields) * 1000) / 10 : 0,
      missingEntries,
    };
  }
  const dumpDir = resolve(root, 'scripts', 'dump');
  mkdirSync(dumpDir, { recursive: true });
  writeFileSync(resolve(dumpDir, 'content-missing-report.json'), JSON.stringify(out, null, 2));
  console.log('localization completeness (overlay vs canonical)');
  for (const lang of LOCALES) {
    const r = out.localeResults[lang];
    console.log(`${lang}: ${r.translatedFields}/${r.totalLocalizableFields} translated, ${r.missingFields} missing, ${r.completenessPct}%`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
