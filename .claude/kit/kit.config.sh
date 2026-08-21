# kit.config.sh — REPO-OWNED (the sync script installs this starter once, then never touches it)
# Configure what the kit hooks do in THIS repo. Keep it honest: a check that
# doesn't run here should be empty, not faked.

# Build/test command the wrap + /ship + Stop hook use. Must exit non-zero on failure.
# Examples: "npm run build" · "npm --prefix client run build" · "bash .claude/scripts/build-check.sh" · "cd app-next && npm run build"
# WAS EMPTY until 2026-08-12, and empty was honest at the time: this is static
# HTML with no build step, so there was nothing to run. But "nothing to compile"
# is not "nothing to check" — what breaks on a static site is links and assets,
# and that fails silently as a 404 for a visitor rather than as an error for us.
# scripts/check-site.mjs resolves every local reference on disk, requires a
# <title> per page, and asserts signup.html still parses `?src=` (the only
# signup attribution this site has). No dependencies, so this repo does not grow
# a package.json to run a link check. Also enforced in CI by
# .github/workflows/build-check.yml.
# scripts/check-filter-wiring.mjs joins it: the AFM catalog page is assembled by
# three generators sharing one search box, and a wing that stops speaking the
# shared filter contract fails silently as "nothing matches" over rows that are
# right there on the page.
KIT_BUILD_CHECK_CMD="node scripts/check-site.mjs && node scripts/check-filter-wiring.mjs"

# Space-separated dirs whose .js/.mjs/.cjs files get node --check after every edit.
# Leave EMPTY for repos whose JS is JSX/TSX (node --check would false-fail).
KIT_NODE_CHECK_DIRS=""

# Set to 1 to run KIT_BUILD_CHECK_CMD as a blocking Stop hook (best for fast checks only).
KIT_STOP_CHECK=0
