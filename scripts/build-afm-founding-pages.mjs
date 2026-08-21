#!/usr/bin/env node
/**
 * scripts/build-afm-founding-pages.mjs — the AFM founding era (2018).
 *
 * Third companion to build-afm-pages.mjs / build-afm-email-pages.mjs. Same
 * contract: scripts/afm-founding-editions.json is the manifest, this script
 * generates BOTH afm/founding/ed###.html AND the founding rows in
 * newsletter.html (between the AFM-FOUNDING markers).
 *
 * These editions predate everything else. They went out EVERY WEEKDAY in the
 * autumn of 2018 as a card, not a narrative: national days, this-day-in-history,
 * who was born, who died, a quote, and a riddle answered in the next edition.
 * There is no prose to publish and none is invented — the card IS the edition.
 *
 * NO DEPENDENCIES on purpose — same contract as check-site.mjs.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { NAV, FOOTER, PAGE_CSS, esc } from "./afm-chrome.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(readFileSync(join(ROOT, "scripts", "afm-founding-editions.json"), "utf8"));
const editions = manifest.editions.slice().sort((a, b) => a.num - b.num);

const PROVENANCE =
  "From the founding era. In 2018 this went out every weekday as a card, not an essay — " +
  "so there is no narrative to publish here, and none has been invented. What follows is " +
  "the edition itself, reconstructed from the two spreadsheets that recorded it.";

function people(list, verified, label) {
  if (!list || !list.length) return "";
  const body = verified
    ? list.map((p) => `<li>${esc(p.name)}${p.desc ? ` <span style="color:#6a7a8a">— ${esc(p.desc)}</span>` : ""}${p.year ? ` <span style="color:#a9791f">(${esc(p.year)})</span>` : ""}</li>`).join("")
    // stride didn't verify: show what the sheet held, claim no year attribution
    : `<li>${list.map((p) => esc(p.raw ?? p.name)).join(" · ")}</li>`;
  const note = verified ? "" :
    `<div style="font-size:13px;color:#8a7a5a;font-style:italic;margin-top:6px">Recorded as a single run in the source sheet; we haven't matched each name to a year.</div>`;
  return `<div class="afm-card-block"><h3>${label}</h3><ul>${body}</ul>${note}</div>`;
}

/* The Motivation Index recorded every ANSWER but only some of the questions.
   43 of the 60 have an answer with no riddle attached. Printing "The answer:
   a stamp" alone would read like we lost it quietly — say which half survived. */
function riddleBlock(ed) {
  if (!ed.riddleAnswer) return "";
  const answer = `<p style="margin:0"><strong>${esc(ed.riddleAnswer)}</strong>${
    ed.riddle ? ` <span style="font-size:14px;color:#6a7a8a">— in 2018 you'd have waited until the next morning for this.</span>` : ""
  }</p>`;
  if (ed.riddle) {
    return `      <div class="afm-card-block"><h3>Riddle of the day</h3><p style="margin:0">${esc(ed.riddle)}</p></div>
      <div class="afm-card-block"><h3>The answer</h3>${answer}</div>`;
  }
  return `      <div class="afm-card-block"><h3>The answer</h3>${answer}
        <div style="font-size:13px;color:#8a7a5a;font-style:italic;margin-top:6px">The riddle itself wasn't kept. The index recorded the answer for every edition and the question for only some &mdash; this is one it didn't.</div>
      </div>`;
}

function pageHtml(ed, prev, next) {
  const title = `Edition ${ed.num}`;
  const desc = ed.catalog || `An Aloha Friday Motivation edition from ${ed.dateDisplay}.`;
  const prevLink = prev
    ? `<a href="${prev.slug}.html">← ED. ${prev.num} — ${esc(prev.dateDisplay)}</a>`
    : `<span class="dim">← THIS IS THE FIRST EDITION. THERE IS NOTHING BEFORE IT.</span>`;
  const nextLink = next
    ? `<a href="${next.slug}.html">ED. ${next.num} — ${esc(next.dateDisplay)} →</a>`
    : `<span class="dim">THE 2018 RUN ENDS HERE · THE ARCHIVE RESUMES IN 2021 →</span>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AFM #${ed.num} — ${esc(ed.dateDisplay)} — mpgink</title>
  <meta name="description" content="${esc(desc)}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://mpgink.com/afm/founding/${ed.slug}.html">
  <meta property="og:title" content="AFM #${ed.num} — ${esc(ed.dateDisplay)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:image" content="https://mpgink.com/images/afm/afm-banner.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="AFM #${ed.num} — ${esc(ed.dateDisplay)}">
  <meta name="twitter:description" content="${esc(desc)}">
  <meta name="twitter:image" content="https://mpgink.com/images/afm/afm-banner.jpg">
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
  <div style="font-family:'Courier Prime',monospace;font-size:13.5px;letter-spacing:2.4px;color:#9a8f7d;margin-bottom:18px">EXHIBIT NO. 04 — WING C · THE FOUNDING ERA · <a href="../../newsletter.html#founding-era" class="kicker-link">BACK TO THE CATALOG</a></div>
  <h1 style="font-family:'Archivo',sans-serif;font-stretch:118%;font-weight:900;font-size:clamp(34px,4.2vw,54px);letter-spacing:-1.5px;line-height:1.05;margin:0 0 14px">${title}<span style="color:#ff5a1f">.</span></h1>
  <div style="font-family:'Courier Prime',monospace;font-size:13.5px;letter-spacing:2px;color:#ffcf6b">${ed.weekday} ${ed.dateDisplay} · FORMAT ${esc(ed.version).toUpperCase()}</div>
</section>

<section style="max-width:900px;margin:0 auto;padding:8px 24px 60px">
  <article class="afm-paper">
    <img src="../../images/afm/afm-banner.jpg" alt="Aloha Friday Motivation" style="display:block;width:100%;height:auto">
    <div class="afm-paper-body">
      <div class="afm-ed-head">AFM | ${ed.weekday.charAt(0) + ed.weekday.slice(1).toLowerCase()}, ${esc(ed.dateDisplay)} | #${ed.num}</div>
      <div class="afm-ed-provenance">${PROVENANCE}</div>

${ed.nationalDays.length ? `      <div class="afm-card-block"><h3>Today is</h3><ul>${ed.nationalDays.map((d) => `<li>${esc(d)}</li>`).join("")}</ul></div>` : ""}
${ed.history.length ? `      <div class="afm-card-block"><h3>This day in history</h3><ul>${ed.history.map((h) => `<li>${esc(h)}</li>`).join("")}</ul></div>` : ""}
${people(ed.born, ed.bornVerified, "Born on this day")}
${people(ed.died, ed.diedVerified, "Died on this day")}

      <div class="afm-quote-block">
        <blockquote>${esc(ed.quote)}</blockquote>
        <cite>— ${esc(ed.quoteBy)}</cite>
      </div>

${riddleBlock(ed)}
    </div>
    <div class="afm-paper-foot">
      <div class="rule"></div>
      <img src="../../images/afm/mpgink-monogram.png" alt="" width="34" height="34" style="display:block;margin:0 auto 10px;border-radius:50%;border:1px solid rgba(232,184,74,0.6)">
      <div style="font-family:Georgia,'Times New Roman',serif;font-weight:bold;font-size:15px;color:#ffffff;margin-bottom:4px">Aloha Friday Motivation</div>
      <div style="font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:12px;color:#c69a3e">· Edition #${ed.num} · ${esc(ed.dateDisplay)} ·</div>
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
    <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap"><a href="../../signup.html?src=afm-founding-${ed.slug}" class="btn btn-gold" style="padding:16px 34px;font-size:13px;letter-spacing:2px">JOIN THE EMAIL LIST →</a><a href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7211006447474651136" target="_blank" rel="noopener" class="btn btn-outline" style="padding:16px 34px;font-size:13px;letter-spacing:2px">OR ON LINKEDIN ↗</a></div>
  </div>
</section>

${FOOTER("../../")}

</body>
</html>
`;
}

/* ── the founding-era block in newsletter.html ──────────────────────────── */
function foundingBlock() {
  const rows = editions.slice().reverse().map((ed) => `    <a class="email-row afm-row" href="afm/founding/${ed.slug}.html" data-wing="C" data-year="2018" style="text-decoration:none;color:inherit">
      <span><span style="font-family:'Archivo',sans-serif;font-stretch:118%;font-weight:900;font-size:30px;letter-spacing:-0.03em;line-height:1;color:rgba(243,240,232,0.35)">${ed.num}</span></span>
      <span><span style="font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:17px;line-height:1.5;display:block;margin-bottom:6px;color:rgba(243,240,232,0.88)">&ldquo;${esc(ed.catalog)}&rdquo;</span><span style="font-family:'Courier Prime',monospace;font-size:12.5px;letter-spacing:1.2px;color:rgba(243,240,232,0.5)">${esc(ed.quoteBy).toUpperCase()} &nbsp;·&nbsp; ANSWER: ${esc(ed.riddleAnswer).toUpperCase()}</span></span>
      <span style="text-align:right"><span style="display:block;font-family:'Courier Prime',monospace;font-size:13px;letter-spacing:1.4px;color:rgba(243,240,232,0.55);margin-bottom:8px">${ed.dateDisplay}</span><span style="font-family:'Courier Prime',monospace;font-size:12.5px;letter-spacing:1.6px;color:#9a8f7d">READ →</span></span>
    </a>`).join("\n");

  return `    <div id="founding-era" style="display:flex;justify-content:space-between;align-items:flex-end;gap:28px;flex-wrap:wrap;margin-bottom:30px">
      <div>
        <div style="font-family:'Courier Prime',monospace;font-size:13px;letter-spacing:2.4px;color:#9a8f7d;margin-bottom:14px">WING C — WHERE IT STARTED</div>
        <h2 style="font-family:'Archivo',sans-serif;font-stretch:118%;font-weight:900;font-size:clamp(32px,3.4vw,44px);letter-spacing:-1.2px;line-height:1;margin:0 0 14px">The Founding Era<span style="color:#ff5a1f">.</span></h2>
        <div style="font-family:'Courier Prime',monospace;font-size:15px;letter-spacing:2px;color:#ffcf6b">EDITIONS 1&ndash;${editions.length} &middot; AUG&ndash;DEC 2018 &middot; EVERY WEEKDAY</div>
      </div>
    </div>
    <p style="font-size:16.5px;line-height:1.6;color:rgba(243,240,232,0.6);max-width:70ch;margin:0 0 34px">The first ${editions.length} editions went out <strong style="color:rgba(243,240,232,0.8)">every weekday</strong>, not every Friday, and they were cards rather than essays &mdash; a national day, a moment from history, who was born, who died, a quote, and a riddle you had to wait until tomorrow to have answered. No prose from this era survives, so none is invented here. These are rebuilt from the two spreadsheets that recorded them as they went out.</p>
${rows}
    <div class="afm-empty" data-wing="C" style="display:none;font-family:'Courier Prime',monospace;font-size:14px;letter-spacing:1.8px;color:#9a8f7d;text-align:center;padding:56px 8px">NOTHING IN THE FOUNDING ERA MATCHES THAT.<br><br><span style="color:#8a8172;font-size:13px">THIS WING IS AUG&ndash;DEC 2018 ONLY, AND IT HOLDS CARDS RATHER THAN ESSAYS &mdash; THERE IS LESS TEXT HERE TO MATCH ON.</span></div>
    <div style="font-family:'Courier Prime',monospace;font-size:13px;letter-spacing:1.8px;color:#8a8172;text-align:center;padding:40px 8px 0">EDITIONS 61&ndash;251 RAN 2019&ndash;2024 &middot; ONLY THE 2021&ndash;2024 STRETCH SURVIVED, IN <a href="#email-era" style="color:#ffcf6b">WING B</a></div>`;
}

/* ── build ──────────────────────────────────────────────────────────────── */
mkdirSync(join(ROOT, "afm", "founding"), { recursive: true });
editions.forEach((ed, i) => {
  writeFileSync(join(ROOT, "afm", "founding", `${ed.slug}.html`),
                pageHtml(ed, editions[i - 1] || null, editions[i + 1] || null));
});
console.log(`built ${editions.length} founding-era pages`);

const START = "<!-- AFM-FOUNDING:START (generated by scripts/build-afm-founding-pages.mjs — do not hand-edit this block) -->";
const END = "<!-- AFM-FOUNDING:END -->";
const nlPath = join(ROOT, "newsletter.html");
const nl = readFileSync(nlPath, "utf8");
if (!nl.includes(START) || !nl.includes(END)) {
  console.error("FAIL newsletter.html: AFM-FOUNDING markers not found — founding rows not updated");
  process.exit(1);
}
const rx = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
writeFileSync(nlPath, nl.replace(new RegExp(`${rx(START)}[\\s\\S]*?${rx(END)}`),
                                 `${START}\n${foundingBlock()}\n    ${END}`));
console.log(`updated newsletter.html founding era (${editions.length} rows)`);
