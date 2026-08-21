# mpgink.com — State Snapshot
**Last updated: 2026-08-21 (wrap of the AFM web-archive arc; supersedes the 2026-08-08 snapshot)**

## Current status
The 2026 "Gallery at Night" redesign is LIVE on mpgink.com (merged 2026-08-06,
Pages run #87 success), with the 08-07 list-ingress arc layered on top
(capture-only One Percent, lead-magnet pages unlinked, `?src=` attribution).
NEW this session, on branch `claude/afm-archive-website-t5cjkn` (NOT yet
merged): **the AFM archive** — mpgink.com now carries the editions themselves,
`afm/ed308.html` … `afm/ed316.html`, with newsletter.html's catalog as the
clickable index. Deploys = GitHub Pages from `main`; the archive goes live
when the branch merges and Matthew eyeballs the URLs.

## The design system (style.css — Gallery at Night)
Wall `#0f0c07` · ink `#17130c` · cream `#f3f0e8` · warm grey `#9a8f7d` ·
accent `#ff5a1f`/`#ff6b35` · AFM gold `#ffcf6b` · Metta purple `#a99bf5`.
Archivo (variable, wdth 62–125) display + Courier Prime mono microcopy;
Phreezer panels Orbitron/Share Tech Mono; JO/OP panels DM Sans/DM Mono.
Film grain (`.grain`), scroll reveals, framed-canvas art, hairline placards.
Responsive collapses at 1080/980/700px + mobile MENU/CLOSE toggle nav below
840px (shared `site.js`); zero-overflow at 375×812 is the standing bar —
the 9 new AFM pages verified against it headless this session.
Inside an AFM edition page, the "paper" itself is Georgia serif on white —
the email's voice, deliberately distinct from the gallery chrome.

## The AFM archive (new 2026-08-21)
- `afm/ed###.html` (308–316) — generated pages; ed313 is card-only (narrative
  never recovered; page says so and links the LinkedIn Pulse post).
- **Single source:** `scripts/afm-editions.json` (manifest) +
  `afm/content/ed###.md` (verbatim narrative copies from the AFM repo) →
  `node scripts/build-afm-pages.mjs` generates the pages AND the
  newsletter.html catalog rows (AFM-CATALOG markers). Never hand-edit either.
- Card images: `images/afm/afm-ed###-card.jpg` for all nine (308–314 rendered
  from the Visual HTML this session; 315/316 pre-existing).
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
  the ARCHIVE INDEX (9 generated clickable rows, newest highlighted)
- afm/ed308.html … afm/ed316.html — the archive (this branch)
- signup.html — live subscribe form + survey; reads sanitized `?src=`
- magnet.html / solo-operating-standard.html — built, UNLINKED, awaiting
  Matthew's copy review
- studio.html / shop.html / about.html / ai-usage.html / contact.html /
  metta.html — per the redesign; books.html redirect stub
- images/afm/ — AFM banner/hibiscus/monogram + all nine edition card JPGs
- scripts/check-site.mjs — the build check (`KIT_BUILD_CHECK_CMD`); PASS as
  of this wrap (24 pages, 754 local refs)
- scripts/build-afm-pages.mjs + scripts/afm-editions.json + afm/content/ —
  the archive generator (see above)

## Standing rules
- Mocks before building · no copy without Matthew's review · public repo,
  nothing sensitive · Metta name+mark only · no user counts ·
  deploy = merge to main (Pages builds main only) ·
  check-site.mjs must PASS before commit ·
  AFM archive: edit manifest/content, run the generator — never the outputs.

## Open issues
- **This branch needs merge + Matthew's browser check** of
  mpgink.com/afm/ed316.html, the newsletter.html catalog links, and one
  older page (ed308) — sandbox proxy blocks mpgink.com, nothing live-verified
  from here.
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
