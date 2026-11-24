// mpgink brand stack: each brand's real favicon, its URL, and a QR to that URL, stacked.
// Light-garment (ink text) and dark-garment (cream text) versions, transparent, 300 dpi-class.
const fs = require('fs'), path = require('path');
// needs qrcode + playwright: npm i qrcode, then run with NODE_PATH pointing at both
const QRCode = require('qrcode');
const { chromium } = require('playwright');
const D = __dirname, OUT = path.join(D, 'out'); fs.mkdirSync(path.join(OUT, 'qr'), { recursive: true });
const b64 = (f, mime) => `data:${mime};base64,` + fs.readFileSync(f).toString('base64');

// [slug, url shown, url encoded, favicon source] — favicons pulled from each live site / its repo
const BRANDS = [
  ['mpgink', 'mpgink.com', 'https://mpgink.com', b64(path.join(D, '../../images/mpgink-favicon.png'), 'image/png')],
  ['phreezer', 'phreezer.mpgink.com', 'https://phreezer.mpgink.com', b64(path.join(D, 'icons/phreezer-512.png'), 'image/png')],
  ['jobodyssey', 'jobodyssey.mpgink.com', 'https://jobodyssey.mpgink.com', b64(path.join(D, 'icons/jobodyssey.svg'), 'image/svg+xml')],
  ['onepercent', 'onepercent.mpgink.com', 'https://onepercent.mpgink.com', b64(path.join(D, 'icons/onepercent.svg'), 'image/svg+xml')],
];
const INK = '#0f0c07', CREAM = '#f3f0e8';

// QR as crisp vector: dark modules on a cream plate (dark-on-light scans on every reader)
// 4-module quiet zone = the QR spec. plate=false → transparent (the garment is the quiet zone)
function qrSvg(text, { quiet = 4, fg = INK, plate = true } = {}) {
  const q = QRCode.create(text, { errorCorrectionLevel: 'M' }); const n = q.modules.size, d = q.modules.data;
  let r = ''; for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (d[y * n + x]) r += `<rect x="${x + quiet}" y="${y + quiet}" width="1.02" height="1.02"/>`;
  const s = n + quiet * 2;
  return { n, svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${s}" shape-rendering="crispEdges">${plate ? `<rect width="${s}" height="${s}" rx="1.2" fill="${CREAM}"/>` : ''}<g fill="${fg}">${r}</g></svg>` };
}
const QRV = {
  light: Object.fromEntries(BRANDS.map(([slug, , url]) => [slug, qrSvg(url, { fg: INK, plate: false })])),
  dark: Object.fromEntries(BRANDS.map(([slug, , url]) => [slug, qrSvg(url, { fg: CREAM, plate: false })])),
  'dark-plated': Object.fromEntries(BRANDS.map(([slug, , url]) => [slug, qrSvg(url)])),
};
for (const [v, set] of Object.entries(QRV)) for (const [slug, q] of Object.entries(set)) fs.writeFileSync(path.join(OUT, 'qr', `qr-${slug}-${v}.svg`), q.svg);

const row = ([slug, shown, , icon], text, QR) => `<div class="row">
  <img class="ic" src="${icon}" alt="">
  <div class="url" style="color:${text}">${shown}</div>
  <div class="qr">${QR[slug].svg.replace('<svg ', '<svg style="width:100%;height:100%;display:block" ')}</div></div>`;
const stack = (id, text) => `<div id="${id}" class="stack">${BRANDS.map(b => row(b, text, QRV[id])).join('')}</div>`;
const page = body => `<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@700&display=block" rel="stylesheet"><style>
html,body{margin:0;background:transparent}.stack{display:inline-flex;flex-direction:column;gap:22px;padding:14px}
.row{display:grid;grid-template-columns:120px 1fr 124px;align-items:center;gap:22px;width:780px}
.ic{width:120px;height:120px;border-radius:26px;object-fit:cover;display:block}
.url{font-family:'Courier Prime';font-weight:700;font-size:37px;letter-spacing:.2px;white-space:nowrap}
.qr{width:124px;height:124px}</style></head><body>${body}</body></html>`;

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 900, height: 900 }, deviceScaleFactor: 3 });
  for (const [id, text] of [['light', INK], ['dark', CREAM], ['dark-plated', CREAM]]) {
    await p.setContent(page(stack(id, text)), { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
    if (!(await p.evaluate(() => document.fonts.check("700 37px 'Courier Prime'")))) { console.error('FONT NOT LOADED'); process.exit(1); }
    const broken = await p.evaluate(() => [...document.images].filter(i => !i.complete || !i.naturalWidth).length);
    if (broken) { console.error('BROKEN FAVICONS', broken); process.exit(1); }
    const over = await p.evaluate(() => [...document.querySelectorAll('.url')].filter(u => u.scrollWidth > u.clientWidth).length);
    if (over) { console.error('URL TEXT OVERFLOWS', over); process.exit(1); }
    await (await p.$('#' + id)).screenshot({ path: path.join(OUT, `brand-stack-${id}.png`), omitBackground: true });
  }
  await b.close();
  console.log('rendered 3 variants');
})();
