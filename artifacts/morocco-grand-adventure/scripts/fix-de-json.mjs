import fs from 'node:fs';
const p = 'scripts/dump/tr/de.json';
let s = fs.readFileSync(p, 'utf8');
// Step 1: restore ALL legit value-end closing quotes: Marrakesch» -> Marrakesch"
s = s.split('Marrakesch»').join('Marrakesch"');
// Step 2: re-break only the bad line 251 (Taroudant desc): value contains inner German quote Marrakesch" -> Marrakesch»
s = s.split('«kleinen Marrakesch"').join('«kleinen Marrakesch»');
fs.writeFileSync(p, s);
const t = JSON.parse(s);
const m = JSON.parse(fs.readFileSync('scripts/dump/missing606.json', 'utf8'));
const miss = Object.keys(m).filter((k) => !(k in t));
console.log('de:', Object.keys(t).length, 'missing:', miss.length);
if (miss.length) console.log(miss.join(','));


