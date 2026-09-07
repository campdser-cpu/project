const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const dir = path.join(root, 'public', 'images');

// All suspicious dest images that could be mislabeled
const files = [
  ['dest', 'casablanca.webp'],
  ['dest', 'casablanca.jpg'],
  ['dest', 'dades-valley.webp'],
  ['dest', 'dades-valley.jpg'],
  ['dest', 'marrakech.webp'],
  ['dest', 'fes.webp'],
  ['dest', 'chefchaouen.webp'],
  ['dest', 'merzouga.webp'],
  ['dest', 'agadir.webp'],
  ['dest', 'rabat.webp'],
  ['curated', 'hassan-ii-mosque-minaret-casablanca.webp'],
  ['curated', 'hassan-ii-mosque-interior-colonnades-casablanca.webp'],
  ['curated', 'ait-ben-haddou-kasbah-sunrise-ouarzazate.webp'],
];

async function inspect() {
  for (const [sub, f] of files) {
    const fp = path.join(dir, sub, f);
    if (!fs.existsSync(fp)) { console.log(`${sub}/${f} MISSING`); continue; }
    try {
      const m = await sharp(fp).metadata();
      console.log(`${sub}/${f}  ${m.width}x${m.height}  ${m.format}`);
    } catch (e) {
      console.log(`${sub}/${f}  ERR  ${e.message}`);
    }
  }
}
inspect();

