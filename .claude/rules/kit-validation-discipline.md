<!-- managed by mpgink claude-kit v2 — edit in mpgink-program-manager/Standards/claude-kit, not here -->
# Validation Discipline

1. **Reproduce before fixing.** A user report describes a symptom; verify the
   mechanism before writing the fix. The obvious cause has been wrong
   repeatedly across this portfolio.
   - **When one surface breaks right after a scoped change, revert-to-known-good
     FIRST, then diff** (Matthew's rule, One Percent 2026-07-23). Before any
     theory about cache, auth, CDN, or infra: `git checkout <last-good-sha> --
     <file>` (or revert the merge) so nobody is sitting on broken code while
     you diagnose, then `git diff <last-good-sha> HEAD -- <file>`. The defect
     is almost always in the lines just touched — if "the only thing we
     touched was X," X's diff is the first place to look, not the last. Only
     widen to infra/cache/auth after that diff comes up empty.
2. **Never weaken a guard to make something pass.** Failing validation means
   fix the root cause. Auth checks, layout locks, content gates, and rate
   limits are non-negotiable unless Matthew explicitly says otherwise.
3. **Build check before every commit.** Run this repo's build/test command
   (see `.claude/kit/kit.config.sh` → `KIT_BUILD_CHECK_CMD`); it must exit
   clean. Report honestly: "Build: clean" or the actual failure.
   - **Build-clean is not runtime-clean** (One Percent, 2026-07-23 — a
     readability tweak left a dangling variable reference: valid syntax, clean
     build, 200 response, and it still threw on click with no error boundary
     to catch it). Before calling an interactive/client change done, **execute
     the changed path** — locally or on a reachable preview, load the page,
     click the thing. Done-criteria for an interactive surface is "I saw it
     work," not "it compiled." If the path can't be executed before shipping
     (auth-gated, data-dependent), say so explicitly and treat the deploy as
     unverified until a human runs the exact interaction.
4. **Sweep the bug class, not the instance.** When fixing a bug, grep for the
   same pattern everywhere in the repo — one-instance fixes have let the same
   class bite three separate times before.
5. **New endpoints ship authenticated and capped by default.** Every new API
   route gets auth + rate/cost limits at build time, not in a later hardening
   pass. Three repos shipped open AI endpoints in the same month; this rule
   exists because of that.
6. **Pre-code surfacing on non-trivial changes:** files to be modified, what
   the change does in plain English, blast radius, rollback plan. Then get
   Matthew's go-ahead.
