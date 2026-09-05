// Comprehensive locale verification against the canonical English key set.
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
const EN_KEYS = [...en.keys()];

function duplicateKeys(src: string): string[] {
  const m = src.matchAll(/^\s*([A-Za-z_][\w]*)\s*:/g);
  const seen = new Map<string, number>();
  for (const it of m) seen.set(it[1], (seen.get(it[1]) ?? 0) + 1);
  return [...seen.entries()].filter(([, c]) => c > 1).map(([k, c]) => `${k}\u00d7${c}`);
}
const placeholders = (s: string) => [...(s.match(/\{[^}]+\}/g) ?? [])];

console.log(`English canonical keys: ${EN_KEYS.length}`);
const report: Record<string, any> = { enKeys: EN_KEYS.length, locales: {} };
for (const { code } of languages) {
  if (code === 'en') continue;
  const srcPath = join(import.meta.dirname, '..', 'src', 'i18n', 'locales', `${code}.ts`);
  const src = readFileSync(srcPath, 'utf8');
  const entries = flattenValue(allTranslations[code] as Json);
  const missing = EN_KEYS.filter((k) => !entries.has(k));
  const empties = [...entries.entries()].filter(([, v]) => !String(v).trim()).map(([k]) => k);
  const leakage = [...entries.entries()].filter(([k, v]) => en.get(k) === v).map(([k]) => k);
  const phMismatch = [...entries.entries()].filter(([k, v]) => {
    const ev = en.get(k);
    if (ev === undefined) return false;
    return JSON.stringify(placeholders(String(v))) !== JSON.stringify(placeholders(String(ev)));
  }).map(([k]) => k);
  const dups = duplicateKeys(src);
  report.locales[code] = {
    keys: entries.size, missing: missing.length, empty: empties.length,
    same_as_en: leakage.length, placeholder_mismatch: phMismatch.length, duplicate_keys: dups.length,
    missing_sample: missing.slice(0, 25),
    leakage_sample: leakage.slice(0, 25),
    phMismatch_sample: phMismatch.slice(0, 25),
    duplicate_keys_list: dups,
  };
  console.log(`${code}: keys=${entries.size} missing=${missing.length} empty=${empties.length} same_as_en=${leakage.length} ph_mismatch=${phMismatch.length} dup_keys=${dups.length}`);
}
writeFileSync(join(import.meta.dirname, '..', 'scripts', 'dump', 'verify-report.json'), JSON.stringify(report, null, 2));
console.log('Wrote scripts/dump/verify-report.json');
