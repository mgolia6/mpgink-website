# mpgink.com — State Snapshot
**Last updated: 2026-09-24** (regenerated at the session-010 wrap; supersedes the
2026-08-21 arc-4 snapshot, which was 34 days and 11 commits stale and still claimed
236 pages / 221 editions.)

## Current status
The 2026 "Gallery at Night" redesign is LIVE, with the 08-07 list-ingress arc on top.
`main` is at **`ab0673d`** — Site check run #13 and Pages run #108 both green.

**Measured at this wrap, not typed:** `check-site.mjs` PASS at **238 HTML pages / 8,151
local references**; `check-filter-wiring.mjs` PASS. AFM archive is **223 editions across
three wings** — Wing A **67**, Wing B **96**, Wing C **60**.

## What changed since the last snapshot

### One Percent launch copy (2026-09-18) — the newest work
One Percent went live 2026-09-18 ~12:18 UTC and this site still said otherwise. Shipped:
- `index.html` — the One Percent card chip, "LAUNCHING END OF AUGUST" → **"LIVE SEPT 18"**.
- `one-percent.html` — meta/OG/Twitter descriptions launch-framed (closes the old
  "OG still product-framed" item); hero chip **"NOW LIVE — SEPT 18, 2026"**; both CTAs
  → **START TODAY** at `onepercent.mpgink.com` with `utm_source=mpgink&utm_campaign=one-percent-page`;
  sign-in → `/login`; a terms line under the placard (free to start · 14 days of Compound
  free, no card · then $8/mo or $72/yr · $1 of every membership to the Mockingbird
  Foundation); the `#join` block reframed from waitlist to the AFM letter.
- **`#join` and the `one-percent-page` source tag were deliberately kept** — the app's daily
  reminder email lands on `one-percent.html#join` and the subscribe endpoint attributes by
  that tag. Breaking either would silently kill attribution.
- **The lesson count is deliberately NOT on the page.** A typed number on a static page rots
  the day the catalogue grows (kit-single-source; the "103 entries" lesson).
- Swept every page for early-access / opening-soon / launching / beta / waitlist wording.
  Only those two files carried it. Remaining "coming soon" hits are Metta, still true.

### AFM archive: Ed317 and Ed318 (2026-08-28, 2026-09-11)
- **Ed317 "Safe at Home"** — first edition on the Gallery at Night card system. Ed287
  upgraded card-only → full narrative and cross-linked from Ed317.
- **Ed318 "11 September"** — the archive's **first cardless edition**. `"noCard": true` was
  already supported; no generator change was needed. Its page was pushed with shattered
  paragraphs (the source narrative was hard-wrapped) and fixed the same night.

## The design system (style.css — Gallery at Night)
Wall `#0f0c07` · ink `#17130c` · cream `#f3f0e8` · warm grey `#9a8f7d` ·
accent `#ff5a1f`/`#ff6b35` · AFM gold `#ffcf6b` · Metta purple `#a99bf5`.
Archivo (variable, wdth 62–125) display + Courier Prime mono microcopy; Phreezer panels
Orbitron/Share Tech Mono; JO/OP panels DM Sans/DM Mono. Film grain, scroll reveals,
framed-canvas art, hairline placards. Responsive collapses at 1080/980/700px + a MENU/CLOSE
toggle below 840px (shared `site.js`); **zero horizontal overflow at 375px is the standing
bar** — `one-percent.html` and `index.html` were both re-verified headless at 1280px and
375px this session, 0px overflow. Inside an AFM edition page the "paper" is Georgia serif on
white, deliberately distinct from the gallery chrome.

## The AFM archive
- **Wing A** `afm/ed252.html` … `afm/ed318.html` (67). 46 remain card-only. Ed290 and Ed318
  use `noCard` → AFM banner fallback. **Ed274 renders a SATIRE banner.** Ed268's LinkedIn URL
  is deliberately unattached pending Matthew's numbering call.
- **Wing B** `afm/email/<date-slug>.html` (96, 2021–2024), published date-first from 100
  `.eml` files. Provenance banner on every page.
- **Wing C** `afm/founding/ed001.html` … `ed060.html` (60, Aug–Dec 2018). Cards, not prose —
  none is invented. 38 of 60 make no born/died year claim; 43 have an answer with no riddle.
- **Generators are the single source — never hand-edit an output.** `afm-chrome.mjs` (shared
  chrome + `FILTER_SCRIPT`) and the three `build-afm-*-pages.mjs`, each generating its pages
  AND its block in `newsletter.html`. One search box spans all three wings, guarded by
  `check-filter-wiring.mjs`.

## Build checks
`KIT_BUILD_CHECK_CMD="node scripts/check-site.mjs && node scripts/check-filter-wiring.mjs"`,
both also enforced in `.github/workflows/build-check.yml`. Both PASS as of this wrap.

## Standing rules
Mocks before building · no copy without Matthew's review · public repo, nothing sensitive ·
Metta name+mark only · no user counts · deploy = merge to main (Pages builds main only) ·
build check must PASS before commit · AFM archive: edit the manifest, run the generator.

## Open issues
- **⚠ The hard-wrap guard is still not ported.** `build-afm-pages.mjs` splits paragraphs on
  newlines exactly as the email builder did, so a hard-wrapped narrative still shatters an
  archive page **silently**. The AFM repo refuses; this repo does not. **It has already bitten
  once** (ed318, 2026-09-11). Highest-value fix in this repo.
- **Matthew's browser check of the live site** — nothing here is live-verified; the sandbox
  proxy blocks mpgink.com. Outstanding: `/one-percent.html` and a tap on START TODAY (new),
  plus the carried `/newsletter.html` all-wings check, `/afm/founding/ed001.html`,
  `/afm/ed290.html`, `/afm/ed317.html`, `/afm/ed287.html`.
- **The real-phone mobile pass** — promised across four sessions, still outstanding.
- **Editions 243–251** — dated in the Day at a Glance workbook, not yet built. The only
  recoverable stretch still missing.
- **Editions 61–242** — no records found in any source. Not a build gap, an archive gap.
- **46 Wing A pages are still card-only** — upgradeable when the full-copy crawl lands.
- **Ed268 numbering conflict** (card/tab 12/13/24 vs LinkedIn 12/28/24) — Matthew's call.
- Collateral canvases (~3MB each) uncompressed; shop/ai-usage OG images still the favicon.
- Phreezer Signal gallery: 4 screenshots waiting on Matthew.
- Watch Pages runs after each merge — three builds died unrunnered in GitHub's queue on
  08-06. A green run means deployed; no run means not deployed.
