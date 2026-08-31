const fs = require('fs');
const cp1252 = [0x20AC,0x0081,0x201A,0x0192,0x201E,0x2026,0x2020,0x2021,0x02C6,0x2030,0x0160,0x2039,0x0152,0x008D,0x017D,0x008F,0x0090,0x2018,0x2019,0x201C,0x201D,0x2022,0x2013,0x2014,0x02DC,0x2122,0x0161,0x203A,0x0153,0x009E,0x017E,0x0178];
const cmap = new Map();
cp1252.forEach((cp, i) => cmap.set(String.fromCharCode(cp), 0x80 + i));
function enc1252(s) { const b = Buffer.alloc(s.length); for (let i = 0; i < s.length; i++) { const c = s[i]; b[i] = cmap.has(c) ? cmap.get(c) : (c.codePointAt(0) & 0xff); } return b; }
function isMojibake(s) { return /[\u0080-\u00FF]/.test(s) && !/[\u0600-\u06FF]/.test(s); }
function recover(s) { const out = enc1252(s).toString('utf8'); return out.includes('\uFFFD') ? null : out; }

function decodeLit(inner, quote) {
  let out = ''; let i = 0;
  while (i < inner.length) {
    const c = inner[i];
    if (c === '\\') {
      const n = inner[i + 1];
      if (n === 'n') { out += '\n'; i += 2; }
      else if (n === 'r') { out += '\r'; i += 2; }
      else if (n === 't') { out += '\t'; i += 2; }
      else if (n === 'b') { out += '\b'; i += 2; }
      else if (n === 'f') { out += '\f'; i += 2; }
      else if (n === 'v') { out += '\v'; i += 2; }
      else if (n === '0' && /[^0-9]/.test(inner[i + 2] || '')) { out += '\0'; i += 2; }
      else if (n === 'x') { out += String.fromCharCode(parseInt(inner.substr(i + 2, 2), 16)); i += 4; }
      else if (n === 'u' && inner[i + 2] === '{') { const j = inner.indexOf('}', i + 3); out += String.fromCodePoint(parseInt(inner.slice(i + 3, j), 16)); i = j + 1; }
      else if (n === 'u') { out += String.fromCharCode(parseInt(inner.substr(i + 2, 4), 16)); i += 6; }
      else { out += n; i += 2; }
    } else { out += c; i++; }
  }
  return out;
}
function encodeLit(val, quote) {
  let out = '';
  for (const ch of val) {
    const cp = ch.codePointAt(0);
    if (ch === '\\') out += '\\\\';
    else if (ch === quote) out += '\\' + quote;
    else if (ch === '\n') out += '\\n';
    else if (ch === '\r') out += '\\r';
    else if (ch === '\t') out += '\\t';
    else if (cp < 0x20) out += '\\u' + cp.toString(16).padStart(4, '0');
    else out += ch;
  }
  return out;
}
const file = 'src/components/seo/route-metadata.ts';
const src = fs.readFileSync(file, 'utf8');
const re = /("((?:[^"\\]|\\.)*)")|('((?:[^'\\]|\\.)*)')/g;
const pre = src + '.prelatinbak2'; fs.writeFileSync(file + '.prelatinbak2', src);
let out = ''; let last = 0; let m; let changed = 0;
while ((m = re.exec(src))) {
  const full = m[0]; const quote = m[1] ? '"' : "'";
  const inner = m[1] ? m[2] : m[4];
  const decoded = decodeLit(inner, quote);
  if (isMojibake(decoded)) {
    const rec = recover(decoded);
    if (rec && rec !== decoded) {
      const enc = encodeLit(rec, quote);
      out += src.slice(last, m.index) + quote + enc + quote;
      changed++;
      last = m.index + full.length;
      continue;
    }
  }
  last = m.index + full.length;
}
out += src.slice(last);
fs.writeFileSync(file, out);
console.log('Latin cp1252 strings recovered (proper escape handling):', changed);
