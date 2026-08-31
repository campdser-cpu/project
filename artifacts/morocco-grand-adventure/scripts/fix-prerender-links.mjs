import { promises as fs } from "node:fs";
import path from "node:path";

const distRoot = path.resolve("dist");
const anchorPattern = /&lt;a href=&quot;([^&]+)&quot;&gt;([\s\S]*?)&lt;\/a&gt;/g;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(fullPath)));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(fullPath);
  }
  return files;
}

const htmlFiles = await walk(distRoot);
let changedFiles = 0;
let replacements = 0;

for (const file of htmlFiles) {
  const original = await fs.readFile(file, "utf8");
  const fixed = original.replace(anchorPattern, (_match, href, label) => {
    replacements += 1;
    return `<a href="${href}">${label}</a>`;
  });

  if (fixed !== original) {
    await fs.writeFile(file, fixed, "utf8");
    changedFiles += 1;
  }
}

console.log(`[prerender-link-fix] scanned ${htmlFiles.length} HTML files; fixed ${replacements} escaped anchors across ${changedFiles} files.`);
