# mpgink.com — Project Plan

## Project Overview

**Objective:** Rebuild mpgink.com as a modern, fluid website showcasing creative outlets after accidental deletion of Google Sites version.

**Stack:**
- Static HTML/CSS/JavaScript
- GitHub Pages hosting
- Domain: mpgink.com (via GoDaddy)
- Version control: Git/GitHub

**Design Philosophy:**
- Modern dark gradient aesthetic (#0a0e27 → #1a1f3a)
- Glassmorphism UI elements, fluid/rounded design
- Sidebar navigation (slides in from right on menu click)
- Scroll reveal animations (IntersectionObserver)
- Responsive across all devices
- Lo-fi ethos meets contemporary polish

---

## Current Status (as of May 18, 2026)

### ✅ Completed
- [x] Landing page (index.html) — dark gradient, sidebar nav, 4 outlet cards, hero section
- [x] About page (about.html) — art gallery slow-scroll layout, 4 rooms (Mission/Vision/Tenets/History), timeline history, scroll reveal
- [x] AI Usage page (ai-usage.html) — manifesto layout, use-case pills, numbered principles, scroll reveal
- [x] Shop page (shop.html) — 28 Etsy listings across 6 sections, Etsy CDN images, direct listing links
- [x] style.css — shared stylesheet, Google Fonts (Fraunces + Inter), design tokens, responsive breakpoints
- [x] GitHub repository initialized and deployed
- [x] GitHub Pages deployment active
- [x] Custom domain mpgink.com live
- [x] HTTPS enforced
- [x] Favicon (image_5.png) implemented
- [x] Sidebar navigation consistent across all pages
- [x] All internal Store/Shop links point to shop.html (not Etsy directly)
- [x] Sidebar off-screen offset fixed (no text bleed)

### 📋 To Do — Phase 2
- [ ] Books page (Arlo & Ash breakdown, Amazon link, future works)
- [ ] Newsletter page (AFM overview, LinkedIn subscribe, podcast links)
- [ ] Contact page (email or simple form)
- [ ] Connect remaining sidebar nav links (Books, Newsletter, Contact pages don't exist yet)
- [ ] Update shop page prices (socks, sticker, candle prices need verification against Etsy)

---

## Site Structure

```
mpgink.com/
├── index.html              # Landing page (LIVE)
├── about.html              # Mission/Vision/Tenets/History (LIVE)
├── ai-usage.html           # AI transparency manifesto (LIVE)
├── shop.html               # Etsy product showcase (LIVE)
├── books.html              # Arlo & Ash + future works (TO BUILD)
├── newsletter.html         # AFM archive + podcast (TO BUILD)
├── contact.html            # Contact form/email (TO BUILD)
├── style.css               # Shared stylesheet
└── images/                 # All image assets
```

---

## Repository Structure

```
mpgink-website/
├── index.html
├── about.html
├── ai-usage.html
├── shop.html
├── style.css
├── CNAME                   # mpgink.com
├── images/
│   ├── image_1.jpg        # mpgink header (hero)
│   ├── image_2.jpg        # Blog logo
│   ├── image_3.jpg        # Etsy bottle (store card)
│   ├── image_4.png        # Arlo & Ash logo
│   ├── image_5.png        # Favicon (mpgink 'm')
│   ├── image_6.jpg        # AFM header
│   ├── mission.png        # Graffiti banner — About page
│   ├── vision.png         # Graffiti banner — About page
│   ├── tenets.png         # Graffiti banner — About page
│   ├── history.png        # Graffiti banner — About page
│   ├── about.png          # Graffiti banner (unused)
│   └── ai_usage.png       # Graffiti banner — AI Usage page
├── docs/
│   ├── PROJECT_PLAN.md    # This file
│   └── INSTRUCTIONS.md    # Build & workflow guide
├── README.md
├── DEPLOY.md
└── .gitignore
```

---

## Design Tokens

```css
--bg-start: #0a0e27;           /* Dark blue gradient start */
--bg-end: #1a1f3a;             /* Dark blue gradient end */
--text: #e8e8e8;               /* Primary text */
--text-muted: #a0a0a0;         /* Secondary text */
--accent: #ff6b35;             /* Orange accent */
--card-bg: rgba(255, 255, 255, 0.04);
--border: rgba(255, 255, 255, 0.08);
```

**Typography:** Fraunces (headings, serif) + Inter (body, sans-serif) via Google Fonts
**Border radius:** 16–20px cards, 50px buttons
**Transitions:** 0.3–0.4s cubic-bezier(0.4, 0, 0.2, 1)

---

## Page Architecture

### Shared across all pages
- `<link rel="stylesheet" href="style.css">` — single stylesheet
- Menu icon (image_5.png, top-right, fixed)
- Sidebar nav (slides in from right, toggle on menu click)
- Footer (logo, brand line, 3 links)
- Sidebar JS (IntersectionObserver scroll reveal + toggle)

### index.html
- Hero: full-height, image_1.jpg left, text right, drift animation
- Creative Outlets grid: 4 cards (AFM, Arlo & Ash, Blog, Store→shop.html)
- CTA buttons: "Explore the Studio" + "Visit the Shop" (→shop.html)

### about.html
- Opening room: intro text with fade-up animation
- 4 gallery frames (scroll-revealed): Mission, Vision, Tenets, History
- Frames alternate left/right layout (frame-content / frame-content.flip)
- Tenets: 2×3 grid of cards
- History: timeline with era timestamps
- Closing room: exit doors to other pages

### ai-usage.html
- Opening: hook line, large text
- Banner: ai_usage.png full width
- Manifesto lede: large Fraunces quote
- Use-case pills: flex-wrap pill list
- Principles: numbered 4-item card stack
- Closing: "Use it. Own it." exit

### shop.html
- Intro: headline + "View Full Shop on Etsy" CTA
- 6 sections (scroll-revealed): mpgink Gear, Clothing, Kids, Accessories, Puzzles & Games, Digital Downloads
- Product cards: Etsy CDN image, name, tag, price → link to Etsy listing
- Footer CTA: "Browse the Full Shop" → Etsy

---

## Shop Page — Etsy Listings

### mpgink Gear (5)
| Product | Listing ID | Price |
|---------|-----------|-------|
| mpgink Graffiti Logo Hooded Tee | 4483243244 | $42.99+ |
| Aloha Friday Motivation Hoodie Tee | 4483246010 | $42.99+ |
| Bowln Away Hoodie | 4478769964 | $42.99 |
| mpgink Graffiti Script Socks | 4483981303 | TBD |
| mpgink Paint Splatter Flat Bill Cap | 4483988407 | TBD |

### Clothing (8)
| Product | Listing ID | Price |
|---------|-----------|-------|
| Life is Like a Post It Note Tee | 4484943134 | $22.99+ |
| Zen AF Crewneck Sweatshirt | 4483996636 | $45.99+ |
| Pau Hana Moana Sunset Surf Tee | 4478800075 | $22.99+ |
| Palm Springs Good Vibes Tank | 4478783251 | $18.99+ |
| Be Kind It's Contagious Tee | 4475768834 | $18.45+ |
| Coed Naked Lacrosse Tee | 4484266619 | $22.99+ |
| Future Orbital Engineer T-shirt | 4481553544 | $24.99+ |
| Mission Patch Rocket Emblem Hoodie | 4481553744 | $42.99+ |

### Kids (4)
| Product | Listing ID | Price |
|---------|-----------|-------|
| Artemis II Toddler Tee | 4481557914 | $19.99 |
| Future Orbital Engineer Sweatshirt | 4481553662 | $34.99+ |
| I'm Diggin' Bein' Two Toddler Tee | 4475320226 | $19.99+ |
| It's My Dirty 3rd Toddler Tee | 4475319586 | $19.99+ |

### Accessories (6)
| Product | Listing ID | Price |
|---------|-----------|-------|
| Zen AF Sunburst Trucker Cap | 4479463847 | $27.99+ |
| Future Orbital Engineer Tote Bag | 4481546825 | $17.99+ |
| Future Orbital Engineer Sticker | 4481553786 | $3.99+ |
| Future Orbital Engineer Candle | 4481548275 | $24.99+ |
| Retro Sunset Palm Trees iPhone Case | 4478761439 | $19.99+ |
| Pink Plumeria Phone Case | 4478794765 | $19.99+ |

### Puzzles & Games (4)
| Product | Listing ID | Price |
|---------|-----------|-------|
| Construction Site Cartoon Puzzle | 4471448579 | $19.99+ |
| Mystery at the Arcade Puzzle | 4471459070 | $19.99+ |
| Unicorn Arcade Puzzle | 4471452389 | $19.99+ |
| Sleeping Giant State Park Puzzle | 4472567252 | $19.99+ |

### Digital Downloads (2)
| Product | Listing ID | Price |
|---------|-----------|-------|
| Construction Coloring Page | 4471520685 | $0.20 |
| Etsy + Printify Dropship Guide | 4479158819 | $8.95 |

---

## DNS Configuration (GoDaddy)

**A Records:**
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```
**CNAME:** www → mgolia6.github.io

*Note: Two legacy A records (15.197.225.128, 3.33.251.168) exist that can't be deleted via UI. Contact GoDaddy if DNS issues persist.*

---

## Known Issues / Notes
- Socks, sticker, candle prices on shop page are approximate — verify against Etsy listings
- about.png (graffiti banner) is in /images but currently unused — was removed from about page redesign
- history v1.png in /images is an old version — can be deleted
- Shop page uses Etsy CDN image URLs (i.etsystatic.com) — stable but not hosted in repo

---

## Deployment Workflow

```bash
# Standard push
git add .
git commit -m "Description"
git push origin main
# GitHub Pages auto-deploys in ~30-60 seconds
```

**Rollback:**
```bash
git log --oneline          # find last good commit
git revert <hash>
git push origin main
```

---

## Links
- **Repo:** https://github.com/mgolia6/mpgink-website
- **GitHub Pages:** https://mgolia6.github.io/mpgink-website/
- **Live Site:** https://mpgink.com
- **Etsy Store:** https://mattymattemodgepodge.etsy.com

---

**Last updated:** May 18, 2026
**Version:** 4.0 — 4 pages live, shop fully built
