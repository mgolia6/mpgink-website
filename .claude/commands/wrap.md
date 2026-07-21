<!-- managed by mpgink claude-kit v1 — edit in mpgink-program-manager/Standards/claude-kit, not here -->
Close this session properly.

Run the wrap protocol: if this repo has its own wrap rule
(`.claude/rules/wrap-protocol.md` or equivalent), execute that one in full —
every step, no skipping. Otherwise execute `.claude/rules/kit-wrap-protocol.md`.

Non-negotiables regardless of which protocol runs:
1. Session log entry written (append to today's file if it exists).
2. State snapshot regenerated and dated today.
3. Backlog/roadmap updated.
4. Build check clean before the final push.
5. Commit + push per this repo's documented flow.
6. Report: what shipped, docs updated, first item next session, open decisions.

If sessions went undocumented since the last wrap, apply the honest-catch-up
rule: one reconciliation entry derived from git log, never retroactive dailies.
