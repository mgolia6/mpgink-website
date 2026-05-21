# Working with Claude on mpgink.com — Instructions
**Last updated: May 20, 2026**

---

## How to Start a New Session

Provide these to Claude at the start of every chat:

1. Attach `docs/INSTRUCTIONS.md` and `docs/SESSION_LOG.md` from the repo
2. State the current task
3. GitHub token if pushes are needed (Claude cannot store it between sessions)

**Quick start message:**
```
Working on mpgink.com. Attaching INSTRUCTIONS.md and SESSION_LOG.md.

Token: [paste token]
Task: [what you need]
```

---

## GitHub Access

**Repo:** `https://github.com/mgolia6/mpgink-website`
**Live site (GitHub Pages):** `https://mgolia6.github.io/mpgink-website/`
**Custom domain:** `https://mpgink.com`

**How Claude pushes changes:**
```bash
git clone https://[token]@github.com/mgolia6/mpgink-website.git
# make changes
git config user.email "mpgink@build.com"
git config user.name "Claude"
git add -A
git commit -m "Description"
git push
```

GitHub Pages auto-deploys within ~60 seconds of push.

---

## Repo Structure

```
mpgink-website/
├── index.html              # Landing page
├── about.html              # About — BUILT
├── shop.html               # Store — BUILT
├── ai-usage.html           # AI Usage — BUILT
├── books.html              # Books — STUB (needs content)
├── newsletter.html         # Newsletter — STUB (needs content)
├── contact.html            # Contact — STUB (needs content)
├── one-percent.html        # One Percent promo — BUILT (link hidden, beta)
├── style.css               # Shared stylesheet
├── images/                 # All image assets
│   ├── image_1.jpg        # mpgink header
│   ├── image_2.jpg        # Blog logo
│   ├── image_3.jpg        # Etsy bottle
│   ├── image_4.png        # Arlo & Ash logo
│   ├── image_5.png        # Favicon
│   ├── image_6.jpg        # AFM header
│   └── header_v3.jpg      # Cropped header
└── docs/
    ├── INSTRUCTIONS.md     # This file
    ├── SESSION_LOG.md      # Running session history
    └── PROJECT_PLAN.md     # Roadmap and design tokens
```

---

## Design System

### Colors
```css
--bg-start: #0a0e27;
--bg-end: #1a1f3a;
--text: #e8e8e8;
--text-muted: #a0a0a0;
--accent: #ff6b35;          /* Orange */
--card-bg: rgba(255,255,255,0.04);
--border: rgba(255,255,255,0.08);
```

### Typography
- **Headings:** Fraunces (Google Fonts) — serif, 600/800 weight
- **Body:** Inter (Google Fonts) — 300/400/600/800 weight

### Sidebar Nav — Current Links (in order)
1. Home → `index.html`
2. About → `about.html`
3. Aloha Friday Motivation → `newsletter.html`
4. Blog → `https://www.mattymatte.com` (external)
5. Books → `books.html`
6. Store → `shop.html`
7. One Percent → `one-percent.html`
8. AI Usage → `ai-usage.html`
9. Contact → `contact.html`

**When adding a nav link:** Update ALL pages — index, about, shop, ai-usage, books, newsletter, contact, one-percent.

### Page Template Pattern
Every page follows this structure:
```html
<!-- MENU (top right) -->
<!-- SIDEBAR (with full nav) -->
<!-- PAGE CONTENT -->
<!-- FOOTER -->
<!-- SIDEBAR JS (click toggle) -->
```

---

## Common Tasks

### Add a new page
1. Copy sidebar + footer + JS from any existing page
2. Add new `<a href="newpage.html">` to sidebar nav in ALL pages
3. Push

### Fill in stub content
Tell Claude: "Fill in books.html with this content: [paste copy]"
Claude will fetch the current file from GitHub, update it, push.

### Update nav across all pages
Claude can do this with a Python script — just describe the change needed.

### Add images
Upload image to chat → Claude base64-encodes and embeds, or places in `images/` folder.

---

## Deployment Checklist
- [ ] Test locally (open HTML in browser)
- [ ] Check mobile view
- [ ] Verify all links work
- [ ] Commit with descriptive message
- [ ] Push → verify on GitHub Pages URL
- [ ] Check mpgink.com

---

## Rollback
```bash
git log --oneline          # find last good commit
git revert [commit-hash]
git push
```

---

## Content Voice
- Conversational, not corporate
- Direct — no fluff
- Lo-fi ethos: done and real > polished and late
- Active voice, present tense, short sentences
