// Merge completed translations from scripts/dump/tr/<lang>.json into the real
// runtime locale dictionaries at src/i18n/locales/<lang>.ts.
//
// Semantics: ADDITIVE ONLY + English-fallback repair.
//   * A key missing from the locale .ts file is inserted (existing translations
//     are never overwritten).
//   * A key whose locale value is identical to the English value (an English
//     fallback leak) is replaced with the real translation from tr/*.json, but
//     only when that translation actually differs from English.
//   * Keys already holding a genuine non-English translation are left untouched.
// No re-translation is performed — only previously authored strings are applied.
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
const enKeys = new Set(enFlat.keys());
const targets = ['de', 'es', 'fr', 'it'];

function detectIndent(src: string): string {
  const m = src.match(/^[ \t]*([A-Za-z_][\w]*)\s*:/m);
  return m ? src.slice(0, m.index).split('\n').pop()! : '  ';
}

for (const code of targets) {
  const localePath = join(import.meta.dirname, '..', 'src', 'i18n', 'locales', `${code}.ts`);
  const trPath = join(import.meta.dirname, '..', 'scripts', 'dump', 'tr', `${code}.json`);
  const tr = JSON.parse(readFileSync(trPath, 'utf8')) as Record<string, string>;
  const existing = flattenValue(allTranslations[code as Lang] as Json);

  const toAdd: string[] = [];
  const toFix: string[] = [];
  for (const key of Object.keys(tr)) {
    if (!enKeys.has(key)) continue;
    const enVal = enFlat.get(key);
    if (!existing.has(key)) toAdd.push(key);
    else if (enVal !== undefined && existing.get(key) === enVal && tr[key] !== enVal) toFix.push(key);
  }

  let src = readFileSync(localePath, 'utf8');
  const hadCrlf = src.includes('\r\n');
  src = src.replace(/\r\n/g, '\n');
  const indent = detectIndent(src);
  const lit = (v: string) => JSON.stringify(v);

  const lines = src.split('\n');
  const placed = new Set<string>();
  let overwrites = 0;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(\s*)([A-Za-z_][\w]*)\s*:\s*(.+),$/);
    if (!m) continue;
    const key = m[2];
    if (toFix.includes(key)) {
      lines[i] = `${m[1]}${key}: ${lit(tr[key])},`;
      overwrites++;
      placed.add(key);
    }
  }

  const missingToAdd = toAdd.filter((k) => !placed.has(k));
  if (missingToAdd.length > 0) {
    let closeLine = -1;
    for (let i = lines.length - 1; i >= 0; i--) {
      if (/^\s*} as Record<string, string>;\s*$/.test(lines[i])) { closeLine = i; break; }
    }
    if (closeLine === -1) throw new Error(`${code}: closing-brace line not found`);
    const newLines = missingToAdd.map((k) => `${indent}${k}: ${lit(tr[k])},`);
    lines.splice(closeLine, 0, ...newLines);
  }

  src = lines.join('\n');
  if (hadCrlf) src = src.replace(/\n/g, '\r\n');
  writeFileSync(localePath, src);

  console.log(`${code}: inserted ${missingToAdd.length} missing keys, overwrote ${overwrites} English fallbacks (now ${existing.size + missingToAdd.length} keys)`);
}
