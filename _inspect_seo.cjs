const fs = require('fs');
const path = require('path');
const dist = path.join(__dirname, 'artifacts/morocco-grand-adventure/dist');
const files = [
  'en/marrakech-tours/index.html',
  'en/fes-tours/index.html',
  'en/tours/from-marrakech/index.html',
  'en/tours/from-fes/index.html',
  'en/tours/from-casablanca/index.html',
];
for (const f of files) {
  const fp = path.join(dist, f);
  console.log('=== dist/' + f + ' ===');
  if (!fs.existsSync(fp)) { console.log('  (MISSING)'); continue; }
  const h = fs.readFileSync(fp, 'utf8');
  const title = (h.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
  const canon = (h.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || '';
  const h1 = (h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '';
  const heroImg = (h.match(/<img[^>]*src="(\/images\/dest\/[^"]*)"/) || [])[1] || '';
  const hreflangs = (h.match(/<link rel="alternate" hreflang="([^"]*)" href="([^"]*)"/g) || [])
    .map(s => (s.match(/hreflang="([^"]*)"[^>]*href="([^"]*)"/) || [])?.slice(1) ?? []).slice(0, 12);
  console.log('  TITLE:', title.trim().slice(0, 110));
  console.log('  CANON:', canon);
  console.log('  H1   :', h1.replace(/\s+/g, ' ').trim().slice(0, 110));
  console.log('  HEROIMG:', heroImg);
  console.log('  HREFLANGS(count=' + hreflangs.length + '):', hreflangs.slice(0, 3).map(h=>h.join('=')).join(' | '), '...');
}
