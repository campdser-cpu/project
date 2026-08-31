const fs = require('fs');
const cp = [0x20AC,0x0081,0x201A,0x0192,0x201E,0x2026,0x2020,0x2021,0x02C6,0x2030,0x0160,0x2039,0x0152,0x008D,0x017D,0x008F,0x0090,0x2018,0x2019,0x201C,0x201D,0x2022,0x2013,0x2014,0x02DC,0x2122,0x0161,0x203A,0x0153,0x009E,0x017E,0x0178];
const cmap = new Map(); cp.forEach((c,i)=>cmap.set(String.fromCharCode(c),0x80+i));
function enc(s){const b=Buffer.alloc(s.length);for(let i=0;i<s.length;i++){const c=s[i];b[i]=cmap.has(c)?cmap.get(c):(c.codePointAt(0)&0xff);}return b;}
const R = /[\u0080-\u00FF\u20AC\u201A\u0192\u201E\u2026\u2020\u2021\u02C6\u2030\u0160\u2039\u0152\u017D\u2018\u2019\u201C\u201D\u2022\u2013\u2014\u02DC\u2122\u0161\u203A\u0153\u017E\u0178]+/g;
const file='src/components/seo/route-metadata.ts';
let src=fs.readFileSync(file,'utf8');
let changedRuns=0;
src=src.replace(R,(run)=>{ if(run.length<2) return run; const out=enc(run).toString('utf8'); if(out.includes('\uFFFD')||!/[^\x00-\x7F]/.test(out)||out===run) return run; changedRuns++; return out; });
fs.writeFileSync(file,src);
const after=fs.readFileSync(file,'utf8');
let remain=0;let tmp; const mojiR=/[\u0080-\u00FF\u20AC\u201A\u0192\u201E\u2026\u2020\u2021\u02C6\u2030\u0160\u2039\u0152\u017D\u2018\u2019\u201C\u201D\u2022\u2013\u2014\u02DC\u2122\u0161\u203A\u0153\u017E\u0178]+/g;
while((tmp=mojiR.exec(after))){if(tmp[0].length>=2){const o=enc(tmp[0]).toString('utf8');if(!o.includes('\uFFFD')&&o!==tmp[0]&&/[\u0600-\u06FF]/.test(o))remain++;}}
console.log('Latin mojibake runs recovered:',changedRuns);
console.log('remaining Arabic-producing mojibake runs:',remain);
console.log('proper Arabic still present:',/[\u0600-\u06FF]/.test(after));
console.log('proper em-dash present:',after.includes('\u2014'));
console.log('proper e-acute present:',after.includes('\u00E9'));
console.log('U+FFFD present:',after.includes('\uFFFD'));
