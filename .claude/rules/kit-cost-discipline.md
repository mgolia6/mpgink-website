# Cost Discipline — the CFO role

Portfolio finding (PORTFOLIO-COST-AUDIT-2026-07-26): the Vercel audit found
$48.50/month and called it the bill. The bill was **at least $70.48**, because
nobody had looked at a second vendor. Anthropic on Job Odyssey alone was $21.97 —
45% the size of all Vercel spend — and Job Odyssey was the **only** one of six
AI-bearing projects that logged what it spent.

This rule exists so that can't happen again. `kit-vercel-cost.md` handles one
vendor's build minutes; this is the general discipline.

---

## The premise: unmeasured is worse than expensive

A large cost you can see is a decision. A small cost you can't see is a liability,
because it grows without anyone choosing it. **The portfolio's health metric is not
its monthly total — it is the share of cost surfaces that carry a real number.**

The Cost tab in the PM dashboard is the scoreboard. Drive coverage to 100%.

---

## 1. Never report an unmeasured cost as $0

A cost surface with no meter renders as **"no number"**, never as zero, in every
document, dashboard, and summary. Rounding an unknown down to zero is how a bill
becomes a surprise. If you can't measure it, say "unmeasured" and put it on the
backlog — that's an honest answer, and it's the one that gets fixed.

Three confidence levels, always stated:
- **measured** — from a bill or a usage table. Trust it.
- **estimated** — pricing × observed volume. Directionally right; say so.
- **unmeasured** — we know it bills; we don't know the number.

## 2. Every paid API call is logged at the call site

Any request to a metered vendor (Anthropic, OpenAI, or the next one) logs
`(endpoint, action, model, input_tokens, output_tokens, cost_usd, user_id)` to a
usage table **in the same commit that adds the call**. Not in a later hardening
pass — that pass is how six unlogged Sonnet endpoints made Job Odyssey's admin
view undercount its own invoice.

**Canonical implementation: `job-search-automation/api/claude-usage.js`**
(`logClaudeUsage`) plus the `claude_usage_summary(p_since)` SQL RPC. Copy its
shape. Cost math covers cache write/read and any per-request fees, and aggregation
happens in SQL — never fetch-rows-and-sum in JS.

Corollary: usage must be **readable by the PM dashboard**. A table nobody can query
is not instrumentation. Ship the read endpoint with the logging.

## 3. New paid endpoints ship capped

This restates `kit-validation-discipline.md` #5 because cost is where it bites:
auth + per-user rate limit + a cost ceiling, at build time. An uncapped AI endpoint
is an unbounded liability with your name on the invoice.

Pay attention to the quiet ones. Text generation is obvious; **speech is not**.
OpenAI `tts-1` bills per character — a read-aloud feature can outspend a chat
feature by an order of magnitude while looking harmless in a diff.

## 4. Know the marginal cost per user before setting a price

Before any monetization decision, state:
- **marginal cost per user per month** — measured spend ÷ real users
- **which part is fixed vs. variable** — variable-cost products (AI that scales
  with engagement) behave very differently from fixed-cost ones
- **gross margin at each candidate price**, and **users needed to cover the fixed
  floor**

The trap: on a usage-scaled product, a low price means your most engaged users are
your least profitable. Job Odyssey at $9/mo is a 32% margin against $6.11/user
cost-to-serve; at $19/mo it's 68%. Same product, entirely different business.

**If a project's costs are unmeasured, it cannot be priced.** Instrument first.
Saying "we don't know yet" beats picking a number and discovering the unit is
upside-down after launch.

## 5. Free tiers are cliffs, not savings

Every $0 line is $0 because of a ceiling nobody has hit yet. Track headroom, not
just spend: Supabase 500 MB/project, Resend 3k emails/mo, PostHog 1M events/mo,
Sentry 5k errors/mo, GitHub Actions 2,000 min/mo. Flag anything past **70%**.

A hit ceiling is an outage, not a bill. GitHub Actions minutes ran out account-wide
on 2026-07-25 and CI went dark across every repo — red checks meant "never ran",
not "broken". That cost nothing and broke everything.

## 6. Spend where it protects the work

Frugality is not the goal — **integrity per dollar** is. Do not cut:
- model quality on a path where a wrong answer reaches a user
- error tracking, backups, or anything that catches a failure early
- the Vercel Pro base while real users depend on it

Cut instead: work that doesn't need doing (builds that change nothing), tokens
that don't need sending (uncached identical prefixes), and infrastructure nobody
uses (dormant projects, Observability on idle apps). **Cut waste, not quality.**

## 7. Review every cycle

At each PM portfolio rollup, run `/cfo`. Re-pull the vendor numbers, refresh
`src/costModel.js`, and report: run-rate, coverage %, movement since last cycle,
and any project whose cost-per-user is rising faster than its users.
