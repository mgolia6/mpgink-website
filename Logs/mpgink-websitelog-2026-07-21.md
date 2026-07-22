# mpgink.com — Session Log — 2026-07-21

## Honest catch-up: 2026-05-31 → 2026-07-21 (reconciled from git log)
The legacy log (docs/SESSION_LOG.md) ends 2026-05-31 (image rename session).
Between then and today the repo saw exactly one arc, on 2026-07-21 pre-session:
the LinkedIn launch commits — claude-kit v2 install (`b32a60d`), banner crops
from the graffiti hero (`9e24d54`), 13/16/7 cipher tiles (`c64f467`), and
BRAND-COPY-2026-07-21.md (`1682266`). Nothing else happened in the gap.
Going forward this Logs/ directory is the session record (mpgink standard);
docs/SESSION_LOG.md is legacy and stays frozen.

## Session: 2026-07-21 — THE OVERHAUL (full-day arc, Claude Code remote)

### What shipped (all live on mpgink.com, deployed via main)
1. **Favicon/home-screen icons** — 32/192/512 + apple-touch + webmanifest,
   wired on every page (site previously had NO favicon links at all).
2. **Homepage** — collective reframe: graffiti hero + mission·passion·gratitude,
   "What we build" grid (Phreezer/Job Odyssey/One Percent/AFM w/ real
   collateral + status chips), Metta coming-soon strip, "The studio" section.
   Cipher band shipped then REMOVED same-day per Matthew (duplicate imagery,
   tease too on-the-nose). Fixed footer logo broken since 5/31 rename.
3. **New product pages** — phreezer.html (terminal identity, blog-post copy,
   click-to-reveal features, giants links row), job-odyssey.html (OdysseyVal +
   Compass drawn as brand visuals), metta.html (name+mark teaser only),
   studio.html (Books+Blog+Store merged; books.html now redirects).
4. **Every other page rebuilt** — about (gallery plaques + "2026 The
   Collective" era), one-percent (TWICE: v2, then app-native rebuild with a
   real lesson CM.5, Lock It In chat, Keep It Sharp card after Matthew called
   the first pass shallow), newsletter (AFM real editions 308–312, plaque
   header), contact ("Say aloha."), ai-usage (plaque + build-partner line).
5. **Instagram** — @mpgink footer icon + per-product chips/links:
   @phreezerapp, @jobodyssey, @getonepercentsmarter, @metta.lovingkindness.
6. **Site-wide sweeps** — canonical 9-entry nav, collective footer line,
   smooth scrolling, hero 40vw→32vw, studio images uncropped, OG images.

### Decisions made (and recorded in BRAND-COPY-2026-07-21.md where relevant)
- Metta may be teased BY NAME, name+mark only, zero description (Matthew,
  guardrail #1 amended).
- One Percent public launch: end of August 2026.
- Contact email: matthew@mpgink.com (confirmed).
- Cipher: dropped from homepage; needs a subtle home later (backlogged).
- "Make it an odyssey" (Claude's line) approved as JO tagline.
- **Process rule: mocks BEFORE building for all visual/layout changes** —
  mock artifact: claude.ai/code/artifact/7e8ae6d9-d577-4044-9688-cbe7885400f2
- Books+Blog+Store = one page "for now"; full Etsy catalog stays on shop.html.

### Mechanics / evidence
- Hosting confirmed GitHub Pages (DNS = 185.199.108–111.153) — deploys from
  main only; work branch claude/mpgink-website-overhaul-3j2l0w, ff-pushed to
  main per Matthew's live approval each round.
- Every deploy verified by headless-Chromium render of changed pages (no JS
  errors, no missing assets) — this repo has no build command (static HTML).
- Sandbox cannot reach mpgink.com (egress policy) — production eyeballing was
  Matthew's, round by round.

### Open / waiting on Matthew
- 4 Phreezer Signal screenshots + mobile shots (pasted in chat = vision-only;
  need files via Google Drive or a repo commit). Gallery staged in
  phreezer.html behind a comment, filenames fixed:
  phreezer-shot-{your-signal,on-this-day,rated,song-history}.jpg
- AFM latest edition links (to refresh recent-editions grid).
- Shop/merch arc (next arc): shop content changes, brand merch lines
  (Canva connector available), retire listings, price re-verify.
- 13·16·7 cipher graceful home (mock first).
- Hero image still shows the generator's 7/13/7 — regenerate eventually.

### Next session starts with
1. Phreezer screenshot files → light up the staged gallery (~5 min).
2. AFM edition links → recent editions refresh.
3. Then the shop/merch arc.
