import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

function flatten(value, prefix = '') {
  const out = new Map();
  if (typeof value === 'string') out.set(prefix, value);
  else if (Array.isArray(value)) value.forEach((item, i) => flatten(item, `${prefix}[${i}]`).forEach((v, k) => out.set(k, v)));
  else Object.entries(value).forEach(([key, item]) => flatten(item, prefix ? `${prefix}.${key}` : key).forEach((v, k) => out.set(k, v)));
  return out;
}

const localesDir = 'artifacts/morocco-grand-adventure/src/i18n/locales';
const files = readdirSync(localesDir).filter((f) => f.endsWith('.ts') && f !== 'index.ts');
const dicts = {};
for (const f of readdirSync(localesDir).filter((x) => x.endsWith('.ts') && x !== 'index.ts')) {
  const src = readFileSync(join(localesDir, f), 'utf8').replace(/\r\n/g, '\n');
  const body = src.replace(/^[\s\S]*?export default/, '').replace(/\}[\s]*as[\s\S]*$/, '}').trim().replace(/;\s*$/, '');
  dicts[f.replace('.ts', '')] = flatten(new Function(`return ${body}`)());
}
const en = dicts.en;
// fr is the most complete; compute missing from fr, then per-locale missing is a superset
const frKeys = new Set(dicts.fr.keys());
const missingFromFr = [...en.keys()].filter((k) => !frKeys.has(k));
const lines = [];
for (const k of missingFromFr) {
  lines.push(`${k}\t${JSON.stringify(en.get(k))}`);
}
writeFileSync('artifacts/morocco-grand-adventure/scripts/gap-en-source.tsv', lines.join('\n'), 'utf8');
console.log('wrote', lines.length, 'english source strings');

// also dump de's identical-to-en values for review
const de = dicts.de;
const same = [...de.entries()].filter(([k, v]) => en.get(k) === v && v.length > 3);
writeFileSync('artifacts/morocco-grand-adventure/scripts/same-as-en.txt', same.map(([k, v]) => `${k}\t${v}`).join('\n'), 'utf8');
console.log('wrote', same.length, 'de identical values for review');

// keys missing in de (606 = superset used for all non-fr locales)
const deMissing = [...en.keys()].filter((k) => !de.has(k));
writeFileSync('artifacts/morocco-grand-adventure/scripts/gap-en-source-606.tsv', deMissing.map((k) => `${k}\t${JSON.stringify(en.get(k))}`).join('\n'), 'utf8');
console.log('wrote', deMissing.length, 'de-missing english source strings');


