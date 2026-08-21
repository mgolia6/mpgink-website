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
import { FILTER_SCRIPT, NAV, FOOTER, PAGE_CSS, esc, inline, narrativeToHtml, weekdayName } from "./afm-chrome.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(readFileSync(join(ROOT, "scripts", "afm-editions.json"), "utf8"));
const editions = manifest.editions.slice().sort((a, b) => a.num - b.num);


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

${NAV("../")}

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
${ed.satire ? `      <div class="afm-ed-satire"><strong>SATIRE — this edition is a joke.</strong> ${esc(ed.satireNote || "It was written as an April Fools piece; the people, quotes, and sources in it are invented. Nothing here is reporting.")}</div>` : ""}
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

${FOOTER("../")}

</body>
</html>
`;
}

/* ── catalog block in newsletter.html (header + filters + rows) ─────────── */
function hasNarrative(ed) {
  return !ed.cardOnly && existsSync(join(ROOT, "afm", "content", `ed${ed.num}.md`));
}

function catalogRows() {
  const newest = editions[editions.length - 1];
  let lastYear = null;
  return editions.slice().reverse().map((ed) => {
    const isNewest = ed.num === newest.num;
    const year = ed.date.slice(0, 4);
    let divider = "";
    if (year !== lastYear) {
      if (lastYear !== null) {
        divider = `    <div class="catalog-year afm-divider" data-wing="A" style="font-family:'Courier Prime',monospace;font-size:14px;letter-spacing:2.6px;color:#8a8172;padding:52px 8px 8px;border-bottom:1px solid rgba(243,240,232,0.14)">${year}</div>\n`;
      }
      lastYear = year;
    }
    const thumb = ed.noCard ? "images/afm/thumbs/afm-banner-thumb.jpg" : `images/afm/thumbs/afm-ed${ed.num}-thumb.jpg`;
    return `${divider}    <a class="catalog-row afm-row" href="afm/ed${ed.num}.html" data-wing="A" data-year="${year}" data-full="${hasNarrative(ed) ? 1 : 0}" style="text-decoration:none;color:inherit">
      <span style="font-family:'Archivo',sans-serif;font-stretch:118%;font-weight:900;font-size:42px;letter-spacing:-0.03em;line-height:1;color:${isNewest ? "#ffcf6b" : "rgba(243,240,232,0.35)"}">${ed.num}</span>
      <span class="catalog-thumb"><img src="${thumb}" alt="" loading="lazy" style="display:block;width:100%;height:112px;object-fit:cover;object-position:center top;border:1px solid rgba(243,240,232,0.18);border-radius:4px"></span>
      <span><span style="font-family:'Archivo',sans-serif;font-weight:800;font-size:25px;letter-spacing:-0.3px;display:block;margin-bottom:7px">${esc(ed.title)}</span><span style="font-size:16.5px;line-height:1.5;color:rgba(243,240,232,0.68)">${esc(ed.catalog)}</span></span>
      <span style="text-align:right"><span style="display:block;font-family:'Courier Prime',monospace;font-size:13.5px;letter-spacing:1.4px;color:rgba(243,240,232,0.55);margin-bottom:8px">${esc(ed.dateDisplay)}</span><span style="font-family:'Courier Prime',monospace;font-size:12.5px;letter-spacing:1.6px;color:${isNewest ? "#ffcf6b" : "#9a8f7d"}">${isNewest ? "LATEST · READ →" : "READ →"}</span></span>
    </a>`;
  }).join("\n");
}

function catalogBlock() {
  const years = [...new Set(editions.map((ed) => ed.date.slice(0, 4)))].sort().reverse();
  const oldest = editions[0];
  const yearChips = [`<button type="button" class="afm-chip active" data-wing="A" data-year="all">ALL</button>`]
    .concat(years.map((y) => `<button type="button" class="afm-chip" data-wing="A" data-year="${y}">${y}</button>`))
    .join("\n      ");
  return `    <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:28px;flex-wrap:wrap;margin-bottom:30px">
      <div>
        <div style="font-family:'Courier Prime',monospace;font-size:13px;letter-spacing:2.4px;color:#9a8f7d;margin-bottom:14px">FROM THE ARCHIVE</div>
        <h2 style="font-family:'Archivo',sans-serif;font-stretch:118%;font-weight:900;font-size:clamp(36px,4vw,52px);letter-spacing:-1.2px;line-height:1;margin:0 0 14px">The Catalog<span style="color:#ff5a1f">.</span></h2>
        <div style="font-family:'Courier Prime',monospace;font-size:15px;letter-spacing:2px;color:#ffcf6b">${editions.length} EDITIONS · A NEW ONE EVERY FRIDAY. NO EXCEPTIONS.</div>
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
      ${yearChips}
      <button type="button" class="afm-chip" id="afm-filter-full">FULL READS</button>
      <input type="search" id="afm-filter-q" placeholder="SEARCH ALL THREE WINGS…" aria-label="Search the archive">
    </div>
    </div>
${catalogRows()}
    <div class="afm-empty" data-wing="A" style="display:none;font-family:'Courier Prime',monospace;font-size:14px;letter-spacing:1.8px;color:#9a8f7d;text-align:center;padding:56px 8px">NOTHING IN THE NUMBERED CATALOG MATCHES THAT.<br><br><span style="color:#8a8172;font-size:13px">THIS WING STARTS AT ED. ${oldest.num} (${esc(oldest.dateDisplay)}) — KEEP SCROLLING, THE SAME SEARCH IS RUNNING OVER THE EMAIL ERA AND THE FOUNDING ERA BELOW.</span></div>
    <div style="font-family:'Courier Prime',monospace;font-size:13px;letter-spacing:1.8px;color:#8a8172;text-align:center;padding:40px 8px 0">THE NUMBERED CATALOG REACHES BACK TO ED. ${oldest.num} · EDITIONS 1–${oldest.num - 1} LIVED IN EMAIL BEFORE LINKEDIN — WHAT SURVIVED IS IN <a href="#email-era" style="color:#ffcf6b">WING B</a> AND <a href="#founding-era" style="color:#ffcf6b">WING C</a> BELOW.</div>
${FILTER_SCRIPT}`;
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
const START = "<!-- AFM-CATALOG:START (generated by scripts/build-afm-pages.mjs — do not hand-edit this block) -->";
const END = "<!-- AFM-CATALOG:END -->";
if (!nl.includes(START) || !nl.includes(END)) {
  console.error("FAIL newsletter.html: AFM-CATALOG markers not found — catalog rows not updated");
  process.exit(1);
}
const updated = nl.replace(
  new RegExp(`${START.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${END.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`),
  `${START}\n${catalogBlock()}\n    ${END}`
);
writeFileSync(nlPath, updated);
console.log(`updated newsletter.html catalog (${editions.length} rows)`);
