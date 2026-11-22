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

## Session 011 — Shop/merch arc: mpgink hoodie sleeve (in progress)
Matthew's ask: the mpgink Graffiti Logo Hooded Tee (Etsy 4483243244) gets mpgink.com
down the sleeve plus a NASCAR-style sponsor stack ("a little busy"), with a stealth QR
hidden in it as one of the decals.

### v1 built (not yet approved)
- Sleeve art: MPGINK.COM spine + packed decal stack; 3.5×13in, 1050×3900 transparent PNG.
  Rendered from HTML/CSS via Playwright with a font-load guard (it caught two unloaded weights).
- PIT PASS QR → `https://mpgink.com/pit` (v3, EC level H, 18px modules at 300dpi). Decoded **10/10** with
  OpenCV: clean, blur r=4/8px, phone-res downscale ×5/×10, on black + natural. Guard proven
  non-vacuous (destroyed copies FAIL). Simulation only, not a real fabric scan.
- Metta mark redrawn as vector (the 192px icon would print upscaled). The m mark is still
  ~1.5× upscaled from the 653px favicon. Flagged.
- Left off deliberately: Arlo & Ash (kids' faces), Mockingbird (third-party mark).
- **Open:** `/pit` is a 404. Destination is Matthew's call, and it must be live before print. Long-sleeve +
  print area unconfirmed. Sleeve-print cost unmeasured. New copy awaiting review.
- Art + build script are in the session scratchpad only, not committed (awaiting approval).
