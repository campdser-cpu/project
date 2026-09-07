import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Static permanent-redirect fallbacks for legacy non-ASCII (Korean/Chinese) URLs.
// vercel.json CANNOT redirect these: Vercel's router URL-decodes redirect sources
// at config ingest and matches the decoded request path, so non-ASCII sources never
// match (verified live: literal, percent-encoded and double-encoded sources all 404).
// Static files are resolved by the decoded path, which does work - so we emit a tiny
// redirect page (0s meta refresh + canonical + JS replace) at each legacy path.
// Kept out of the sitemap by generate-sitemap.mjs.

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const site = 'https://www.moroccograndadventure.com';

export const LEGACY_REDIRECTS = [
  ['/ko/투어/fes-5-day', '/ko/tours/fes-5-day'],
  ['/zh/撒哈拉之旅', '/zh/desert-tours'],
  ['/zh/梅尔祖卡指南', '/zh/merzouga-guide'],
  ['/ko/메르주가가이드', '/ko/merzouga-guide'],
];

export function legacyRedirectPaths() {
  return LEGACY_REDIRECTS.map(([from]) => from);
}

const invoked = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (invoked) {
  if (!fs.existsSync(dist)) throw new Error('dist directory missing');
  let written = 0;
  for (const [from, to] of LEGACY_REDIRECTS) {
    const html = `<!DOCTYPE html>
<html lang="ko"><head>
<meta charset="utf-8">
<title>Redirecting&hellip;</title>
<meta name="description" content="This legacy URL has moved. Redirecting to the current page.">
<link rel="canonical" href="${site}${to}">
<meta http-equiv="refresh" content="0; url=${to}">
<script>location.replace('${to}');</script>
</head>
<body>
<h1>Redirecting&hellip;</h1>
<p>Redirecting to <a href="${to}">${site}${to}</a></p>
</body></html>
`;
    const file = path.join(dist, from.replace(/^\//, '') + '.html');
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, html, 'utf8');
    written = written + 1;
  }
  console.log(`[legacy-unicode-redirects] wrote ${written} static redirect pages.`);
}