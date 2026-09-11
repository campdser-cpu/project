// Verifies every publishable PHOTO_LIBRARY entry has a real file on disk.
const fs = require('fs');
const path = require('path');

const LIB = path.resolve(__dirname, '..', 'public', 'images', 'library');
const SRC_TS = path.resolve(__dirname, '..', 'src', 'data', 'photoLibrary.ts');
const raw = fs.readFileSync(SRC_TS, 'utf8');

// Parse each MGA-0XX: { ... } entry block. Entries end with "  }," + linebreak.
const entries = [];
// Matches:  'MGA-0XX': { ...anything...  },  (last line has "  }," + newline)
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
    const file = path.join(LIB, src[1].replace('/images/library/', ''));
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

let ok = 0, missing = 0, blocked = 0;
for (const e of entries) {
  if (e.blocked) {
    blocked++;
    console.log(`BLOCKED ${e.id} \u2014 should not be published`);
    continue;
  }
  if (e.exists) {
    ok++;
    console.log(`OK ${e.id} ${e.file} ${e.width}x${e.height}`);
  } else {
    missing++;
    console.log(`MISSING ${e.id} ${e.file}`);
  }
}
console.log(`\nSummary: ${ok} published on disk, ${missing} missing, ${blocked} blocked (MGA-023/MGA-046)`);

if (missing > 0) process.exit(1);