<!-- managed by mpgink claude-kit v1 — edit in mpgink-program-manager/Standards/claude-kit, not here -->
# Validation Discipline

1. **Reproduce before fixing.** A user report describes a symptom; verify the
   mechanism before writing the fix. The obvious cause has been wrong
   repeatedly across this portfolio.
2. **Never weaken a guard to make something pass.** Failing validation means
   fix the root cause. Auth checks, layout locks, content gates, and rate
   limits are non-negotiable unless Matthew explicitly says otherwise.
3. **Build check before every commit.** Run this repo's build/test command
   (see `.claude/kit/kit.config.sh` → `KIT_BUILD_CHECK_CMD`); it must exit
   clean. Report honestly: "Build: clean" or the actual failure.
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
