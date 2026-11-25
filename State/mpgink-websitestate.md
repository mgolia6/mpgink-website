# mpgink.com: State Snapshot
**Last updated: 2026-11-24**, regenerated at the session 011 wrap (brand mark + merch arc).

## Current status
- **Live site:** `main` at **`a1a5d5e`** (merged 2026-11-25 on Matthew's go, fast-forward). Site check #19 +
  Pages #116 green. Session 011 shipped no page changes; `merch/` is served at unlinked paths,
  e.g. mpgink.com/merch/brand-stack/out/brand-stack-preview.png. Not live-checked from the sandbox,
  which can't reach mpgink.com.
- **Measured at this wrap:** `check-site.mjs` PASS, **241 HTML pages / 8,264 local refs**;
  `check-filter-wiring.mjs` PASS. AFM archive **226 editions**: Wing A **70** (ed252–ed321),
  Wing B 96, Wing C 60.

## What changed since the last snapshot (session 011, 2026-11-22 → 11-24)
- **Records reconciled.** They were 35 days / 3 commits stale; Ed320 and Ed321 had been pushed by AFM
  sessions that skipped this repo's records. Logged as a process gap in the backlog.
- **`merch/brand-stack/`:** each brand's real favicon, URL and a QR to it, stacked (mpgink, Phreezer,
  Job Odyssey, One Percent). Light, dark, and dark-with-QR-backing versions, transparent. Every QR
  decodes to exactly its own URL in simulation. **Not yet scanned from a real print.** Minimum print
  width ~4in. Generator + QR check live with the assets; see `merch/README.md`.
- **`merch/drawn-mark/`:** Matthew's hand-drawn mpgink (11-24 phone sketch), traced to vector as drawn.
  Inspiration, not an approved logo.
- **The mpgink mark is still open.** Many directions were tried and rejected; the list is in the 11-22
  log ("What was ruled out"). The next step is Matthew's own drawing; Claude traces it, not redesigns it.
- **Brand canon amended** (BRAND-COPY): never ad-lib the mpgink wordmark. Lowercase, approved mark only.
- Phish_Scorecard was attached read-only to pull Phreezer's icon (sparse checkout, no changes).

## The design system (style.css, Gallery at Night)
Wall `#0f0c07` · ink `#17130c` · cream `#f3f0e8` · warm grey `#9a8f7d` ·
accent `#ff5a1f`/`#ff6b35` · AFM gold `#ffcf6b` · Metta purple `#a99bf5`.
Archivo (variable, wdth 62–125) display + Courier Prime mono microcopy; Phreezer panels
Orbitron/Share Tech Mono; JO/OP panels DM Sans/DM Mono. Film grain, scroll reveals,
framed-canvas art, hairline placards. Responsive collapses at 1080/980/700px + a MENU/CLOSE
toggle below 840px (shared `site.js`); **zero horizontal overflow at 375px is the standing bar**.
Inside an AFM edition page the "paper" is Georgia serif on white, deliberately distinct.
Brand app colours (sampled this session): Phreezer cyan `#39d4cc`, One Percent green `#5dca9a`
(icon `#3DE88A`), Job Odyssey navy `#2a3550` / gold `#e8b84b`.

## The AFM archive
- **Wing A** `afm/ed252.html` … `afm/ed321.html` (70). **48 are card-only** (measured from
  `scripts/afm-editions.json` at this wrap; the previous snapshot's "46" was wrong). Ed290 and Ed318
  use `noCard` → AFM banner fallback. **Ed274 renders a SATIRE banner.** Ed268's LinkedIn URL is
  deliberately unattached pending Matthew's numbering call.
- **Wing B** `afm/email/<date-slug>.html` (96, 2021–2024), from 100 `.eml` files. Provenance banner on every page.
- **Wing C** `afm/founding/ed001.html` … `ed060.html` (60, Aug–Dec 2018). Cards, not prose. None is invented.
- **Generators are the single source. Never hand-edit an output.** `afm-chrome.mjs` (shared chrome
  + `FILTER_SCRIPT`) and the three `build-afm-*-pages.mjs`, each generating its pages AND its block in
  `newsletter.html`. One search box spans all three wings, guarded by `check-filter-wiring.mjs`.
- Narratives can carry photos: `![caption](url)` lines → wrapping photo group (since 2026-10-02).

## Build checks
`KIT_BUILD_CHECK_CMD="node scripts/check-site.mjs && node scripts/check-filter-wiring.mjs"`, both
enforced in `.github/workflows/build-check.yml`. Both PASS at this wrap. `KIT_RECORD_CHECKS` is not
configured in this repo, so no automated records audit runs. These numbers were measured by hand.

## Standing rules
Mocks before building · no copy without Matthew's review · public repo, nothing sensitive ·
Metta name+mark only · no user counts · deploy = merge to main (Pages builds main only) ·
build check must PASS before commit · AFM archive: edit the manifest, run the generator ·
**mpgink is always lowercase and never set in an improvised font**.

## Open issues
- **Brand mark + merch arc**: see Backlog "🧢". Brand stack needs placement + a real print scan;
  the mark waits on Matthew's drawing; the Etsy listing itself is untouched.
- **⚠ The hard-wrap guard is still not ported.** `build-afm-pages.mjs` splits paragraphs on
  newlines, so a hard-wrapped narrative shatters an archive page **silently**. It already bit once
  (ed318, 2026-09-11). Highest-value code fix in this repo.
- **AFM close-outs skip this repo's records.** Two in a row (Ed320, Ed321). The fix belongs in the AFM skill.
- **Matthew's browser check of the live site.** Nothing here is live-verified; the sandbox proxy blocks
  mpgink.com. Outstanding: `/one-percent.html` + START TODAY, `/newsletter.html` all wings,
  `/afm/founding/ed001.html`, `/afm/ed290.html`, `/afm/ed317.html`, `/afm/ed287.html`, `/afm/ed319.html`.
- **The real-phone mobile pass.** Promised across four sessions, still outstanding.
- **Regenerate the 96 Wing B pages** (stale against the 08-28 `h2` CSS). Harmless drift, own commit.
- **Editions 243–251.** Dated in the Day at a Glance workbook, not yet built.
- **Editions 61–242.** No records in any source. An archive gap, not a build gap.
- **48 Wing A pages card-only.** Upgradeable when the full-copy crawl lands.
- **Ed268 numbering conflict** (card/tab 12/13/24 vs LinkedIn 12/28/24). Matthew's call.
- Collateral canvases (~3MB each) uncompressed; shop/ai-usage OG images still the favicon.
- Phreezer Signal gallery: 4 screenshots waiting on Matthew.
- Watch Pages runs after each merge. A green run means deployed; no run means not deployed.
