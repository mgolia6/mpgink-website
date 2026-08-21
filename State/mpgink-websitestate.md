# mpgink.com — State Snapshot
**Last updated: 2026-08-21 arc 2 (deep backfill 252–316; supersedes the arc-1 snapshot from earlier today)**

## Current status
The 2026 "Gallery at Night" redesign is LIVE on mpgink.com (merged 2026-08-06,
Pages run #87 success), with the 08-07 list-ingress arc layered on top
(capture-only One Percent, lead-magnet pages unlinked, `?src=` attribution).
NEW this session: **the AFM archive** — mpgink.com carries the editions
themselves. Arc 1 (308–316) merged to main (Pages run green on 5798ae2);
arc 2 backfilled the full LinkedIn era, `afm/ed252.html` … `afm/ed316.html`
— **65 pages** — with newsletter.html's catalog (65 rows, year dividers) as
the clickable index. Deploys = GitHub Pages from `main`; Matthew's browser
check of the live URLs is the outstanding verification.

## The design system (style.css — Gallery at Night)
Wall `#0f0c07` · ink `#17130c` · cream `#f3f0e8` · warm grey `#9a8f7d` ·
accent `#ff5a1f`/`#ff6b35` · AFM gold `#ffcf6b` · Metta purple `#a99bf5`.
Archivo (variable, wdth 62–125) display + Courier Prime mono microcopy;
Phreezer panels Orbitron/Share Tech Mono; JO/OP panels DM Sans/DM Mono.
Film grain (`.grain`), scroll reveals, framed-canvas art, hairline placards.
Responsive collapses at 1080/980/700px + mobile MENU/CLOSE toggle nav below
840px (shared `site.js`); zero-overflow at 375×812 is the standing bar —
AFM pages spot-verified against it headless this session (375px, 0px overflow).
Inside an AFM edition page, the "paper" itself is Georgia serif on white —
the email's voice, deliberately distinct from the gallery chrome.

## The AFM archive (new 2026-08-21, backfilled same day)
- `afm/ed###.html` (252–316, 65 pages) — generated. 17 have full narratives;
  the rest are card-only (card + catalog line + "the full narrative lives on
  LinkedIn" pointer — Matthew accepted the LinkedIn roll for these). Ed290
  has no card at all: `noCard` in the manifest → AFM banner fallback for the
  page art and og:image. Ed268's LinkedIn URL deliberately unattached
  (numbering conflict awaiting Matthew — see Logs 2026-08-21 arc 2).
- **Single source:** `scripts/afm-editions.json` (manifest) +
  `afm/content/ed###.md` (verbatim narrative copies from the AFM repo) →
  `node scripts/build-afm-pages.mjs` generates the pages AND the
  newsletter.html catalog rows (AFM-CATALOG markers). Never hand-edit either.
- Card images: `images/afm/afm-ed###-card.jpg` for 64 of 65 (all but 290):
  252–305 converted from Drive DM PNGs, 306/307 from screenshots, 308–314
  rendered from the Visual HTMLs, 315/316 pre-existing.
- Dates/titles provenance lives in the AFM repo:
  `logs/AFM_EditionRegistry_2026-08-21.csv` (measured/estimated/unknown per
  edition). Day at a Glance v2.xlsx tabs + card faces are the source of
  truth (Matthew's rule).
- Edition CTAs attribute via `signup.html?src=afm-archive-ed###`.
- Weekly flow: documented as Step 11 in the AFM repo's
  `directions/AFM_Directions_2026-08-21.md` — card JPG + narrative copy +
  manifest entry + build + check-site, every Friday.

## Site map (live + this branch)
- index.html — gallery hero, 3-principle strip, The Exhibits 2×2, Metta
  teaser, The Studio cards, first-visit signup modal
- phreezer.html / job-odyssey.html — EXHIBITS 01–02 per the redesign
- one-percent.html — EXHIBIT 03, capture-only since 08-07 (`#join` capture,
  EARLY ACCESS badge, `?src=` share URLs)
- newsletter.html — EXHIBIT 04: AFM landing page; its catalog section is now
  the ARCHIVE INDEX (65 generated rows with year dividers, newest highlighted)
- afm/ed252.html … afm/ed316.html — the archive (65 pages)
- signup.html — live subscribe form + survey; reads sanitized `?src=`
- magnet.html / solo-operating-standard.html — built, UNLINKED, awaiting
  Matthew's copy review
- studio.html / shop.html / about.html / ai-usage.html / contact.html /
  metta.html — per the redesign; books.html redirect stub
- images/afm/ — AFM banner/hibiscus/monogram + 64 edition card JPGs
- scripts/check-site.mjs — the build check (`KIT_BUILD_CHECK_CMD`); PASS as
  of this wrap (80 pages, 2,713 local refs)
- scripts/build-afm-pages.mjs + scripts/afm-editions.json + afm/content/ —
  the archive generator (see above)

## Standing rules
- Mocks before building · no copy without Matthew's review · public repo,
  nothing sensitive · Metta name+mark only · no user counts ·
  deploy = merge to main (Pages builds main only) ·
  check-site.mjs must PASS before commit ·
  AFM archive: edit manifest/content, run the generator — never the outputs.

## Open issues
- **Matthew's browser check of the live archive** — sandbox proxy blocks
  mpgink.com, nothing live-verified from here. Check after the backfill
  merge deploys: `/afm/ed252.html` (oldest), `/newsletter.html` (65-row
  catalog), `/afm/ed290.html` (the banner-fallback page).
- **Ed268 numbering conflict awaits Matthew's call** (card/tab 12/13/24 vs
  LinkedIn End-of-Year 12/28/24) — its LinkedIn URL is held back until then.
- **Matthew's production eyeball still outstanding** (pre-existing): Google
  Fonts typography, Etsy shop images, mobile MENU nav / OP hero on a phone.
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
