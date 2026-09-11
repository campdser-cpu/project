// Permanent regression test: the generated English TDG module must reproduce
// the legacy English content exactly (mechanical-extraction proof, Phase 6D).
// Run: npx tsx scripts/verify-traveler-decision-guide.ts
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { travelerDecisionGuideEn } from '../src/data/travelerDecisionGuide.ts';
import { travelerDecisionGuideFr } from '../src/data/travelerDecisionGuide-i18n.ts';

const root = path.dirname(fileURLToPath(import.meta.url));
// Canonical snapshot = the generated module itself is the source of truth for
// English post-migration; this test pins its required shape + content facts:
// 8 questions, answers non-empty, inline links exact, no empty segments,
// canonical hrefs only.
const EXPECTED_LINKS: string[][] = [
  ['/trip-builder'],
  ['/blog/marrakech-to-merzouga-roadtrip'],
  ['/merzouga-guide', '/camel-trekking'],
  ['/trip-builder', '/build-your-day-trip'],
  ['/tours'],
  ['/luxury-camp'],
  [],
  [],
];
const KNOWN_LINK_TEXT: Record<string, string> = {
  '/trip-builder|How many days': 'trip builder',
  '/blog/marrakech-to-merzouga-roadtrip': 'Marrakech–Merzouga guide',
  '/merzouga-guide': 'Merzouga Guide',
  '/camel-trekking': 'camel trekking',
  '/tours': 'Morocco tours',
  '/luxury-camp': 'Luxury Desert Camp',
};

let failures = 0;
const fail = (m: string) => { failures++; console.error('FAIL: ' + m); };

const modFile = readFileSync(path.join(root, '..', 'src', 'data', 'travelerDecisionGuide.ts'), 'utf8');
if (!modFile.includes('GENERATED MECHANICALLY')) fail('module missing mechanical-generation header');

const d = travelerDecisionGuideEn;
for (const k of ['eyebrow', 'title', 'intro', 'links'] as const) {
  if (!d[k] || typeof d[k] !== 'string') fail(k + ' empty');
}
if (d.items.length !== 8) fail('items=' + d.items.length);
d.items.forEach((it, i) => {
  if (!it.q) fail(`q${i + 1} empty`);
  if (!it.a || it.a.length === 0) fail(`a${i + 1} empty`);
  const vis = it.a.map((s) => s.text).join('');
  if (!vis) fail(`a${i + 1} visible empty`);
  const got = it.a.filter((s) => s.type === 'link');
  const exp = EXPECTED_LINKS[i];
  if (got.length !== exp.length || !got.every((s, k) => s.type === 'link' && (s as { to: string }).to === exp[k])) {
    fail(`a${i + 1} links mismatch: got [${got.map((s) => (s as { to: string }).to).join(',')}] want [${exp.join(',')}]`);
  }
  for (const s of it.a) {
    if (!s.text) fail(`a${i + 1} empty segment`);
    if (s.type !== 'text' && s.type !== 'link') fail(`a${i + 1} bad type`);
    if (s.text.includes('<') || s.text.includes('>')) fail(`a${i + 1} angle bracket`);
    if (s.type === 'link' && !(s as { to: string }).to.startsWith('/')) fail(`a${i + 1} non-canonical href`);
  }
});
for (const [key, text] of Object.entries(KNOWN_LINK_TEXT)) {
  const [to, qfrag] = key.split('|');
  const found = d.items.some((it) =>
    (!qfrag || it.q.includes(qfrag)) &&
    it.a.some((s) => s.type === 'link' && s.text === text && (s as { to: string }).to === to));
  if (!found) fail(`known link text missing: ${JSON.stringify(text)} -> ${to}`);
}
if (d.linksList.length !== 4) fail('linksList=' + d.linksList.length);

// ---- French overlay checks (Phase 6E) ----
const f = travelerDecisionGuideFr;
if (f.items.length !== 8) fail('fr items=' + f.items.length);
const FR_EXPECTED_LINKS: string[][] = [
  ['/trip-builder'],
  ['/blog/marrakech-to-merzouga-roadtrip'],
  ['/merzouga-guide', '/camel-trekking'],
  ['/trip-builder', '/build-your-day-trip'],
  ['/tours'],
  ['/luxury-camp'],
  [],
  [],
];
const enLinksFlat = d.items.flatMap((it) => it.a.filter((s) => s.type === 'link').map((s) => (s as { to: string }).to));
const frLinksFlat = f.items.flatMap((it) => it.a.filter((s) => s.type === 'link').map((s) => (s as { to: string }).to));
if (JSON.stringify(frLinksFlat) !== JSON.stringify(enLinksFlat)) {
  fail(`fr link topology mismatch: got [${frLinksFlat.join(',')}] want [${enLinksFlat.join(',')}]`);
}
for (const k of ['eyebrow', 'title', 'intro', 'links'] as const) {
  if (!f[k] || typeof f[k] !== 'string') fail('fr ' + k + ' empty');
  else if (f[k] === d[k]) fail('fr ' + k + ' identical to English');
}
f.items.forEach((it, i) => {
  if (!it.q) fail(`fr q${i + 1} empty`);
  else if (it.q === d.items[i].q) fail(`fr q${i + 1} identical to English`);
  if (!it.a || it.a.length === 0) fail(`fr a${i + 1} empty`);
  const vis = it.a.map((s) => s.text).join('');
  if (!vis) fail(`fr a${i + 1} visible empty`);
  else if (vis === d.items[i].a.map((s) => s.text).join('')) fail(`fr a${i + 1} identical to English`);
  const got = it.a.filter((s) => s.type === 'link');
  const exp = FR_EXPECTED_LINKS[i];
  if (got.length !== exp.length || !got.every((s, k) => s.type === 'link' && (s as { to: string }).to === exp[k])) {
    fail(`fr a${i + 1} links mismatch: got [${got.map((s) => (s as { to: string }).to).join(',')}] want [${exp.join(',')}]`);
  }
  for (const s of it.a) {
    if (!s.text) fail(`fr a${i + 1} empty segment`);
    if (s.type !== 'text' && s.type !== 'link') fail(`fr a${i + 1} bad type`);
    if (s.text.includes('<') || s.text.includes('>')) fail(`fr a${i + 1} angle bracket`);
    if (s.type === 'link' && !(s as { to: string }).to.startsWith('/')) fail(`fr a${i + 1} non-canonical href`);
  }
});
// Known English strings must not leak into French content.
const EN_SENTINELS = [
  'How many days do I really need',
  'trip builder',
  'Marrakech–Merzouga guide',
  'Merzouga Guide',
  'camel trekking',
  'Design Your Tour',
  'Build Your Day Trip',
  'Morocco tours',
  'Luxury Desert Camp',
  'Useful next steps',
  'Before You Book',
];
const frAll = JSON.stringify(f);
for (const s of EN_SENTINELS) {
  if (frAll.includes(s)) fail(`fr contains English sentinel: ${JSON.stringify(s)}`);
}
if (f.linksList.length !== 4) fail('fr linksList=' + f.linksList.length);
f.linksList.forEach(([href], i) => {
  if (href !== d.linksList[i][0]) fail(`fr linksList[${i}] href changed: ${href}`);
  if (f.linksList[i][1] === d.linksList[i][1]) fail(`fr linksList[${i}] label identical to English`);
});

if (failures) { console.error(`VERIFY-TDG: FAIL (${failures})`); process.exit(1); }
console.log('VERIFY-TDG: PASS — 8 items, links exact, no empty segments');
