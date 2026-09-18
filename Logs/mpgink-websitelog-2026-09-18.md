# mpgink.com — Session Log 2026-09-18

Session on branch `claude/cool-clarke-e0w5sm`, the AFM Ed319 / One Percent launch
arc (AFM, PM, website and one-percent-app all attached).

## 0. Records reconciliation (honest catch-up, per kit-wrap-protocol)

**This repo's records were STALE at wake:** `State/` and the newest `Logs/` entry
were dated 2026-08-21 while the last commit was 2026-09-11 — nine commits across two
arcs with no entry here. Both arcs were logged in the AFM repo
(`aloha-friday-motivation/Logs/AFMlog-2026-08-28.md`, `AFMlog-2026-09-11.md`), which is
where the work was driven from; this repo's own records never caught up. One entry,
derived from `git log`, not a day-by-day reconstruction:

```
9622591 2026-08-28 AFM archive: Ed317 "Safe at Home" (Wing A now 66 pages)
bb8adb5 2026-08-28 AFM archive: Ed317 revised narrative, teaser and card
349301f 2026-08-28 AFM archive: Ed317 on the new card system, plus halcyon and the sign-off song
0c1b63f 2026-08-28 AFM archive: Ed317 narrative names Dandelion Wine, Bradbury link corrected
9c3a49c 2026-08-28 AFM archive: Ed317 base teaser lengthened to three sentences
3aa6929 2026-08-28 Ed287 upgraded to a full narrative page + Ed317 live URL
15446ba 2026-08-28 AFM archive: Ed317 narrative gains the Ed287 back-link
073c666 2026-09-11 AFM archive: Ed318 "11 September" — the first cardless edition
13fee38 2026-09-11 AFM archive: fix Ed318's shattered paragraphs
```

- **Arc: Ed317 (2026-08-28).** First edition on the Gallery at Night card system
  (the almanac card design retired). Ed287 upgraded from card-only to a full
  narrative page and cross-linked from Ed317. Site check run #11 green, Pages run
  #106 deployed.
- **Arc: Ed318 (2026-09-11).** First cardless edition — `"noCard": true` in the
  manifest, no generator change. The page was pushed with its paragraphs shattered
  because the source narrative was hard-wrapped; the email build in the AFM repo
  exposed it and it was fixed the same night. **The generator still splits
  paragraphs on newlines and still has no guard** — the AFM repo refuses a wrapped
  narrative, this repo does not. Open item, carried. Site check run #12 green,
  Pages run #107 deployed.
- **Numbers the 08-21 State still claims are wrong:** it says 236 pages and 221
  editions. Reality on `main` today: **238 pages, 8,151 local refs, Wing A = 67
  (252–318)**. State is regenerated at this session's wrap, not patched.

## 1. One Percent launch copy

One Percent went live on 2026-09-18 at ~12:18 UTC (source: `one-percent-app`
`State/onepercentstate.md` and `Logs/onepercentlog2026-09-18.md`; facts confirmed by
Matthew in chat: "Facts are right"). The site still said otherwise. Root-cause
evidence, verbatim from the pages: `index.html` chip **"LAUNCHING END OF AUGUST"**;
`one-percent.html` chip **"EARLY ACCESS OPENING SOON"**, two **"GET EARLY ACCESS →"**
CTAs pointing at the on-page email form, **"ALREADY IN THE BETA? SIGN IN ↗"**, and a
list block promising *"you'll hear the moment the doors open."*

### Changed
- `index.html` — One Percent card chip → **LIVE SEPT 18** (house pattern: dated
  status chips, like Phreezer's "SIGNAL SOLO AUG 1").
- `one-percent.html`
  - meta / OG / Twitter descriptions → launch-framed ("Now live … Free to start").
    Closes the State open item "OG description still product-framed".
  - hero chip → **NOW LIVE — SEPT 18, 2026**; hero CTA → **START TODAY →** to
    `https://onepercent.mpgink.com?utm_source=mpgink&utm_campaign=one-percent-page`;
    **ALREADY IN? SIGN IN ↗** → `/login`.
  - mid-page placard CTA → START TODAY → (same URL) plus the terms line:
    *FREE TO START · 14 DAYS OF COMPOUND FREE, NO CARD · THEN $8/MO OR $72/YR · $1 OF
    EVERY MEMBERSHIP GOES TO THE MOCKINGBIRD FOUNDATION* — every clause from the
    app repo's `LaunchDocs/README.md`, `app/plans/page.js` and the launch-notice
    email template.
  - the `#join` list block reframed: *"Not starting today? Take the letter."* —
    the AFM list, honestly, no waitlist language. **The `#join` anchor and the
    `one-percent-page` source tag are kept on purpose:** the app's daily reminder
    email lands on `one-percent.html#join`, and the subscribe endpoint attributes
    by that tag.
- **Deliberately NOT on the page:** the lesson count (284 today). A typed number on
  a static page rots the day the catalogue grows (kit-single-source; the "103
  entries" lesson). The AFM edition can say 284 because it is dated.

### Swept, not changed
Every page grepped for early-access / opening-soon / launching / beta / waitlist
wording. Only the two files above carried it. `metta.html` and the homepage's
"NEXT INSTALLATION — COMING SOON" are Metta, still genuinely soon.

### Verification
- `node scripts/check-site.mjs` → PASS (238 pages, 8,151 local refs, `?src=` guard).
- `node scripts/check-filter-wiring.mjs` → PASS.
- Headless Chromium (global Playwright, `/opt/pw-browsers/chromium`),
  `one-percent.html` and `index.html` at 1280 and 375: **0px horizontal overflow
  on all four**; the only console error is the Google Fonts fetch the sandbox
  proxy blocks on every page (pre-existing). CTA hrefs read back from the DOM.
  Screenshots eyeballed at both widths.
- **NOT verified: live mpgink.com** — unreachable from the sandbox. After merge,
  Matthew opens `/one-percent.html` and taps START TODAY on his phone.

### Open after this entry
- **Merge to main is Matthew's call** (Pages builds `main` only).
- Ed319's web edition lands later today (Step 11 before Step 10 — the email
  needs the card URL live).
- State regeneration at wrap; the hard-wrap guard port; the real-phone mobile
  pass — all still open.
