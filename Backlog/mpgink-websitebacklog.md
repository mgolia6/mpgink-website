# mpgink.com — Backlog / Overhaul Roadmap
*Created 2026-07-21 (overhaul session). The overhaul thesis: catch the site up
to the collective framing established at the 2026-07-21 LinkedIn launch.
Canon: BRAND-COPY-2026-07-21.md. Nothing ships without Matthew's review.*

## ✅ Shipped 2026-07-21
- Favicon + home-screen icons on all 8 pages (32/192/512 + apple-touch + manifest)
- Homepage overhaul: collective hero, 13·16·7 cipher band, What we build grid
  (Phreezer / Job Odyssey / One Percent / AFM, real collateral, status chips),
  Metta coming-soon strip (name + mark only), The studio section, new footer line
- style.css: fixed footer logo broken since the 5/31 image rename
- Brand doc amendments recorded: Metta name-only tease OK; One Percent public
  launch end of August

## 🔨 The page-by-page overhaul (current arc, in order)
1. ~~**about.html**~~ ✅ 2026-07-21 — collective opening, History "2026 — The
   Collective" era (scorecard→Phreezer corrected), exit door to What We Build.
2. ~~**one-percent.html**~~ ✅ 2026-07-21 — 10 registry categories/colors, The
   Standard (human-verified) card, launch chip, invite CTAs.
3. ~~**phreezer.html / job-odyssey.html / metta.html**~~ ✅ 2026-07-21 — NEW
   dedicated product pages (Matthew's ask): Phreezer in its terminal identity
   w/ real app shots + Signal Aug 1 callout; Job Odyssey navy/gold w/ 4-stage
   journey + beta CTA; Metta minimal name-and-mark teaser (guardrail held).
   Sidebar nav now canonical across all pages (products grouped).
4. ~~**newsletter.html**~~ ✅ 2026-07-21 — full AFM page: since-2018 story,
   anatomy of an edition, real recent editions (308–312 from the content log),
   subscribe CTAs. No subscriber counts.
5. ~~**books.html**~~ ✅ 2026-07-21 — REAL cover copy pulled from Matthew's
   Google Drive (Arlo&Ash folder): "Arlo and the Million-Mile Truck" by Arlo
   Golia (with a little help from dad); series name corrected to "Explorers
   Series" site-wide.
6. ~~**contact.html**~~ ✅ 2026-07-21 — email matthew@mpgink.com (CONFIRMED
   by Matthew), form placeholder cut.
7. ~~**ai-usage.html**~~ ✅ 2026-07-21 — light tune: "Building & shipping apps"
   pill + 2026 build-partner paragraph. Manifesto untouched otherwise.

## 🛍 Shop / merch arc (Matthew, 2026-07-21 — next arc after pages)
- Matthew has shop content changes incoming
- Spin up brand-specific merch lines (Phreezer / Job Odyssey / One Percent /
  AFM / mpgink) — Canva connector is available for design work
- Retire a batch of current listings — Matthew to specify which
- Then re-verify shop.html prices/listings against Etsy

## 🔁 Cross-page sweeps
- ~~Footer brand line~~ ✅ collective line on all 11 pages
- ~~Canonical sidebar nav~~ ✅ all pages (products grouped)
- ~~newsletter duplicate stylesheet link~~ ✅ (killed in rewrite)
- OG images: index/about/one-percent/phreezer/job-odyssey/metta/newsletter done;
  books/contact/shop still on the 512px favicon (low priority)

## 📐 Process rule (Matthew, 2026-07-21)
**Mocks BEFORE building, always.** Visual/layout changes get a mock in the
artifact (claude.ai/code/artifact/7e8ae6d9-...) and Matthew's approval before
touching the live site. Copy corrections from verified sources may ship direct.

## 🖼 Layout restyle — ✅ APPROVED + SHIPPED 2026-07-21
Graffiti as gallery plaques (about + ai-usage), hero 40vw→32vw, section
padding tightened. Per Matthew's feedback the CIPHER BAND WAS DROPPED
ENTIRELY (duplicate imagery + tease too on-the-nose). Also shipped from the
same feedback: scroll-cue arrow now anchors to #build, smooth scrolling
site-wide (reduced-motion aware), umbrella line scrapped, studio card images
uncropped (object-fit contain), Books card copy restored to the repo's
original Arlo & Ash line.

## 📸 Instagram — SHIPPED 2026-07-21 (handles from Matthew)
@mpgink (index footer icon) · @phreezerapp · @jobodyssey ·
@getonepercentsmarter · @metta.lovingkindness (spelling confirmed by
Matthew) — follow links on each product page bottom.

## 🚢 Mock board round — ✅ ALL SIX APPROVED + SHIPPED 2026-07-21
Phreezer v2 (blog-post copy, verb trio, click-to-reveal features, giants
links row, IG chip up top) · Job Odyssey v2 (OdysseyVal + Compass drawn as
brand visuals, copy halved, IG chip; "Make it an odyssey" kept — Claude's
line, Matthew approved) · One Percent v2 (3 design-comp screens, corrected
loop: lesson → Lock It In → Keep It Sharp, category chips) · AFM header →
plaque · The Studio = books+blog+store merged (books.html now redirects;
nav slimmed to 9 entries) · Contact v2 ("Say aloha", color cards, what
broke / what ruled).

## ⏳ Waiting on Matthew
- **4 Phreezer Signal screenshots** (Your Signal · On This Day live · Rated
  view · Song History) — seen in chat but vision-only; need actual files.
  Drop into any repo folder (e.g. Phish_Scorecard) or attach again.
  Gallery markup is staged in phreezer.html behind a comment with final
  filenames: phreezer-shot-{your-signal,on-this-day,rated,song-history}.jpg
- **Phreezer mobile images** (Matthew has them)
- **AFM latest edition links** (Matthew sending)

## 🅿 Parked / blocked
- **13·16·7 cipher: find it a graceful home** — band removed from homepage;
  Matthew wants the cipher handled subtly somewhere else (footer whisper?
  about-page easter egg?) — propose via mock
- **Regenerate graffiti hero to 13/16/7** — needs image work outside this repo;
  until then the cipher band (correct tiles) carries the cipher
- **Shop page price verification vs Etsy** — separate arc (PROJECT_PLAN note)
- **mpgink-cover-* uploader fallbacks** — brand doc lists them; not in images/
- One Percent card art: swap og-image copy if the app's branding evolves before
  the August launch

## Session exit
- Wrap per kit-wrap-protocol: create State/mpgink-websitestate.md +
  Logs/mpgink-websitelog-2026-07-21.md (this repo's first records), reconcile
  the May→July log gap honestly, update this backlog, final push.
