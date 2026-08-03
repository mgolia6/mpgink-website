<!-- managed by mpgink claude-kit v1 — edit in mpgink-program-manager/Standards/claude-kit, not here -->
# Single Source — the same thing must not live in two places

Born from Job Odyssey, 2026-07-27. One repo, one day, **eight** instances of the same
shape — none of them logic errors, all of them the same structural mistake:

| What was duplicated | How it hurt |
|---|---|
| Résumé before/after diff (positional, 2 files) | A reordered bullet painted as fully rewritten — **33 marked words per side** on a pure reorder |
| Placeholder scanner (3 surfaces, 3 coverages) | A `[$X]` in a role synopsis was invisible to all three AND sailed past the save hard-stop into an export |
| Fit/grade/ATS band ladders (4 ladders) | A résumé dimension scoring 60-64 rendered **amber on the rail and RED in the panel** |
| Structure/density report (server + client) | Same résumé, different `word_count`, potentially a different length verdict |
| `>= 75` "strong" gate (4 hand-written copies) | One moved cut point and four surfaces disagree |
| Onboarding chat writable fields (2 whitelists) | Relocation asked, answered, **structurally discarded** — 15 scoring fields unreachable |
| `profiles` vs the primary persona | **The résumé a user EDITS was not the résumé they were SCORED on** |
| capture→seed chain (onboarding + profile save) | Both reported a failed scan as success |

Every one was invisible until a user hit it. Several had been wrong for weeks.

---

## The rule

**Before writing a second implementation of anything a user sees, stop.** Ask which of
these two you have, because they need *opposite* fixes:

### A. The same LOGIC in two places → collapse to ONE
A copy is a fork waiting to drift, not reuse. Put it in a shared core (`public/js/*-core.js`
in the browser-plus-Node pattern), call it from everywhere, and fixture-test it.

"They're identical today" is not a defence — it is the state every drift starts from.

### B. The same VALUE on two surfaces → compute ONCE, carry it
Recomputing per surface risks two different numbers for one thing. Carrying is correct.
**But a carried value is only honest while its inputs are unchanged.** So it needs:
1. **Provenance** — what it was computed from, and when.
2. **Staleness detection** — a fingerprint or timestamp comparison, checked at render.
3. **No second derivation path.** Ever.

A cache with nothing enforcing the sync is not a cache, it is two facts.

---

## The tests that actually catch this

A unit test on the shared core does **not** catch a caller that stopped using it. Assert
the *wiring*:

- **Render-level fixtures.** Job Odyssey's browser smoke drives the real render function
  and asserts a pure reorder produces **zero** change markers. Forcing the old positional
  pairing back on failed it with "got 33 marks" — that is how you know a guard isn't vacuous.
- **Cross-file contract tests.** Where two lists must match and live in different languages
  (a JSON Schema and a JS merge function), read both files and assert every field in one is
  handled by the other.
- **Prove the guard fails.** Temporarily reintroduce the bug and confirm the test goes red
  before you trust it. A guard never seen to fail is a guard you are guessing about.

## Where to look first in an unfamiliar repo
Grep for a threshold constant (`>= 75`), a regex that encodes a business rule, and any
comment containing the words **"mirror"**, **"mirrors"**, or **"keep in sync"**. That
comment is a promise no code is keeping — in Job Odyssey it marked the exact spot where a
user's résumé had silently forked in two.
