const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC_DIR = path.join(ROOT, 'scripts', 'guide-src');
const OUT_DIR = path.join(ROOT, 'src', 'i18n', 'guides', 'generated');
const LOCALES = ['fr', 'es', 'it', 'de', 'nl', 'pt', 'zh', 'ja', 'ko', 'ar'];
const GUIDES = ['how-many-days', 'camel-trekking', 'best-time-to-visit', 'what-to-pack'];

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

for (const locale of LOCALES) {
  const merged = {};
  for (const guide of GUIDES) {
    const srcPath = path.join(SRC_DIR, locale, guide + '.json');
    if (!fs.existsSync(srcPath)) {
      console.error('MISSING', srcPath);
      process.exit(1);
    }
    const data = JSON.parse(fs.readFileSync(srcPath, 'utf8'));
    merged[guide] = data;
  }
  fs.writeFileSync(path.join(OUT_DIR, locale + '.json'), JSON.stringify(merged, null, 2) + '\n');
  console.log('WROTE', locale + '.json');
}
console.log('DONE');