#!/bin/bash
# managed by mpgink claude-kit v1 — edit in mpgink-program-manager/Standards/claude-kit, not here
# PostToolUse hook (Edit|Write): node --check edited JS in configured dirs. Fail-open on config absence.
set +e
root=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0
cd "$root" || exit 0
[ -f .claude/kit/kit.config.sh ] && . .claude/kit/kit.config.sh
[ -n "$KIT_NODE_CHECK_DIRS" ] || exit 0
command -v node >/dev/null 2>&1 || exit 0

input=$(cat)
fp=$(printf '%s' "$input" | sed -n 's/.*"file_path"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -1)
[ -n "$fp" ] || exit 0
case "$fp" in *.js|*.mjs|*.cjs) ;; *) exit 0 ;; esac

match=0
for d in $KIT_NODE_CHECK_DIRS; do
  case "$fp" in "$root/$d"/*|"$d"/*) match=1 ;; esac
done
[ "$match" = "1" ] || exit 0

err=$(node --check "$fp" 2>&1)
if [ $? -ne 0 ]; then
  echo "kit: SYNTAX ERROR in $fp — fix before continuing:" >&2
  echo "$err" | head -10 >&2
  exit 2
fi
exit 0
