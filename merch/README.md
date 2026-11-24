# merch/ — print assets (work in progress)

Source files for mpgink merch. Nothing here is linked from the site yet.

## brand-stack/
Each brand's real favicon, its URL, and a QR code to that URL, stacked:
mpgink.com · phreezer.mpgink.com · jobodyssey.mpgink.com · onepercent.mpgink.com.

- `out/brand-stack-light.png`: ink text, ink QR, transparent. For light garments.
- `out/brand-stack-dark.png`: cream text, cream QR on the garment, transparent. For dark garments.
- `out/brand-stack-dark-plated.png`: dark version with a cream square behind each QR. Use it if
  a printed sample of the plain dark version won't scan (light-on-dark QR codes read on current
  phone cameras, but some older scanner apps miss them).
- `out/qr/`: every QR as its own vector file, in all three styles.
- `icons/`: the favicons used. Job Odyssey and One Percent were pulled from their live sites as SVG;
  Phreezer is `client/public/icon-512.png` from its repo; mpgink is `../images/mpgink-favicon.png`.

**Minimum print size: about 4in wide.** That makes each QR about 0.6in, which scans with the phone
a few inches away. Bigger is better for scanning from farther off.

Rebuild: `node build-stack.js` (needs `qrcode` and `playwright`), then `python3 check-qr.py`
(needs opencv). The check decodes every QR printed, blurred, and shrunk to 1/4, 1/5 and 1/6, on five
garment colours. Expected result: 65 of 80. The 15 misses are the three longer URLs at 1/5 and 1/6
shrink. That is what sets the 4in minimum, not a defect.

## drawn-mark/
Matthew's hand-drawn mpgink (2026-11-24, drawn on a phone), traced to vector exactly as drawn.
**Inspiration, not an approved logo.**

- `source-canvas.png`: the drawing as drawn.
- `out/mpgink-drawn.svg`: clean vector, single colour (`currentColor`).
- `out/mpgink-drawn-sheet.png`: review sheet in ink, cream and orange, plus a small-size test.

Known: the g's tail is cut flat because it ran off the drawing canvas. The mark is readable down
to about 120px wide; it is too fine for a favicon.

Rebuild: `python3 trace.py .` then `node render-sheet.js`.
