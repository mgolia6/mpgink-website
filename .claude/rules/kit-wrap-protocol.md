<!-- managed by mpgink claude-kit v1 — edit in mpgink-program-manager/Standards/claude-kit, not here -->
# Wrap Protocol — the mandatory session exit

Run this at every session close. If the repo has its own richer wrap rule
(e.g. One Percent's 10-step protocol), that one wins — this is the floor.

1. **Session log entry** — in this repo's log location (Logs/ per the mpgink
   standard, or SESSION_LOG/SESSION_NOTES where that's the convention):
   what shipped, decisions made, what's open, next priorities. Append to
   today's file if it exists; never create `-v2` files.
2. **State snapshot regenerated** — the State/ file reflects reality as of
   right now, dated today. Not patched — regenerated.
3. **Backlog/roadmap updated** — completed items marked done, new items added.
4. **Build check clean** (`KIT_BUILD_CHECK_CMD`) before the final push.
5. **Commit + push** per this repo's documented flow.
6. **Report to Matthew:** what shipped (one sentence per item), which docs
   were updated, what's first next session, any decision left open.

## The honest-catch-up rule (metta pattern, 2026-07-20)
If more than one session went undocumented, write **ONE reconciliation entry
derived from `git log`** covering the whole gap — grouped by arc, honest about
being a catch-up. Never hand-write retroactive day-by-day entries; they
produce worse records than the commit messages already are. Going forward:
git log is the granular record, session logs are the narrative.
