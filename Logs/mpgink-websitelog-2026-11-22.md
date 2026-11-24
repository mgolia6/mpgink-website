# mpgink-website Session Log — 2026-11-22

## Catch-up (honest reconciliation from git log, 2026-10-02 → 2026-11-06)
Two AFM sessions ran from the AFM repo and pushed here without writing a log entry or
touching State/. Derived from `git log 4bd3f80..82d8642`, not from memory:

- **Ed320 "Step Into the Freezer"** (2026-10-09, `893a43a` + `0cfc9f8`) — web edition
  page, card, thumb, manifest + catalog row; Ed319 nav links forward; LinkedIn newsletter
  URL added in a follow-up commit once published. check-site then: 240 pages / 8,228 refs.
- **Ed321 "Songs Are Like Tattoos"** (2026-11-06, `82d8642`) — page, card, thumb,
  manifest, catalog row; Ed320 links forward. check-site then: 241 / 8,264.
- CI on `82d8642`: Site check #18 SUCCESS, Pages #115 SUCCESS.

**Re-measured at this session's start, not copied:** check-site PASS — 241 pages /
8,264 refs; check-filter-wiring PASS. Wing A 70 (ed252–ed321), Wing B 96, Wing C 60 =
**226 editions**.

**Process gap:** the AFM-side close-out pushes editions here but doesn't update this repo's
State/ or Logs/. Two sessions in a row. Flagged in the backlog.

## Session 011: brand mark + merch arc (2026-11-22 → 11-24, wrapped 11-24)

### What shipped (branch `claude/vigilant-darwin-1pxjh7`, not merged)
- Records catch-up above (`72898d3`).
- `merch/brand-stack/`: each brand's real favicon, URL and QR, stacked; light, dark, and dark-with-QR-backing
  versions, transparent. Favicons: Job Odyssey and One Percent are the SVGs from their live sites (One
  Percent fetched via Vercel); Phreezer is `client/public/icon-512.png` from Phish_Scorecard (attached
  read-only, sparse checkout of the icon files only, nothing changed there); mpgink is `images/mpgink-favicon.png`.
- `merch/drawn-mark/`: Matthew's 11-24 phone sketch of mpgink, traced to vector as drawn. Inspiration only.

### Verification
- Every QR decodes to **exactly its own URL** (OpenCV): printed, blurred, and shrunk to 1/4, on natural,
  heather grey, black and navy. The three long URLs stop reading at 1/5 shrink, which sets a ~4in minimum
  stack width. The first, larger build was 32/32; QRs were shrunk at Matthew's request.
- Light-on-dark codes decode only through an inverting reader in the test, so the plated fallback ships too.
- Rebuilt from the repo paths before commit: all outputs **byte-identical** to what Matthew reviewed.
- check-site + check-filter-wiring PASS. **Not verified:** a phone scan of a real print. That is Matthew's.

### What was ruled out (so the next session doesn't re-propose it)
- Procedural "hand-drawn" redraws of the graffiti, whether layered passes, distressed or full-stroke.
  Matthew: too neat and childish, or messy in a bad way.
- A cut-out of the graffiti painting, and monochrome versions of it ("looks bad"). The source is also only 1536px.
- A custom monoline font ("mpgink sans"): too chunky, then not liked.
- Stock fonts. Typed display faces read "yearbook". Double-storey g faces (Fraunces and others) had
  clutter on the g and i; Fraunces' wonk was disliked. Clean sans, display faces and cursive scripts
  were all rejected on the g or the overall feel.

### Process gaps (kit-honest-completion §5)
- **I typeset "MPGINK" in caps in a racing font**, violating "mpgink, always lowercase" (BRAND-COPY),
  which I had read minutes earlier. Matthew caught it. The rule is now stated more strongly in BRAND-COPY.
- **I guessed with volume instead of extracting a spec.** About a dozen sheets went to Matthew before I asked
  what he was reacting to. Fix: on a taste problem, ask for references or a sketch after the second miss.
- An automated "lowercase" check I added could not catch a caps-only font. Removed rather than
  kept as false comfort. Every lowercase check is by eye.
- Matthew asked for a rejected concept to be deleted; the scratch files were only actually deleted at wrap.

### Open
See backlog "🧢 Brand mark + merch arc". First up next session: Matthew's redrawn mark, or placement and
a print test of the brand stack, whichever he brings.
