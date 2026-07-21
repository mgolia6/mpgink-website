<!-- managed by mpgink claude-kit v2 — edit in mpgink-program-manager/Standards/claude-kit, not here -->
Wake this project up — full session-start orientation. Read-only: do NOT build,
fix, or refactor anything during the wake.

1. Read, in order: CLAUDE.md (or INSTRUCTIONS.md where that's this repo's
   convention) → the State/ snapshot (or SESSION_NOTES.md / SESSION_LOG.md) →
   the newest Logs/ entry → the backlog/roadmap → the newest PM-NOTES-*.md at
   the repo root if one exists (portfolio priorities from the program manager).
2. Reconcile against `git log -15 --format='%h %ad %s' --date=short`. If the
   records and the commits disagree, the commits win — say so explicitly, with
   the dates. Give a records verdict: CURRENT (≤2d behind commits) / DRIFTING
   (3–7d) / STALE (>7d). **If STALE, this session's first task is one honest
   reconciliation entry from git log (kit-wrap-protocol rule) before any
   build work.**
3. Check the safety nets: if `.github/workflows/` exists, note the latest
   CI/canary state if you can see it; flag any known red.
4. Brief Matthew in exactly this shape, then stop:
   - **WHERE WE LEFT OFF** — 2–3 sentences from the newest log entry
   - **RECORDS** — verdict + the dates behind it
   - **NETS** — CI/canary state, or "none in this repo"
   - **TOP 3 NEXT** — from roadmap/backlog + PM notes, most valuable first
   - **OPEN DECISIONS** — anything waiting on Matthew
5. Wait for direction. Do not start work the brief didn't earn.

This is a bounded session: one work arc, and /wrap is the exit door.
