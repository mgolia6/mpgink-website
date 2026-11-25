# mpgink-website Session Log — 2026-11-25

## mpgink.com/explore: the page behind the QR code in the Arlo & Ash books
Shipped from an Arlo & Ash Explorers Series session (that repo's branch `claude/eager-fermi-g0zsru`).
This repo's State/ wasn't regenerated in that session; the next session here should fold this in.

- **`e23320f` on `main`:** `explore.html`, plus `images/arlo-ash/` (two 800px front covers and
  a 1200×630 OG image). Rebased onto `afe1e98` (session 011). No existing page was touched.
- What's on the page: Matthew's line as the headline ("If you know another kid who likes to
  explore, share this with them."), a share button (Web Share API, copy-link fallback, a
  status line for every outcome), both books with paperback links (Truck also links Kindle),
  and a gift note.
- **Permanent URL.** `mpgink.com/explore` is printed as a QR code and as text on a new back
  page in both books. Never rename, move or delete `explore.html`. Change what it shows,
  not where it lives. The file says so in a comment.
- Verified: check-site PASS (242 pages / 8,293 refs), check-filter-wiring PASS. Live on
  mpgink.com: 200 for `/explore` and all three images. On a phone viewport the covers load
  at 800px, the headline is right, the Amazon links are right, and there are no console
  errors. The copy-link fallback was exercised. The native share sheet wasn't (headless).
- Environment: the `mpgink` cloud environment now allows `mpgink.com`, `www.canva.com` and
  `export-download.canva.com`, so sessions can check the live site and move files in and out of Canva.

## Open (for this repo)
- `studio.html#books` still lists only Truck, and its "Get it on Amazon" goes to the Kindle
  edition. It could link to `/explore` instead of duplicating the book list.
- State/ is now one commit behind `main` (this log + `e23320f`).
