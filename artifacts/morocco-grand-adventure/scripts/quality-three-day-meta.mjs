import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const metaPath = path.join(root, 'src/components/seo/route-metadata.ts');
const source = fs.readFileSync(metaPath, 'utf8');
const oldEntry = /'3-day-sahara-marrakech': \{ title: '3-Day Luxury Sahara Tour from Marrakech', description: "Cross the Atlas Mountains, explore Aït Ben Haddou and sleep under Saharan stars in a luxury desert camp\."/;
const replacement = "'3-day-sahara-marrakech': { title: '3-Day Sahara Tour from Marrakech | Merzouga', description: \"A private 3-day Marrakech to Merzouga route through the High Atlas, Aït Ben Haddou, Dades, Todra and Erg Chebbi. Honest travel expectations and booking details.\"";
if (!oldEntry.test(source)) {
  if (source.includes("title: '3-Day Sahara Tour from Marrakech | Merzouga'")) {
    console.log('[3-day-meta] Already applied.');
    process.exit(0);
  }
  throw new Error('[3-day-meta] Could not find the existing Marrakech tour metadata entry.');
}
fs.writeFileSync(metaPath, source.replace(oldEntry, replacement), 'utf8');
console.log('[3-day-meta] Marrakech three-day title and description updated.');
