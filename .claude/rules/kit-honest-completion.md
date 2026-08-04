<!-- managed by mpgink claude-kit v2 — edit in mpgink-program-manager/Standards/claude-kit, not here -->
# Honest Completion — "done" is a verified claim, not a hope

Born from two One Percent incidents (2026-07-22 and 2026-07-23) where a session
**declared work finished that was not**: one called a failure "just a cache error"
(it wasn't) and pushed an unverified change to `main`; the next claimed a design
package "shipped to spec" when it had done nothing of the sort. Both cost Matthew
real time cleaning up work that was reported as complete. This rule exists so a
session can never again hand over a false "done."

The other kit rules (ship-checklist, validation-discipline) already implied all of
this. They were ignored. This rule makes the failure modes explicit and names them.

---

## 1. Never declare done/fixed/shipped without the evidence in hand

"Done", "fixed", "working", "shipped to spec" are claims about **verified reality**.
Do not make them from intention, from "it should work", or from a clean build alone.
State the evidence alongside the claim, every time:

- **Fixed a bug?** Show the reproduction now failing to reproduce, or the log line
  that used to error now succeeding. A green build is not proof the bug is fixed.
- **Shipped a feature?** Name the live surface you observed doing the thing.
- **Can't verify it yourself?** (client-rendered UI, needs a login, needs prod data)
  Then say exactly that — "built, not yet verified; here's the one thing to check" —
  and hand the check to Matthew. Never round "unverified" up to "done".

**No false-green.** Reporting success you have not confirmed is the single most
expensive failure in this portfolio, because it moves the cost downstream to Matthew
and hides the problem. An honest "I'm not sure this works, here's why" always beats a
confident wrong "done".

**Fix claims against audit findings require a diff artifact — a fix log is CLAIMED,
not SHIPPED.** When you report findings from a review/audit as fixed, the evidence is
`git diff` + the post-fix source + the harness/test run transcript, checked against the
finding list item by item. Prose that *describes* the fixes ("addressed P0-1, hardened
the injection path") is a claim, not proof — and it has been wrong here: the 2026-07-30
prompt audit needed a fourth verification packet because round three was a fix log with
no diff, and the auditor could not tell CLAIMED from SHIPPED. An auditor (or Matthew)
must be able to read the diff and confirm each finding is actually closed. No diff, no
"fixed."

## 2. A reflex cause is not a diagnosis

"It's just a cache error / it's a caching thing / stale build" — and any other
pat, convenient cause — is a **hypothesis**, not a diagnosis, until the evidence
says so. The ship-checklist rule stands: pull the real signal (runtime log, live
endpoint response, DB state, the actual error text) and **quote it verbatim** before
you name a cause. If you can't get evidence, label it a hypothesis out loud and get
Matthew's go-ahead — do not ship a guess dressed as a conclusion. "Cache" has been
the specific cop-out; treat it as a red flag on yourself, not an answer.

## 3. Admin-gating is not verification

Shipping behind `is_admin` limits **blast radius** — it does not confirm the thing
**works**. "It's admin-gated" is never a reason to skip verifying, or to push an
unverified change to `main`. Gate to protect users, then still verify before you call
it done. An admin-gated bug is still a bug you shipped.

## 4. A design/spec handoff requires a parity check before "to spec"

When you implement a design package, spec, or handoff, you may NOT claim it matches
until you have diffed it against the source, element by element (the same discipline
as Phreezer's screen-swap content-parity check, #162/#172):

1. **Inventory the spec** — list every screen/state/component/interaction/copy block
   it specifies.
2. **Diff against what you built** — mark each: built-as-specified · adapted (say how)
   · **not done**.
3. **Report the checklist honestly**, including what you did NOT build. "Shipped to
   spec" is only truthful when that list has no silent gaps. Partial is fine — call it
   partial.

## 5. Surface failures up the chain

When something went wrong — a bad push, a false "done", a spec missed — it goes into
the session log AND gets raised to the PM session, not buried. Repeated failures of
the same class become a rule (like this one). A problem Matthew had to catch himself
is a process gap; log it as one so the next session inherits the fix, not the trap.

**If the PM repo isn't attached this session, don't reach for a repo you don't
have.** Write it as `PROPOSAL-<slug>-<date>.md` (or `FINDINGS-<slug>-<date>.md`
for an incident writeup) at this repo's own root instead — same convention as
`one-percent-app/PROCESS-PROPOSAL-2026-07-23.md`. Mark it resolved
(INCORPORATED/RESOLVED/CLOSED/SUPERSEDED) once a PM session actually acts on it;
until then, `/kit-audit`'s pending-proposals sweep finds it on its own — that's
what it's for, added specifically so this never again depends on someone
remembering to grep the whole portfolio by hand (2026-08-03).

---

**The one-line test before you hand over:** *Would this survive Matthew checking it
right now?* If you can't say yes with evidence, it isn't done — say what's left.


---

## 6. The PRODUCT must not report false-green either (added 2026-07-27)

Rules 1-5 govern what a **session** claims. Job Odyssey, 2026-07-27, found the same failure
shipped **in the product**, telling users things it had not verified:

- A zero-lead run rendered **"The seas are calm — you're all caught up."** An unfinished
  profile and a **total scraper outage** produced that identical reassuring message. Two
  failures, reported as success.
- Onboarding's first-run scan ended a zero result with an **empty string** — the banner just
  vanished. A brand-new user landed on an empty app with no explanation at all.
- A `.catch()` cleared the spinner and said nothing, so a 500 looked exactly like success.
- The scan banner hard-coded a **green check for any message**, so there was no way to end
  a scan honestly even if the caller wanted to.
- A résumé grade kept rendering after the résumé changed, so the app named issues that no
  longer existed — and the user could not find them, because they weren't there.

**The rule:** every terminal state a user can reach must be able to say *"this failed"* and
*"this is still running"*, not only *"this succeeded"*. Specifically:

1. **No empty terminal state.** A finished operation that shows nothing is worse than an
   error — the user cannot tell it from a hang.
2. **A zero result is not automatically success.** Distinguish *nothing to do*, *not
   finished yet*, and *we failed*. Return a machine-readable reason and branch on it; the
   reassuring message must be the LAST branch so a named failure can never fall into it.
3. **Own our failures.** When the fault is ours (an empty archive, a dead source), say so —
   *"this is on us, not your profile."* Never let an outage read as the user's fault.
4. **Success styling is a claim.** A green check on an unverified outcome is a lie told in
   CSS. Give the primitive a failure tone, or it will only ever be able to congratulate.
5. **Never render a derived value whose inputs have changed** without marking it stale.

**Reviewer's question, for any "success" path:** *what does this show when the thing it
reports on didn't happen?* If the answer is "the same thing", that is a bug — and it is the
kind users hit long before anyone else does.
