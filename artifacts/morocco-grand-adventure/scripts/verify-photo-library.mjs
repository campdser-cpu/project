import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// ─────────────────────────────────────────────────────────────────────────────
// Photo Library build guard.
//
// Enforces the official Photo Library source-of-truth rules:
//   • All 46 Asset IDs (MGA-001 … MGA-046) are present in the manifest.
//   • Original filenames are never renamed (compared against the official set).
//   • Restricted assets (MGA-023, MGA-046) NEVER appear in rendered HTML,
//     the sitemap, or indexable/og output.
//   • Required source-of-truth fields are non-empty for every asset.
//
// READ-ONLY at build time: it verifies, it never rewrites output.
// ─────────────────────────────────────────────────────────────────────────────

// The 46 official (assetId -> original filename) pairs, verbatim from the
// Photo Library PDF. Never edit these values.
const OFFICIAL = {
  'MGA-001': '1000206114.jpg', 'MGA-002': '1000206106.jpg', 'MGA-003': '1000206101.jpg',
  'MGA-004': '1000206117.jpg', 'MGA-005': '1000206098.jpg', 'MGA-006': '1000206111.jpg',
  'MGA-007': '1000206113.webp', 'MGA-008': '1000206105.jpg', 'MGA-009': '1000206100.jpg',
  'MGA-010': '1000206116.jpg', 'MGA-011': '1000206107.jpg', 'MGA-012': '1000206112.jpg',
  'MGA-013': '1000206104.webp', 'MGA-014': '1000206115.jpg', 'MGA-015': '1000206118.jpg',
  'MGA-016': '1000206099.jpg', 'MGA-017': '1000206102.jpg', 'MGA-018': '1000206103.jpg',
  'MGA-019': '1000206097.jpg', 'MGA-020': '1000206096.webp', 'MGA-021': '1000206092.jpg',
  'MGA-022': '1000206094.jpg', 'MGA-023': '1000206089.jpg', 'MGA-024': '1000206075.jpg',
  'MGA-025': '1000206073.jpg', 'MGA-026': '1000206084.jpg', 'MGA-027': '1000206086.jpg',
  'MGA-028': '1000206081.jpg', 'MGA-029': '1000206091.jpg', 'MGA-030': '1000206083.jpg',
  'MGA-031': '1000206071.jpg', 'MGA-032': '1000206088.jpg', 'MGA-033': '1000206093.jpg',
  'MGA-034': '1000206090.jpg', 'MGA-035': '1000206085.jpg', 'MGA-036': '1000206074.jpg',
  'MGA-037': '1000206080.jpg', 'MGA-038': '1000206087.jpg', 'MGA-039': '1000206095.jpg',
  'MGA-040': '1000206082.jpg', 'MGA-041': '1000206216.jpg', 'MGA-042': '1000206220.jpg',
  'MGA-043': '1000206225.jpg', 'MGA-044': '1000206229.jpg', 'MGA-045': '1000206218.jpg',
  'MGA-046': '1000206223.jpg',
};

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];

// ---------------------------------------------------------------------------
// 1. Load the runtime manifest and cross-check the required contract.
// ---------------------------------------------------------------------------
let PHOTO_LIBRARY = {};
let RESTRICTED_ASSETS = {};
try {
  const mod = await import('../src/data/photoLibrary.ts');
  PHOTO_LIBRARY = mod.PHOTO_LIBRARY || {};
  RESTRICTED_ASSETS = mod.RESTRICTED_ASSETS || {};
} catch (e) {
  errors.push('could not import src/data/photoLibrary.ts — run guard with tsx: ' + e.message);
}

const manifestIds = new Set(Object.keys(PHOTO_LIBRARY));
const officialIds = new Set(Object.keys(OFFICIAL));

// 2. Every official ID must be present in the manifest (no missing asset).
for (const id of officialIds) {
  if (!manifestIds.has(id)) errors.push(`missing asset ${id} in PHOTO_LIBRARY`);
}
// 3. No manifest entry outside the official set (no invented asset ids).
for (const id of manifestIds) {
  if (!officialIds.has(id)) errors.push(`unregistered Asset ID ${id} in PHOTO_LIBRARY`);
}
// 4. Original filenames must match verbatim (never renamed) + required fields.
for (const [id, file] of Object.entries(OFFICIAL)) {
  const a = PHOTO_LIBRARY[id];
  if (!a) continue;
  if (a.file !== file) errors.push(`${id}: filename renamed — expected ${file}, got ${a.file}`);
  if (!a.alt || a.alt.trim().length < 10) errors.push(`${id}: missing/weak alt`);
  if (!a.title || !a.description) errors.push(`${id}: missing title or description`);
  if (!a.verification) errors.push(`${id}: missing verification status`);
}
// 5. Restricted assets must carry a verification that is NOT 'approved'.
// ---------------------------------------------------------------------------
// 6. Restricted / unapproved assets must not appear in any rendered output.
// ---------------------------------------------------------------------------
const blockedFiles = Object.keys(OFFICIAL).filter((id) => RESTRICTED_ASSETS[id]);
const dist = path.join(root, 'dist');
let scannedHtml = 0;

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(html|xml|json)$/.test(entry.name)) out.push(full);
  }
  return out;
}

for (const file of walk(dist)) {
  const lower = fs.readFileSync(file, 'utf8').toLowerCase();
  scannedHtml++;
  for (const id of blockedFiles) {
    const filename = OFFICIAL[id];
    const stem = filename.replace(/\.[^.]+$/, '');
    if (lower.includes(id.toLowerCase()) ||
        lower.includes(filename.toLowerCase()) ||
        lower.includes(stem.toLowerCase())) {
      errors.push(`blocked asset ${id} appears in published output: ${path.relative(dist, file)}`);
    }
  }
}

// ---------------------------------------------------------------------------
// 7. Sitemap: restricted assets must not be referenced.
// ---------------------------------------------------------------------------
const sitemap = path.join(dist, 'sitemap.xml');
if (fs.existsSync(sitemap)) {
  const s = fs.readFileSync(sitemap, 'utf8').toLowerCase();
  for (const id of blockedFiles) {
    const filename = OFFICIAL[id];
    const stem = filename.replace(/\.[^.]+$/, '');
    if (s.includes(id.toLowerCase()) || s.includes(filename.toLowerCase()) || s.includes(stem.toLowerCase())) {
      errors.push(`blocked asset ${id} referenced in sitemap.xml`);
    }
  }
}

// ---------------------------------------------------------------------------
// 8. Report.
// ---------------------------------------------------------------------------
console.log(`photo-library: manifest=${manifestIds.size}/46, scanned-html=${scannedHtml}`);

if (errors.length) {
  console.error('photo-library-guard FAILED');
  for (const e of errors) console.error('  \u2717 ' + e);
  process.exit(1);
}
console.log('photo-library-guard: PASS (all 46 official assets verified; restricted assets unpublished)');
for (const [id, reason] of Object.entries(RESTRICTED_ASSETS)) {
  const a = PHOTO_LIBRARY[id];
  if (!a) { errors.push(`restricted asset ${id} missing from manifest`); continue; }
  if (a.verification === 'approved') errors.push(`${id}: is restricted but marked approved`);
  if (!a.publishNote) errors.push(`${id}: restricted but has no publish note`);
}