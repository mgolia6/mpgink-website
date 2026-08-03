<!-- managed by mpgink claude-kit v5 — edit in mpgink-program-manager/Standards/claude-kit, not here -->
# Vercel Cost Discipline

Portfolio finding (VERCEL-COST-AUDIT-2026-07-26): the entire Vercel overage is
**Build CPU Minutes** — every `git push` triggers a full rebuild, across every
project, including commits that only change docs. Function invocations and
bandwidth are rounding errors. So cost control = **don't build what doesn't need
building.** These rules apply to every Vercel-deployed repo.

## 1. Every Vercel repo ships the docs-only build skip
The canonical script is `Standards/claude-kit/core/scripts/vercel-ignore-build.sh`.
The kit sync tool only manages `.claude/` files, so this is a **manual two-step
install per repo** (do it during a cost rollout, or when spinning up a new repo):

1. Copy the script to `<repo>/scripts/vercel-ignore-build.sh`.
2. Add to `<repo>/vercel.json` (top level):
   ```json
   "ignoreCommand": "bash scripts/vercel-ignore-build.sh"
   ```

Vercel contract: the build **proceeds on exit 1**, is **skipped on exit 0**. The
script skips only provably docs-only commits (`*.md` + the script itself) and
**builds when in doubt** — it can never skip a real deploy. Preview builds on
branches are covered too. No dashboard toggle needed (the UI setting moved to
Settings → Build & Deployment, but `vercel.json` is cleaner and version-controlled).

## 2. Batch commits
Every push is a build. Group a session's commits into as few pushes as makes
sense. Docs-only pushes are free once rule 1 is in.

## 3. Dashboard hygiene (account-level — a human must do these once)
- **Pause Git auto-deploy on dormant projects** (Settings → Git). An idle project
  that still auto-builds on every push is pure waste.
- **Disable preview deployments for non-PR branches** so only `main` (and real
  PRs) build.
- **Kill Observability / Fluid runtime on projects that don't need it** — check
  any project showing runtime spend (Fluid memory/CPU, Observability Events), not
  just build minutes.

## 4. New-project checklist addition
Spinning up a Vercel repo? Do rule 1 (script + `ignoreCommand`) and rule 3
(preview builds off) at setup, before the first dozen deploys pile up.

## 5. Verify each cycle
At the PM portfolio rollup, re-pull the Vercel usage CSV. **Build CPU Minutes**
is the number to watch; it should trend toward just the fixed plan base. Flag any
project whose runtime (non-build) spend is climbing.
