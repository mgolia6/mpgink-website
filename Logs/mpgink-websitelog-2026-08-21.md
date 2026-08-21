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
