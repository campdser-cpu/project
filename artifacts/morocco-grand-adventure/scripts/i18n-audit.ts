/**
 * Translation quality gate.
 *
 * Compares every locale to English, checks empty values recursively, and
 * reports likely user-facing literals in application components.  The app
 * intentionally supports partial locale overlays with English fallback, so
 * missing keys are reported as coverage debt rather than treated as build
 * failures. Empty translations remain a real failure because they can erase
 * visible UI.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { languages } from '../src/i18n/index';
import { allTranslations } from '../src/i18n/locales';
import { i18nGaps } from '../src/i18n/gaps';

type Json = string | Json[] | { [key: string]: Json };

function flatten(value: Json, prefix = ''): Map<string, string> {
  const out = new Map<string, string>();
  if (typeof value === 'string') out.set(prefix, value);
  else if (Array.isArray(value)) value.forEach((item, i) => flatten(item, `${prefix}[${i}]`).forEach((v, k) => out.set(k, v)));
  else Object.entries(value).forEach(([key, item]) => flatten(item, prefix ? `${prefix}.${key}` : key).forEach((v, k) => out.set(k, v)));
  return out;
}

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? files(path) : path.endsWith('.tsx') ? [path] : [];
  });
}

const english = flatten(allTranslations.en as Json);
let missing = 0;
let empty = 0;
const issues: string[] = [];

for (const locale of languages) {
  // Measure the effective dictionary exactly as the runtime merges it:
  // gap completions as the base layer, the main locale file on top.
  const gaps = i18nGaps[locale.code] ?? {};
  const effective = { ...gaps, ...(allTranslations[locale.code] as Record<string, string>) };
  const entries = flatten(effective);
  for (const key of english.keys()) {
    if (!entries.has(key)) {
      missing++;
      issues.push(`${locale.code}: missing ${key}`);
    }
  }
  for (const [key, value] of entries) {
    if (!value.trim()) {
      empty++;
      issues.push(`${locale.code}: empty ${key}`);
    }
  }
}

const srcRoot = join(import.meta.dirname, '..', 'src');
const candidates: string[] = [];
const literalPattern = /(?:aria-label=|>)([A-Z][A-Za-z][^<>{]{2,})(?:"|<)/g;
for (const path of files(srcRoot).filter((p) => !p.includes(`${join('components', 'ui')}`))) {
  const source = readFileSync(path, 'utf8');
  for (const match of source.matchAll(literalPattern)) {
    const value = match[1].trim();
    if (!value.includes('className') && !value.startsWith('http')) candidates.push(`${relative(srcRoot, path)}: ${value}`);
  }
}

console.log('Translation audit');
console.log(`Languages: ${languages.length}`);
console.log(`English keys: ${english.size}`);
console.log(`Missing keys (English fallback): ${missing}`);
console.log(`Empty translations: ${empty}`);
console.log(`Hard-coded UI candidates: ${candidates.length}`);
if (missing) console.log('Missing locale keys are coverage debt and currently fall back to English by design.');
for (const item of issues.slice(0, 30)) console.log(`  ${item}`);
for (const item of candidates.slice(0, 30)) console.log(`  candidate: ${item}`);

if (empty || (process.argv.includes('--strict') && candidates.length)) process.exitCode = 1;
