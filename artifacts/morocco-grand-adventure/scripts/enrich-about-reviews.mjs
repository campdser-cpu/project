import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const languages = ['en', 'fr', 'es', 'it', 'de', 'nl', 'pt', 'zh', 'ja', 'ko', 'ar'];

const reviews = [
  {
    name: 'Nina Branderhorst',
    text: "Mohamed was recommended as a guide by a friend and feel lucky for the wonderful experience I’ve had exploring Merzouga and the Sahara. Not only does he speak many languages, he is knowledgeable and happy to share about the culture, customs and the history of the Amazight and gives you the local experience. He goes out of his way to provide a tailor made trip that is just to your wishes. I would definitely encourage everyone to visit the desert at least once in their life because this has been an amazing and unforgettable journey for me!",
  },
  {
    name: 'Natalia Cuadrado',
    text: 'Mohamed es muy buen guía. Sabe mucho de Marruecos y tiene mucho que enseñar. Recomiendo muchísimo dejarte llevar en tu viaje por él, es maravilloso.',
  },
  {
    name: 'Krešimir Mikić',
    text: 'Mohamed was a excellent tour guide!',
  },
];

const esc = (s) => s
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const reviewMarkup = `
    <section class="prerendered-mohamed-reviews" aria-labelledby="mohamed-reviews-heading">
      <h2 id="mohamed-reviews-heading">Verified Google reviews about Mohamed</h2>
      <p>These are authentic customer reviews reproduced from the verified Google review source. Customer review photos are intentionally not displayed.</p>
      <div class="prerendered-reviews-container">
${reviews.map((r) => `        <figure class="prerendered-review">
          <blockquote>“${esc(r.text)}”</blockquote>
          <figcaption>${esc(r.name)} · Google · 5/5</figcaption>
        </figure>`).join('\n')}
      </div>
    </section>
`;

let changed = 0;
for (const lang of languages) {
  const file = path.join(dist, lang, 'about', 'index.html');
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, 'utf8');
  if (html.includes('prerendered-mohamed-reviews')) continue;
  const marker = /\n\s*<\/div>\s*\n\s*<noscript>/;
  if (!marker.test(html)) throw new Error(`[about-reviews] Could not find About body marker in ${file}`);
  const next = html.replace(marker, `${reviewMarkup}  </div>\n    <noscript>`);
  fs.writeFileSync(file, next, 'utf8');
  changed++;
}
console.log(`[about-reviews] injected verified Mohamed review excerpts into ${changed} prerendered About pages.`);
