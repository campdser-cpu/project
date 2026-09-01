// Validate every JSON-LD block in every prerendered HTML file parses as JSON.
// Invalid structured data silently disables rich results, so the build fails here.
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectDir = resolve(resolve(dirname()), '..');
function dirname() { return fileURLToPath(import.meta.url).replace(/[^\\/]+$/, ''); }
const distDir = join(projectDir, 'dist');

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const files = walk(distDir);
let blocks = 0;
let bad = 0;
const errors = [];
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  const rel = relative(distDir, f).split('\\').join('/');
  const matches = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  for (const m of matches) {
    blocks++;
    try {
      JSON.parse(m[1]);
    } catch (e) {
      bad++;
      errors.push(rel + ': invalid JSON-LD (' + e.message.slice(0, 80) + ')');
    }
  }
}
console.log('[jsonld-audit] ' + files.length + ' HTML files, ' + blocks + ' JSON-LD blocks, ' + bad + ' invalid');
if (bad > 0) {
  for (const e of errors.slice(0, 20)) console.error('  x ' + e);
  process.exit(1);
}
console.log('[jsonld-audit] PASS');