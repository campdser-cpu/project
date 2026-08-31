import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = path.join(root, 'src/pages/tour-detail.tsx');
const marker = 'MGA_TOUR_TRAVELER_GUIDE_V1';
let s = fs.readFileSync(file, 'utf8');

if (!s.includes(marker)) {
  if (!s.includes("import { TourBreadcrumbs } from '../components/tours/TourBreadcrumbs';")) {
    throw new Error('[tour-guide] TourBreadcrumbs import anchor not found');
  }
  s = s.replace(
    "import { TourBreadcrumbs } from '../components/tours/TourBreadcrumbs';",
    "import { TourBreadcrumbs } from '../components/tours/TourBreadcrumbs';\nimport { TourTravelerGuide } from '../components/tours/TourTravelerGuide';",
  );

  const anchor = '            {/* Included / Excluded */}';
  if (!s.includes(anchor)) throw new Error('[tour-guide] included/excluded anchor not found');
  s = s.replace(
    anchor,
    `            {/* ${marker} */}\n            <TourTravelerGuide tour={tour} routeStops={routeStops} />\n\n${anchor}`,
  );
  fs.writeFileSync(file, s, 'utf8');
}

console.log('[tour-guide] reusable traveler guidance injected into every tour detail page.');
