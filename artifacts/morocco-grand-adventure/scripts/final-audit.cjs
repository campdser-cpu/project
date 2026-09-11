// Final production audit for the Photo Library + "Plan with our guides" deliverable.
// This single script is the authoritative gate. Exit 0 = PASS, non-zero = FAIL.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

let problems = 0;
function fail(msg) { problems++; console.log('  FAIL:', msg); }

const LIB_DIR = path.join(ROOT, 'public', 'images', 'library');
const SRCSET_DIR = path.join(LIB_DIR, 'srcset');
const PHOTO_TS = path.join(ROOT, 'src', 'data', 'photoLibrary.ts');
const MANIFEST = path.join(ROOT, 'scripts', 'library-masters.manifest.json');
const CONTENT_TS = path.join(ROOT, 'src', 'data', 'content.ts');
const SEOHUB_TS = path.join(ROOT, 'src', 'data', 'seoHub.ts');

const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
const raw = fs.readFileSync(PHOTO_TS, 'utf8');
const content = fs.readFileSync(CONTENT_TS, 'utf8');
const seoHub = fs.readFileSync(SEOHUB_TS, 'utf8');

// 1. Parse PHOTO_LIBRARY entries
const entries = [];
const blockRe = /'MGA-0\d{2}':\s*\{[\s\S]*?\r?\n\s*\},\s*\r?\n/g;
let m;
while ((m = blockRe.exec(raw))) {
  const block = m[0];
  const id = ((block.match(/^'MGA-0\d{2}'/) || [])[0] || '').replace(/'/g, '');
  if (!id) continue;
  entries.push({
    id,
    src: (block.match(/src:\s*'([^']+)'/) || [])[1],
    destination: (block.match(/destination:\s*"([^"]+)"/) || [])[1],
    verification: (block.match(/verification:\s*'([^']+)'/) || [])[1],
  });
}
const byId = new Map(entries.map((e) => [e.id, e]));
console.log('PHOTO_LIBRARY entries parsed:', entries.length);

// 2. Every publishable (non-blocked) asset has a real master on disk
console.log('\n[2] Publishable masters on disk');
const blockedIds = ['MGA-023', 'MGA-046'];
let onDisk = 0;
for (const e of entries) {
  if (blockedIds.includes(e.id)) {
    if (e.src) fail(e.id + ' must have src: null but has ' + e.src);
    continue;
  }
  if (!e.src) { fail(e.id + ' publishable but has no src'); continue; }
  const file = path.join(LIB_DIR, e.src.replace('/images/library/', ''));
  if (!fs.existsSync(file)) { fail(e.id + ' master missing on disk: ' + file); continue; }
  onDisk++;
}
console.log('  ' + onDisk + ' publishable masters on disk (expect 44)');
if (onDisk !== 44) fail('expected 44 publishable masters, found ' + onDisk);
// 3. WebP srcset count matches manifest per asset
console.log('\n[3] WebP srcset consistency (PHOTO_LIBRARY vs manifest)');
let webpMismatch = 0;
for (const e of entries) {
  if (blockedIds.includes(e.id)) continue;
  const sliceText = raw.slice(raw.indexOf("'" + e.id + "':"), raw.indexOf('  },', raw.indexOf("'" + e.id + "':")) + 4);
  const webpArr = (sliceText.match(/webp:\s*\[([\s\S]*?)\]/) || [])[1];
  const libCount = webpArr ? (webpArr.match(/\{ w:/g) || []).length : 0;
  const manEntry = manifest[e.id];
  const manCount = manEntry && manEntry.webp ? manEntry.webp.length : 0;
  if (libCount !== manCount) { webpMismatch++; fail(e.id + ' webp lib=' + libCount + ' manifest=' + manCount); }
}
console.log('  WebP mismatches: ' + webpMismatch);
if (webpMismatch) fail('webp mismatches found');

// 4. Every src path resolves to a file on disk
console.log('\n[4] All src paths resolve on disk');
let badSrc = 0;
for (const e of entries) {
  if (!e.src) continue;
  const file = path.join(LIB_DIR, e.src.replace('/images/library/', ''));
// 5. destination field references a real destination hub / page
console.log('\n[5] destination field integrity (content.ts + seoHub.ts slugs)');
const contentIds = [...content.matchAll(/id:\s*"([a-z0-9-]+)"/g)].map((x) => x[1]);
const hubSlugs = [...seoHub.matchAll(/slug:\s*'([a-z0-9-]+)'/g)].map((x) => x[1]);
const validDestinations = new Set([...contentIds, ...hubSlugs]);
let badDest = 0;
const destsUsed = new Map();
for (const e of entries) {
  if (!e.destination) continue;
  destsUsed.set(e.destination, (destsUsed.get(e.destination) || 0) + 1);
  if (!validDestinations.has(e.destination)) {
    badDest++;
    fail(e.id + ' destination="' + e.destination + '" matches no content.ts id or hub slug');
  }
}
console.log('  destinations used by photos: ' + [...destsUsed.entries()].map((kv) => kv[0] + '(' + kv[1] + ')').join(', '));
console.log('  unlinked destinations: ' + badDest);
if (badDest) fail('photos reference invalid destinations');

// 6. "Plan with our guides" featured slugs resolve
console.log('\n[6] Plan with our guides featured slugs');
const FEATURED = ['how-many-days', 'camel-trekking', 'best-time-to-visit', 'what-to-pack'];
const missingSlug = FEATURED.filter((s) => !hubSlugs.includes(s));
console.log('  featured slugs missing from seoHub: ' + (missingSlug.length ? missingSlug.join(',') : 'none'));
if (missingSlug.length) fail('featured guide slugs missing');

// 7. MGA-023 and MGA-046 explicitly blocked
console.log('\n[7] Restricted assets blocked');
const a023 = byId.get('MGA-023');
const a046 = byId.get('MGA-046');
const restrictionOk = a023 && a046
  && a023.verification === 'unverified-location'
  && a046.verification === 'verify-sticker'
  && !a023.src && !a046.src;
console.log('  restricted assets correctly blocked: ' + restrictionOk);
if (!restrictionOk) fail('restricted asset blocking incorrect');

console.log('\n================ FINAL AUDIT ' + (problems === 0 ? 'PASS' : 'FAIL') + ' (' + problems + ' problem(s)) ================');
process.exit(problems > 0 ? 1 : 0);
  if (!fs.existsSync(file)) { badSrc++; fail(e.id + ' src missing: ' + e.src); }
}
console.log('  bad src paths: ' + badSrc);
if (badSrc) fail('unresolvable src paths');