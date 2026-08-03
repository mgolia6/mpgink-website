<!-- managed by mpgink claude-kit v6 — edit in mpgink-program-manager/Standards/claude-kit, not here -->
Put on the CFO hat for this portfolio. Read `.claude/rules/kit-cost-discipline.md`
before you start — this command executes that rule, it doesn't replace it.

The job is not "spend less." It's **know what we spend, prove it, and make sure
every dollar is buying integrity rather than waste.** A cost you can't see is the
enemy; a cost that protects users is fine.

Run read-only unless the user asks for changes. Report, then wait.

---

## 1. Refresh the numbers (evidence, never memory)

Pull what can be pulled, and be explicit about what can't:

- **Vercel** — usage CSV / billing page. Manual pull; no usage API on this plan.
  Watch **Build CPU Minutes** specifically, it has been the whole overage before.
- **AI vendors** — query each project's usage table (`claude_usage`,
  `ai_usage_log`). Break down by endpoint × model so the hot path is visible.
- **Databases** — Supabase/Neon plan + per-project size against the free ceiling.
- **User counts** — the denominator for every unit-economics number. Get the real
  count from `auth.users` or the app's own table; never estimate it.

For anything you cannot reach, **say so by name and why**. Do not fill a gap with
a guess, and never with a zero.

## 2. Update the model

`mpgink-program-manager/src/costModel.js` is the source of truth. Update
`COST_LINES`, `COST_PROJECTS`, `BREAK_EVEN` and `COST_LEVERS`; bump `COST_ASOF`.
Mark every line `measured` / `estimated` / `unmeasured` honestly. The dashboard
Cost tab renders straight off this file, so a lie here becomes a lie on screen.

## 3. Answer these five questions

1. **What is the run-rate, and what's the coverage %?** Both numbers, together.
   Coverage is the one that matters — it's the share of cost surfaces carrying a
   real number.
2. **What moved since last cycle, and why?** A number without a delta is trivia.
3. **What's newly unmeasured?** Any paid call added since the last review without
   logging is a regression against `kit-cost-discipline.md` #2 — name it.
4. **Which free tier is closest to its cliff?** Flag anything past 70% headroom.
   A hit ceiling is an outage, not a bill.
5. **Did any project's cost-per-user rise faster than its users?** That's the early
   signal of an economics problem, and it shows up long before the invoice does.

## 4. Separate the two kinds of action

- **Code levers** — caching, capping, logging, killing work that changes nothing.
  These you can propose and, with a go-ahead, implement.
- **Account levers** — plan changes, dashboard toggles, deleting projects, buying
  capacity. **Human-only.** List them plainly with the dollar figure attached and
  hand them over; don't attempt them.

## 5. Guard the floor

Before recommending any cut, check it against `kit-cost-discipline.md` #6. If a cut
would degrade model quality on a user-facing path, remove error tracking or
backups, or weaken a guard — **don't recommend it.** Say why the spend is correct.
"We should keep paying for this" is a legitimate CFO finding and often the right one.

## 6. Report

Short, in this shape:

- **RUN-RATE** — $X/mo measured · coverage Y% (Z surfaces with no number)
- **MOVED** — what changed since last cycle, with the cause
- **BLIND SPOTS** — unmeasured surfaces, worst-impact first
- **CLIFFS** — free tiers past 70%
- **UNIT ECONOMICS** — cost-per-user per project; flag anything unpriceable
- **LEVERS** — code (proposable) vs account (Matthew's), each with a $ figure
- **HOLD THE LINE** — spend that should NOT be cut, and why

Then stop and wait for direction.
