// Verifies the state of the photo library implementation.
// Checks that every PHOTO_LIBRARY entry with a src has a corresponding file on disk,
// and that webp entries match the manifest.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LIB_DIR = path.join(ROOT, 'public', 'images', 'library');
const SRCSET_DIR = path.join(LIB_DIR, 'srcset');
const PHOTO_LIB_TS = path.join(ROOT, 'src', 'data', 'photoLibrary.ts');
const MANIFEST = path.join(ROOT, 'scripts', 'library-masters.manifest.json');

const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));

// Parse PHOTO_LIBRARY
const raw = fs.readFileSync(PHOTO_LIB_TS, 'utf8');
const entries = [];
const blockRe = /'MGA-0\d{2}':\s*\{[\s\S]*?\r?\n\s*\},\s*\r?\n/g;
let m;
while ((m = blockRe.exec(raw))) {
  const block = m[0];
  const id = (block.match(/^'MGA-0\d{2}'/) || [])[0];
  if (!id) continue;
  const src = block.match(/src:\s*'([^']+)'/);
  const w = block.match(/width:\s*(\d+)/);
  const h = block.match(/height:\s*(\d+)/);
  if (src && w && h) {
    const file = path.join(LIB_DIR, src[1].replace('/images/library/', ''));
    entries.push({
      id,
      file,
      exists: fs.existsSync(file),
      width: +w[1],
      height: +h[1],
      blocked: id === 'MGA-023' || id === 'MGA-046',
    });
  }
}

// Check webp consistency between PHOTO_LIBRARY and manifest
let webpIssues = 0;
entries.forEach(e => {
  if (e.blocked) return;
  const slice = raw.slice(raw.indexOf(`'${e.id}':`), raw.indexOf('  },', raw.indexOf(`'${e.id}':`)) + 4);
  const webpInLib = slice.match(/webp:\s*\[([\s\S]*?)\]/);
  const manifestEntry = manifest[e.id];

  if (!e.exists) {
    console.log(`MISSING FILE: ${e.id} - ${e.file}`);
    return;
  }

  if (manifestEntry) {
    const manifestCount = manifestEntry.webp ? manifestEntry.webp.length : 0;
    // Count webp objects in the library entry (each looks like "{ w: 123, url: '...' }")
    const libCount = webpInLib ? (webpInLib[1].match(/\{ w:/g) || []).length : 0;
    if (manifestCount !== libCount) {
      console.log(`WEBP MISMATCH: ${e.id} manifest=${manifestCount} lib=${libCount}`);
      webpIssues++;
    }
  }
});

let ok = 0, missing = 0, blocked = 0;
for (const e of entries) {
  if (e.blocked) {
    // Verify restricted assets have src = null (not a real path on disk)
    if (e.exists) {
      console.log(`BLOCKED ASSET PUBLISHED: ${e.id} should not be on disk`);
      missing++;
    } else {
      blocked++;
      console.log(`BLOCKED ${e.id} \u2014 correctly not published`);
    }
    continue;
  }
  if (e.exists) {
    ok++;
  } else {
    missing++;
    console.log(`MISSING ${e.id} ${e.file}`);
  }
}

console.log(`\nSummary: ${ok} published on disk, ${missing} missing, ${blocked} blocked (MGA-023/MGA-046)`);
console.log(`WebP consistency issues: ${webpIssues}`);

if (missing > 0 || webpIssues > 0) process.exit(1);