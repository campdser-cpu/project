// ─────────────────────────────────────────────────────────────────────────────
// Hreflang & canonical consistency audit.
//
// Verifies, against the actual prerendered build output in dist/, the specific
// checks Google's own localized-versions guidance calls out and that are NOT
// covered by route-audit.ts (sitemap/link integrity) or i18n-audit.ts (UI
// string coverage):
//   1. every page has a self-referencing canonical (or is a documented
//      exception — a redirect stub)
//   2. every hreflang alternate URL on a page actually resolves to a real
//      generated page
//   3. hreflang codes are valid locale codes (or "x-default")
//   4. a page lists itself among its own hreflang alternates (self-reference)
//   5. RECIPROCITY: if page A declares an hreflang alternate to page B, page B
//      must declare an alternate back to A in A's locale (Google explicitly
//      flags missing return tags as a common, real-world hreflang mistake)
//   6. x-default, when present, points at a real page
//
// Run after `pnpm run build`:
//   pnpm exec tsx scripts/hreflang-audit.ts
// Exit code is non-zero when any check fails.
// ─────────────────────────────────────────────────────────────────────────────
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, relative, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const LANGS = ['en', 'fr', 'es', 'it', 'de', 'nl', 'pt', 'zh', 'ja', 'ko', 'ar'];
const SITE_URL = 'https://www.moroccograndadventure.com';
const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectDir = resolve(scriptDir, '..');
const distDir = join(projectDir, 'dist');

const errors: string[] = [];
const warnings: string[] = [];

function collectHtml(dir: string, base: string, out: string[]): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) collectHtml(full, base, out);
    else if (entry.name.endsWith('.html')) out.push(relative(base, full).split('\\').join('/'));
  }
  return out;
}

function fileToPath(rel: string): string {
  if (rel.endsWith('/index.html')) return '/' + rel.slice(0, -'/index.html'.length);
  return '/' + rel.replace(/\.html$/, '');
}

function pageExists(urlPath: string): boolean {
  const clean = urlPath.endsWith('/') ? urlPath.slice(0, -1) : urlPath;
  return existsSync(join(distDir, `${clean}.html`)) || existsSync(join(distDir, `${clean}/index.html`));
}

const langDirs = LANGS.filter((l) => existsSync(join(distDir, l)));
const generatedFiles: string[] = [];
for (const lang of langDirs) collectHtml(join(distDir, lang), distDir, generatedFiles);

type PageInfo = {
  urlPath: string;
  canonical: string | null;
  hreflang: Map<string, string>; // code -> absolute URL
};

const pages = new Map<string, PageInfo>(); // keyed by urlPath
const legacyRedirectStub = /<meta[^>]*http-equiv="refresh"/i;

for (const rel of generatedFiles) {
  const urlPath = fileToPath(rel);
  const html = readFileSync(join(distDir, rel), 'utf-8');
  const head = html.slice(0, html.indexOf('</head>') === -1 ? html.length : html.indexOf('</head>'));

  // Legacy CJK redirect stubs intentionally carry no canonical/hreflang of
  // their own — they exist only to 30x/meta-refresh old URLs forward. Skip
  // them the same way route-audit.ts's orphan check tolerates them.
  if (legacyRedirectStub.test(head)) continue;

  const canonicalMatch = head.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/);
  const hreflang = new Map<string, string>();
  for (const m of head.matchAll(/<link[^>]*rel="alternate"[^>]*hreflang="([^"]+)"[^>]*href="([^"]+)"/g)) {
    hreflang.set(m[1], m[2]);
  }
  // Some templates may emit href before hreflang in the attribute order.
  if (hreflang.size === 0) {
    for (const m of head.matchAll(/<link[^>]*rel="alternate"[^>]*href="([^"]+)"[^>]*hreflang="([^"]+)"/g)) {
      hreflang.set(m[2], m[1]);
    }
  }

  pages.set(urlPath, { urlPath, canonical: canonicalMatch ? canonicalMatch[1] : null, hreflang });
}

console.log(`Pages with head metadata parsed: ${pages.size} (of ${generatedFiles.length} generated files; redirect stubs excluded)`);

let checkedCanonical = 0;
let checkedHreflangLinks = 0;
let checkedReciprocity = 0;

for (const [urlPath, page] of pages) {
  const selfUrl = `${SITE_URL}${urlPath}`;

  // 1. Self-referencing canonical.
  checkedCanonical++;
  if (!page.canonical) {
    errors.push(`missing canonical: ${urlPath}`);
  } else if (page.canonical !== selfUrl) {
    warnings.push(`canonical points elsewhere (${page.canonical}): ${urlPath}`);
  }

  if (page.hreflang.size === 0) {
    warnings.push(`no hreflang tags at all: ${urlPath}`);
    continue;
  }

  // 3 & 6. Valid codes, and every target resolves to a real page.
  let sawSelf = false;
  for (const [code, href] of page.hreflang) {
    checkedHreflangLinks++;
    if (code !== 'x-default' && !LANGS.includes(code)) {
      errors.push(`invalid hreflang code "${code}" on ${urlPath}`);
      continue;
    }
    if (!href.startsWith(SITE_URL)) {
      errors.push(`hreflang "${code}" on ${urlPath} points off-domain: ${href}`);
      continue;
    }
    const targetPath = href.slice(SITE_URL.length) || '/';
    if (!pageExists(targetPath)) {
      errors.push(`hreflang "${code}" on ${urlPath} points to a page that doesn't exist: ${href}`);
    }
    if (href === selfUrl) sawSelf = true;
  }

  // 4. Self-reference present among the page's own alternates.
  if (!sawSelf) {
    warnings.push(`page does not list itself among its own hreflang alternates: ${urlPath}`);
  }

  // 5. Reciprocity: for every non-x-default alternate B, B's own hreflang
  // block must point back to this page (in this page's own locale).
  const ownLang = urlPath.split('/')[1];
  for (const [code, href] of page.hreflang) {
    if (code === 'x-default' || code === ownLang) continue;
    const targetPath = href.slice(SITE_URL.length) || '/';
    const target = pages.get(targetPath);
    if (!target) continue; // already reported as a dead link above
    checkedReciprocity++;
    const backHref = target.hreflang.get(ownLang);
    if (!backHref) {
      errors.push(`missing reciprocal hreflang: ${targetPath} (${code}) does not link back to ${urlPath} (${ownLang})`);
    } else if (backHref !== selfUrl) {
      errors.push(`reciprocal hreflang mismatch: ${targetPath}'s "${ownLang}" alternate is ${backHref}, expected ${selfUrl}`);
    }
  }
}

console.log(`Canonicals checked: ${checkedCanonical}`);
console.log(`Hreflang links checked: ${checkedHreflangLinks}`);
console.log(`Reciprocity pairs checked: ${checkedReciprocity}`);

console.log('\n── Hreflang & Canonical Audit ───────────────────────────────');
if (warnings.length) {
  console.log(`Warnings (${warnings.length}):`);
  for (const w of warnings.slice(0, 50)) console.log(`  ! ${w}`);
  if (warnings.length > 50) console.log(`  ... and ${warnings.length - 50} more`);
} else {
  console.log('Warnings: 0');
}
if (errors.length) {
  console.log(`Errors (${errors.length}):`);
  for (const e of errors.slice(0, 80)) console.log(`  ✗ ${e}`);
  if (errors.length > 80) console.log(`  ... and ${errors.length - 80} more`);
} else {
  console.log('Errors: 0');
}
console.log(`Summary: ${pages.size} pages checked.`);
if (errors.length) {
  console.log('RESULT: FAIL');
  process.exit(1);
}
console.log('RESULT: PASS');
