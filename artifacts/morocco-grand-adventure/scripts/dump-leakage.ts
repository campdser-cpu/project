import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { allTranslations } from '../src/i18n/locales';
import type { Lang } from '../src/i18n/index';

type Json = string | Json[] | { [key: string]: Json };
function flattenValue(value: Json, prefix = ''): Map<string, string> {
  const out = new Map<string, string>();
  if (typeof value === 'string') out.set(prefix, value);
  else if (Array.isArray(value)) value.forEach((item, i) => flattenValue(item, `${prefix}[${i}]`).forEach((v, k) => out.set(k, v)));
  else Object.entries(value).forEach(([key, item]) => flattenValue(item, prefix ? `${prefix}.${key}` : key).forEach((v, k) => out.set(k, v)));
  return out;
}
const en = flattenValue(allTranslations.en as Json);
const out: Record<string, { key: string; en: string }[]> = {};
for (const code of ['it', 'de'] as Lang[]) {
  const entries = flattenValue(allTranslations[code] as Json);
  const list: { key: string; en: string }[] = [];
  for (const [k, v] of entries) if (en.get(k) === v) list.push({ key: k, en: String(v) });
  out[code] = list;
  console.log(code, 'leakage:', list.length);
}
writeFileSync(join(import.meta.dirname, 'dump', 'leakage-it-de.json'), JSON.stringify(out, null, 2));
