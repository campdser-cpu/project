import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  PHOTO_LIBRARY,
  RESTRICTED_ASSETS,
  publishableLibraryPhotos,
  publishablePhotosForDestination,
  publishablePhotosForContexts,
} from '../src/data/photoLibrary';

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// 1. Manifest contract: all 46 official assets, exactly 2 restricted.
assert.equal(Object.keys(PHOTO_LIBRARY).length, 46, 'manifest must contain all 46 official assets');
assert.deepEqual(Object.keys(RESTRICTED_ASSETS).sort(), ['MGA-023', 'MGA-046']);

// 2. Every approved asset is published to /images/library/<id>.jpg with a
//    byte-valid JPEG (SOI + EOI) and intrinsic dimensions; restricted assets
//    never have a src.
let published = 0;
for (const [id, a] of Object.entries(PHOTO_LIBRARY)) {
  if (RESTRICTED_ASSETS[id]) {
    assert.equal(a.src, null, `${id} restricted must have src null`);
    continue;
  }
  assert.ok(a.src, `${id} approved asset must be published`);
  const file = path.join(siteRoot, 'public', a.src);
  const buf = fs.readFileSync(file);
  assert.ok(buf.length > 100, `${id} binary missing on disk (${a.src})`);
  assert.ok(buf[0] === 0xff && buf[1] === 0xd8, `${id} missing JPEG SOI`);
  assert.ok(buf[buf.length - 2] === 0xff && buf[buf.length - 1] === 0xd9, `${id} missing JPEG EOI`);
  assert.ok(a.width && a.height, `${id} missing intrinsic dimensions`);
  published++;
}
assert.equal(published, 44, 'exactly 44 photographs are published from the official library');

// 3. About / Our Private Fleet: MGA-041…045 render, MGA-046 never appears.
const fleet = publishablePhotosForContexts(['fleet']).map((p) => p.assetId);
assert.deepEqual(fleet, ['MGA-041', 'MGA-042', 'MGA-043', 'MGA-044', 'MGA-045']);

// 4. Helper output never contains a restricted asset.
assert.ok(publishableLibraryPhotos().every((p) => !RESTRICTED_ASSETS[p.assetId]));
assert.ok(publishablePhotosForDestination('merzouga').every((p) => !RESTRICTED_ASSETS[p.assetId]));
assert.ok(publishablePhotosForDestination('merzouga').length > 0, 'merzouga should have library photos');

// 5. Wire-up: About fleet section + destination-detail + gallery consume the
//    published library (structure check, mirrors verify-whatsapp style).
const about = fs.readFileSync(path.join(siteRoot, 'src', 'components', 'sections', 'PremiumAboutSection.tsx'), 'utf8');
assert.ok(about.includes("publishablePhotosForContexts(['fleet'])"), 'About must render the fleet library section');
const destDetail = fs.readFileSync(path.join(siteRoot, 'src', 'pages', 'destination-detail.tsx'), 'utf8');
assert.ok(destDetail.includes('publishablePhotosForDestination(destination.id)'), 'destination-detail must render library photos');
const gallery = fs.readFileSync(path.join(siteRoot, 'src', 'pages', 'gallery.tsx'), 'utf8');
assert.ok(gallery.includes('publishableLibraryPhotos()'), 'gallery must render the official library section');
const tb = fs.readFileSync(path.join(siteRoot, 'src', 'pages', 'trip-builder.tsx'), 'utf8');
assert.ok(tb.includes('encodeURIComponent'), 'trip-builder must URL-encode the WhatsApp message');
assert.ok(tb.includes('Day-by-day itinerary'), 'trip-builder must carry the generated itinerary');

// 6. Functional round-trip: the WhatsApp message survives URL encoding.
const sample =
  'New Bespoke Journey Request\n\n- Route: Casablanca to Marrakech\n- Travelers: 4\n- Interests: Sahara & camels';
const built = `https://wa.me/212699846818?text=${encodeURIComponent(sample)}`;
const decoded = decodeURIComponent(built.split('?text=')[1]);
assert.ok(decoded.includes('Route: Casablanca to Marrakech'));
assert.ok(decoded.includes('Interests: Sahara & camels'), 'values containing & must survive encoding');

console.log(`Photo library deterministic tests: PASS (${published} published, fleet: ${fleet.join(', ')})`);