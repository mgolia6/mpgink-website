#!/usr/bin/env python3
"""Generate catalog thumbnails for AFM edition cards.

Idempotent: only writes a thumb when it's missing or older than its card.
Part of the weekly web-edition flow (directions Step 11) — run after adding
a new card JPG, before build-afm-pages.mjs. check-site.mjs catches a missing
thumb because the generated catalog row references it.

  python3 scripts/make-afm-thumbs.py
"""
import os, sys, glob
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "images", "afm")
DST = os.path.join(SRC, "thumbs")
WIDTH = 340
QUALITY = 72

os.makedirs(DST, exist_ok=True)
made = skipped = 0
sources = sorted(glob.glob(os.path.join(SRC, "afm-ed*-card.jpg")))
sources.append(os.path.join(SRC, "afm-banner.jpg"))  # noCard-row fallback

for src in sources:
    base = os.path.basename(src).replace("-card.jpg", "").replace(".jpg", "")
    dst = os.path.join(DST, f"{base}-thumb.jpg")
    if os.path.exists(dst) and os.path.getmtime(dst) >= os.path.getmtime(src):
        skipped += 1
        continue
    im = Image.open(src).convert("RGB")
    h = round(im.height * WIDTH / im.width)
    im.resize((WIDTH, h), Image.LANCZOS).save(dst, quality=QUALITY, optimize=True)
    made += 1

total = sum(os.path.getsize(f) for f in glob.glob(os.path.join(DST, "*.jpg")))
print(f"thumbs: {made} written, {skipped} up to date, {total // 1024} KB total")
if made + skipped != len(sources):
    sys.exit(1)
