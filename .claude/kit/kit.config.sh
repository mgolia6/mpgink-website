# kit.config.sh — REPO-OWNED (the sync script installs this starter once, then never touches it)
# Configure what the kit hooks do in THIS repo. Keep it honest: a check that
# doesn't run here should be empty, not faked.

# Build/test command the wrap + /ship + Stop hook use. Must exit non-zero on failure.
# Examples: "npm run build" · "npm --prefix client run build" · "bash .claude/scripts/build-check.sh" · "cd app-next && npm run build"
KIT_BUILD_CHECK_CMD=""

# Space-separated dirs whose .js/.mjs/.cjs files get node --check after every edit.
# Leave EMPTY for repos whose JS is JSX/TSX (node --check would false-fail).
KIT_NODE_CHECK_DIRS=""

# Set to 1 to run KIT_BUILD_CHECK_CMD as a blocking Stop hook (best for fast checks only).
KIT_STOP_CHECK=0
