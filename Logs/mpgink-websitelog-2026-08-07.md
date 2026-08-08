# mpgink.com — 2026-08-07

Entries from the **list-ingress / lead-magnet** session (the email-list arc
that started from the Justin Welsh webinar). A separate session owned the AFM
newsletter send pipeline and the Gallery at Night follow-ups the same day;
this log covers only what this session shipped here.

## Shipped

**1. Lead-magnet pages (PR #5, merged, Pages run success)**
- `magnet.html` — opt-in landing page for the guide. Posts to the existing
  `/api/subscribe` with `source: magnet-solo-operating-standard`; no duplicate
  capture logic (kit-single-source).
- `solo-operating-standard.html` — **the guide itself**, published as a page
  rather than a PDF so the seven embedded prompts get working copy buttons and
  can be corrected without re-sending anything. Six rules, each with what
  broke / the rule / a runnable prompt / how to run it, three inline SVG
  diagrams, two full-bleed pull quotes. Built on the live design system
  (shared nav/grain/footer, style.css, Archivo + Courier Prime).
- Neither is linked from nav yet — the copy is still under Matthew's review,
  and magnet delivery isn't wired.

**2. One Percent join section + `?src=` tagging (PR #4, merged)**
- `one-percent.html#join` — email capture on the exhibit page, the landing
  spot for the daily-reminder email's CTA (`?src=one-percent-email#join`).
- `signup.html` — reads a sanitized `?src=` parameter and uses it as the
  source tag, so every door (LinkedIn posts, product emails, share cards) is
  distinguishable in the subscriber table.

**3. One Percent page → capture-only (PR #6, merged, Pages run success)**
Matthew is sharing this page from LinkedIn/Instagram before next week's
paywalled soft launch, so the page's only job is the email list. Every CTA
had pointed at `onepercent.mpgink.com`, which is invite-only — cold traffic
would click the biggest button and hit a login wall.
- Hero `ENTER THE APP` → `GET EARLY ACCESS` (jumps to `#join`); app link
  demoted to a small "already in the beta? sign in" for existing testers.
- Mid-page CTA: same swap.
- Badge `INVITE-ONLY BETA · PUBLIC END OF AUGUST` → `EARLY ACCESS OPENING
  SOON` — the old text asserted a public date that no longer matches the plan,
  and the new text asserts none.
- Join copy leads with access ("Be first through the door").

## Share URLs now live
- LinkedIn — `https://mpgink.com/one-percent?src=linkedin-op#join`
- Instagram — `https://mpgink.com/one-percent?src=instagram-op#join`

## Verification
Inline JS `node --check` clean on every touched page; all `#anchor` targets
resolve; prompt text HTML-escaped; copy buttons paired 1:1 with their blocks.
Pages runs for `e27fdd3` (guide) and `b970907` (capture-only) both completed
**success**. Not verified by eye: this session's network cannot reach
mpgink.com, so rendering was confirmed from build records and a self-contained
preview artifact, not from the live page. **Matthew to eyeball the hero on
mobile before the first share card goes out.**

## Open here
- Guide + magnet copy awaiting Matthew's markup; nothing links to them yet.
- Magnet delivery (a third welcome-email variant) queued behind the concurrent
  session working in `api/subscribe.js`.
- Share-card OG image for `one-percent.html` still describes the product
  ("one concept a day, human-verified") rather than inviting early access —
  worth a copy pass before the first post.
- `magnet.html` and the guide are unlinked from nav by design; add once copy
  is signed off.
