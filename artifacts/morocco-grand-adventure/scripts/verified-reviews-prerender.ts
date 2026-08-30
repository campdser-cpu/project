import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { verifiedGoogleReviews } from '../src/data/verifiedReviews';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(scriptDir, '..', 'dist');

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function link(url: string, text: string): string {
  return `<a href="${escapeHtml(url)}" rel="nofollow noopener" target="_blank">${escapeHtml(text)}</a>`;
}

function buildReviewBlocks(): string {
  return verifiedGoogleReviews.map((review) => `
      <article class="prerendered-review">
        <h3 class="prerendered-review-author">${escapeHtml(review.name)}</h3>
        <p class="prerendered-review-source">Google Review</p>
        <p class="prerendered-review-rating">${'★'.repeat(review.rating)}</p>
        <p class="prerendered-review-text">${escapeHtml(review.text)}</p>
        <p class="prerendered-review-source-link">${link(review.sourceUrl, 'See original review on Google')}</p>
      </article>`).join('\n');
}

function replaceBalancedDiv(html: string, className: string, replacement: string): string {
  const marker = `class="${className}"`;
  const markerIndex = html.indexOf(marker);
  if (markerIndex < 0) return html;
  const start = html.lastIndexOf('<div', markerIndex);
  if (start < 0) return html;

  let depth = 0;
  let i = start;
  while (i < html.length) {
    const nextOpen = html.indexOf('<div', i + 4);
    const nextClose = html.indexOf('</div>', i + 4);
    if (nextClose < 0) return html;
    if (nextOpen >= 0 && nextOpen < nextClose) {
      depth++;
      i = nextOpen;
    } else {
      depth--;
      i = nextClose + 6;
      if (depth === 0) {
        return html.slice(0, start) + `<div class="${className}">\n${replacement}\n    </div>` + html.slice(i);
      }
    }
  }
  return html;
}

function removeLegacyReviewDivs(html: string): string {
  // The legacy prerenderer emits simple, non-nested review divs after the
  // review container. Remove them deterministically so no placeholder
  // customer names or copy can survive into crawlable HTML.
  return html.replace(/<div class="prerendered-review">[\s\S]*?<\/div>\s*/g, '');
}

function removeReviewJsonLd(html: string): string {
  const scriptPattern = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  return html.replace(scriptPattern, (full, json) => {
    try {
      const data = JSON.parse(json);
      return JSON.stringify(data).includes('"@type":"Review"') ? '' : full;
    } catch {
      return full;
    }
  });
}

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

if (!fs.existsSync(distDir)) process.exit(0);
const replacement = buildReviewBlocks();
for (const file of walk(distDir)) {
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('prerendered-reviews-container')) {
    html = replaceBalancedDiv(html, 'prerendered-reviews-container', replacement);
  }
  html = removeLegacyReviewDivs(html);
  html = removeReviewJsonLd(html);
  fs.writeFileSync(file, html, 'utf8');
}

console.log(`[verified-reviews-prerender] Applied ${verifiedGoogleReviews.length} verified Google reviews, removed legacy review blocks, and removed Review JSON-LD from prerendered HTML.`);
