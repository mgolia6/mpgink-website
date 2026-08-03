<!-- managed by mpgink claude-kit v2 — edit in mpgink-program-manager/Standards/claude-kit, not here -->
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
- **A "won't load" report gets the HTTP status first, before touching code**
  (One Percent, 2026-07-23). Pull the actual response for the page AND its JS
  chunks. 3xx→SSO means deployment protection; 5xx/404 means server/build; a
  **200 means the server is fine and the fault is client-side** — stop chasing
  the server. On a 200-that-still-fails, reproduce by executing the path and
  read the console error — don't theorize your way to a cause a 10-second
  fetch would have ruled out.

## 2. Before writing code
- Run the reality check (kit-reality-check.md).
- Sweep the bug class, not the instance.
- **Where the toolchain has an undefined-reference lint rule, it's enabled and
  the push is gated on it** (e.g. ESLint `no-undef`). Born from a bug a clean
  build could not catch: a variable removed in one spot but still referenced
  in another is valid syntax, so `npm run build` compiled it silently — it
  only threw at runtime, on interaction, with no React error boundary to
  catch it. A build gate proves the code parses; it says nothing about
  whether every reference in it still resolves. Where this isn't wired yet,
  clear the pre-existing lint debt once so the gate starts green, not red.

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
