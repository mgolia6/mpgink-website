# mpgink-website Session Log — 2026-10-02

## AFM session 010 (run from the AFM repo) — Ed319 "Pure Imagination"

### What shipped
- Ed319 web edition: page, card, thumb, manifest + catalog row (`18058fa`).
- Narratives can carry photos: `![caption](url)` → wrapping photo group (`5fe4522`). Ed319's
  five build photos added (1200px, metadata stripped). Same syntax added to the AFM email
  builder so one narrative feeds both.

### Verification
check-site PASS (239 / 8,192), check-filter-wiring PASS. Only `afm/ed319.html` changed among
generated numbered pages. No horizontal overflow at 400px. All five photos load after scroll.
Live URLs confirmed 200 by the AFM send workflow from GitHub's runners (the sandbox cannot
reach mpgink.com). **Not yet seen in a browser by Matthew.**

### Open
Matthew's look at /afm/ed319.html · regenerate Wing B (h2 CSS drift) · port the hard-wrap guard.
