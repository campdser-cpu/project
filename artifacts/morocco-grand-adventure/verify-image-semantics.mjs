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
function walk(dir, ext = '.html', out = []) { for (const e of fs.readdirSync(dir, { withFileTypes: true })) { const f = path.join(dir, e.name); e.isDirectory() ? walk(f, ext, out) : e.name.endsWith(ext) && out.push(f); } return out; }

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
// 7. TOUR IMAGE SEMANTIC CONTRACT — every en tour page's og:image must match
// its route identity. This is the regression guard that catches a Chefchaouen
// photo on a Casablanca page, a generic dunes photo reused everywhere, etc.
const TOUR_IMAGE_CONTRACT = {
  // Casablanca departures → Casablanca/Atlantic/imperial or desert-route imagery
  'casablanca-3-day': ['hassan-tower-mohammed-v-mausoleum-rabat'],
  'casablanca-4-day': ['hassan-ii-mosque-ornate-bronze-door-casablanca'],
  'casablanca-5-day': ['camel-caravan-sunset-silhouette-sahara-desert'],
  'casablanca-8-day': ['hassan-ii-mosque-exterior-arches-golden-hour-casablanca'],
  // Fes departures → Fes/Middle-Atlas/desert imagery
  'fes-4-day': ['tannery-workers-dyeing-pits-fes'],
  'fes-5-day': ['dades-valley'],
  'fes-8-day': ['chouara-tannery-overhead-fes-el-bali'],
  '3-day-fes-merzouga-sahara': ['sahara-bivouac-stars-merzouga'],
  '3-day-sahara-fes': ['erg-chebbi'],
  '4-day-fes-marrakech-via-merzouga': ['ait-ben-haddou'],
  // Marrakech departures → route imagery
  '3-day-sahara-marrakech': ['berber-guide-camel-sahara-desert-merzouga'],
  '4-day-marrakech-merzouga-sahara': ['sahara-desert-sunset-silhouette-dune-morocco'],
  '5-day-imperial-cities': ['ait-ben-haddou-kasbah-sunrise-ouarzazate'],
  '7-day-imperial-cities-sahara-escape': ['ait-ben-haddou-bridge-town-unesco-morocco'],
  // Agadir departures
  'agadir-4-day': ['agadir'],
  'agadir-5-day': ['berber-camel-guide-sahara-merzouga'],
  'agadir-8-day': ['agadir'],
};
// Hard bans: an image must never represent a destination it does not depict.
const NEVER_ON_PAGE = [
  { tour: 'casablanca-4-day', forbidden: ['chefchaouen'], why: 'Chefchaouen imagery must not represent Casablanca' },
  { tour: 'casablanca-3-day', forbidden: ['chefchaouen'], why: 'Chefchaouen imagery must not represent Casablanca' },
  { tour: '5-day-imperial-cities', forbidden: ['hassan-ii-mosque'], why: 'Casablanca mosque must not represent Fes imperial context' },
];
for (const [tour, allowed] of Object.entries(TOUR_IMAGE_CONTRACT)) {
  const f = path.join(D, 'en/tours', tour + '.html');
  if (!fs.existsSync(f)) { check(false, 'tour page missing: ' + tour); continue; }
  const html = fs.readFileSync(f, 'utf8');
  const og = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/);
  const ogUrl = og ? og[1] : '';
  const heroImgs = imgIds(html);
  const okOg = allowed.some(a => ogUrl.includes(a));
  const okHero = allowed.some(a => heroImgs.includes(a.replace('/images/dest/', '').replace('.webp', '')) || html.includes('/images/' + a));
  check(okOg || okHero, `${tour}: og:image (${ogUrl}) does not match route identity [${allowed.join(', ')}]`);
}
for (const { tour, forbidden, why } of NEVER_ON_PAGE) {
  const f = path.join(D, 'en/tours', tour + '.html');
  if (!fs.existsSync(f)) continue;
  const html = fs.readFileSync(f, 'utf8');
  for (const bad of forbidden) {
    check(!html.includes('/images/dest/' + bad + '.webp') && !imgIds(html).includes(bad),
      `${tour}: ${why} — found "${bad}" imagery`);
  }
}

// 8. DEPARTURE-HUB SEMANTIC ALLOW-LISTS — the static snapshot of each
// "Tours from <city>" surface may only display imagery whose subject belongs
// to that city. This is a subject-based rule, not a filename heuristic: e.g. a
// Dades Gorge photograph is landscape/gorge imagery and is rejected for
// Casablanca (an Atlantic imperial city) even if a Casablanca tour happens to
// pass through Dades. Same protection for Marrakech/Fes/Agadir hubs, and for
// destination pages whose subject must not be borrowed from another city.
const HUB_IMAGE_ALLOW = {
  // Casablanca: Hassan II Mosque, Atlantic/coastal, imperial-context only
  'tours/from-casablanca': ['dest/casablanca', 'curated/hassan-ii-mosque', 'catalog/hassan-ii-mosque', 'curated/hassan-tower', 'hero/desert-pano'],
  'tours/from-marrakech': ['dest/marrakech', 'catalog/jemaa-el-fna', 'catalog/menara-gardens', 'catalog/tbourida', 'curated/marrakech-', 'hero/desert-pano'],
  'tours/from-fes': ['dest/fes', 'curated/chouara-tannery', 'curated/leather-tanning', 'curated/tannery-workers', 'curated/fes-tannery', 'hero/desert-pano'],
  'tours/from-agadir': ['dest/agadir', 'catalog/medina-agadir', 'hero/desert-pano'],
  // Subject bans across destination pages: a city page must never borrow
  // another city's landmark imagery.
  'destinations/casablanca-bans': ['dest/dades-valley', 'dest/todra-gorge', 'dest/ifrane', 'dest/chefchaouen', 'dest/marrakech.webp', 'dest/merzouga'],
  'destinations/marrakech-bans': ['dest/dades-valley', 'dest/todra-gorge', 'dest/ifrane', 'dest/chefchaouen', 'dest/casablanca', 'dest/merzouga'],
  'destinations/chefchaouen-bans': ['dest/casablanca', 'dest/marrakech.webp', 'dest/dades-valley', 'curated/hassan-ii-mosque', 'catalog/hassan-ii-mosque'],
  'destinations/todra-gorge-bans': ['dest/marrakech.webp', 'dest/casablanca', 'dest/chefchaouen', 'catalog/jemaa-el-fna', 'catalog/menara-gardens'],
  'destinations/merzouga-bans': ['dest/casablanca', 'dest/chefchaouen', 'catalog/jemaa-el-fna', 'catalog/menara-gardens'],
  'destinations/ait-ben-haddou-bans': ['dest/casablanca', 'dest/chefchaouen', 'catalog/jemaa-el-fna', 'catalog/menara-gardens'],
  'destinations/ifrane-bans': ['dest/marrakech.webp', 'dest/casablanca', 'catalog/jemaa-el-fna', 'catalog/menara-gardens'],
};
for (const [key, patterns] of Object.entries(HUB_IMAGE_ALLOW)) {
  const isBan = key.endsWith('-bans');
  const pagePath = isBan ? key.replace('-bans', '') : key;
  const f = fs.existsSync(path.join(D, 'en', pagePath + '.html')) ? path.join(D, 'en', pagePath + '.html') : path.join(D, 'en', pagePath, 'index.html');
  if (!fs.existsSync(f)) { check(false, 'semantic-allow page missing: ' + pagePath); continue; }
  const html = fs.readFileSync(f, 'utf8');
  const matches = html.matchAll(/\/images\/([a-z0-9\/._-]+?\.(?:webp|jpg))/g);
  const imgs = [...new Set([...matches].map(m => m[1].replace(/-480w|-768w/g, '')))];
  for (const img of imgs) {
    if (isBan) {
      const bad = patterns.find(p => img.includes(p));
      check(!bad, `${pagePath}: wrong-subject image "${img}" (matches banned subject "${bad}")`);
    } else {
      const ok = patterns.some(p => img.includes(p));
      check(ok, `${pagePath}: image "${img}" does not belong to this city's subject set [${patterns.join(', ')}]`);
    }
  }
}

// 8b. DURATION-HUB OG:IMAGE — each `/tours/from-<city>/<N>-days` departure page
// must carry an og:image that reflects its *own* departure city. Guards the
// historical bug where every duration page fell back to a generic
// `dest/merzouga.jpg` regardless of city (wrong for Casablanca / Fes / etc.).
const DURATION_CITY_IMAGE = {
  casablanca: 'dest/casablanca',
  fes: 'dest/fes',
  marrakech: 'dest/marrakech',
  agadir: 'dest/agadir',
};
for (const [city, wantImg] of Object.entries(DURATION_CITY_IMAGE)) {
  const hubDir = path.join(D, 'en', 'tours', 'from-' + city);
  if (!fs.existsSync(hubDir)) { check(false, 'duration-hub missing: from-' + city); continue; }
  let scanned = 0;
  for (const dayF of fs.readdirSync(hubDir)) {
    if (!/^\d+-days$/.test(dayF)) continue;
    const f = path.join(hubDir, dayF, 'index.html');
    if (!fs.existsSync(f)) { check(false, `duration page missing: from-${city}/${dayF}/index.html`); continue; }
    const html = fs.readFileSync(f, 'utf8');
    const og = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/);
    const ogUrl = og ? og[1] : '';
    check(ogUrl.includes(wantImg), `from-${city}/${dayF}: og:image ("${ogUrl}") does not match departure city (expected ${wantImg})`);
    check(!ogUrl.includes('dest/merzouga'), `from-${city}/${dayF}: og:image still uses generic Merzouga stand-in ("${ogUrl}")`);
    scanned++;
  }
  check(scanned > 0, `from-${city}: no <N>-days duration pages found to audit`);
}

// 9. POST-FOOTER STRUCTURE — no orphaned text/elements after the intentional
// footer. The only permitted content between the last </footer> and </body>
// is the <noscript> accessibility fallback (hidden when JS runs).
const CSS_FILES = walk(path.join(D, 'assets'), '.css');
const allCss = CSS_FILES.map(f => fs.readFileSync(f, 'utf8')).join('\n');
check(allCss.includes('.prerendered-site-tree'), 'CSS missing .prerendered-site-tree rules (prerender scaffold would render as loose text)');
check(allCss.includes('.prerendered-site-footer'), 'CSS missing .prerendered-site-footer rules (prerender scaffold would render as loose text)');
const AFTER_FOOTER_RE = /<\/footer>\s*([\s\S]*?)<\/body>/i;
for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  if (!html.includes('prerendered-static')) continue; // root shell / 404 / utility pages have no prerendered footer
  const footers = (html.match(/<\/footer>/gi) || []).length;
  check(footers === 1, path.relative(D, f) + `: expected exactly 1 footer, found ${footers}`);
  const lastFooter = html.lastIndexOf('</footer>');
  const bodyClose = html.lastIndexOf('</body>');
  if (lastFooter < 0 || bodyClose < 0) { check(false, path.relative(D, f) + ': no </footer> before </body>'); continue; }
  // Only the noscript fallback and the closing wrapper </div>s may follow.
  let tail = html.slice(lastFooter + 9, bodyClose).replace(/<noscript>[\s\S]*?<\/noscript>/gi, '');
  tail = tail.replace(/<\/div>/gi, '').trim();
  check(tail.length === 0, path.relative(D, f) + ': unexpected content after footer: ' + tail.slice(0, 120));
}

console.log(fail === 0 ? `\nALL SEMANTIC CHECKS PASS (${files.length} HTML files scanned)` : `\n${fail} CHECK(S) FAILED`);
process.exit(fail === 0 ? 0 : 1);
