// Check: are tr/*.json keys a subset of the English canonical key set?
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { allTranslations } from '../src/i18n/locales';
import { languages } from '../src/i18n/index';

type Json = string | Json[] | { [key: string]: Json };
function flattenValue(value: Json, prefix = ''): Map<string, string> {
  const out = new Map<string, string>();
  if (typeof value === 'string') out.set(prefix, value);
  else if (Array.isArray(value)) value.forEach((item, i) => flattenValue(item, `${prefix}[${i}]`).forEach((v, k) => out.set(k, v)));
  else Object.entries(value).forEach(([key, item]) => flattenValue(item, prefix ? `${prefix}.${key}` : key).forEach((v, k) => out.set(k, v)));
  return out;
}

const en = flattenValue(allTranslations.en as Json);
const enKeys = new Set(en.keys());
const out: Record<string, any> = {};
for (const c of ['de', 'es', 'fr', 'it']) {
  const tr = JSON.parse(readFileSync(join(import.meta.dirname, '..', 'scripts', 'dump', 'tr', `${c}.json`), 'utf8')) as Record<string, string>;
  const keys = Object.keys(tr);
  const extra = keys.filter((k) => !enKeys.has(k));
  out[c] = { tr_keys: keys.length, subset_of_en: extra.length === 0, extra: extra.length, extra_sample: extra.slice(0, 10) };
}
writeFileSync(join(import.meta.dirname, '..', 'scripts', 'dump', 'merge-check.json'), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out));
