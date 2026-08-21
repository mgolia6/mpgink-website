/**
 * scripts/afm-chrome.mjs — chrome + markdown shared by BOTH AFM generators.
 *
 * build-afm-pages.mjs  (numbered editions, afm/ed###.html, depth 1)
 * build-afm-email-pages.mjs (email era, afm/email/<slug>.html, depth 2)
 *
 * kit-single-source: the nav, footer and paper CSS exist ONCE. Depth differs
 * between the two page trees, so NAV/FOOTER are functions taking the relative
 * prefix ("../" or "../../") rather than constants with the prefix baked in.
 *
 * NO DEPENDENCIES on purpose — same contract as check-site.mjs.
 */

/* ── markdown subset → html ─────────────────────────────────────────────────
 * The narratives use only: paragraphs, [text](url) links (urls may contain one
 * level of parens), *em*, **strong**, ***strong-em***. Everything else that
 * appears in the files is email/LinkedIn plumbing and is stripped:
 * the H1, the Teaser line (carried by the manifest), `---` rules, the
 * microcast placeholder, and the trailing "Aloha Friday Motivation · Edition"
 * sign-off line (the page renders its own).
 */
export function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
// Real weekday from the ISO date — most editions are Fridays, but not all
// (ed290/ed304 went out Thursday, ed307 Saturday); never claim FRIDAY blind.
export const WEEKDAYS = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
export function weekdayName(isoDate) {
  return WEEKDAYS[new Date(`${isoDate}T12:00:00Z`).getUTCDay()];
}
export function inline(s) {
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
export function narrativeToHtml(md) {
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
export const NAV = (p = "../") => `<header class="site-nav">
  <div class="nav-inner">
    <a href="${p}index.html" class="nav-logo">
      <img src="${p}images/mpgink-favicon.png" alt="mpgink logomark">
      <span class="nav-wordmark">mpgink</span>
      <span class="nav-cipher">13·16·7</span>
    </a>
    <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="site-menu">MENU</button>
    <nav id="site-menu">
      <a class="nav-link" href="${p}index.html#exhibits">THE EXHIBITS</a>
      <a class="nav-link" href="${p}newsletter.html">AFM</a>
      <a class="nav-link" href="${p}studio.html">STUDIO</a>
      <a class="nav-link" href="${p}shop.html">SHOP</a>
      <a class="nav-link" href="${p}about.html">ABOUT</a>
      <a class="nav-link" href="${p}ai-usage.html">AI</a>
      <a class="nav-cta" href="${p}contact.html">SAY ALOHA</a>
    </nav>
  </div>
</header>`;

export const FOOTER = (p = "../") => `<footer class="site-footer">
  <div class="footer-grid">
    <div>
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:18px">
        <img src="${p}images/mpgink-favicon.png" alt="mpgink logomark" style="width:40px;height:40px;border-radius:9px">
        <span style="font-family:'Archivo',sans-serif;font-stretch:120%;font-weight:900;font-size:24px">mpgink</span>
      </div>
      <p style="font-family:'Archivo',sans-serif;font-size:14.5px;line-height:1.7;color:rgba(243,240,232,0.62);max-width:38ch;margin:0 0 20px">a creative collective — mission · passion · gratitude · building AI&#8209;augmented products people actually use.</p>
      <p style="font-family:'Courier Prime',monospace;font-size:11.5px;letter-spacing:1.2px;color:#8a8172;margin:0">13 · 16 · 7</p>
    </div>
    <div class="footer-col">
      <span class="footer-heading">THE EXHIBITS</span>
      <a class="footer-link" href="${p}phreezer.html">PHREEZER</a>
      <a class="footer-link" href="${p}job-odyssey.html">JOB ODYSSEY</a>
      <a class="footer-link" href="${p}one-percent.html">ONE PERCENT</a>
      <a class="footer-link" href="${p}newsletter.html">ALOHA FRIDAY MOTIVATION</a>
      <a class="footer-link" href="${p}metta.html">METTA — SOON</a>
    </div>
    <div class="footer-col">
      <span class="footer-heading">THE STUDIO</span>
      <a class="footer-link-gold" href="${p}signup.html">JOIN THE LIST ✶</a>
      <a class="footer-link" href="${p}studio.html">BOOKS + BLOG</a>
      <a class="footer-link" href="${p}shop.html">THE SHOP</a>
      <a class="footer-link" href="${p}ai-usage.html">AI USAGE</a>
      <a class="footer-link" href="${p}about.html">ABOUT</a>
      <a class="footer-link" href="${p}contact.html">SAY ALOHA</a>
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
export const PAGE_CSS = `<style>
  .afm-paper { max-width: 720px; margin: 0 auto; background: #fffdf8; color: #2c2a24; box-shadow: 0 4px 10px rgba(0,0,0,0.35), 0 30px 80px rgba(0,0,0,0.5); border-radius: 6px; overflow: hidden; }
  .afm-paper-body { padding: 30px 48px 10px; font-family: Georgia, 'Times New Roman', serif; }
  .afm-paper-body p { margin: 0 0 19px; font-size: 18px; line-height: 1.72; }
  .afm-paper-body a { color: #a9791f; text-decoration: underline; }
  .afm-paper-body strong { color: #163b5c; }
  .afm-ed-head { font-family: Georgia, 'Times New Roman', serif; font-weight: bold; font-size: 24px; color: #163b5c; margin: 0 0 12px; }
  .afm-ed-teaser { font-family: Georgia, 'Times New Roman', serif; font-style: italic; font-size: 16px; color: #6a7a8a; line-height: 1.62; border-left: 3px solid #e8b84a; padding-left: 14px; margin: 0 0 22px; }
  /* A reader landing cold on an April Fools edition must not read it as reporting. */
  .afm-ed-satire { font-family: Georgia, 'Times New Roman', serif; font-size: 15.5px; line-height: 1.55; color: #7a3b12; background: #fdf0e4; border: 1px solid #e0a877; border-radius: 4px; padding: 13px 16px; margin: 0 0 22px; }
  .afm-ed-satire strong { color: #7a3b12; }
  /* email-era pages say plainly what was edited out of the original send */
  .afm-ed-provenance { font-family: Georgia, 'Times New Roman', serif; font-size: 14.5px; line-height: 1.55; color: #5d6b7a; background: #f2f5f8; border-left: 3px solid #163b5c; padding: 12px 16px; margin: 0 0 22px; }
  /* founding-era (2018) pages: the edition WAS a card of short lists, not prose */
  .afm-card-block { margin: 0 0 24px; }
  .afm-card-block h3 { font-family: 'Courier Prime', monospace; font-size: 12.5px; letter-spacing: 2.2px; text-transform: uppercase; color: #163b5c; margin: 0 0 9px; padding-bottom: 7px; border-bottom: 1px solid #e4dabf; }
  .afm-card-block ul { margin: 0; padding: 0 0 0 20px; }
  .afm-card-block li { font-family: Georgia, 'Times New Roman', serif; font-size: 17px; line-height: 1.62; margin: 0 0 5px; }
  .afm-card-block p { font-size: 17px; line-height: 1.62; }
  .afm-quote-block { background: #f8f4e9; border-left: 4px solid #e8b84a; padding: 20px 24px; margin: 0 0 24px; border-radius: 3px; }
  .afm-quote-block blockquote { font-family: Georgia, 'Times New Roman', serif; font-size: 20px; line-height: 1.55; font-style: italic; color: #2c2a24; margin: 0 0 10px; }
  .afm-quote-block cite { font-family: 'Courier Prime', monospace; font-size: 13px; letter-spacing: 1.4px; font-style: normal; color: #6a7a8a; }
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

/* ── ONE filter controller for the whole catalog page ─────────────────────
   Wings A (numbered), B (email era) and C (founding era) are generated by
   three separate scripts, but they share ONE search box, so they must share
   ONE filter. Before this existed each wing shipped its own inline script:
   the box read "SEARCH THE ARCHIVE", searched Wing A only, and answered
   "nothing matches" for a word sitting in a Wing C row on the same page.
   Wing B's script also grabbed `.email-row` globally and only spared Wing C
   because it happened to run before those rows were parsed — a reorder away
   from silently hiding 60 editions.

   Contract, enforced by scripts/check-filter-wiring.mjs:
     • every row      → class "afm-row",     data-wing="A|B|C", data-year="YYYY"
     • every chip     → class "afm-chip",    data-wing, data-year ("all" or YYYY)
     • every divider  → class "afm-divider", data-wing
     • every wing     → one <div class="afm-empty" data-wing> honest empty state
   Emitted exactly once, by build-afm-pages.mjs. Never add a second one. */
export const FILTER_SCRIPT = `    <script>
    (function () {
      function boot() {
        var rows = [].slice.call(document.querySelectorAll(".afm-row"));
        var chips = [].slice.call(document.querySelectorAll(".afm-chip[data-wing]"));
        var divs = [].slice.call(document.querySelectorAll(".afm-divider"));
        var empties = [].slice.call(document.querySelectorAll(".afm-empty"));
        var q = document.getElementById("afm-filter-q");
        var fullBtn = document.getElementById("afm-filter-full");
        var year = { A: "all", B: "all", C: "all" };
        var state = { q: "", full: false };

        function apply() {
          var seen = {}, hit = {};
          rows.forEach(function (r) {
            var w = r.getAttribute("data-wing");
            seen[w] = true;
            var ok = (year[w] === "all" || r.getAttribute("data-year") === year[w])
              && (!state.full || w !== "A" || r.getAttribute("data-full") === "1")
              && (!state.q || r.textContent.toLowerCase().indexOf(state.q) > -1);
            r.style.display = ok ? "" : "none";
            if (ok) hit[w] = true;
          });
          divs.forEach(function (d) {
            var w = d.getAttribute("data-wing");
            var filtering = year[w] !== "all" || state.q || (state.full && w === "A");
            d.style.display = filtering ? "none" : "";
          });
          empties.forEach(function (e) {
            var w = e.getAttribute("data-wing");
            e.style.display = (seen[w] && !hit[w]) ? "" : "none";
          });
        }

        chips.forEach(function (c) {
          c.addEventListener("click", function () {
            var w = c.getAttribute("data-wing");
            year[w] = c.getAttribute("data-year");
            chips.forEach(function (x) {
              if (x.getAttribute("data-wing") === w) x.classList.toggle("active", x === c);
            });
            apply();
          });
        });
        if (fullBtn) fullBtn.addEventListener("click", function () {
          state.full = !state.full;
          fullBtn.classList.toggle("active", state.full);
          apply();
        });
        if (q) q.addEventListener("input", function () {
          state.q = q.value.trim().toLowerCase();
          apply();
        });
        apply();
      }
      if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
      else boot();
    })();
    </script>`;
