// Apply targeted English-leakage fixes to the locale dictionaries.
// Only keys whose current value is IDENTICAL to the English value are touched,
// and only when a real translated value is supplied in the fix map. Existing
// genuine translations are never overwritten.
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
const enFlat = flattenValue(allTranslations.en as Json);
const lit = (v: string) => JSON.stringify(v);

for (const code of ['it', 'de'] as Lang[]) {
  const fixes = JSON.parse(readFileSync(join(import.meta.dirname, 'dump', `leak-fix-${code}.json`), 'utf8')) as Record<string, string>;
  const localePath = join(import.meta.dirname, '..', 'src', 'i18n', 'locales', `${code}.ts`);
  const entries = flattenValue(allTranslations[code] as Json);

  let src = readFileSync(localePath, 'utf8');
  const hadCrlf = src.includes('\r\n');
  src = src.replace(/\r\n/g, '\n');
  const lines = src.split('\n');
  let replaced = 0;
  const used = new Set<string>();
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(\s*)([A-Za-z_][\w]*)\s*:\s*(.+),$/);
    if (!m) continue;
    const key = m[2];
    if (!(key in fixes) || used.has(key)) continue;
    const enVal = enFlat.get(key);
    const curVal = entries.get(key);
    // only replace a value that is currently an English fallback
    if (enVal !== undefined && curVal === enVal && fixes[key] !== enVal) {
      lines[i] = `${m[1]}${key}: ${lit(fixes[key])},`;
      replaced++;
      used.add(key);
    }
  }
  src = lines.join('\n');
  if (hadCrlf) src = src.replace(/\n/g, '\r\n');
  writeFileSync(localePath, src);
  console.log(`${code}: replaced ${replaced} English-fallback values (of ${Object.keys(fixes).length} supplied)`);
}
