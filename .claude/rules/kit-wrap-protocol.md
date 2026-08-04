<!-- managed by mpgink claude-kit v2 — edit in mpgink-program-manager/Standards/claude-kit, not here -->
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
4. **Records audit** (`kit-records-audit.sh`, if this repo has `KIT_RECORD_CHECKS`
   configured) — run it against the snapshot you just wrote in step 2, before
   build check. A wrap does not get to declare the new State/ file true; it has
   to check. See "The wrap never verified itself" below.
5. **Build check clean** (`KIT_BUILD_CHECK_CMD`) before the final push.
6. **Commit + push** per this repo's documented flow.
7. **Report to Matthew:** what shipped (one sentence per item), which docs
   were updated, what's first next session, any decision left open.

## The wrap never verified itself (One Percent, 2026-08-01)
A state file claimed "126 entries live" the same day the catalog actually reached
234 — `lib/config.js` said so, in the same repo, the whole time. The old
staleness check in `kit-session-start.sh` measured age in **days** and this
portfolio runs several sessions a day, so the drift was **same-day** and
invisible: the hook printed no warning at 18 commits and 108 entries out of
date. Two independent fixes, not one, because they catch different failures:
- `kit-session-start.sh` now also counts **commits since a record file was last
  touched**, not just calendar days — closes the "many sessions, one day" gap.
- `kit-records-audit.sh` checks whether a record's **numeric claim still
  matches the code it describes** — closes "the file just isn't true anymore,"
  which no amount of freshness-tracking catches on its own. Age tells you
  nothing has *checked in*; it tells you nothing about whether what's there is
  *right*. Configure it per-repo via `KIT_RECORD_CHECKS` in `kit.config.sh` —
  empty is an honest "nothing wired here yet," not a false pass.

## The honest-catch-up rule (metta pattern, 2026-07-20)
If more than one session went undocumented, write **ONE reconciliation entry
derived from `git log`** covering the whole gap — grouped by arc, honest about
being a catch-up. Never hand-write retroactive day-by-day entries; they
produce worse records than the commit messages already are. Going forward:
git log is the granular record, session logs are the narrative.
