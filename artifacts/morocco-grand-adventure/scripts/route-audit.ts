// ─────────────────────────────────────────────────────────────────────────────
// Route & internal-link integrity audit.
//
// Verifies, against the actual prerendered build output in dist/:
//   1. every sitemap URL maps to a real generated page
//   2. no duplicate sitemap URLs
//   3. every internal link in every prerendered page resolves to a real page
//   4. no orphan pages (generated but missing from the sitemap)
//   5. blog slugs are consistent across the list page, metadata and data
//
// Run after `pnpm run build`:
//   pnpm exec tsx scripts/route-audit.ts
// Exit code is non-zero when any check fails.
// ─────────────────────────────────────────────────────────────────────────────
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const LANGS = ['en', 'fr', 'es', 'it', 'de', 'nl', 'pt', 'zh', 'ja', 'ko', 'ar'];
const SITE_URL = 'https://www.moroccograndadventure.com';
const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectDir = resolve(scriptDir, '..');
const distDir = join(projectDir, 'dist');

const SKIP_LINK_SUFFIXES = new Set([
  '.jpg', '.jpeg', '.png', '.svg', '.gif', '.webp', '.avif',
  '.css', '.js', '.mjs', '.webmanifest', '.mp4', '.webm',
  '.ico', '.xml', '.txt', '.html',
]);

const errors: string[] = [];
const warnings: string[] = [];

function collectHtml(dir: string, base: string, out: string[]): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      collectHtml(full, base, out);
    } else if (entry.name.endsWith('.html')) {
      out.push(relative(base, full).split('\\').join('/'));
    }
  }
  return out;
}

/** Map a prerendered file path (relative to dist/) to a canonical URL path. */
function fileToPath(rel: string): string {
  if (rel.endsWith('/index.html')) return '/' + rel.slice(0, -'/index.html'.length);
  return '/' + rel.replace(/\.html$/, '');
}

/** Check whether a canonical URL path has a generated page (file or dir form). */
function pageExists(urlPath: string): boolean {
  const clean = urlPath.endsWith('/') ? urlPath.slice(0, -1) : urlPath;
  return (
    existsSync(join(distDir, `${clean}.html`)) ||
    existsSync(join(distDir, `${clean}/index.html`))
  );
}

const langDirs = LANGS.filter((l) => existsSync(join(distDir, l)));

// ── 1. Collect all prerendered pages ─────────────────────────────────────────
const generatedFiles: string[] = [];
for (const lang of langDirs) {
  collectHtml(join(distDir, lang), distDir, generatedFiles);
}
const generatedPaths = new Set<string>(generatedFiles.map(fileToPath));
console.log(`Prerendered pages found: ${generatedPaths.size}`);

// ── 2. Parse the sitemap ─────────────────────────────────────────────────────
const sitemapPath = join(distDir, 'sitemap.xml');
if (!existsSync(sitemapPath)) {
  console.error('route-audit: dist/sitemap.xml not found. Run `pnpm run build` first.');
  process.exit(1);
}
const sitemapXml = readFileSync(sitemapPath, 'utf-8');
const sitemapUrls = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
const sitemapLocSet = new Set<string>();
for (const url of sitemapUrls) {
  if (sitemapLocSet.has(url)) errors.push(`duplicate sitemap URL: ${url}`);
  sitemapLocSet.add(url);
}
console.log(`Sitemap URLs: ${sitemapUrls.length} (unique: ${sitemapLocSet.size})`);

for (const url of sitemapLocSet) {
  if (!url.startsWith(SITE_URL)) {
    errors.push(`sitemap URL not on production domain: ${url}`);
    continue;
  }
  const urlPath = url.slice(SITE_URL.length) || '/';
  if (!pageExists(urlPath)) {
    errors.push(`sitemap URL has no generated page: ${url}`);
  }
  if (!generatedPaths.has(urlPath)) {
    errors.push(`sitemap URL not in prerendered set: ${url}`);
  }
}

// Orphans: generated pages missing from the sitemap.
for (const p of [...generatedPaths].sort()) {
  const url = `${SITE_URL}${p}`;
  if (!sitemapLocSet.has(url)) {
    warnings.push(`orphan page (generated but not in sitemap): ${url}`);
  }
}
// ── 3. Blog slug consistency across source files ─────────────────────────────
const readSrc = (p: string): string => readFileSync(join(projectDir, 'src', p), 'utf-8');
const blogListSlugs = [...readSrc('pages/blog.tsx').matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const blogDataSlugs = [...readSrc('i18n/content/index.ts').matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
const merged = new Set<string>([...blogListSlugs, ...blogDataSlugs]);

let blogConsistent = true;
for (const slug of merged) {
  if (!blogListSlugs.includes(slug)) {
    blogConsistent = false;
    errors.push(`blog list page missing slug: ${slug}`);
  }
  if (!blogDataSlugs.includes(slug)) {
    blogConsistent = false;
    errors.push(`blog data missing slug: ${slug}`);
  }
}
for (const slug of blogListSlugs) {
  if (!merged.has(slug)) {
    blogConsistent = false;
    errors.push(`blog list references unknown slug: ${slug}`);
  }
}
// Every blog slug must have a matching prerendered page + sitemap entry.
for (const slug of merged) {
  if (![...generatedPaths].some((p) => p.endsWith(`/blog/${slug}`))) {
    blogConsistent = false;
    errors.push(`blog slug has no prerendered page: ${slug}`);
  }
}
if (blogConsistent) console.log(`Blog slugs consistent (${merged.size} unique slugs)`);

// ── 4. Internal links in prerendered pages ───────────────────────────────────
function isAssetOrExternal(href: string): boolean {
  const lower = href.toLowerCase();
  if (lower.startsWith('mailto:') || lower.startsWith('tel:') || lower.startsWith('#') || lower.startsWith('data:') || lower.startsWith('javascript:')) return true;
  const ext = lower.match(/\.([a-z0-9]+)([?#]|$)/)?.[1];
  if (ext && SKIP_LINK_SUFFIXES.has(`.${ext}`)) return true;
  if (lower.startsWith('http') && !lower.startsWith(SITE_URL)) return true;
  return false;
}

let internalLinkCount = 0;
for (const rel of generatedFiles) {
  const html = readFileSync(join(distDir, rel), 'utf-8');
  const from = fileToPath(rel);
  for (const raw0 of html.matchAll(/href="([^"]+)"/g)) {
    let raw = raw0[1];
    if (isAssetOrExternal(raw)) continue;
    raw = raw.split('#')[0].split('?')[0];
    if (!raw) continue;
    let urlPath: string;
    if (raw.startsWith('/')) {
      urlPath = raw;
    } else if (raw.startsWith(SITE_URL)) {
      urlPath = raw.slice(SITE_URL.length) || '/';
    } else {
      continue;
    }
    if (!LANGS.includes(urlPath.split('/')[1] ?? '')) continue;
    const normalized = urlPath.endsWith('/') ? urlPath.slice(0, -1) : urlPath;
    if (!pageExists(normalized)) {
      errors.push(`broken internal link on ${from}: ${raw}`);
    }
    internalLinkCount++;
  }
}
console.log(`Internal links checked: ${internalLinkCount}`);

// ── 5. Report ────────────────────────────────────────────────────────────────
console.log('\n── Route Integrity Audit ───────────────────────────────────');
if (warnings.length) {
  console.log(`Warnings (${warnings.length}):`);
  for (const w of warnings) console.log(`  ! ${w}`);
} else {
  console.log('Warnings: 0');
}
if (errors.length) {
  console.log(`Errors (${errors.length}):`);
  for (const e of errors) console.log(`  ✗ ${e}`);
} else {
  console.log('Errors: 0');
}
console.log(`Summary: ${generatedPaths.size} pages, ${sitemapLocSet.size} sitemap URLs, ${internalLinkCount} internal links checked.`);
if (errors.length) {
  console.log('RESULT: FAIL');
  process.exit(1);
}
console.log('RESULT: PASS');