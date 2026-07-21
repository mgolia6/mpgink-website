<!-- managed by mpgink claude-kit v1 — edit in mpgink-program-manager/Standards/claude-kit, not here -->
# Session Discipline

## Session start — every time
1. Read CLAUDE.md, then the repo's State/ snapshot (or SESSION_NOTES /
   SESSION_LOG where that's the convention), then the newest Logs/ entry,
   then the backlog/roadmap.
2. **Reconcile against `git log` before trusting any of it.** If the records
   and the commits disagree, the commits win — flag the gap instead of
   papering over it.
3. Never reconstruct state from memory or prior-session context. The repo is
   the persistence layer, not the conversation.

## Bounded sessions — the portfolio rule (set 2026-07-20)
- **One session per work arc** (an evening, a feature push, a bug-hunt).
  A week-long epic is the ceiling for a single session.
- **Wrap is the mandatory exit door** — no session ends without the wrap
  protocol run (see kit-wrap-protocol.md or the repo's own wrap rule).
  A session that never ends never wraps; don't be that session.
- Long-running persistent sessions are for **watcher roles only** (PR
  babysitting, the PM session). Build work happens in fresh, bounded sessions
  that read the records cold — if a fresh session comes up confused, the
  records drifted, and that's a finding to fix, not to work around.
