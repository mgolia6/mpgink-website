<!-- managed by mpgink claude-kit v1 — edit in mpgink-program-manager/Standards/claude-kit, not here -->
Read-only repo status audit. Do NOT modify anything.

Report, in this order:
1. **Git:** current branch, last 5 commits (hash, date, subject), uncommitted
   changes, divergence from origin/main.
2. **Record freshness:** date of the newest State/ file, newest Logs/ entry
   (or SESSION_LOG/SESSION_NOTES entry) vs. the last commit date. Verdict:
   CURRENT (≤2 days gap), DRIFTING (3–7), STALE (>7 or records contradict
   git log). Quote the specific contradiction if one exists.
3. **Open work:** top items from the backlog/roadmap; anything marked as an
   open decision for Matthew.
4. **Safety nets:** do CI workflows exist (.github/workflows/)? When did the
   last run visibly execute (check badge/logs if reachable)? Any canary/probe
   and its last known state.
5. **Kit status:** `.claude/kit/VERSION` vs. the portfolio kit version if
   known; note if this repo has local-variant rules pending reconciliation.
6. **One-line verdict** and the single most valuable next action.
