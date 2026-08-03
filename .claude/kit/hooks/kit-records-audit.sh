#!/bin/bash
# managed by mpgink claude-kit v1 — edit in mpgink-program-manager/Standards/claude-kit, not here
# Records audit: catches a numeric claim in State/Logs that no longer matches
# the code it describes — e.g. a state file saying "126 entries live" sitting
# next to lib/config.js's TOTAL_ENTRIES = 234. This checks TRUTH, not AGE.
#
# Born 2026-08-01 (One Percent): day-based staleness in kit-session-start.sh
# missed this because it happened SAME DAY, across several sessions — the old
# hook printed no warning at 18 commits and 108 entries out of date. This is
# the mechanical half of the fix; commit-based staleness (kit-session-start.sh)
# is the other half. Prose claims ("what's next") stay covered by the existing
# git-log reconciliation discipline (kit-session-discipline.md) — this script
# only checks claims that reduce to one number on each side.
#
# Config: KIT_RECORD_CHECKS in kit.config.sh, one check per line, "|"-delimited:
#   label|state_file|state_grep_pattern|source_file|source_grep_pattern
# Each pattern must isolate ONE number via `grep -oE` (first match; non-digits
# stripped after). Example (One Percent's own incident, as a check):
#   KIT_RECORD_CHECKS="entries live|State/onepercentstate.md|Total entries live: [0-9]+|app-next/lib/config.js|TOTAL_ENTRIES = [0-9]+"
# Empty/absent config = pass silently (fail-open). Nothing configured to check
# is an honest state, not a lie — don't fake coverage.
#
# Run standalone (wrap step): bash .claude/kit/hooks/kit-records-audit.sh
# Or wire as a Stop hook in settings.json like kit-stop-build-check.sh.
set +e
root=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0
cd "$root" || exit 0
[ -f .claude/kit/kit.config.sh ] && . .claude/kit/kit.config.sh
if [ -z "${KIT_RECORD_CHECKS:-}" ]; then
  echo "kit: records-audit — no checks configured (KIT_RECORD_CHECKS empty in kit.config.sh)"
  exit 0
fi

fail=0
while IFS='|' read -r label sfile spat tfile tpat; do
  [ -n "$label" ] || continue
  if [ ! -f "$sfile" ] || [ ! -f "$tfile" ]; then
    echo "kit: records-audit SKIP \"$label\" — $sfile or $tfile not found"
    continue
  fi
  sval=$(grep -oE "$spat" "$sfile" 2>/dev/null | head -1 | tr -cd '0-9')
  tval=$(grep -oE "$tpat" "$tfile" 2>/dev/null | head -1 | tr -cd '0-9')
  if [ -z "$sval" ] || [ -z "$tval" ]; then
    echo "kit: records-audit SKIP \"$label\" — pattern found no number in one or both files"
    continue
  fi
  if [ "$sval" != "$tval" ]; then
    echo "kit: records-audit FAIL \"$label\" — $sfile says $sval, $tfile says $tval"
    fail=1
  else
    echo "kit: records-audit OK \"$label\" ($sval)"
  fi
done <<EOF
$(printf '%s\n' "$KIT_RECORD_CHECKS")
EOF

if [ "$fail" != "0" ]; then
  echo "kit: records audit found a stale claim — fix the record before the wrap completes." >&2
  exit 2
fi
exit 0
