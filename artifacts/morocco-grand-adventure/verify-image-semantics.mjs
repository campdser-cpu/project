import fs from 'node:fs';
import path from 'node:path';

const D = 'dist';
const CAT = ['berber-camel-guide-sahara-merzouga','berber-child-baby-goat-village','amazigh-woman-berber-jewellery','ait-ben-haddou-ouarzazate-unesco','ancient-berber-kasbah-ruins-southern-morocco','moroccan-cliff-dwellings-rock-cut','hassan-ii-mosque-casablanca','luxury-desert-camp-sunset-merzouga','chefchaouen-blue-city-rif','moroccan-night-spice-herb-market','jemaa-el-fna-night-marrakech','sahara-dune-trekking-merzouga','menara-gardens-pavilion-marrakech','hassan-ii-mosque-doorway-casablanca','grotte-assif-n-el-hed-river-cave','draa-valley-oasis-palm-grove','essaouira-sqala-du-port-atlantic','sahara-bivouac-stars-merzouga','medina-agadir-heritage','fennec-fox-sahara-wildlife','olive-preserved-lemon-market-stall','moroccan-vegetable-tagine','moroccan-mezze-couscous-tagine','moroccan-tagine-salads-clay-bowls','tbourida-fantasia-marrakech','moroccan-riad-breakfast','moroccan-fine-dining-riad','moroccan-mint-tea-riad','moroccan-pastries-sweets','amazigh-music-ceremony','moroccan-palace-ceiling-muqarnas'];
const EXPECT = {
  marrakech: ['jemaa-el-fna-night-marrakech','menara-gardens-pavilion-marrakech','tbourida-fantasia-marrakech','moroccan-palace-ceiling-muqarnas','moroccan-riad-breakfast','moroccan-fine-dining-riad','moroccan-mint-tea-riad','moroccan-pastries-sweets','olive-preserved-lemon-market-stall','moroccan-vegetable-tagine','moroccan-mezze-couscous-tagine','moroccan-tagine-salads-clay-bowls'],
  merzouga: ['berber-camel-guide-sahara-merzouga','sahara-dune-trekking-merzouga','luxury-desert-camp-sunset-merzouga','sahara-bivouac-stars-merzouga','fennec-fox-sahara-wildlife','berber-child-baby-goat-village','amazigh-woman-berber-jewellery','amazigh-music-ceremony'],
  'erg-chebbi': ['berber-camel-guide-sahara-merzouga','sahara-dune-trekking-merzouga','luxury-desert-camp-sunset-merzouga','sahara-bivouac-stars-merzouga','fennec-fox-sahara-wildlife'],
  fes: ['moroccan-palace-ceiling-muqarnas','moroccan-riad-breakfast','moroccan-pastries-sweets'],
  casablanca: ['hassan-ii-mosque-casablanca','hassan-ii-mosque-doorway-casablanca'],
  essaouira: ['essaouira-sqala-du-port-atlantic'],
  agadir: ['medina-agadir-heritage'],
  rabat: [],
  ouarzazate: ['ait-ben-haddou-ouarzazate-unesco','ancient-berber-kasbah-ruins-southern-morocco'],
  skoura: ['ancient-berber-kasbah-ruins-southern-morocco'],
  'draa-valley': ['draa-valley-oasis-palm-grove','ancient-berber-kasbah-ruins-southern-morocco','berber-child-baby-goat-village'],
  zagora: ['draa-valley-oasis-palm-grove'],
  nkob: ['moroccan-cliff-dwellings-rock-cut'],
  chefchaouen: ['chefchaouen-blue-city-rif','grotte-assif-n-el-hed-river-cave'],
  akchour: ['grotte-assif-n-el-hed-river-cave'],
  'ait-ben-haddou': ['ait-ben-haddou-ouarzazate-unesco'],
};
const FOOD = { marrakech: 'moroccan-night-spice-herb-market', fes: 'moroccan-vegetable-tagine', essaouira: 'olive-preserved-lemon-market-stall', rabat: 'moroccan-pastries-sweets', casablanca: 'moroccan-mezze-couscous-tagine', merzouga: 'moroccan-mint-tea-riad' };

let fail = 0;
const check = (ok, msg) => { if (!ok) { fail++; console.log('FAIL:', msg); } };
function imgIds(html) {
  return [...html.matchAll(/\/images\/catalog\/([a-z0-9-]+?)(?:-480w|-768w)?\.webp/g)].map(m => m[1]);
}
function walk(dir, out = []) { for (const e of fs.readdirSync(dir, { withFileTypes: true })) { const f = path.join(dir, e.name); e.isDirectory() ? walk(f, out) : e.name.endsWith('.html') && out.push(f); } return out; }

// 1. Destination lens grids (en) — exact sequence + food image exactly once
for (const [dest, expected] of Object.entries(EXPECT)) {
  const f = path.join(D, 'en/destinations', dest + '.html');
  if (!fs.existsSync(f)) { check(false, dest + ' page missing'); continue; }
  const html = fs.readFileSync(f, 'utf8');
  const lensIdx = html.toLowerCase().indexOf('through our lens');
  const foodIdx = html.indexOf('Taste of ' + dest.charAt(0).toUpperCase() + dest.slice(1));
  const lensHtml = lensIdx >= 0 ? html.slice(lensIdx, foodIdx > lensIdx ? foodIdx : undefined) : '';
  const ids = [...new Set(imgIds(lensHtml))];
  check(JSON.stringify(ids) === JSON.stringify(expected), `${dest} lens grid = [${ids}] expected [${expected}]`);
  if (FOOD[dest]) {
    const foodHtml = foodIdx > lensIdx ? html.slice(foodIdx) : html;
    check(!imgIds(lensHtml).includes(FOOD[dest]), `${dest}: food image ${FOOD[dest]} leaked into lens grid`);
    check(imgIds(foodHtml).includes(FOOD[dest]), `${dest}: food image missing from food section`);
  }
}

// 2. Context-removed images must not appear on those hub pages at all
{
  const f1 = fs.readFileSync(path.join(D, 'en/travel-info/getting-around-morocco/index.html'), 'utf8');
  check(!imgIds(f1).includes('draa-valley-oasis-palm-grove'), 'getting-around-morocco still shows draa-valley image');
  const f2 = fs.readFileSync(path.join(D, 'en/travel-info/best-time-to-visit-morocco/index.html'), 'utf8');
  check(!imgIds(f2).includes('fennec-fox-sahara-wildlife'), 'best-time-to-visit-morocco still shows fennec');
  const f3 = fs.readFileSync(path.join(D, 'en/merzouga-guide/erg-chebbi/index.html'), 'utf8');
  check(!imgIds(f3).includes('fennec-fox-sahara-wildlife'), 'erg-chebbi hub still shows fennec');
}

// 3. what-to-pack og:image (hero is client-rendered; og meta is prerendered)
{
  const html = fs.readFileSync(path.join(D, 'en/travel-info/what-to-pack-morocco/index.html'), 'utf8');
  check(html.includes('/images/catalog/sahara-dune-trekking-merzouga.webp'), 'what-to-pack og:image uses dune-trekking');
  check(!html.includes('moroccan-riad-breakfast'), 'what-to-pack no longer uses riad-breakfast');
}

// 4. Fixed ALTs present, old wrong ALTs absent site-wide
const FIXED = {
  ok: ['blue-washed medina of Chefchaouen cascading down the hillside', 'bivouac lounge with lanterns', 'standing alert on Sahara sand', 'raised musket, the Koutoubia minaret', 'hand-painted ceramic tagine servers', 'sharing a glass of mint tea across a richly laid riad dining table', 'Sunlight falling into the river gorge', 'amber and coral bead necklaces', 'carved marble arabesques, geometric metalwork doors'],
  bad: ['Blue-washed lane winding uphill', 'sky full of stars near Merzouga', 'resting on Sahara sand', 'firing muskets', 'jams, olives and mint tea', 'pouring Moroccan mint tea', 'Visitor walking through', 'traditional Berber silver jewellery and headpiece', 'Carved cedar doorway', 'candle-lit riad courtyard', 'woven mat'],
};
const files = walk(D);
const foundOk = new Set(); const foundBad = [];
for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  for (const o of FIXED.ok) if (html.includes(o)) foundOk.add(o);
  for (const b of FIXED.bad) if (html.includes(b)) foundBad.push(path.relative(D, f) + ' :: ' + b);
}
for (const o of FIXED.ok) check(foundOk.has(o), 'fixed ALT not found anywhere: ' + o);
check(foundBad.length === 0, 'stale ALTs remain:\n' + foundBad.slice(0, 10).join('\n'));

// 5. All 31 catalog images still discoverable somewhere in en
const enHtml = files.filter(f => path.relative(D, f).startsWith('en')).map(f => fs.readFileSync(f, 'utf8')).join('');
for (const c of CAT) check(enHtml.includes(`/images/catalog/${c}.webp`), 'catalog image not discoverable: ' + c);

// 6. og:image:alt consistency — catalog og images get the exact catalog alt
{
  const html = fs.readFileSync(path.join(D, 'en/travel-info/what-to-pack-morocco/index.html'), 'utf8');
  check(html.includes('content="Trekkers climbing the crest of a tall Sahara dune near Merzouga"'), 'og:image:alt = catalog alt for what-to-pack');
}

console.log(fail === 0 ? `\nALL SEMANTIC CHECKS PASS (${files.length} HTML files scanned)` : `\n${fail} CHECK(S) FAILED`);
process.exit(fail === 0 ? 0 : 1);
