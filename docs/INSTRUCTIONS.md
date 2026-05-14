# mpgink.com — Build & Deploy Instructions

## Quick Deploy (Get Live Now)

### Option 1: Direct Upload
1. Download `index.html`
2. Upload to your web host (via FTP, cPanel, or hosting dashboard)
3. Point mpgink.com domain to that file
4. Done

### Option 2: GitHub Pages (Recommended)
1. Push this repo to GitHub
2. Repo Settings → Pages → Source: main branch → Save
3. GitHub gives you a URL (e.g., `username.github.io/mpgink-website`)
4. Point mpgink.com to that URL via CNAME record in your domain DNS

**DNS Setup:**
```
Type: CNAME
Name: www
Value: username.github.io
```

For apex domain (mpgink.com without www):
```
Type: A
Name: @
Values: 
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
```

---

## File Management

### Images
All images are embedded as base64 in `index.html`. No external image hosting needed.

If you want to update an image:
1. Replace the file in `/images/`
2. Run the image-embedding script (see "Rebuilding" below)
3. Deploy the new `index.html`

### Adding New Sections
Future pages (About, Books, Shop, etc.) should follow the same aesthetic:
- Lo-fi street art vibe
- Hand-drawn fonts
- Textured backgrounds
- Rotated elements
- Layered shadows

Reference the current `index.html` for color variables and typography.

---

## Rebuilding the Site

If you update images or content and need to regenerate `index.html`:

```python
# Run this from the repo root
python3 scripts/build.py
```

This script:
1. Reads images from `/images/`
2. Converts them to base64
3. Injects them into the HTML template
4. Outputs updated `index.html`

*Note: build script not included in v1.0. Create if needed or rebuild manually with Claude.*

---

## Version Control Workflow

### Initial Setup
```bash
git init
git add .
git commit -m "Initial commit - mpgink.com v1.0"
git remote add origin https://github.com/username/mpgink-website.git
git push -u origin main
```

### Making Changes
```bash
# Edit files
git add .
git commit -m "Update: describe what you changed"
git push
```

GitHub Pages auto-deploys on push to main.

---

## Design Tokens

Keep these consistent across all pages:

### Colors
```css
--cream: #f4f1ea;
--charcoal: #2a2a2a;
--rust: #d4634d;
--teal: #3d8f8f;
--mustard: #e8a64a;
--navy: #344d5c;
```

### Typography
- Display: Covered By Your Grace (Google Fonts)
- Headers: Special Elite (Google Fonts)
- Body: Courier Prime (Google Fonts)

### Effects
- Textured background (repeating linear gradient)
- Rotated elements (-2° to +2°)
- Layered borders (double-outline cards)
- Fade-in animations on load

---

## Adding New Creative Outlets

To add a new outlet card to the grid:

1. Add image to `/images/`
2. Update the base64 embedding
3. Copy an existing `.outlet-card` block
4. Update:
   - Image source
   - Link URL
   - Title
   - Description

Keep descriptions under 25 words. Conversational tone.

---

## Troubleshooting

**Problem:** Images not loading
- Check base64 encoding is complete
- Verify image paths in HTML
- Test in different browsers

**Problem:** Domain not pointing to GitHub Pages
- Wait 24-48hrs for DNS propagation
- Verify CNAME/A records in domain registrar
- Check GitHub Pages settings

**Problem:** Layout broken on mobile
- CSS is responsive by default
- Test at viewport widths: 320px, 768px, 1024px
- Use browser dev tools mobile emulation

---

## Future Additions

Planned pages (not yet built):
- About — origin story, tenets, vision
- Books — Arlo & Ash breakdown, future works
- Newsletter — AFM archive and podcast links
- Shop — Etsy categories with direct links
- AI Usage — transparency manifesto
- Contact — email or simple form

Each page gets its own HTML file with the same aesthetic treatment.

---

## Maintenance

- **Update frequency:** As needed, no schedule
- **Backups:** Git handles this
- **Monitoring:** None needed for static site
- **Security:** Static HTML = minimal attack surface

---

## Questions?

This is a living document. Update it as the project evolves.

If rebuilding gets complex, Claude can help generate new sections or pages.
