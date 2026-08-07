# mpgink.com — State Snapshot
**Last updated: 2026-08-06 (Quad Design "Gallery at Night" redesign session)**

## Current status
The full 2026 "Gallery at Night" redesign (Quad Design handoff package,
`design_handoff_mpgink_website_2026`) is LIVE. Matthew ordered the merge
2026-08-06; main fast-forwarded 1376bbe→22f4154 (desktop redesign + per-app
IG links + mobile version) and the Pages deploy succeeded (run #87,
conclusion: success, 22:53 UTC). Note: the three prior Pages builds on main
that day had FAILED in GitHub's runner queue (build job never assigned a
runner), so the site had been frozen at the Aug 4 deploy until this one —
the queue recovered on its own. Deploys remain GitHub Pages from `main`.

## The design system (style.css, fully rewritten)
Digital art gallery at night: wall `#0f0c07`, ink panel `#17130c`, cream
`#f3f0e8`, warm grey `#9a8f7d`, accent orange `#ff5a1f`/`#ff6b35`, AFM gold
`#ffcf6b`, Metta purple `#a99bf5`. Archivo (variable, wdth 62–125) display +
Courier Prime mono microcopy; Phreezer panels Orbitron/Share Tech Mono; JO/OP
panels DM Sans/DM Mono. Film-grain overlay (`.grain`), scroll reveals
(`animation-timeline: view()`, degrades to visible), framed-canvas art
treatment, hairline placards. Responsive collapses added at 1080/980/700px
(the handoff was a desktop spec). Mobile version (same session): MENU/CLOSE
toggle nav below 840px via shared site.js on every page; .gutter/.nl-art/
.hero-side mobile hooks; all 12 pages verified zero-overflow at 375×812.

## Site map (as of right now, on the work branch)
- index.html — hero (mission.passion.gratitude + framed graffiti banner w/
  correct 13·16·7 cipher), 3-principle strip, The Exhibits 2×2 (real product
  screenshots), Metta teaser card, The Studio 3 cards, first-visit signup
  modal (localStorage `mpgink-list-modal-v1`, 1.2s delay)
- phreezer.html — EXHIBIT NO. 01: terminal band on #000 w/ scanlines +
  marquee, 3 real screenshots, 6 placards, vocabulary band (PHROZEN/PHREEZE/
  PHRIEND), green CTA
- job-odyssey.html — EXHIBIT NO. 02: navy band, Leads screenshot, 6-step
  pipeline, 6 placards, gold CTA band
- one-percent.html — EXHIBIT NO. 03: slate band, 3 screenshots (today/
  library/month), 10 category chips, 3 placards, green CTA band
- newsletter.html — EXHIBIT NO. 04: framed AFM art hero, Anatomy of an
  edition (4 gold cells), catalog archive rows 312–308 + "ED. 313 DROPS THIS
  FRIDAY", gold signup CTAs
- signup.html — gold hero, 3 arrow bullets, live subscribe form
  (POST https://pm.mpgink.com/api/subscribe, honeypot `website`, all state
  copy from handoff), 3-step skippable survey (progressive fire-and-forget)
- studio.html — 3 alternating rows: Arlo & Ash (cropped logo on warm
  gradient), blog, shop teaser; ids #books/#blog/#store kept
- shop.html — "The shop." (never "store"), curated 3-item mpgink × Aloha
  Friday grid (Etsy links, hotlinked i.etsystatic images), Etsy CTAs
- about.html — manifesto hero, Rooms 01–04 (sticky headings + framed
  mission/vision/tenets/history canvases), tenets 2-col cells, timeline,
  closing CTA row
- ai-usage.html — manifesto, orange-rule pull quote, 12 usage chips,
  numbered 01–04 rows, closing band
- contact.html — THE GUESTBOOK hero, 4 icon tiles (inline SVG), gold
  join-the-list card + app-feedback card
- metta.html — teaser ONLY (guardrail held): glowing icon, "metta",
  COMING SOON, IG link
- books.html — unchanged redirect stub → studio.html#books
- Nav (all pages): logo+13·16·7 · THE EXHIBITS · AFM · STUDIO · SHOP ·
  ABOUT · AI · SAY ALOHA (cream button)
- Footer (all pages): brand col + THE EXHIBITS col + THE STUDIO col
  (JOIN THE LIST ✶ in gold), bottom bar w/ LINKEDIN/INSTAGRAM/ETSY/COFFEE

## Images
Added from the handoff: arlo-ash-logo-cropped.png, job-odyssey-shot-leads.png,
one-percent-shot-today.png, phreezer-shot-archive.png. Collateral canvases
(mission/vision/tenets/history ~3MB each) still uncompressed — handoff
recommends compressing for production; no image toolchain in this sandbox
(backlogged).

## Standing rules for this repo
- MOCKS BEFORE BUILDING for visual changes — satisfied this round: the Quad
  Design handoff IS the approved mock (copy/colors/interactions marked final).
- No copy ships without Matthew's review — all copy came verbatim from the
  handoff package Matthew supplied.
- Public repo: nothing sensitive. Metta = name+mark only (held).
- No user counts on the site (held — none in the design).
- Deploy = merge work branch → main; GitHub Pages builds from main only.

## Open issues
- Redesign awaiting Matthew's review + merge to main (branch
  claude/mpg-website-design-jefdka).
- Sandbox cannot reach Google Fonts/Etsy images — pages verified headless on
  local assets + system-font fallback; typography needs one production
  eyeball after merge.
- Collateral PNGs (~3MB each) uncompressed (see Images).
- Phreezer Signal screenshot gallery (4 files) still waiting on Matthew —
  superseded page no longer stages it; revisit post-merge.
- OG images: shop/ai-usage still point at mpgink-favicon.png (low priority).
