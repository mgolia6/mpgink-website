#!/bin/bash
# managed by mpgink claude-kit v1 — edit in mpgink-program-manager/Standards/claude-kit, not here
# SessionStart hook: orientation briefing + record-staleness warning. Fail-open.
set +e
root=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0
cd "$root" || exit 0

echo "── claude-kit briefing ──────────────────────────────"
echo "branch: $(git branch --show-current 2>/dev/null || echo '?')"
echo "last commit: $(git log -1 --format='%h %ad %s' --date=short 2>/dev/null)"
dirty=$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')
[ "$dirty" != "0" ] && echo "⚠ uncommitted changes: $dirty file(s)"

# Record freshness: newest last-commit date among state/log/session files vs repo last-commit date
last_commit_date=$(git log -1 --format='%ad' --date=short 2>/dev/null)
newest_rec=""
newest_rec_file=""
for f in State/*.md Logs/* SESSION_LOG.md SESSION_NOTES.md; do
  [ -f "$f" ] || continue
  d=$(git log -1 --format='%ad' --date=short -- "$f" 2>/dev/null)
  [ -n "$d" ] || continue
  if [ -z "$newest_rec" ] || [ "$d" \> "$newest_rec" ]; then newest_rec="$d"; newest_rec_file="$f"; fi
done
if [ -n "$newest_rec" ]; then
  gap=$(( ( $(date -d "$last_commit_date" +%s 2>/dev/null || echo 0) - $(date -d "$newest_rec" +%s 2>/dev/null || echo 0) ) / 86400 ))
  echo "records: newest is $newest_rec_file ($newest_rec) vs last commit $last_commit_date"
  if [ "$gap" -gt 7 ]; then
    echo "🔴 RECORDS STALE by ~${gap}d — reconcile from git log (one honest catch-up entry) before building. See kit-wrap-protocol.md."
  elif [ "$gap" -gt 2 ]; then
    echo "🟡 records drifting (~${gap}d behind commits) — plan to wrap properly this session."
  fi
else
  echo "⚠ no State/Logs/SESSION records found — this repo predates the mpgink standard here."
fi
[ -f .claude/kit/VERSION ] && echo "claude-kit v$(cat .claude/kit/VERSION)"
echo "─────────────────────────────────────────────────────"
exit 0
