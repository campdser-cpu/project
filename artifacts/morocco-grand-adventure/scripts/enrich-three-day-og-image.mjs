import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = path.join(root, 'src/components/seo/route-metadata.ts');
const marker = 'MGA_THREE_DAY_OG_IMAGE_V1';
let source = fs.readFileSync(file, 'utf8');

if (!source.includes(marker)) {
  const oldImage = "/images/tours/3-day-sahara-marrakech.jpg";
  const newImage = "/images/pdf/img_1-optimized.webp";
  if (!source.includes(oldImage)) {
    throw new Error('[3-day-og] Marrakech tour metadata image anchor not found');
  }
  source = source.replaceAll(oldImage, newImage);
  source = source.replace(
    "'3-day-sahara-marrakech':",
    "// MGA_THREE_DAY_OG_IMAGE_V1\n  '3-day-sahara-marrakech':",
  );
  fs.writeFileSync(file, source, 'utf8');
}
console.log('[3-day-og] Marrakech Open Graph/Twitter image aligned with the authentic tour asset.');
