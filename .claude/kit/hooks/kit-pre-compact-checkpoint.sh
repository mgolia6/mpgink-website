#!/bin/bash
# managed by mpgink claude-kit v1 — edit in mpgink-program-manager/Standards/claude-kit, not here
# PreCompact hook: commit+push WIP to the current feature branch before lossy compaction.
# Never auto-commits on main/master (production often auto-deploys). Fail-open.
set +e
root=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0
cd "$root" || exit 0
br=$(git branch --show-current 2>/dev/null)

case "$br" in
  main|master|"")
    printf '{"systemMessage":"kit PreCompact: on %s — NOT auto-committing (auto-deploy risk). Flush open decisions into State/ now and handle uncommitted work per this repo push rules."}\n' "${br:-detached}"
    exit 0 ;;
esac

if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
  git add -A >/dev/null 2>&1
  git commit -q -m "WIP context checkpoint (pre-compact)" >/dev/null 2>&1
  git push -q -u origin "$br" >/dev/null 2>&1
  printf '{"systemMessage":"kit PreCompact: WIP checkpoint committed+pushed to %s. Also flush open decisions and mid-task threads into State/ — the hook saves files, not reasoning."}\n' "$br"
else
  printf '{"systemMessage":"kit PreCompact: working tree clean. Flush open decisions and mid-task threads into State/ before compaction."}\n'
fi
exit 0
