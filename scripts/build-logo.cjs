/**
 * Morocco Grand Adventure — logo build script
 * Generates horizontal logo SVGs (white + dark themes) and renders
 * transparent PNGs via sharp. The symbol recreates the existing brand
 * mark: Moorish arch, palm, camel, kasbah tower, sun, dunes, wave.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const OUT = path.join(__dirname, '..', 'public', 'images', 'logo');
fs.mkdirSync(OUT, { recursive: true });

function symbol(c) {
  // c: {arch, primary, secondary, sun, duneLight, duneDark, waveLight, text, accentText}
  return `
  <!-- ================= BRAND SYMBOL ================= -->
  <g>
    <!-- Moorish keyhole arch outline -->
    <path d="M64,236 L64,132 C64,84 92,58 116,47 C131,40 132,28 142,28 C152,28 153,40 168,47 C192,58 220,84 220,132 L220,236"
      fill="none" stroke="${c.arch}" stroke-width="7" stroke-linecap="round"/>

    <!-- interior scene clipped to the arch -->
    <defs>
      <clipPath id="archClip">
        <path d="M64,236 L64,132 C64,84 92,58 116,47 C131,40 132,28 142,28 C152,28 153,40 168,47 C192,58 220,84 220,132 L220,236 Z"/>
      </clipPath>
    </defs>
    <g clip-path="url(#archClip)">
      <!-- sun -->
      <circle cx="182" cy="96" r="21" fill="${c.sun}"/>
      <!-- far dune -->
      <path d="M60,196 C90,168 120,162 150,180 C178,196 200,192 226,176 L226,240 L60,240 Z" fill="${c.duneLight}"/>
      <!-- near dune -->
      <path d="M60,214 C95,196 135,198 170,212 C192,221 212,220 226,212 L226,240 L60,240 Z" fill="${c.duneDark}"/>


      <!-- kasbah tower -->
      <g fill="${c.secondary}">
        <path d="M186,150 L186,132 L191,132 L191,138 L196,138 L196,132 L201,132 L201,138 L206,138 L206,132 L211,132 L211,138 L216,138 L216,132 L221,132 L221,150 L226,158 L226,240 L186,240 L186,158 Z"/>
        <rect x="200" y="170" width="7" height="16" rx="3" fill="${c.duneLight}"/>
        <rect x="200" y="196" width="7" height="16" rx="3" fill="${c.duneLight}"/>
      </g>

      <!-- palm tree -->
      <g fill="${c.primary}">
        <path d="M84,238 C90,202 86,170 70,138 L80,132 C98,166 102,204 96,238 Z"/>
        <path d="M76,136 C58,122 40,117 27,123 C42,125 58,133 71,145 C75,142 77,139 76,136 Z"/>
        <path d="M75,135 C68,116 57,105 44,101 C53,111 62,124 69,140 C72,139 74,137 75,135 Z"/>
        <path d="M76,134 C76,114 72,100 61,91 C64,104 67,119 70,136 C72,136 74,135 76,134 Z"/>
        <path d="M76,135 C85,117 98,108 112,108 C101,115 90,124 84,139 C81,138 78,137 76,135 Z"/>
        <path d="M77,136 C94,126 109,125 120,131 C108,132 95,136 83,144 C80,141 78,139 77,136 Z"/>
        <path d="M75,137 C79,152 89,163 102,168 C93,159 85,150 80,139 C78,138 76,138 75,137 Z"/>
      </g>

      <!-- camel silhouette -->
      <g fill="${c.primary}" transform="translate(-22,4)">
        <path d="M120,212 L122,188 C117,183 115,172 118,164 C120,155 128,149 138,147 C142,136 156,134 161,144 C163,148 164,152 163,156 L170,164 L177,150 C179,144 186,142 191,146 L198,148 C201,149 201,153 198,154 L191,156 C189,160 184,162 180,161 L173,168 C172,174 169,178 165,181 L167,190 L171,212 L162,212 L158,190 C152,193 144,193 139,190 L135,212 Z"/>
        <path d="M141,147 L162,146 L164,160 L139,162 Z" fill="${c.secondary}"/>
        <rect x="146" y="162" width="3" height="9" fill="${c.secondary}"/>
        <rect x="153" y="161" width="3" height="10" fill="${c.secondary}"/>
      </g>
    </g>

    <!-- flowing dune waves below the arch -->
    <path d="M28,244 C60,230 96,232 132,244 C168,256 204,258 238,246"
      fill="none" stroke="${c.primary}" stroke-width="8" stroke-linecap="round"/>
    <path d="M40,262 C74,250 110,252 146,262 C180,271 210,270 232,262"
      fill="none" stroke="${c.waveLight}" stroke-width="6" stroke-linecap="round"/>
  </g>`;
}

function logoSvg(c) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 975 290" width="975" height="290" role="img" aria-label="Morocco Grand Adventure">
  ${symbol(c)}
  <!-- ================= WORDMARK ================= -->
  <g font-family="Georgia, 'Times New Roman', serif">
    <text x="286" y="150" font-size="86" font-weight="bold" letter-spacing="10"
      fill="${c.text}">MOROCCO</text>
    <g fill="${c.accentText}">
      <text x="290" y="215" font-size="34" letter-spacing="14">GRAND</text>
      <text x="560" y="215" font-size="34" letter-spacing="14">ADVENTURE</text>
      <path d="M522,203 l7,8 -7,8 -7,-8 Z"/>
      <path d="M536,203 l5,8 -5,8 -5,-8 Z" opacity="0.7"/>
    </g>
    <g stroke="${c.accentText}" stroke-width="2" opacity="0.9">
      <line x1="292" y1="242" x2="680" y2="242"/>
      <line x1="760" y1="242" x2="938" y2="242"/>
    </g>
    <g fill="${c.accentText}">
      <path d="M712,242 l8,-9 8,9 -8,9 Z M720,236 l4,6 -4,6 -4,-6 Z" fill-rule="evenodd"/>
      <circle cx="745" cy="242" r="2.5"/><circle cx="947" cy="242" r="0"/>
    </g>
  </g>
</svg>`;
}

const themes = {
  white: {
    arch: '#FFFFFF', primary: '#FFFFFF', secondary: '#F3D9A4', sun: '#E9C87E',
    duneLight: '#EFD9AC', duneDark: '#D9B878', waveLight: '#EFD9AC',
    text: '#FFFFFF', accentText: '#EFD9AC',
  },
  dark: {
    arch: '#1E3B2C', primary: '#1E3B2C', secondary: '#A9552D', sun: '#C89B4B',
    duneLight: '#D8BE8F', duneDark: '#B08A4F', waveLight: '#C89B4B',
    text: '#1E3B2C', accentText: '#A97C2F',
  },
};

(async () => {
  const outputs = [];
  for (const [name, c] of Object.entries(themes)) {
    const svg = logoSvg(c);
    const svgPath = path.join(OUT, `mga-logo-horizontal-${name}.svg`);
    fs.writeFileSync(svgPath, svg);
    outputs.push({ name, svgPath });
  }

  const jobs = [];
  for (const { name, svgPath } of outputs) {
    const base = sharp(svgPath, { density: 300 });
    jobs.push(
      base.clone().resize({ height: 80 }).png().toFile(path.join(OUT, `mga-logo-navbar-${name}.png`)),
      base.clone().resize({ height: 160 }).png().toFile(path.join(OUT, `mga-logo-header-${name}.png`)),
      base.clone().resize({ width: 2400 }).png().toFile(path.join(OUT, `mga-logo-hires-${name}.png`)),
    );
  }
  await Promise.all(jobs);

  for (const { name } of outputs) {
    const f = path.join(OUT, `mga-logo-navbar-${name}.png`);
    const { data, info } = await sharp(f).raw().toBuffer({ resolveWithObject: true });
    const px = (x, y) => data[(y * info.width + x) * info.channels + 3];
    console.log(`${name}: ${info.width}x${info.height} ch=${info.channels} alpha@corner=${px(0,0)} alpha@gap=${px(Math.round(info.width*0.26),5)} alpha@center=${px(Math.round(info.width/2),Math.round(info.height/2))}`);
  }
  console.log('Done. Files in', OUT);
})().catch((e) => { console.error(e); process.exit(1); });
