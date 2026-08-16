/**
 * Dump every missing/empty translation key per locale to a JSON file under
 * scripts/dump/, so the full gap list can be authored precisely instead of the
 * audit's first-30 preview. Writes <locale>.missing.json containing an array of
 * { key, en } objects.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { languages } from '../src/i18n/index';
import { allTranslations } from '../src/i18n/locales';

type Json = string | Json[] | { [key: string]: Json };

function flatten(value: Json, prefix = ''): Map<string, string> {
  const out = new Map<string, string>();
  if (typeof value === 'string') out.set(prefix, value);
  else if (Array.isArray(value)) value.forEach((item, i) => flatten(item, `${prefix}[${i}]`).forEach((v, k) => out.set(k, v)));
  else Object.entries(value).forEach(([key, item]) => flatten(item, prefix ? `${prefix}.${key}` : key).forEach((v, k) => out.set(k, v)));
  return out;
}

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, 'dump');
mkdirSync(outDir, { recursive: true });

const english = flatten(allTranslations.en as Json);

let total = 0;
for (const locale of languages) {
  if (locale.code === 'en') continue;
  const entries = flatten(allTranslations[locale.code] as Json);
  const missing: { key: string; en: string }[] = [];
  for (const key of english.keys()) {
    if (!entries.has(key)) missing.push({ key, en: english.get(key)! });
  }
  const empty: { key: string; en: string }[] = [];
  for (const [key, value] of entries) {
    if (!value.trim()) empty.push({ key, en: english.get(key) ?? '' });
  }
  total += missing.length + empty.length;
  writeFileSync(join(outDir, `${locale.code}.missing.json`), JSON.stringify(missing, null, 2));
  writeFileSync(join(outDir, `${locale.code}.empty.json`), JSON.stringify(empty, null, 2));
}

console.log(`Total gap entries (missing + empty) across non-English locales: ${total}`);