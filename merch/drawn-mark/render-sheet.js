const fs = require('fs'), path = require('path'), { chromium } = require('playwright');
const D = __dirname; const svg = fs.readFileSync(path.join(D, 'out', 'mpgink-drawn.svg'), 'utf8');
const src = 'data:image/png;base64,' + fs.readFileSync(path.join(D, 'source-canvas.png')).toString('base64');
const t = (fg, bg, w) => `<div style="background:${bg};padding:28px 34px;display:flex;align-items:center;justify-content:center">${svg.replace('<svg ', `<svg style="width:${w}px;display:block;color:${fg}" `)}</div>`;
const html = `<!doctype html><html><body style="margin:0;background:#e9e6df"><div id="s" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:12px;width:1300px">
<div style="background:#fff;display:flex;align-items:center;justify-content:center;padding:10px"><img src="${src}" style="width:560px;display:block"></div>
${t('#0f0c07', '#efece4', 560)}${t('#f3f0e8', '#161616', 560)}${t('#ff5a1f', '#161616', 560)}
<div style="grid-column:span 2;display:grid;grid-template-columns:repeat(4,1fr);gap:8px">${t('#0f0c07', '#efece4', 240)}${t('#f3f0e8', '#161616', 120)}${t('#0f0c07', '#efece4', 64)}${t('#f3f0e8', '#161616', 40)}</div>
</div></body></html>`;
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1330, height: 1000 } });
  await p.setContent(html, { waitUntil: 'networkidle' }); await (await p.$('#s')).screenshot({ path: path.join(D, 'out', 'mpgink-drawn-sheet.png') }); await b.close(); })();
