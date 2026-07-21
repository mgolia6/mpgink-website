<!-- managed by mpgink claude-kit v1 — edit in mpgink-program-manager/Standards/claude-kit, not here -->
# Reality Check — apply before any code change, every time

1. **Prove the file exists** — list the directory or read it. Not from memory.
2. **Prove every function, component, endpoint, or global you reference exists**
   — search the actual codebase first.
3. **Prove every DB column you write to exists in the actual schema** — check
   the repo's schema doc or query the DB. Never write to an unconfirmed column.
4. **Prove every new route is registered** wherever this repo requires it
   (vercel.json entry, router table, cron config) — missing registration is a
   silent 404 in production.
5. **If anything can't be verified — stop and flag it before proceeding.**
   If you can't prove it exists, you don't touch it.

Check the repo's own rules/knowledge files for repo-specific traps before
starting; most repos maintain a list of the mistakes that have already
happened here once.
