import * as fs from 'node:fs';
import * as path from 'node:path';
import { getRouteMeta } from '../src/components/seo/route-metadata';

const SITE_URL = 'https://www.moroccograndadventure.com';
const BRAND = 'Morocco Grand Adventure';
const distDir = path.resolve('dist');
const englishDir = path.join(distDir, 'en');

function fileToRest(filePath: string): string {
  const rel = path.relative(englishDir, filePath).split(path.sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'/index.html'.length)}`;
  return `/${rel.replace(/\.html$/, '')}`;
}

function replaceAttr(html: string, pattern: RegExp, replacement: string): string {
  return html.replace(pattern, replacement);
}

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function applyMeta(filePath: string): boolean {
  let html = fs.readFileSync(filePath, 'utf8');
  const rest = fileToRest(filePath);
  const meta = getRouteMeta(rest);
  const title = `${meta.title} — ${BRAND}`;
  const description = meta.description;
  const escapedTitle = escapeAttr(title);
  const escapedDescription = escapeAttr(description);

  html = replaceAttr(html, /<title>[^<]*<\/title>/, `<title>${escapedTitle}</title>`);
  html = replaceAttr(html, /(<meta name="description" content=")[^"]*("\s*\/?>)/, `$1${escapedDescription}$2`);
  html = replaceAttr(html, /(<meta property="og:title" content=")[^"]*("\s*\/?>)/, `$1${escapedTitle}$2`);
  html = replaceAttr(html, /(<meta property="og:description" content=")[^"]*("\s*\/?>)/, `$1${escapedDescription}$2`);
  html = replaceAttr(html, /(<meta name="twitter:title" content=")[^"]*("\s*\/?>)/, `$1${escapedTitle}$2`);
  html = replaceAttr(html, /(<meta name="twitter:description" content=")[^"]*("\s*\/?>)/, `$1${escapedDescription}$2`);

  if (meta.ogImage) {
    const ogImage = `${SITE_URL}${meta.ogImage}`;
    html = replaceAttr(html, /(<meta property="og:image" content=")[^"]*("\s*\/?>)/, `$1${escapeAttr(ogImage)}$2`);
    html = replaceAttr(html, /(<meta name="twitter:image" content=")[^"]*("\s*\/?>)/, `$1${escapeAttr(ogImage)}$2`);
  }

  fs.writeFileSync(filePath, html, 'utf8');
  return true;
}

function walk(dir: string): string[] {
  const files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

if (!fs.existsSync(englishDir)) {
  throw new Error(`[seo-meta-prerender] English prerender directory not found: ${englishDir}`);
}

const files = walk(englishDir);
for (const file of files) applyMeta(file);

console.log(`[seo-meta-prerender] Normalized English metadata for ${files.length} prerendered HTML files using route-metadata.ts.`);
