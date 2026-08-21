# mpgink.com — Session Log 2026-08-21

*(Two touches today: the AFM session pushed `images/afm/afm-ed316-card.jpg` to
main earlier (30e6f59, for the Ed316 email send); this entry covers the AFM
web-archive arc that followed, on branch `claude/afm-archive-website-t5cjkn`.)*

## The AFM archive arc — mpgink.com now carries the editions themselves

Matthew's brief: the site should host the AFM editions, not just a signup link.
Ed316 as pilot, backfill as far as the source material allows. Delivered:

### Shipped this session
- **9 edition pages** — `afm/ed308.html` … `afm/ed316.html`. Gallery at Night
  chrome (nav / grain / footer) framing each edition as a white "paper"
  artifact: painted AFM banner, title/teaser block, the shipped narrative,
  the visual card image, navy AFM footer strip. Georgia serif inside the
  paper — the same voice subscribers get in the email. Ed313 is the one
  card-only page (its narrative was never recovered; the page says so
  honestly and links the LinkedIn Pulse post).
- **Generator, not hand-rolled pages** — `scripts/build-afm-pages.mjs` +
  `scripts/afm-editions.json` (manifest) + `afm/content/ed###.md` (narrative
  sources, copied verbatim from the AFM repo). The script generates BOTH the
  edition pages AND the catalog rows in `newsletter.html` (between
  `AFM-CATALOG` markers), so the index cannot drift from the pages
  (kit-single-source). No dependencies, same contract as check-site.mjs.
- **newsletter.html catalog is now the live index** — 9 clickable rows
  (was 5 dead rows, 308–312), newest highlighted; the stale "ED. 313 DROPS
  THIS FRIDAY" chip replaced with the evergreen "A NEW EDITION EVERY FRIDAY.
  NO EXCEPTIONS."
- **7 card JPGs rendered** — `images/afm/afm-ed308…314-card.jpg` from the
  edition Visual HTML files (headless Chromium, deviceScaleFactor 2, JPEG 88);
  315/316 were already hosted.
- **Signup attribution carried through** — every edition page's CTA links
  `signup.html?src=afm-archive-ed###`.

### Verification (kit-validation-discipline #3 — executed, not just built)
- `node scripts/check-site.mjs` — PASS (24 pages, 754 local refs resolve).
- Headless Chromium render of ed316, ed313, newsletter at 1280px AND 375px:
  **zero horizontal overflow everywhere**; the only console error is the
  Google Fonts fetch, which this sandbox's proxy blocks on every page,
  pre-existing pages included — not a defect of the new pages.
- **NOT verified from here: the live URLs.** The sandbox proxy blocks
  mpgink.com. After merge, Matthew checks in a browser:
  `mpgink.com/afm/ed316.html` (pilot), `mpgink.com/newsletter.html` catalog
  links, and one older page (e.g. ed308) for the rendered cards.

### Decisions
- `newsletter.html` stays the AFM landing page AND its catalog is the archive
  index — no separate index page (Matthew delegated; single-source argued
  against a second list of the same editions).
- Backfill depth: Ed308 — the oldest edition with files in the AFM repo
  (Ed307 exists only as an incomplete content-log entry).
- Resend tracking subdomain: **tabled by Matthew** (2026-08-21, this session).

### Cross-repo work in the same arc
- `aloha-friday-motivation`: new `directions/AFM_Directions_2026-08-21.md`
  (web + email editions are now standard deliverables, Steps 10–11) and
  afm-weekly SKILL close-out updated to match.
- `mpgink-program-manager`: `afm-friday-send` gate moved to resolved with
  receipts; NEXT.md work orders regenerated (AFM now 0 open items).

### Open
- Matthew's production eyeball of the archive (URLs above) — plus the
  standing redesign eyeball items from 08-06/08-08.
- The "AFM latest edition links (Matthew sending)" waiting-item is now moot —
  the archive holds 308–316.

### Mid-session addendum — the deep backfill (Matthew, in-session)
Matthew surfaced two backfill sources: the Google Drive "Motivation" folder
(old "Half Rider"-era team emails) and his list of all 68 LinkedIn editions.
Scoped the Drive folder same session: `Newsletters/` has narrative docx for
editions 262/270/279/290/291/304/305/307; the folder root has DM279–DM305
card PNGs, ed306's HTML, and ed306/307 screenshots; `Archive/` has 30+ .eml
originals from the pre-LinkedIn era. Recorded as its own arc in the Backlog
(needs Matthew's curation on numbering and selection); the generator is
already built for it.

---

## Arc 2 (same day, same session): the deep backfill — editions 252–316

### What shipped
- **The archive now reaches back to Ed252 (6/28/2024)** — 65 edition pages,
  every LinkedIn-era edition. 49 new pages + 4 regenerated (308–311 gained
  their LinkedIn URLs), 55 new card JPGs, 8 new narrative content files
  (262/270/279/290/291/304/305/307, transcribed from Drive docx with links
  preserved). newsletter.html catalog regenerated: 65 rows with year
  dividers (2024/2025/2026), Ed316 still flagged LATEST.
- **Generator updates:** `noCard` manifest flag (Ed290 has no card — page
  and og:image fall back to the AFM banner) + year dividers in catalogRows.
- Commit `c4e9204` on `claude/afm-archive-website-t5cjkn`.

### Sources & how dates were pinned (provenance in the AFM repo registry)
- **Day at a Glance v2.xlsx** (Drive, Matthew's source-of-truth call):
  numbered sheet tabs → measured dates for most of 252–316.
- **Scraped LinkedIn CSV** (`alohafridaymotivationeditions.csv`, Claude-in-
  Chrome): titles + LinkedIn URLs for all 65.
- **DM card PNGs** (Drive): the card art itself; card-face dates beat file
  mtimes (Ed280: card prints 5/22/2025, mtime estimate said 5/23 — corrected).
- Vision pass over 46 card-only editions supplied honest catalog one-liners
  (word-of-the-week, featured figures) — no invented summaries.

### Conflicts (resolved per "tabs/cards win"; one left for Matthew)
- Ed280→5/22/25 · Ed300→2/13/26 · Ed312→5/22/26 · Ed307→4/18/26 (narrative
  says "technically Saturday") · Ed290→9/18/25 (Thursday send) · Ed299's
  card face misprints "#296" (tab+CSV confirm 299) · Ed285's LinkedIn title
  says "#245" (typo, ignored).
- **OPEN — Matthew's call: Ed268.** Card+tab say 12/13/24; LinkedIn's "End
  of Year Edition #268" is 12/28/24. Two pieces claim one number. Kept the
  card/tab edition; its LinkedIn URL is NOT attached to the archive page.

### Verification (evidence, per kit-honest-completion)
- `build-afm-pages.mjs` → "65 rows"; `check-site.mjs` → PASS (80 pages,
  2,713 local refs).
- Headless Chromium: ed290 desktop (noCard banner fallback correct), ed292
  desktop (card-only + "narrative lives on LinkedIn" pointer, real prev/next
  titles), ed270 mobile 375px (overflow 0px), newsletter desktop (65 rows,
  year dividers). Only console error = sandbox-blocked Google Fonts fetch.
- **NOT verified: live URLs** (proxy blocks mpgink.com). Matthew checks
  post-merge: an old page (`/afm/ed252.html`), the 65-row catalog on
  `/newsletter.html`, and `/afm/ed290.html` (the one banner-fallback page).

### Cross-repo
- `aloha-friday-motivation/logs/AFM_EditionRegistry_2026-08-21.csv` updated
  with the date corrections + conflict notes above (same-session commit).

### Still not on the site (recorded, deliberate)
- Editions 1–60 ("Half Rider" email era): dated in the registry; 30+ .emls
  in Drive `Archive/` — future arc, needs Matthew's curation.
- Editions 61–242: unmapped era, no per-edition records found yet.
- Claude-in-Chrome's full-copy file (all 65 editions' text) still being
  assembled — when it lands, card-only pages can upgrade to full narratives.

## Arc 4 (same session): Wing C — the founding era, editions 1–60 (Aug–Dec 2018)

The archive now reaches the first edition. `newsletter.html` carries three
wings: A (numbered 252–316, LinkedIn era), B (96 email-era sends, 2021–2024),
C (the 60 founding editions).

### What the 2018 editions actually were
Not essays. Every weekday, to one team, as a **card**: the national days,
this-day-in-history, who was born, who died, a quote, and a riddle whose answer
arrived the next morning. So Wing C pages print the card, not prose — and say
so in a provenance banner. Nothing is written to fill the gap.

### Shipped
- **`scripts/build-afm-founding-pages.mjs`** + `scripts/afm-founding-editions.json`
  (60 editions) → `afm/founding/ed001.html` … `ed060.html` and the Wing C block
  in `newsletter.html` (between `AFM-FOUNDING` markers). Same generator contract
  as the other two wings: no dependencies, the index cannot drift from the pages.
- **Sources:** *Motivation Index.xlsx* (all 60 — quote, author, riddle answer)
  enriched by *Day at a Glance v2.xlsx* (52 of 60 — national days, history,
  born/died, riddle text). 8 editions carry index data only.

### Two honesty calls in the data
- **Born/died years are NOT claimed for 38 of 60.** The workbook's
  name/year stride is inconsistent across editions, so matching each name to a
  year would be inference. Those lists render as the source's single run, with
  the line *"Recorded as a single run in the source sheet; we haven't matched
  each name to a year."* Where the stride verified (27 editions), years render.
- **43 editions have an answer but no riddle.** The index kept every answer and
  only some questions. Printing "The answer: a stamp" alone would read as a
  quiet loss, so those pages name which half survived.

### Fixed while building — one search box was lying (pre-existing, worse with C)
The box said "SEARCH THE ARCHIVE" and searched **Wing A only**. Typing `coffin`
— which is ed001's riddle answer, on the same page — returned
*"NOTHING IN THE WEB ARCHIVE MATCHES THAT."* Wing B's inline script also grabbed
`.email-row` globally and spared Wing C purely because it ran before those rows
were parsed: one block reorder from silently hiding 60 editions.

- Three inline filter scripts collapsed into **one controller** in
  `scripts/afm-chrome.mjs` (`FILTER_SCRIPT`), emitted once by
  `build-afm-pages.mjs`. Rows/chips/dividers/empty-states speak one contract
  (`afm-row` + `data-wing` + `data-year`).
- Search now spans all three wings; year chips stay per-wing; each wing has its
  own honest empty state instead of vanishing.
- **`scripts/check-filter-wiring.mjs`** guards the wiring (a unit test on the
  controller would not catch a wing that stopped calling it). Added to
  `KIT_BUILD_CHECK_CMD` and to CI.
- **Guard proven to fail**, per kit-single-source: dropping `data-wing` from the
  Wing C row template → `FAIL … 161/221` + `FAIL all three wings render rows — AB`;
  pasting a second filter script into Wing B → `FAIL exactly one inline <script> — found 2`.
  Restored → PASS.

### Verification
- `node scripts/check-site.mjs` → PASS (236 pages, 8080 local refs).
- `node scripts/check-filter-wiring.mjs` → PASS (12 checks, 221/221 rows wired).
- Headless Chromium, `newsletter.html`, **0 page errors**, **0px overflow** at
  1600px and 375px. Filter matrix observed:

  | action | A | B | C | empty states shown |
  |---|---|---|---|---|
  | baseline | 65 | 96 | 60 | none |
  | search "coffin" | 0 | 0 | **1** | A, B |
  | search "kuleana" | 1 | 1 | 0 | C |
  | search "zzzzzz" | 0 | 0 | 0 | A, B, C |
  | wing A chip 2024 | 17 | 96 | 60 | none |
  | + wing B chip 2022 | 17 | 24 | 60 | none |
  | + FULL READS | 1 | 24 | 60 | none |

- Pages eyeballed at 1280px and 375px: ed001 (riddle + answer + verified-stride
  note), ed003 and ed060 (answer-only, missing-riddle note). No `undefined` in
  any rendered body.

### NOT verified by me
Live mpgink.com — the sandbox proxy blocks it. **Matthew's browser check after
merge:** scroll to Wing C, open ed001, and run the mobile pass on a real phone
(still outstanding from arc 3).

### Still missing after this arc
- **Editions 61–242** — nothing found anywhere. 2019 and 2020 have no records.
- **Editions 243–251** — dated in the Day at a Glance workbook, not yet built.
- LinkedIn full copy for 252–265 (crawl's second run) → would upgrade 48
  card-only Wing A pages to full narratives.
