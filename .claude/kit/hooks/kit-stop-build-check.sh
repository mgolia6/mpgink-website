#!/bin/bash
# managed by mpgink claude-kit v1 — edit in mpgink-program-manager/Standards/claude-kit, not here
# Stop hook: run the repo's build check before the session yields. Opt-in via KIT_STOP_CHECK=1.
set +e
root=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0
cd "$root" || exit 0
[ -f .claude/kit/kit.config.sh ] && . .claude/kit/kit.config.sh
[ "$KIT_STOP_CHECK" = "1" ] || exit 0
[ -n "$KIT_BUILD_CHECK_CMD" ] || exit 0
# Skip when deps aren't installed (fresh container) — a false red helps no one.
if echo "$KIT_BUILD_CHECK_CMD" | grep -q "npm" && [ ! -d node_modules ] && [ ! -d client/node_modules ] && [ ! -d app-next/node_modules ]; then
  exit 0
fi
out=$(eval "$KIT_BUILD_CHECK_CMD" 2>&1)
if [ $? -ne 0 ]; then
  echo "kit: BUILD CHECK FAILED — fix before stopping:" >&2
  echo "$out" | tail -20 >&2
  exit 2
fi
exit 0
