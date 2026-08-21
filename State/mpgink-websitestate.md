# mpgink.com — State Snapshot
**Last updated: 2026-08-21 arc 4 (Wing C, the founding era; supersedes the arc-2 snapshot from earlier today)**

## Current status
The 2026 "Gallery at Night" redesign is LIVE on mpgink.com (merged 2026-08-06,
Pages run #87 success), with the 08-07 list-ingress arc layered on top
(capture-only One Percent, lead-magnet pages unlinked, `?src=` attribution).
NEW this session: **the AFM archive** — mpgink.com carries the editions
themselves, and it now reaches the first one. **221 editions across three
wings**, all generated:

| Wing | What | Count | Pages |
|---|---|---|---|
| A | The numbered catalog — LinkedIn era | 65 (252–316) | `afm/ed###.html` |
| B | The email era, published date-first | 96 (2021–2024) | `afm/email/<slug>.html` |
| C | The founding era — cards, every weekday | 60 (1–60, Aug–Dec 2018) | `afm/founding/ed###.html` |

`newsletter.html` is the index for all three. Deploys = GitHub Pages from
`main`; **Matthew's browser check of the live URLs is the outstanding
verification** — the sandbox proxy blocks mpgink.com, so nothing here is
live-verified.

## The design system (style.css — Gallery at Night)
Wall `#0f0c07` · ink `#17130c` · cream `#f3f0e8` · warm grey `#9a8f7d` ·
accent `#ff5a1f`/`#ff6b35` · AFM gold `#ffcf6b` · Metta purple `#a99bf5`.
Archivo (variable, wdth 62–125) display + Courier Prime mono microcopy;
Phreezer panels Orbitron/Share Tech Mono; JO/OP panels DM Sans/DM Mono.
Film grain (`.grain`), scroll reveals, framed-canvas art, hairline placards.
Responsive collapses at 1080/980/700px + mobile MENU/CLOSE toggle nav below
840px (shared `site.js`); zero-overflow at 375px is the standing bar —
newsletter.html and sample pages from all three wings verified headless this
session at 1600px and 375px, 0px overflow, 0 page errors.
Inside an AFM edition page, the "paper" itself is Georgia serif on white —
the email's voice, deliberately distinct from the gallery chrome.

## The AFM archive (built 2026-08-21, arcs 1–4)

### Wing A — `afm/ed252.html` … `afm/ed316.html` (65)
17 have full narratives; the rest are card-only (card + catalog line + "the
full narrative lives on LinkedIn" pointer — Matthew accepted the LinkedIn roll
for these). Ed290 has no card: `noCard` → AFM banner fallback for page art and
og:image. **Ed274 renders a SATIRE banner** — it is a fabricated April Fools
piece that was presenting as reporting. Ed268's LinkedIn URL deliberately
unattached (numbering conflict awaiting Matthew).
Source: `scripts/afm-editions.json` + `afm/content/ed###.md`.

### Wing B — `afm/email/<date-slug>.html` (96, 2021–2024)
Recovered from 100 `.eml` files in Drive `Motivation/Archive/`. Published
**date-first**: no lifetime numbers were invented, and the self-assigned
subject-line numbers (#1–#24, incl. two originals that reused #5 and #16)
render only where the original carried one. Every page states in a provenance
banner what was edited out: signature blocks, work links, colleague names
(replaced by role). Sandy Huntington kept by name — a memorial, already public.
The 2022 Year End Edition was lifted from a reply that quoted it.
Source: `scripts/afm-email-editions.json`; pipeline preserved in the AFM repo
at `scripts/email-era/`.

### Wing C — `afm/founding/ed001.html` … `ed060.html` (60, Aug–Dec 2018)
These predate everything: **every weekday, to one team, as a card** — national
days, this-day-in-history, born, died, a quote, a riddle answered the next
morning. No prose exists from this era and **none is invented**; the page
prints the card and says so. Two honesty calls carried in the data:
- **38 of 60 make no born/died year claim.** The workbook's name/year stride
  is inconsistent, so those lists render as the source's single run with an
  explicit "we haven't matched each name to a year." 27 verified → years show.
- **43 have an answer with no riddle.** Those pages name which half survived.
Source: `scripts/afm-founding-editions.json`, built from *Motivation Index.xlsx*
(all 60) enriched by *Day at a Glance v2.xlsx* (52 of 60).

### The generators (single source — never hand-edit an output)
- `scripts/afm-chrome.mjs` — nav, footer, paper CSS, markdown subset, and
  `FILTER_SCRIPT`, shared by all three generators. No dependencies.
- `scripts/build-afm-pages.mjs` (A) · `build-afm-email-pages.mjs` (B) ·
  `build-afm-founding-pages.mjs` (C). Each generates its pages **and** its
  block in `newsletter.html` (between `AFM-CATALOG` / `AFM-EMAIL` /
  `AFM-FOUNDING` markers), so an index cannot drift from its pages.
- `scripts/make-afm-thumbs.py` — catalog thumbnails (Wing A).
- Edition CTAs attribute via `signup.html?src=afm-archive-ed###`,
  `?src=afm-email-<slug>`, `?src=afm-founding-<slug>`.

### One filter, three wings
`newsletter.html` has ONE search box spanning all three wings, plus per-wing
year chips and a Wing-A "FULL READS" toggle. One controller
(`FILTER_SCRIPT` in `afm-chrome.mjs`, emitted once by `build-afm-pages.mjs`);
rows/chips/dividers/empty-states speak one contract (`afm-row` + `data-wing` +
`data-year`). Each wing has its own honest empty state — a filtered-to-zero
wing says so rather than vanishing.
This replaced three inline scripts, where the box claimed to search the
archive and searched Wing A only.

## Site map (live + this branch)
- index.html — gallery hero, 3-principle strip, The Exhibits 2×2, Metta
  teaser, The Studio cards, first-visit signup modal
- phreezer.html / job-odyssey.html — EXHIBITS 01–02 per the redesign
- one-percent.html — EXHIBIT 03, capture-only since 08-07
- newsletter.html — EXHIBIT 04: AFM landing page + the archive index
  (Wings A, B, C — 221 rows total)
- afm/ed###.html · afm/email/ · afm/founding/ — the archive (221 pages)
- signup.html — live subscribe form + survey; reads sanitized `?src=`
- magnet.html / solo-operating-standard.html — built, UNLINKED, awaiting
  Matthew's copy review
- studio.html / shop.html / about.html / ai-usage.html / contact.html /
  metta.html — per the redesign; books.html redirect stub
- images/afm/ — AFM banner/hibiscus/monogram + 64 edition card JPGs + thumbs

## Build checks
`KIT_BUILD_CHECK_CMD="node scripts/check-site.mjs && node scripts/check-filter-wiring.mjs"`,
both also enforced in `.github/workflows/build-check.yml`. As of this wrap:
- `check-site.mjs` PASS — 236 HTML pages, 8,080 local references resolved.
- `check-filter-wiring.mjs` PASS — 12 checks, 221/221 rows wired, exactly one
  filter script. Proven to fail on both bug classes it guards (an unwired wing;
  a second inline filter).

## Standing rules
- Mocks before building · no copy without Matthew's review · public repo,
  nothing sensitive · Metta name+mark only · no user counts ·
  deploy = merge to main (Pages builds main only) ·
  build check must PASS before commit ·
  AFM archive: edit the manifest, run the generator — never the outputs.

## Open issues
- **Matthew's browser check of the live archive** — nothing live-verified from
  here. After merge: `/newsletter.html` (all three wings + the search box),
  `/afm/founding/ed001.html` (the first edition), `/afm/ed290.html` (the
  banner-fallback page).
- **The mobile pass on a real phone** — promised follow-up, still outstanding.
  Headless 375px is clean, but Matthew flagged mobile layout issues by eye.
- **Editions 61–242: nothing found anywhere.** 2019 and 2020 have no records
  in any source checked. Not a gap in the build — a gap in the archive.
- **Editions 243–251** — dated in the Day at a Glance workbook, not yet built.
- **LinkedIn full copy for 252–265** — the crawl's second run would upgrade 48
  card-only Wing A pages to full narratives.
- **Ed268 numbering conflict awaits Matthew's call** (card/tab 12/13/24 vs
  LinkedIn End-of-Year 12/28/24) — its LinkedIn URL held back until then.
- **"DJ Flanz" call** — a colleague's public artist page in the 2023-01-20
  edition currently reads "a teammate's DJ project"; Matthew can restore the
  stage name in one edit.
- **#268's medical-leave disclosure** and **#269's 203,181 impressions**
  (implausible, unverified — do not publish) — see the AFM repo proposal.
- Lead-magnet copy review → then link magnet/guide from nav + wire the
  magnet welcome-email variant.
- one-percent.html OG description still product-framed, not early-access framed.
- Collateral canvases (~3MB each) uncompressed; shop/ai-usage OG images still
  the favicon. Phreezer Signal gallery: 4 screenshots waiting on Matthew.
- Watch GitHub Pages runs after each merge — 3 builds on 08-06 died unrunnered
  in GitHub's queue; green run = deployed, no run = not deployed.
