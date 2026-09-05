// Insert missing navigation keys (nav_*) into the locale dictionaries for the
// locales whose nav dropdown still rendered English. ADDITIVE ONLY: a key that
// already exists in the locale file is never touched.
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
const lit = (v: string) => JSON.stringify(v);
const fixes = JSON.parse(readFileSync(join(import.meta.dirname, 'dump', 'nav-fix.json'), 'utf8')) as Record<string, Record<string, string>>;

for (const [code, map] of Object.entries(fixes) as [Lang, Record<string, string>][]) {
  const localePath = join(import.meta.dirname, '..', 'src', 'i18n', 'locales', `${code}.ts`);
  const entries = flattenValue(allTranslations[code] as Json);
  const toAdd = Object.keys(map).filter((k) => !entries.has(k));
  if (toAdd.length === 0) { console.log(`${code}: nav keys already present`); continue; }

  let src = readFileSync(localePath, 'utf8');
  const hadCrlf = src.includes('\r\n');
  src = src.replace(/\r\n/g, '\n');
  const lines = src.split('\n');
  let closeLine = -1;
  for (let i = lines.length - 1; i >= 0; i--) {
    if (/^\s*} as Record<string, string>;\s*$/.test(lines[i])) { closeLine = i; break; }
  }
  if (closeLine === -1) throw new Error(`${code}: closing-brace line not found`);
  const indent = (lines.find((l) => /^\s+[A-Za-z_][\w]*\s*:/.test(l)) ?? '  ').match(/^\s*/)![0];
  const newLines = toAdd.map((k) => `${indent}${k}: ${lit(map[k])},`);
  lines.splice(closeLine, 0, ...newLines);
  src = lines.join('\n');
  if (hadCrlf) src = src.replace(/\n/g, '\r\n');
  writeFileSync(localePath, src);
  console.log(`${code}: inserted ${toAdd.length} nav keys (now ${entries.size + toAdd.length})`);
}
