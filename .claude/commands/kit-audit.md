<!-- managed by mpgink claude-kit v10 — edit in mpgink-program-manager/Standards/claude-kit, not here -->
Run the recurring portfolio hardening sweep. **Must be invoked from
`mpgink-program-manager`** — it walks sibling repo directories on local disk,
so it only works from the PM session context where those repos are cloned as
siblings. If you're in a child repo, say so and stop; don't try to fake it.

Born from the 2026-08-03 kit audit, which found — by hand, over one long
session — a hardcoded GitHub token, a stuck-file sync bug hiding for who
knows how long, and a well-formed process proposal that sat unactioned for
11 days because finding it required someone to remember to grep the whole
portfolio. None of that should ever again depend on someone remembering to
ask. This command is that memory.

## 1. Run the bundle

```bash
bash Scripts/kit-audit.sh <repo-path> [<repo-path>...]
```

Pass every repo currently checked out as a sibling of `mpgink-program-manager`
(everything in the Active Repos table in `INSTRUCTIONS.md`, plus any onboarded
but not-yet-tabled repo). It's entirely read-only — safe to run any time,
no confirmation needed before running it.

It checks four things in one pass:
1. **Kit drift + local variants** (`sync-claude-kit.sh --check`) — which repos
   are behind, which have unmanaged files silently blocking a kit file from
   ever installing.
2. **Hardcoded secrets** (`kit-secret-scan.sh`) — tokens/keys/passwords
   committed in plaintext.
3. **Pending proposals/findings** (`find-pending-proposals.sh`) — any
   `FINDINGS*`/`*PROPOSAL*`/`*SUGGEST*` file without a resolution marker.
4. **Tracking-table completeness** — every repo passed in must appear in
   `INSTRUCTIONS.md`'s Active Repos table.

## 2. Before trusting the results, prove the guard still works

If `core/hooks/` or `Scripts/` changed since the last audit, run
`bash Scripts/test-kit.sh` first and confirm `KIT SELF-TEST: PASS`. An audit
tool that silently broke and still exits 0 is worse than no audit tool —
it's a false green. Don't skip this because it "probably still works."

## 3. Triage every finding — don't just print it

For each category, decide and act same-session where the fix is small and
obvious; otherwise name it as an open item with an owner:

- **DRIFT / stale kit version** → run the real sync (`sync-claude-kit.sh`,
  no `--check`) after confirming nothing repo-specific would be clobbered.
- **LOCAL VARIANT** → check whether it's a documented, deliberate exception
  (grep the repo's own rules for why) or an accidental fork nobody explained.
  Undocumented forks get reconciled, not left — see `kit-single-source.md`.
- **Secret hit** → flag to Matthew immediately, in the same turn, before
  anything else. Confirm whether it's already rotated; if not, that's the
  first thing that happens, not a backlog item.
- **Unresolved proposal/finding** → read it, decide whether it's still live,
  and either action it, mark it resolved with the reason, or explicitly hand
  it to the right repo's next session with a one-line pointer.
- **Untracked repo** → add it to the Active Repos table now, or record in
  INSTRUCTIONS.md exactly why it's deliberately excluded (see the
  Phantasy-Phishball precedent). Never leave it silently missing.

## 4. Report

One line per category — what was found, what was fixed inline, what's still
open and who owns it next. If everything came back clean, say that plainly;
a clean audit is a real result, not a non-event.

## 5. Log it

Append a short entry to `SESSION_LOG.md` even if nothing needed fixing —
"ran kit-audit, clean" is still a record that the sweep happened. An audit
ritual nobody can prove ran is the same failure mode this command exists to
prevent.
