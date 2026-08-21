#!/usr/bin/env node
/**
 * scripts/build-afm-pages.mjs — generates the AFM web archive.
 *
 * Single source (kit-single-source): scripts/afm-editions.json is the manifest;
 * afm/content/ed###.md holds each edition's shipped narrative (copied verbatim
 * from aloha-friday-motivation/editions/ed###/AFM_Narrative_Ed###_Final.md).
 * This script generates BOTH the per-edition pages (afm/ed###.html) AND the
 * catalog rows in newsletter.html (between the AFM-CATALOG markers), so the
 * index can never drift from the pages.
 *
 * Weekly flow: add the manifest entry, drop the narrative md and the card jpg
 * (images/afm/afm-ed###-card.jpg), run `node scripts/build-afm-pages.mjs`,
 * then `node scripts/check-site.mjs` before committing.
 *
 * NO DEPENDENCIES on purpose — same contract as check-site.mjs.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(readFileSync(join(ROOT, "scripts", "afm-editions.json"), "utf8"));
const editions = manifest.editions.slice().sort((a, b) => a.num - b.num);

/* ── markdown subset → html ─────────────────────────────────────────────────
 * The narratives use only: paragraphs, [text](url) links (urls may contain one
 * level of parens), *em*, **strong**, ***strong-em***. Everything else that
 * appears in the files is email/LinkedIn plumbing and is stripped:
 * the H1, the Teaser line (carried by the manifest), `---` rules, the
 * microcast placeholder, and the trailing "Aloha Friday Motivation · Edition"
 * sign-off line (the page renders its own).
 */
function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
// Real weekday from the ISO date — most editions are Fridays, but not all
// (ed290/ed304 went out Thursday, ed307 Saturday); never claim FRIDAY blind.
const WEEKDAYS = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
function weekdayName(isoDate) {
  return WEEKDAYS[new Date(`${isoDate}T12:00:00Z`).getUTCDay()];
}
function inline(s) {
  let h = esc(s);
  // links — allow one level of nested parens in the url (Wikipedia)
  h = h.replace(/\[([^\]]+)\]\(((?:[^()\s]|\([^()]*\))+)\)/g, (m, text, url) => {
    const external = !/^(https?:)?\/\/(www\.)?mpgink\.com/.test(url) && /^https?:/.test(url);
    const attrs = external ? ' target="_blank" rel="noopener"' : "";
    return `<a href="${url}"${attrs}>${text}</a>`;
  });
  h = h.replace(/\*\*\*([^*]+)\*\*\*/g, "<strong><em>$1</em></strong>");
  h = h.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  h = h.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return h;
}
function narrativeToHtml(md) {
  const out = [];
  for (const raw of md.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("# ")) continue;                       // H1 — page has its own
    if (line === "---") continue;                              // hr plumbing
    if (line.startsWith("**Teaser:**")) continue;              // manifest carries it
    if (/^\[MICROCAST LINK/.test(line)) continue;              // Matthew-embed placeholder
    if (/^\*\[Aloha Friday Motivation\]/.test(line)) continue; // md sign-off — page renders its own
    out.push(`<p>${inline(line)}</p>`);
  }
  return out.join("\n");
}

/* ── shared page chrome ──────────────────────────────────────────────────── */
const NAV = `<header class="site-nav">
  <div class="nav-inner">
    <a href="../index.html" class="nav-logo">
      <img src="../images/mpgink-favicon.png" alt="mpgink logomark">
      <span class="nav-wordmark">mpgink</span>
      <span class="nav-cipher">13·16·7</span>
    </a>
    <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="site-menu">MENU</button>
    <nav id="site-menu">
      <a class="nav-link" href="../index.html#exhibits">THE EXHIBITS</a>
      <a class="nav-link" href="../newsletter.html">AFM</a>
      <a class="nav-link" href="../studio.html">STUDIO</a>
      <a class="nav-link" href="../shop.html">SHOP</a>
      <a class="nav-link" href="../about.html">ABOUT</a>
      <a class="nav-link" href="../ai-usage.html">AI</a>
      <a class="nav-cta" href="../contact.html">SAY ALOHA</a>
    </nav>
  </div>
</header>`;

const FOOTER = `<footer class="site-footer">
  <div class="footer-grid">
    <div>
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:18px">
        <img src="../images/mpgink-favicon.png" alt="mpgink logomark" style="width:40px;height:40px;border-radius:9px">
        <span style="font-family:'Archivo',sans-serif;font-stretch:120%;font-weight:900;font-size:24px">mpgink</span>
      </div>
      <p style="font-family:'Archivo',sans-serif;font-size:14.5px;line-height:1.7;color:rgba(243,240,232,0.62);max-width:38ch;margin:0 0 20px">a creative collective — mission · passion · gratitude · building AI&#8209;augmented products people actually use.</p>
      <p style="font-family:'Courier Prime',monospace;font-size:11.5px;letter-spacing:1.2px;color:#8a8172;margin:0">13 · 16 · 7</p>
    </div>
    <div class="footer-col">
      <span class="footer-heading">THE EXHIBITS</span>
      <a class="footer-link" href="../phreezer.html">PHREEZER</a>
      <a class="footer-link" href="../job-odyssey.html">JOB ODYSSEY</a>
      <a class="footer-link" href="../one-percent.html">ONE PERCENT</a>
      <a class="footer-link" href="../newsletter.html">ALOHA FRIDAY MOTIVATION</a>
      <a class="footer-link" href="../metta.html">METTA — SOON</a>
    </div>
    <div class="footer-col">
      <span class="footer-heading">THE STUDIO</span>
      <a class="footer-link-gold" href="../signup.html">JOIN THE LIST ✶</a>
      <a class="footer-link" href="../studio.html">BOOKS + BLOG</a>
      <a class="footer-link" href="../shop.html">THE SHOP</a>
      <a class="footer-link" href="../ai-usage.html">AI USAGE</a>
      <a class="footer-link" href="../about.html">ABOUT</a>
      <a class="footer-link" href="../contact.html">SAY ALOHA</a>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="footer-bottom-inner">
      <span>© 2026 MPGINK — BUILT LO-FI. SHIPPED FAST. ITERATED IN PUBLIC.</span>
      <span style="display:flex;gap:18px;flex-wrap:wrap">
        <a href="https://www.linkedin.com/in/matthew-golia/" target="_blank" rel="noopener">LINKEDIN</a>
        <a href="https://www.instagram.com/mpgink" target="_blank" rel="noopener">INSTAGRAM</a>
        <a href="https://mattymattemodgepodge.etsy.com" target="_blank" rel="noopener">ETSY</a>
        <a href="https://buymeacoffee.com/mpgink" target="_blank" rel="noopener">COFFEE</a>
      </span>
    </div>
  </div>
</footer>`;

// The edition itself renders as a white "paper" artifact on the gallery wall —
// Georgia serif, same voice as the email subscribers receive.
const PAGE_CSS = `<style>
  .afm-paper { max-width: 720px; margin: 0 auto; background: #fffdf8; color: #2c2a24; box-shadow: 0 4px 10px rgba(0,0,0,0.35), 0 30px 80px rgba(0,0,0,0.5); border-radius: 6px; overflow: hidden; }
  .afm-paper-body { padding: 30px 48px 10px; font-family: Georgia, 'Times New Roman', serif; }
  .afm-paper-body p { margin: 0 0 19px; font-size: 18px; line-height: 1.72; }
  .afm-paper-body a { color: #a9791f; text-decoration: underline; }
  .afm-paper-body strong { color: #163b5c; }
  .afm-ed-head { font-family: Georgia, 'Times New Roman', serif; font-weight: bold; font-size: 24px; color: #163b5c; margin: 0 0 12px; }
  .afm-ed-teaser { font-family: Georgia, 'Times New Roman', serif; font-style: italic; font-size: 16px; color: #6a7a8a; line-height: 1.62; border-left: 3px solid #e8b84a; padding-left: 14px; margin: 0 0 22px; }
  .afm-card-wrap { padding: 4px 48px 34px; }
  .afm-card-wrap img { display: block; width: 100%; height: auto; border: 1px solid #e4dabf; border-radius: 4px; }
  .afm-paper-foot { background: #163b5c; text-align: center; padding: 24px 32px 22px; }
  .afm-paper-foot .rule { height: 3px; background: linear-gradient(90deg, rgba(224,170,62,0) 0%, #e8b84a 50%, rgba(224,170,62,0) 100%); margin: -24px -32px 22px; }
  .afm-ed-nav { display: flex; justify-content: space-between; gap: 18px; flex-wrap: wrap; max-width: 720px; margin: 26px auto 0; font-family: 'Courier Prime', monospace; font-size: 13.5px; letter-spacing: 1.6px; }
  .afm-ed-nav a { color: #ffcf6b; text-decoration: none; }
  .afm-ed-nav a:hover { text-decoration: underline; }
  .afm-ed-nav .dim { color: #9a8f7d; }
  @media (max-width: 700px) {
    .afm-paper-body { padding: 24px 22px 6px; }
    .afm-card-wrap { padding: 2px 22px 26px; }
  }
</style>`;

function pageHtml(ed, prev, next) {
  const slug = `ed${ed.num}`;
  const card = `afm-${slug}-card.jpg`;
  const hasCard = !ed.noCard;
  const ogImage = hasCard ? `https://mpgink.com/images/afm/${card}` : "https://mpgink.com/images/afm/afm-banner.jpg";
  const desc = ed.teaser || ed.catalog;
  const contentPath = join(ROOT, "afm", "content", `${slug}.md`);
  const hasNarrative = !ed.cardOnly && existsSync(contentPath);

  let paperInner;
  if (hasNarrative) {
    paperInner = narrativeToHtml(readFileSync(contentPath, "utf8"));
  } else {
    paperInner = `<p><em>${esc(ed.cardOnlyNote || "The narrative for this edition lives on LinkedIn.")}</em>${ed.linkedin ? ` <a href="${ed.linkedin}" target="_blank" rel="noopener">Read it there&nbsp;↗</a>` : ""}</p>`;
  }

  const prevLink = prev
    ? `<a href="ed${prev.num}.html">← ED. ${prev.num} — ${esc(prev.title).toUpperCase()}</a>`
    : `<span class="dim">← THIS IS THE OLDEST EDITION IN THE WEB ARCHIVE</span>`;
  const nextLink = next
    ? `<a href="ed${next.num}.html">ED. ${next.num} — ${esc(next.title).toUpperCase()} →</a>`
    : `<span class="dim">NEXT EDITION DROPS FRIDAY. NO EXCEPTIONS.</span>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AFM #${ed.num} — ${esc(ed.title)} — mpgink</title>
  <meta name="description" content="${esc(desc)}">

  <!-- Open Graph / Link Preview -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://mpgink.com/afm/${slug}.html">
  <meta property="og:title" content="AFM #${ed.num} — ${esc(ed.title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:image" content="${ogImage}">

  <!-- Twitter/X Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="AFM #${ed.num} — ${esc(ed.title)}">
  <meta name="twitter:description" content="${esc(desc)}">
  <meta name="twitter:image" content="${ogImage}">

  <!-- Favicon / home-screen icons -->
  <link rel="icon" type="image/png" sizes="32x32" href="../images/favicon-32.png">
  <link rel="icon" type="image/png" sizes="192x192" href="../images/icon-192.png">
  <link rel="apple-touch-icon" href="../images/apple-touch-icon.png">
  <link rel="manifest" href="../site.webmanifest">
  <meta name="theme-color" content="#0f0c07">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Courier+Prime:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../style.css">
  ${PAGE_CSS}
  <script src="../site.js" defer></script>
</head>
<body>

${NAV}

<div class="grain"></div>

<section style="max-width:900px;margin:0 auto;padding:56px 24px 30px">
  <div style="font-family:'Courier Prime',monospace;font-size:13.5px;letter-spacing:2.4px;color:#9a8f7d;margin-bottom:18px">EXHIBIT NO. 04 — WING A · THE AFM ARCHIVE · <a href="../newsletter.html" class="kicker-link">BACK TO THE CATALOG</a></div>
  <h1 style="font-family:'Archivo',sans-serif;font-stretch:118%;font-weight:900;font-size:clamp(34px,4.2vw,54px);letter-spacing:-1.5px;line-height:1.05;margin:0 0 14px">${esc(ed.title)}<span style="color:#ff5a1f">.</span></h1>
  <div style="font-family:'Courier Prime',monospace;font-size:13.5px;letter-spacing:2px;color:#ffcf6b">EDITION NO. ${ed.num} · ${weekdayName(ed.date)} ${ed.dateDisplay}${ed.linkedin ? ` · <a href="${ed.linkedin}" target="_blank" rel="noopener" style="color:#ffcf6b">ALSO ON LINKEDIN ↗</a>` : ""}</div>
</section>

<section style="max-width:900px;margin:0 auto;padding:8px 24px 60px">
  <article class="afm-paper">
    <img src="../images/afm/afm-banner.jpg" alt="Aloha Friday Motivation" style="display:block;width:100%;height:auto">
    <div class="afm-paper-body">
      <div class="afm-ed-head">AFM | ${esc(ed.title)} | #${ed.num}</div>
${ed.teaser ? `      <div class="afm-ed-teaser">${esc(ed.teaser)}</div>` : ""}
${paperInner}
    </div>
${hasCard ? `    <div class="afm-card-wrap">
      <img src="../images/afm/${card}" alt="AFM Edition #${ed.num} — ${esc(ed.title)} — visual card">
    </div>` : ""}
    <div class="afm-paper-foot">
      <div class="rule"></div>
      <img src="../images/afm/mpgink-monogram.png" alt="" width="34" height="34" style="display:block;margin:0 auto 10px;border-radius:50%;border:1px solid rgba(232,184,74,0.6)">
      <div style="font-family:Georgia,'Times New Roman',serif;font-weight:bold;font-size:15px;color:#ffffff;margin-bottom:4px">Aloha Friday Motivation</div>
      <div style="font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:12px;color:#c69a3e">· Edition #${ed.num} · Every Friday since 2018.</div>
    </div>
  </article>

  <nav class="afm-ed-nav" aria-label="Edition navigation">
    <span>${prevLink}</span>
    <span>${nextLink}</span>
  </nav>
</section>

<section style="border-top:1px solid rgba(243,240,232,0.14)">
  <div style="max-width:900px;margin:0 auto;padding:64px 24px 76px;text-align:center">
    <div style="font-family:'Archivo',sans-serif;font-stretch:115%;font-weight:900;font-size:clamp(26px,2.8vw,38px);letter-spacing:-1px;margin-bottom:12px">Get the next one in your inbox<span style="color:#ff5a1f">.</span></div>
    <p style="font-size:17px;color:rgba(243,240,232,0.65);margin:0 0 28px">Every Friday morning since 2018. Free, no spam, unsubscribe anytime.</p>
    <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap"><a href="../signup.html?src=afm-archive-${slug}" class="btn btn-gold" style="padding:16px 34px;font-size:13px;letter-spacing:2px">JOIN THE EMAIL LIST →</a><a href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7211006447474651136" target="_blank" rel="noopener" class="btn btn-outline" style="padding:16px 34px;font-size:13px;letter-spacing:2px">OR ON LINKEDIN ↗</a></div>
  </div>
</section>

${FOOTER}

</body>
</html>
`;
}

/* ── catalog rows in newsletter.html ────────────────────────────────────── */
function catalogRows() {
  const newest = editions[editions.length - 1];
  let lastYear = null;
  return editions.slice().reverse().map((ed) => {
    const isNewest = ed.num === newest.num;
    const year = ed.date.slice(0, 4);
    let divider = "";
    if (year !== lastYear) {
      if (lastYear !== null) {
        divider = `    <div style="font-family:'Courier Prime',monospace;font-size:14px;letter-spacing:2.6px;color:#8a8172;padding:52px 8px 8px;border-bottom:1px solid rgba(243,240,232,0.14)">${year}</div>\n`;
      }
      lastYear = year;
    }
    const thumb = ed.noCard ? "images/afm/thumbs/afm-banner-thumb.jpg" : `images/afm/thumbs/afm-ed${ed.num}-thumb.jpg`;
    return `${divider}    <a class="catalog-row" href="afm/ed${ed.num}.html" style="text-decoration:none;color:inherit">
      <span style="font-family:'Archivo',sans-serif;font-stretch:118%;font-weight:900;font-size:42px;letter-spacing:-0.03em;line-height:1;color:${isNewest ? "#ffcf6b" : "rgba(243,240,232,0.35)"}">${ed.num}</span>
      <span class="catalog-thumb"><img src="${thumb}" alt="" loading="lazy" style="display:block;width:100%;height:112px;object-fit:cover;object-position:center top;border:1px solid rgba(243,240,232,0.18);border-radius:4px"></span>
      <span><span style="font-family:'Archivo',sans-serif;font-weight:800;font-size:25px;letter-spacing:-0.3px;display:block;margin-bottom:7px">${esc(ed.title)}</span><span style="font-size:16.5px;line-height:1.5;color:rgba(243,240,232,0.68)">${esc(ed.catalog)}</span></span>
      <span style="text-align:right"><span style="display:block;font-family:'Courier Prime',monospace;font-size:13.5px;letter-spacing:1.4px;color:rgba(243,240,232,0.55);margin-bottom:8px">${esc(ed.dateDisplay)}</span><span style="font-family:'Courier Prime',monospace;font-size:12.5px;letter-spacing:1.6px;color:${isNewest ? "#ffcf6b" : "#9a8f7d"}">${isNewest ? "LATEST · READ →" : "READ →"}</span></span>
    </a>`;
  }).join("\n");
}

/* ── build ──────────────────────────────────────────────────────────────── */
mkdirSync(join(ROOT, "afm"), { recursive: true });
editions.forEach((ed, i) => {
  const prev = editions[i - 1] || null;
  const next = editions[i + 1] || null;
  const out = join(ROOT, "afm", `ed${ed.num}.html`);
  const card = join(ROOT, "images", "afm", `afm-ed${ed.num}-card.jpg`);
  if (!ed.noCard && !existsSync(card)) {
    console.error(`FAIL ed${ed.num}: card image missing (${card}) — render it first`);
    process.exitCode = 1;
    return;
  }
  writeFileSync(out, pageHtml(ed, prev, next));
  console.log(`built afm/ed${ed.num}.html${ed.cardOnly ? " (card-only)" : ""}`);
});

const nlPath = join(ROOT, "newsletter.html");
const nl = readFileSync(nlPath, "utf8");
const START = "<!-- AFM-CATALOG:START (generated by scripts/build-afm-pages.mjs — do not hand-edit rows) -->";
const END = "<!-- AFM-CATALOG:END -->";
if (!nl.includes(START) || !nl.includes(END)) {
  console.error("FAIL newsletter.html: AFM-CATALOG markers not found — catalog rows not updated");
  process.exit(1);
}
const updated = nl.replace(
  new RegExp(`${START.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${END.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`),
  `${START}\n${catalogRows()}\n    ${END}`
);
writeFileSync(nlPath, updated);
console.log(`updated newsletter.html catalog (${editions.length} rows)`);
