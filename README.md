# mpgink.com

Virtual Creative Studio — home for art, writing, music, ideas, inventions, and experiments.

## What This Is

Landing page for [mpgink.com](http://mpgink.com), showcasing creative outlets:
- **Arlo & Ash Explorer Series** — first book by my son
- **Aloha Friday Motivation** — weekly LinkedIn newsletter
- **Matty Matte Modge Podge** — blog for writing that doesn't fit anywhere else
- **Etsy Store** — print-on-demand designs and art

## Tech Stack

- Pure HTML/CSS
- Google Fonts (Covered By Your Grace, Special Elite, Courier Prime)
- Images embedded as base64 for zero external dependencies
- No frameworks, no build process, no bullshit

## Design Philosophy

Lo-fi street art aesthetic. Basquiat meets zine culture. Hand-drawn typography, textured backgrounds, rotated elements, layered shadows. Anti-perfectionist ethos baked into every pixel.

## File Structure

```
mpgink-website/
├── index.html          # Main landing page
├── images/             # Original image assets
│   ├── image_1.jpg    # mpgink header
│   ├── image_2.jpg    # Blog logo
│   ├── image_3.jpg    # Etsy bottle
│   ├── image_4.png    # Arlo & Ash logo
│   ├── image_5.png    # Favicon
│   └── image_6.jpg    # AFM header
├── docs/               # Documentation
│   └── INSTRUCTIONS.md # Build & deploy guide
└── README.md           # This file
```

## Deployment

1. Upload `index.html` to your web host
2. Point mpgink.com domain at it
3. Done

Or use GitHub Pages:
```bash
git add .
git commit -m "Launch mpgink.com"
git push origin main
```

Enable GitHub Pages in repo settings → Pages → Source: main branch

## Version Control

This is v1.0 — the comeback after the Google Sites disaster of 2024.

Future pages to add:
- About
- Books
- Newsletter
- Shop
- AI Usage
- Contact

## License

All content © 2024 mpgink. Built with intention, iteration, and AI assistance.
