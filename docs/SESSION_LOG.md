# mpgink.com — Session Log
**Living file — append new sessions at the top. Never delete old entries.**

## Session: May 23, 2026 — Open Graph tags + favicon link preview

### What Was Done

- Added Open Graph and Twitter/X Card meta tags to all 8 HTML pages
- Preview image set to `images/image_5.png` (mpgink favicon) for all pages
- Each page has a unique `og:title`, `og:description`, and canonical `og:url`
- Covers LinkedIn, Slack, iMessage, Discord, Facebook unfurls

### Pages Updated
`index.html` · `about.html` · `ai-usage.html` · `books.html` · `contact.html` · `newsletter.html` · `one-percent.html` · `shop.html`

### Commits
- `f5218e9` — Add Open Graph meta tags for link preview image (index.html)
- Next commit — OG tags propagated to all remaining pages

### Next Steps
- Fill stub pages with real content: books, newsletter, contact
- Restore One Percent app link when beta opens publicly
- Consider a richer OG image (custom banner vs. favicon) for better link preview visual impact

---

## Session: May 20, 2026 — Site scaffolding + nav + social icons + One Percent page

### What Was Done

**Pages built (stubs):**
- `books.html` — Arlo & Ash feature with Amazon link + future works placeholder
- `newsletter.html` — AFM subscribe button, recent issues grid, podcast placeholder
- `contact.html` — Email / LinkedIn / Buy Me a Coffee cards + form placeholder
- `one-percent.html` — Full promo page for the One Percent app (invite-only beta; app link removed)

**Nav updated across all pages:**
- "Aloha Friday Motivation" now points to `newsletter.html` (was external LinkedIn link)
- "Books" added → `books.html`
- "One Percent" added → `one-percent.html`
- Removed Arlo & Ash direct Amazon link from nav (lives on Books page instead)
- Nav consistent across: `index.html`, `about.html`, `shop.html`, `ai-usage.html`, `books.html`, `newsletter.html`, `contact.html`, `one-percent.html`

**Footer (index.html):**
- Added SVG social icons: LinkedIn, Etsy, Buy Me a Coffee, Amazon
- Icons inherit `--text-muted` color, glow `--accent` orange on hover with subtle lift
- CSS added to `style.css` under `FOOTER SOCIAL ICONS` section

**Existing pages confirmed in repo (not rebuilt):**
- `about.html` — full page already built
- `shop.html` — full page already built  
- `ai-usage.html` — full page already built

### Commits
- `6bad1ff` — Add books, newsletter, and contact page stubs
- `086e771` — Update nav across all pages + add social icons to footer
- `c337810` — Add One Percent promo page + update nav across all pages
- `b2e95fb` — Remove One Percent app link (beta/invite only)

### Next Steps
- Fill in stub pages with real content:
  - `books.html` — Arlo & Ash description, series overview, future works
  - `newsletter.html` — AFM overview, past issues archive, podcast links
  - `contact.html` — Add real email address, decide on contact form
- `about.html` — review and fill any remaining placeholder sections
- `one-percent.html` — restore app link when beta opens publicly
- Consider adding One Percent to homepage creative outlets grid once public
- Phase 2 pages still to build: none — all pages now exist as stubs

---

## Session: May 14, 2026 — Initial build

### What Was Done
- Landing page v3 designed and deployed (dark gradient, glassmorphism, sidebar nav)
- GitHub repo created: `mgolia6/mpgink-website`
- GitHub Pages configured with custom domain `mpgink.com`
- DNS configured in GoDaddy (4 A records + CNAME)
- Favicon implemented (mpgink 'm' logo)
- Four creative outlet cards: AFM, Arlo & Ash, Blog, Store
- Images embedded as base64 (later moved to external files in `images/`)
- `about.html`, `shop.html`, `ai-usage.html` built with full content

### Known Issues Carried Forward
- Two legacy GoDaddy A records (15.197.225.128 and 3.33.251.198) could not be deleted via UI — may require GoDaddy support if DNS issues arise
- HTTPS certificate was pending at end of session — should now be resolved

