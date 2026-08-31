import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = path.join(root, 'src/components/promo/PriceTag.tsx');
const marker = 'MGA_QUOTE_ONLY_THREE_DAY_PRICE_V2';
let s = fs.readFileSync(file, 'utf8');
if (!s.includes(marker)) {
  const re = /  const active = usePromoActive\(\);/;
  if (!re.test(s)) throw new Error('[3-day-price] PriceTag promo hook not found');
  s = s.replace(re, `  const active = usePromoActive();\n  if (typeof price === 'string' && !/\\d/.test(price)) {\n    return <span className="font-semibold text-foreground">Request a quote</span>;\n  }\n  // ${marker}`);
  fs.writeFileSync(file, s, 'utf8');
}
console.log('[3-day-price] Quote-only routes display Request a quote instead of a fake €0/NaN price.');
