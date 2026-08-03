<!-- managed by mpgink claude-kit v1 — edit in mpgink-program-manager/Standards/claude-kit, not here -->
# AI Surface Discipline

Every NEW or MODIFIED AI/LLM call site (Anthropic, OpenAI, or the next vendor)
passes this checklist **in the same commit** — not in a later hardening pass.
Born from the 2026-07-30 third-party prompt audit (2 P0s incl. a fabricated
perfect score persisted to a leaderboard, + 8 P1s → closed). Canonical
implementations live in **One Percent** (`one-percent-app/app-next`); the full
skill (this checklist as Part 1 + the recurring-audit procedure as Part 2) is
`one-percent-app/.claude/skills/ai-surface/SKILL.md`. Copy the canonical files —
don't reinvent them.

## The call-site checklist

1. **Auth + fail-closed rate limit** on any route that spends vendor money
   (`authUser`/`authAdmin` + `rateLimit(..., { failClosed: true })`). Fail-open
   is only for zero-spend paths. (canonical: `lib/apiAuth.js`, `lib/rateLimit.js`)
2. **Call-site metering** in the same commit as the call, including probes and
   1-token pings (kit-cost-discipline #2). Streams meter after `finalMessage()`
   in a non-throwing try. (canonical: `lib/aiUsage.js`)
3. **Server-side grounding** — content the prompt presents as truth (lessons,
   sources, user profile) loads server-side (`entryStore`, RLS-scoped
   `userScopedClient`); inline "truth" from the client is REJECTED (400), not
   trusted. If the route fs-reads content, register it wherever the framework
   requires (Next: `outputFileTracingIncludes`) or it returns nothing in prod.
4. **Bound every input** — client arrays/strings get a sanitizer with explicit
   caps before they touch the prompt. Rate limits cap CALLS; sanitizers cap
   tokens-per-call. Both or neither is real.
5. **Untrusted text gets delimiters + a data-not-instructions rule on BOTH
   sides** — wrap third-party/user text in a named block the system prompt
   explicitly references, with the rule that instruction-like content is DATA to
   report, never to obey. A guard describing delimiters the payload lacks is
   worse than none.
6. **Structured output = forced tool_use**, never "respond ONLY with JSON." Real
   JSON Schema (numeric `minimum`/`maximum`, counted things bounded per-request,
   critical fields `required`); read via a truncation-aware helper. The
   regex-strip-JSON.parse pattern is banned — it was the fabricated-score root.
7. **Deterministic tasks run at `temperature: 0`** (scoring, classification,
   pick-and-transform). Chat streams keep the default.
8. **Config from a shared lib** — model id, text extraction, truncation check in
   one module (`lib/aiText.js`), never a string literal in a route.
9. **Every failure path is honest** — unusable output → retry once with headroom
   at temp 0, then an explicit error status the UI renders as a real "this
   failed" state. NEVER synthesize a success value, default score, or empty-200.
   Persisted degraded fallbacks get a `degraded` flag + retry path. Reviewer's
   question (kit-honest-completion §6): *what does this show when the thing it
   reports on didn't happen?* "The same thing" = bug.
10. **The prompt lives in a shared lib module, imported by BOTH the route and the
    eval scripts** — so what's tested is what ships. Add stub + source-contract
    checks (and a live probe if it grades or eats untrusted text) in the same
    commit, then **prove the new guard fails** (reintroduce the bug, watch RED,
    restore — kit-single-source).

**Gate:** the prompt-eval harness must exit 0 before any commit touching prompt
code — and it's enforced by a Stop hook, not the honor system (a documented
pre-commit a session can forget is not a gate).

## The recurring audit ("Prompt Audit")

Per major launch / after a wave of new AI surfaces / quarterly: export a
sha-stamped packet (one command), hand it to an INDEPENDENT session with the
auditor-independence preamble, execute the fix order, and — **fix claims require
a diff artifact (see kit-honest-completion), not a fix log** — have the auditor
re-verify against a diff + harness transcript and issue a closure. These failure
classes live in shared patterns: assume sibling repos have them until an audit
says otherwise; promote fixes upstream into the kit, never as silent local forks.
