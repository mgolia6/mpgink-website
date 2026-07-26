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

---

**The one-line test before you hand over:** *Would this survive Matthew checking it
right now?* If you can't say yes with evidence, it isn't done — say what's left.
