# The Solo Operating Standard

**How one person and an AI run five live products without dropping any of them.**

*A free field guide from mpgink — about ten minutes to read.*

---

I'm Matthew. mpgink is a creative collective founded by one person. The name is the
operating system: **mission · passion · gratitude**.

In practice that means I design, build, and ship real products for real users — a Phish
companion, an AI-powered job-search platform, a daily learning app, reading apps for my
kids — working with AI as a build partner and running the whole thing like a full product
org. Built lo-fi. Shipped fast. Iterated in public.

People ask how that's possible without a team. The honest answer isn't a productivity
system or a tool stack. It's a **written standard** — one rulebook, shared across every
project, that an AI can follow as literally as I can.

Here's the part nobody tells you: **every rule in it exists because something broke
first.** None of this was designed up front. Each one is a scar with a date on it.

That's what this guide is. Six rules, the failure that caused each one, and how to run it
yourself. Steal any of it.

---

## 01 — One rulebook, or you don't have a standard

The failure is boring: you fix something in one project, learn something real, and the
other four projects never hear about it. Six weeks later the identical bug bites in a
repo you weren't looking at.

Worse, when you work with AI, "how we do things here" lives in a conversation that ends.
Next session starts from nothing, confidently.

**The rule:** the standard lives in version-controlled files inside every repo — not in
your head, not in a chat history. One canonical copy, synced outward. When a rule changes,
it changes everywhere in one commit.

**How to run it:** create a `rules/` folder in your main project. One file per rule, named
for the thing it prevents. Copy it to every other project. When you learn something the
hard way, write the rule *that same session* — including the incident and the date. A rule
without its origin story gets deleted by a future you who doesn't know what it cost.

**The catch I hit:** for one month, my rules were perfect and lived only on a feature
branch. Fourteen repos, never merged to main. Every session dutifully read a standard that
production had never seen. Syncing isn't done when you push — it's done when it's *merged*
and you've checked.

---

## 02 — Prove it exists before you touch it

An AI build partner will confidently reference a function that doesn't exist, a database
column that was never created, an endpoint nobody registered. It's not lying; it's
pattern-matching from a thousand codebases that *did* have those things.

Humans do it too. You just do it slower.

**The rule — the reality check, before any change:**

1. Prove the file exists. List the directory. Not from memory.
2. Prove every function, component, and endpoint you reference exists. Search the code.
3. Prove every database column you write to is really in the schema.
4. Prove every new route is actually registered wherever your framework requires it — a
   missing entry is a silent 404 in production, not an error at build time.
5. **If you can't verify it, stop and say so.** If you can't prove it exists, you don't
   touch it.

**How to run it:** make this the literal first step of any task. With an AI partner, put
it in the instructions file so it runs unprompted. The five seconds it takes to list a
directory is the cheapest insurance in software.

---

## 03 — "Done" is a claim about verified reality

This is the expensive one. I've had sessions hand me work reported as finished that was
not finished — a failure called "just a caching thing" that wasn't, and an unverified
change pushed straight to main behind it. The cost lands entirely on the person who has
to discover it later. That's me. It might be your client.

**The rule:** *done*, *fixed*, *working*, and *shipped* are claims about verified reality.
State the evidence alongside the claim, every time.

- **Fixed a bug?** Show the reproduction now failing to reproduce. A green build is not
  proof the bug is fixed.
- **Shipped a feature?** Name the live surface you watched do the thing.
- **Can't verify it yourself** — needs a login, needs production data? Then say exactly
  that: *"built, not verified; here's the one thing to check."* Never round unverified up
  to done.

**Two corollaries I learned separately, and painfully:**

**A convenient cause is not a diagnosis.** "It's a cache thing" is a *hypothesis* until
the evidence says so. Pull the real signal — the runtime log, the actual HTTP status, the
error text — and quote it before you name a cause. A "won't load" report gets the status
code first: a 200 means the server is fine and you're chasing the wrong layer entirely.

**Build-clean is not runtime-clean.** A readability tweak once left a variable referenced
in one place and deleted in another. Valid syntax. Clean build. 200 response. It threw the
instant anyone clicked. If a change is interactive, *execute the path* before calling it
done — load the page, click the thing. "It compiled" is not "I saw it work."

**How to run it:** end every work session with a written report: what shipped, what the
evidence was, what you did NOT do. The last part is the one that builds trust. Partial is
fine — call it partial.

---

## 04 — The same thing must not live in two places

One of my products, one afternoon, had **eight** instances of the same structural mistake.
Not logic errors — duplication. The same rule implemented twice, drifting quietly apart.

What it looked like from the user's side: a résumé scored 60–64 rendered **amber in one
panel and red in another**, because four separate copies of the same grading ladder had
drifted. A reordered bullet got painted as a total rewrite, because two files each
implemented "what changed" their own way. And the worst one: **the résumé a user could
edit was not the résumé they were scored on.** Two copies of the same record, no sync.

Every one of those was invisible until a real person hit it. Several had been wrong for
weeks.

**The rule:** before you write a second implementation of anything a user sees, stop and
ask which of two things you have.

- **The same logic in two places** → collapse it to one. A copy is a fork waiting to
  happen. "They're identical today" isn't a defense — that's the state every drift starts
  from.
- **The same value on two surfaces** → compute it once and carry it. But a carried value
  is only honest while its inputs are unchanged, so it needs provenance (what it came from,
  and when) and a staleness check at render.

**How to find yours right now:** grep your codebase for a threshold number (`>= 75`), and
for any comment containing the words **"keep in sync"** or **"mirrors"**. That comment is
a promise no code is keeping. In my case it marked the exact spot where a user's data had
silently forked in two.

**And test the wiring, not just the function.** A unit test on the shared helper won't
catch a caller that quietly stopped using it. Then prove the guard works by reintroducing
the bug and watching the test go red. A guard you've never seen fail is a guard you're
guessing about.

---

## 05 — Unmeasured is worse than expensive

I audited my hosting bill and felt responsible. Then I looked at a second vendor and found
the real number was substantially higher — the AI spend on a single product was nearly half
of everything I'd just congratulated myself on. Of six projects making AI calls, exactly
one was logging what it spent.

A large cost you can see is a decision. A small cost you can't see is a liability, because
it grows without anyone choosing it.

**The rule:** never report an unmeasured cost as zero. It's **"no number"** — never $0.
Rounding an unknown down to zero is how a bill becomes a surprise. Give every figure a
confidence label: *measured* (from a bill), *estimated* (pricing × observed volume), or
*unmeasured* (we know it bills; we don't know what).

**Three things that follow:**

- **Log every paid API call at the call site, in the same commit that adds the call.** Not
  in a later hardening pass — that pass is exactly how six unlogged endpoints made an admin
  dashboard undercount its own invoice.
- **Watch the quiet ones.** Text generation is obvious. Speech isn't: text-to-speech bills
  per character, so a read-aloud feature can outspend a chat feature by an order of
  magnitude while looking harmless in the diff.
- **Free tiers are cliffs, not savings.** Every $0 line is $0 because of a ceiling nobody
  has hit yet. Track headroom, not just spend — my CI minutes ran out account-wide one
  morning and every project's checks went dark at once. Red checks meant "never ran," not
  "broken." That cost nothing and broke everything.

**And the reason it matters even if you're not selling yet:** you cannot price a product
whose cost to serve you don't know. On anything usage-based, a low price means your most
engaged users are your least profitable — and you find that out after launch.

---

## 06 — The rhythm: how a session starts and how it ends

Working with AI turns your repository into the memory. Which means the failure mode isn't
forgetting — it's **confidently remembering wrong**.

I had a status file claiming a catalog held 126 items on a day it actually held 234. The
correct number was sitting in the code the whole time. The file wasn't old — it had been
updated that same day. It was just no longer true.

**The rule:**

**Start:** read the standard, then the current-state snapshot, then the latest log — and
then *reconcile all of it against your commit history*. If the records and the commits
disagree, **the commits win.** Flag the gap; don't paper over it. Never rebuild context
from memory or from a previous conversation. The repo is the persistence layer.

**End:** every session exits through the same door — a log entry (what shipped, what's
open, what's next), a regenerated state snapshot, an updated backlog, a clean build check,
then commit and push. A session that never ends never wraps. Don't be that session.

**Two things I had to learn about the checks themselves:**

- **Measure staleness in commits, not days.** If you run several sessions a day, a records
  file can be badly out of date and still be hours old.
- **Freshness isn't truth.** A file being recently touched says nothing about whether
  what's in it is *right*. So the check compares the claim to the code it describes — the
  number in the doc against the number in the source.

**And keep sessions bounded.** One session per arc — an evening, a feature push, a
bug-hunt. Long-running sessions accumulate context that isn't in the repo, and that context
dies with them. If a fresh session comes up confused, your records drifted. That's a
finding to fix, not an inconvenience to work around.

---

## Where to start

Don't adopt six rules on a Monday. Pick the one whose failure you've already had:

- Shipped a "fix" you never actually confirmed? → **03**
- Two screens showing different numbers for the same thing? → **04**
- No idea what your AI usage costs this month? → **05**
- Come back to a project and can't tell what's true anymore? → **06**

Write that one rule down today, with the incident and the date attached. Put it where your
tools will read it. Add the next one the next time something breaks.

That's the whole method. The standard isn't something you design in advance — it's the
accumulated record of everything that's already gone wrong, written down before you forget
what it cost.

---

**One ask, and it's a real one:** hit reply and tell me what you're building — or what
you're stuck on. I read and answer every reply, and what comes back decides what I write
next.

— Matthew

mpgink · a creative collective — mission · passion · gratitude
mpgink.com · 13 · 16 · 7
