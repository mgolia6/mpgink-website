# mpgink.com — State Snapshot
**Last updated: 2026-08-08 (wrap of the Gallery at Night redesign session; reconciled against the 2026-08-07 list-ingress arcs)**

## Current status
The 2026 "Gallery at Night" redesign (Quad Design handoff) is LIVE on
mpgink.com — merged on Matthew's go 2026-08-06, Pages run #87 success. Since
then two 2026-08-07 sessions layered the list-ingress arc on top of the new
design (PRs #4–#6, all merged, Pages runs green): One Percent page rewired
to capture-only, lead-magnet pages built but unlinked, `?src=` source
tagging on signup. main tip: `5e8d490`. Deploys = GitHub Pages from `main`.

## The design system (style.css — Gallery at Night)
Wall `#0f0c07` · ink `#17130c` · cream `#f3f0e8` · warm grey `#9a8f7d` ·
accent `#ff5a1f`/`#ff6b35` · AFM gold `#ffcf6b` · Metta purple `#a99bf5`.
Archivo (variable, wdth 62–125) display + Courier Prime mono microcopy;
Phreezer panels Orbitron/Share Tech Mono; JO/OP panels DM Sans/DM Mono.
Film grain (`.grain`), scroll reveals (`animation-timeline: view()`,
degrades to visible), framed-canvas art, hairline placards. Responsive
collapses at 1080/980/700px + mobile MENU/CLOSE toggle nav below 840px
(shared `site.js` on every page); all pages verified zero-overflow at
375×812 at build time.

## Site map (live)
- index.html — gallery hero + framed graffiti banner (correct 13·16·7),
  3-principle strip, The Exhibits 2×2, Metta teaser, The Studio 3 cards,
  first-visit signup modal (localStorage `mpgink-list-modal-v1`)
- phreezer.html — EXHIBIT 01: terminal band, marquee, 3 screenshots,
  6 placards, vocabulary band, IG follow link
- job-odyssey.html — EXHIBIT 02: navy band, Leads screenshot, 6-step
  pipeline, 6 placards, gold CTA, IG follow link
- one-percent.html — EXHIBIT 03, **capture-only since 08-07**: hero CTA
  GET EARLY ACCESS → `#join` email capture; app link demoted to
  "already in the beta? sign in"; badge now EARLY ACCESS OPENING SOON;
  `?src=` share URLs live (linkedin-op / instagram-op)
- newsletter.html — EXHIBIT 04: framed AFM art, Anatomy cells, archive
  rows 312–308, gold signup CTAs
- signup.html — gold hero, live subscribe form + 3-step survey; survey
  stores stable slugs (08-07); reads sanitized `?src=` as source tag
- magnet.html — lead-magnet opt-in (source `magnet-solo-operating-standard`)
  — **UNLINKED from nav**, copy awaiting Matthew's review
- solo-operating-standard.html — the guide as a page (6 rules, 7 copyable
  prompts, 3 SVG diagrams) — **UNLINKED**, awaiting Matthew's review;
  draft doc MAGNET-SOLO-OPERATING-STANDARD-DRAFT.md at repo root
- studio.html / shop.html / about.html / ai-usage.html / contact.html /
  metta.html — per the redesign (metta teaser-only guardrail held);
  books.html redirect stub
- images/afm/ — hosted images for the AFM email send pipeline (08-07)

## Standing rules
- Mocks before building · no copy without Matthew's review · public repo,
  nothing sensitive · Metta name+mark only · no user counts ·
  deploy = merge to main (Pages builds main only).

## Open issues
- **Matthew's production eyeball still outstanding** (three sessions have
  asked, none could reach mpgink.com from a sandbox): Google Fonts
  typography, Etsy shop images, mobile MENU nav / OP hero on a real phone.
- Lead-magnet copy review → then link magnet/guide from nav + wire the
  magnet welcome-email variant (queued behind api/subscribe work in the
  PM repo).
- one-percent.html OG description still product-framed, not early-access
  framed — copy pass before the first share post.
- Collateral canvases (mission/vision/tenets/history ~3MB each) still
  uncompressed; shop/ai-usage OG images still the favicon.
- Phreezer Signal gallery: 4 screenshot files still waiting on Matthew.
- Watch GitHub Pages runs after each merge — 3 builds on 08-06 died
  unrunnered in GitHub's queue (site silently frozen for 2 days);
  green run = deployed, no run = not deployed.
