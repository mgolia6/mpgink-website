#!/usr/bin/env node
/**
 * scripts/build-afm-email-pages.mjs — the AFM email era (2021–2024).
 *
 * Companion to build-afm-pages.mjs. Same single-source contract: the manifest
 * is scripts/afm-email-editions.json, the prose is afm/email-content/<slug>.md,
 * and this script generates BOTH the pages (afm/email/<slug>.html) AND the
 * email-era rows in newsletter.html (between the AFM-EMAIL markers).
 *
 * These editions predate the LinkedIn newsletter and were sent as plain email
 * to a work distribution list. Per Matthew's 2026-08-21 decisions they are
 * published DATE-FIRST (no lifetime numbers are invented), with the corporate
 * furniture stripped and colleagues reduced to roles. Every page says so.
 *
 * NO DEPENDENCIES on purpose — same contract as check-site.mjs.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { NAV, FOOTER, PAGE_CSS, esc, narrativeToHtml } from "./afm-chrome.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(readFileSync(join(ROOT, "scripts", "afm-email-editions.json"), "utf8"));
const editions = manifest.editions.slice().sort((a, b) => a.date.localeCompare(b.date));

const PROVENANCE =
  "From the email era. This went out as a plain email — not on LinkedIn — to a work " +
  "distribution list. Signature blocks, phone numbers and work links have been removed, " +
  "and colleagues are referred to by role rather than by name. The writing is unchanged.";

function label(ed) {
  const n = ed.selfNumber
    ? ` · NO. ${ed.selfNumber}${ed.selfNumberNote ? ` (${ed.selfNumberNote.toUpperCase()})` : ""}`
    : "";
  return `${ed.weekday} ${ed.dateDisplay}${n}`;
}

function pageHtml(ed, prev, next) {
  const md = join(ROOT, "afm", "email-content", `${ed.slug}.md`);
  if (!existsSync(md)) {
    console.error(`FAIL ${ed.slug}: narrative missing (${md})`);
    process.exitCode = 1;
    return null;
  }
  const desc = ed.catalog || `An Aloha Friday Motivation edition from ${ed.dateDisplay}.`;
  const prevLink = prev
    ? `<a href="${prev.slug}.html">← ${prev.dateDisplay} — ${esc(prev.title).toUpperCase()}</a>`
    : `<span class="dim">← THIS IS THE OLDEST EDITION WE'VE RECOVERED</span>`;
  const nextLink = next
    ? `<a href="${next.slug}.html">${next.dateDisplay} — ${esc(next.title).toUpperCase()} →</a>`
    : `<span class="dim">THE EMAIL ERA ENDS HERE · THE NUMBERED ARCHIVE PICKS UP AT ED. 252 →</span>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AFM — ${esc(ed.title)} (${ed.dateDisplay}) — mpgink</title>
  <meta name="description" content="${esc(desc)}">

  <!-- Open Graph / Link Preview -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://mpgink.com/afm/email/${ed.slug}.html">
  <meta property="og:title" content="AFM — ${esc(ed.title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:image" content="https://mpgink.com/images/afm/afm-banner.jpg">

  <!-- Twitter/X Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="AFM — ${esc(ed.title)}">
  <meta name="twitter:description" content="${esc(desc)}">
  <meta name="twitter:image" content="https://mpgink.com/images/afm/afm-banner.jpg">

  <!-- Favicon / home-screen icons -->
  <link rel="icon" type="image/png" sizes="32x32" href="../../images/favicon-32.png">
  <link rel="icon" type="image/png" sizes="192x192" href="../../images/icon-192.png">
  <link rel="apple-touch-icon" href="../../images/apple-touch-icon.png">
  <link rel="manifest" href="../../site.webmanifest">
  <meta name="theme-color" content="#0f0c07">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Courier+Prime:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../../style.css">
  ${PAGE_CSS}
  <script src="../../site.js" defer></script>
</head>
<body>

${NAV("../../")}

<div class="grain"></div>

<section style="max-width:900px;margin:0 auto;padding:56px 24px 30px">
  <div style="font-family:'Courier Prime',monospace;font-size:13.5px;letter-spacing:2.4px;color:#9a8f7d;margin-bottom:18px">EXHIBIT NO. 04 — WING B · THE EMAIL ERA · <a href="../../newsletter.html#email-era" class="kicker-link">BACK TO THE CATALOG</a></div>
  <h1 style="font-family:'Archivo',sans-serif;font-stretch:118%;font-weight:900;font-size:clamp(34px,4.2vw,54px);letter-spacing:-1.5px;line-height:1.05;margin:0 0 14px">${esc(ed.title)}<span style="color:#ff5a1f">.</span></h1>
  <div style="font-family:'Courier Prime',monospace;font-size:13.5px;letter-spacing:2px;color:#ffcf6b">${label(ed)}</div>
</section>

<section style="max-width:900px;margin:0 auto;padding:8px 24px 60px">
  <article class="afm-paper">
    <img src="../../images/afm/afm-banner.jpg" alt="Aloha Friday Motivation" style="display:block;width:100%;height:auto">
    <div class="afm-paper-body">
      <div class="afm-ed-head">AFM | ${esc(ed.title)} | ${ed.dateDisplay}</div>
      <div class="afm-ed-provenance">${ed.fragment ? "<strong>Only the greeting survives.</strong> The archived copy of this send contains no body text — what you see below is all of it. " : ""}${PROVENANCE}${ed.recovered ? ` ${esc(ed.recovered)}` : ""}${ed.numberNote ? ` ${esc(ed.numberNote)}` : ""}</div>
${narrativeToHtml(readFileSync(md, "utf8"))}
    </div>
    <div class="afm-paper-foot">
      <div class="rule"></div>
      <img src="../../images/afm/mpgink-monogram.png" alt="" width="34" height="34" style="display:block;margin:0 auto 10px;border-radius:50%;border:1px solid rgba(232,184,74,0.6)">
      <div style="font-family:Georgia,'Times New Roman',serif;font-weight:bold;font-size:15px;color:#ffffff;margin-bottom:4px">Aloha Friday Motivation</div>
      <div style="font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:12px;color:#c69a3e">· ${ed.dateDisplay} · Every Friday since 2018.</div>
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
    <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap"><a href="../../signup.html?src=afm-email-${ed.slug}" class="btn btn-gold" style="padding:16px 34px;font-size:13px;letter-spacing:2px">JOIN THE EMAIL LIST →</a><a href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7211006447474651136" target="_blank" rel="noopener" class="btn btn-outline" style="padding:16px 34px;font-size:13px;letter-spacing:2px">OR ON LINKEDIN ↗</a></div>
  </div>
</section>

${FOOTER("../../")}

</body>
</html>
`;
}

/* ── the email-era block in newsletter.html ─────────────────────────────── */
function emailBlock() {
  const years = [...new Set(editions.map((e) => e.date.slice(0, 4)))].sort().reverse();
  const chips = [`<button type="button" class="afm-chip active" data-wing="B" data-year="all">ALL</button>`]
    .concat(years.map((y) => `<button type="button" class="afm-chip" data-wing="B" data-year="${y}">${y}</button>`))
    .join("\n      ");

  let lastYear = null;
  const rows = editions.slice().reverse().map((ed) => {
    const y = ed.date.slice(0, 4);
    let divider = "";
    if (y !== lastYear) {
      if (lastYear !== null) {
        divider = `    <div class="email-year afm-divider" data-wing="B" style="font-family:'Courier Prime',monospace;font-size:14px;letter-spacing:2.6px;color:#8a8172;padding:52px 8px 8px;border-bottom:1px solid rgba(243,240,232,0.14)">${y}</div>\n`;
      }
      lastYear = y;
    }
    const num = ed.selfNumber
      ? `<span style="font-family:'Archivo',sans-serif;font-stretch:118%;font-weight:900;font-size:30px;letter-spacing:-0.03em;line-height:1;color:rgba(243,240,232,0.35)">${ed.selfNumber}</span>`
      : `<span style="font-family:'Courier Prime',monospace;font-size:12px;letter-spacing:1.4px;color:rgba(243,240,232,0.22)">NO&nbsp;NO.</span>`;
    return `${divider}    <a class="email-row afm-row" href="afm/email/${ed.slug}.html" data-wing="B" data-year="${y}" style="text-decoration:none;color:inherit">
      <span>${num}</span>
      <span><span style="font-family:'Archivo',sans-serif;font-weight:800;font-size:22px;letter-spacing:-0.3px;display:block;margin-bottom:6px">${esc(ed.title)}</span><span style="font-size:15.5px;line-height:1.5;color:rgba(243,240,232,0.62)">${esc(ed.catalog)}</span></span>
      <span style="text-align:right"><span style="display:block;font-family:'Courier Prime',monospace;font-size:13px;letter-spacing:1.4px;color:rgba(243,240,232,0.55);margin-bottom:8px">${ed.dateDisplay}</span><span style="font-family:'Courier Prime',monospace;font-size:12.5px;letter-spacing:1.6px;color:#9a8f7d">READ →</span></span>
    </a>`;
  }).join("\n");

  const numbered = editions.filter((e) => e.selfNumber).length;
  return `    <div id="email-era" style="display:flex;justify-content:space-between;align-items:flex-end;gap:28px;flex-wrap:wrap;margin-bottom:30px">
      <div>
        <div style="font-family:'Courier Prime',monospace;font-size:13px;letter-spacing:2.4px;color:#9a8f7d;margin-bottom:14px">WING B — BEFORE LINKEDIN</div>
        <h2 style="font-family:'Archivo',sans-serif;font-stretch:118%;font-weight:900;font-size:clamp(32px,3.4vw,44px);letter-spacing:-1.2px;line-height:1;margin:0 0 14px">The Email Era<span style="color:#ff5a1f">.</span></h2>
        <div style="font-family:'Courier Prime',monospace;font-size:15px;letter-spacing:2px;color:#ffcf6b">${editions.length} EDITIONS RECOVERED · 2021&ndash;2024</div>
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
      ${chips}
    </div>
    </div>
    <p style="font-size:16.5px;line-height:1.6;color:rgba(243,240,232,0.6);max-width:70ch;margin:0 0 34px">Before the newsletter moved to LinkedIn it went out as a plain email, and those sends were never numbered the way the LinkedIn run is. These ${editions.length} are what survived in the archive, keyed by the date they were sent. ${numbered} of them carry a number the original subject line assigned; the rest never had one, and we haven't invented any. Signature blocks and work links are stripped, and colleagues appear by role.</p>
${rows}
    <div class="afm-empty" data-wing="B" style="display:none;font-family:'Courier Prime',monospace;font-size:14px;letter-spacing:1.8px;color:#9a8f7d;text-align:center;padding:56px 8px">NOTHING IN THE EMAIL ERA MATCHES THAT.<br><br><span style="color:#8a8172;font-size:13px">THIS WING COVERS 2021&ndash;2024 ONLY. THE SAME SEARCH IS RUNNING OVER THE OTHER TWO WINGS ON THIS PAGE.</span></div>
    <div style="font-family:'Courier Prime',monospace;font-size:13px;letter-spacing:1.8px;color:#8a8172;text-align:center;padding:40px 8px 0">RECOVERED FROM THE SENT-MAIL ARCHIVE &middot; 2019 AND 2020 ARE STILL MISSING &middot; THE 2018 RUN IS IN <a href="#founding-era" style="color:#ffcf6b">WING C</a></div>
`;
}

/* ── build ──────────────────────────────────────────────────────────────── */
mkdirSync(join(ROOT, "afm", "email"), { recursive: true });
let built = 0;
editions.forEach((ed, i) => {
  const html = pageHtml(ed, editions[i - 1] || null, editions[i + 1] || null);
  if (html) { writeFileSync(join(ROOT, "afm", "email", `${ed.slug}.html`), html); built++; }
});
console.log(`built ${built} email-era pages`);

const START = "<!-- AFM-EMAIL:START (generated by scripts/build-afm-email-pages.mjs — do not hand-edit this block) -->";
const END = "<!-- AFM-EMAIL:END -->";
const nlPath = join(ROOT, "newsletter.html");
const nl = readFileSync(nlPath, "utf8");
if (!nl.includes(START) || !nl.includes(END)) {
  console.error("FAIL newsletter.html: AFM-EMAIL markers not found — email-era rows not updated");
  process.exit(1);
}
const esc2 = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
writeFileSync(nlPath, nl.replace(
  new RegExp(`${esc2(START)}[\\s\\S]*?${esc2(END)}`),
  `${START}\n${emailBlock()}\n    ${END}`
));
console.log(`updated newsletter.html email era (${editions.length} rows)`);
