#!/bin/bash
# managed by mpgink claude-kit v2 — edit in mpgink-program-manager/Standards/claude-kit, not here
# SessionStart hook: orientation briefing + record-staleness warning. Fail-open.
# v2 (2026-08-01, One Percent): day-based staleness alone missed same-day drift
# on a portfolio that runs several sessions per day — proven at 18 commits and
# 108 entries out of date with a 0-day gap. Now checks commits-since-touch too;
# either signal tripping is enough to warn. See kit-records-audit.sh for the
# companion check (does the record's CONTENT still match the code, not just its age).
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
  rec_sha=$(git log -1 --format='%H' -- "$newest_rec_file" 2>/dev/null)
  commits_since=0
  [ -n "$rec_sha" ] && commits_since=$(git rev-list --count "$rec_sha"..HEAD 2>/dev/null || echo 0)
  echo "records: newest is $newest_rec_file ($newest_rec, ${commits_since} commits since) vs last commit $last_commit_date"
  if [ "$gap" -gt 7 ] || [ "$commits_since" -gt 15 ]; then
    echo "🔴 RECORDS STALE — ~${gap}d AND ${commits_since} commits behind — reconcile from git log (one honest catch-up entry) before building. See kit-wrap-protocol.md."
  elif [ "$gap" -gt 2 ] || [ "$commits_since" -gt 5 ]; then
    echo "🟡 records drifting — ~${gap}d / ${commits_since} commits behind commits — plan to wrap properly this session."
  fi
else
  echo "⚠ no State/Logs/SESSION records found — this repo predates the mpgink standard here."
fi
[ -f .claude/kit/VERSION ] && echo "claude-kit v$(cat .claude/kit/VERSION)"
echo "─────────────────────────────────────────────────────"
exit 0
