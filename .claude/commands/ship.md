<!-- managed by mpgink claude-kit v1 — edit in mpgink-program-manager/Standards/claude-kit, not here -->
Commit and ship current work — safely.

1. **Check this repo's push rules first.** If the repo has a push protocol
   requiring Matthew's decision (e.g. One Percent's two questions: push to
   main? admin-gate it?), STOP and run that protocol — do not push until
   answered. If the repo uses PR-gated merges (e.g. Phreezer), open the PR
   flow instead of pushing to main.
2. Run the build check (`KIT_BUILD_CHECK_CMD` in `.claude/kit/kit.config.sh`)
   — must exit clean. Fix or report; never ship red.
3. Review `git status` + `git diff --stat` — confirm nothing unintended is
   staged (secrets, scratch files, unrelated edits).
4. Commit with a clear message stating what + why, per the ship checklist:
   files touched, blast radius, evidence, verification performed.
5. Push per the repo's documented flow (dev branch → merge pattern where one
   is defined; `git push -u origin <branch>`; retry on network errors with
   backoff).
6. Report what was pushed, where it deploys, and what to verify on production.
