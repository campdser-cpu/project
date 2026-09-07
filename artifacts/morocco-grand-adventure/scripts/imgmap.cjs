const fs = require('fs');
const path = require('path');
const root = 'dist';
const map = {};
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    e.isDirectory() ? walk(f) : (e.name.endsWith('.html') && go(f));
  }
}
function go(f) {
  const h = fs.readFileSync(f, 'utf8');
  const m = /\/images\/([^\"'> ]+?)(?:-480w|-768w)?\.(webp|jpg|jpeg|png)/g;
  const ids = new Set();
  let mc; while ((mc = m.exec(h))) ids.add('/images/' + mc[1] + '.' + mc[2]);
  ids.forEach(fn => {
    map[fn] = map[fn] || [];
    map[fn].push(path.relative(root, f));
  });
}
walk(root);
const out = Object.keys(map).sort();
for (const k of out) {
  console.log(k + ' (' + map[k].length + '): ' + map[k].join(', '));
}