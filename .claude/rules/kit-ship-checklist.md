<!-- managed by mpgink claude-kit v1 — edit in mpgink-program-manager/Standards/claude-kit, not here -->
# Ship Checklist — every change, every session

No exceptions for urgency — urgency is when this matters most. (Born from the
Phreezer 2026-07-17 outage night: three fixes shipped on theories before
anyone read a log.)

## 1. Diagnose with real data, never gut
- Pull the evidence first: runtime logs, the live endpoint response, DB state,
  error tracker. **Quote the observed error verbatim** in your reasoning and
  the commit/PR body. "Probably X" is not a diagnosis; a log line is.
- If evidence can't be obtained, say so explicitly, label the fix a
  hypothesis, and get Matthew's go-ahead before shipping it.

## 2. Before writing code
- Run the reality check (kit-reality-check.md).
- Sweep the bug class, not the instance.

## 3. Every commit/PR body states
- Files touched + blast radius (what else depends on them)
- Root-cause evidence (the log line, not a theory)
- Verification performed (build check, tests, what will be checked on prod)

## 4. After deploy
- **Verify on production before declaring fixed** — hit the live endpoint,
  report what was observed, not what was intended. Client-rendered behavior
  needs Matthew's eyes: say so and name the specific thing to check.
- Where feasible, every user-reported bug gets a regression guard (test,
  canary step, or contract fixture) so the class can't return silently.
