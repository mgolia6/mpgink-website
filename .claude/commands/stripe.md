<!-- managed by mpgink claude-kit v3 — edit in mpgink-program-manager/Standards/claude-kit, not here -->
Integrate Stripe into this repo the mpgink way. Payments are money and money is
outward-facing — this skill is deliberately conservative. Read the whole thing
before writing a line of billing code.

**Canonical implementation:** Job Odyssey (`job-search-automation`) — `api/_stripe.js`,
`api/billing.js`, `api/stripe-webhook.js`, `api/_entitlements.js`. It is complete,
signature-verified, and inert-until-keyed. Copy its shape; don't reinvent it.

---

## 0. First ask: does this repo even take money? (the gate)

Most of the portfolio should NOT have Stripe. Do not add it if any is true:
- Commerce is deliberately off-platform (Etsy/Printify for merch, an outbound
  donation link) and there's no gap to close — adding Stripe duplicates a working
  fulfillment path.
- Single-user / family / kids app — no one to charge (metta, holiday-court,
  arlo-learns, mpgink-creative, the PM dashboard).
- Static site with no backend to host a webhook (mpgink-website is Pages-only).
- Pre-launch skeleton with no accounts/DB yet — payments are premature.

If none of those hold and there's a real product-for-sale with real users, proceed.
State the **model** explicitly first — it decides the Stripe objects:
- **Subscription** — recurring tier. Checkout `mode:'subscription'` + Billing Portal
  + `customer.subscription.*` webhooks. (Job Odyssey Voyager, One Percent bump tier.)
- **One-time / merch** — Checkout `mode:'payment'`. If it's a *physical* good, Stripe
  only collects money — you still need a fulfillment path (Printify/etc.), shipping,
  and tax. That's a bigger project than a payment button; scope it separately.
- **Donation / tip** — one-time `mode:'payment'`, `submit_type:'donate'`, often a
  custom/`pay-what-you-want` amount. No entitlement to grant.

---

## 1. The pattern (non-negotiable architecture)

Three responsibilities, never blurred:

1. **A thin Stripe client** (`_stripe.js` / `lib/stripe.js`) — raw `fetch` to
   `https://api.stripe.com/v1/…`, form-urlencoded body, `Stripe-Version` header, **NO
   SDK** (matches the portfolio's raw-fetch convention and keeps deps at zero). It
   also owns webhook signature verification (HMAC-SHA256 over `"<t>.<rawBody>"`,
   timing-safe compare, reject timestamps >5 min old to blunt replay).
2. **A customer-facing billing route** — `status` / `checkout` / `portal`. Auth-gated,
   rate-limited. **This route NEVER grants paid access** — it only starts sessions.
3. **A webhook route** — the ONE place that flips entitlement. Verify signature over
   the EXACT raw bytes (disable the body parser), then sync a single source-of-truth
   column. On a bad signature: reject (400). On an apply error: 500 so Stripe retries.

**Inert-until-keyed.** Everything gates on `STRIPE_SECRET_KEY`. With no key: `status`
returns `configured:false`, `checkout`/`portal` return a "billing opens at launch"
message, the webhook 200-no-ops (so Stripe doesn't retry a dormant endpoint). This
lets the whole surface ship to production and stay dark until you drop keys in.

**One source of truth for entitlement.** A single column (`profiles.plan`, or a
`subscriptions` row) is what every gate reads. The webhook writes it; the app reads
it; the client is NEVER trusted for paid state. Map Stripe status → access
conservatively: only `active` or `trialing` is paid; `past_due`/`unpaid`/`canceled`/
`incomplete` are NOT.

**Bind the customer early.** Create + stash `stripe_customer_id` on the profile
BEFORE checkout, so subscription webhooks can match by customer regardless of event
arrival order. On `checkout.session.completed`, prefer `client_reference_id`/metadata
`user_id` for the first bind.

---

## 2. Env vars (all in the host dashboard — never commit values)

```
STRIPE_SECRET_KEY            sk_test_… then sk_live_…
STRIPE_WEBHOOK_SECRET        whsec_…            (from the webhook endpoint you create)
STRIPE_PRICE_<NAME>          price_…            (one per recurring/one-time price)
STRIPE_PRICE_<NAME>_ANNUAL   price_…            (optional annual variant)
```
Test-mode keys FIRST, always. Prove a full checkout→webhook→entitlement flip in test
before a single live key exists.

---

## 3. Stack A — Vercel serverless (CommonJS `api/*.js`)

The Job Odyssey stack. Copy `api/_stripe.js` verbatim. Then:
- `api/billing.js` — `module.exports = handler`; actions status/checkout/portal;
  `ensureCustomer()`; rate-limit the money paths.
- `api/stripe-webhook.js` — `readRaw(req)` promise, verify, `applyEvent(event)` switch,
  and **`module.exports.config = { api: { bodyParser: false } }`**.
- **Route registration:** if the repo uses an explicit `vercel.json` route table or a
  catch-all rewrite, add entries for both routes BEFORE the catch-all — a missing entry
  is a silent 404. (File-based `functions:{"api/**/*.js"}` auto-routes; no entry needed.)
- A single-Express-function repo (Goose pattern) can't easily give the webhook a raw
  body — give the webhook its OWN dedicated function outside the Express body parser.

## 4. Stack B — Next.js App Router (`app/api/**/route.js`)

The One Percent stack. Same three responsibilities, App-Router mechanics:
- Routes are `app/api/billing/checkout/route.js`, `…/portal/route.js`,
  `app/api/stripe/webhook/route.js` exporting `POST`.
- **Raw body for the webhook:** read `await req.text()` (NOT `req.json()`) and verify
  over that exact string. Set `export const runtime = 'nodejs'` and
  `export const dynamic = 'force-dynamic'`; do NOT parse the body before verifying.
- Entitlement lives in a server helper (e.g. `lib/entitlement.js`) that reads the
  `subscriptions`/plan row; replace any hard-coded `canBump = true`-style stubs with a
  real check. Keep a server-authoritative check even if the client also hides UI.

---

## 5. Non-negotiables (portfolio rules that apply here)

- **New endpoints ship authed + capped by default** (kit-validation-discipline #5).
  Every money route: auth check + rate limit at build time, not a later pass.
- **Webhook signature is the one guard you never weaken.** No unverified event ever
  touches the DB.
- **Idempotency:** webhook handlers must tolerate replays/duplicates (Stripe delivers
  at-least-once) — writing "set plan = X for this customer" is naturally idempotent;
  keep it that way.
- **Reality check before coding:** prove the DB column/table you write exists (or ship
  the `CREATE TABLE IF NOT EXISTS` / migration in the same change), and prove the route
  is registered.
- **Admin-gate new paid surfaces by default** where the repo's push protocol says so
  (One Percent: build behind `is_admin` / `paywall_enabled=false`, verify in prod, then
  un-gate on Matthew's call).
- **Build check clean before commit.** Test-mode first; verify on production after.

---

## 6. Activation (Matthew's hands, not the agent's)

Once code is merged and dormant, the owner activates in the Stripe Dashboard:
1. In **Test mode**: create Product(s) + Price(s), copy each `price_…` → `STRIPE_PRICE_*`.
2. **Developers → API keys** → copy `sk_test_…` → `STRIPE_SECRET_KEY`.
3. **Developers → Webhooks → Add endpoint** → `https://<prod-domain>/api/stripe-webhook`
   (or `/api/stripe/webhook` on App Router), subscribe to `checkout.session.completed`
   + `customer.subscription.created/updated/deleted` (+ `payment_intent.succeeded` for
   one-time/donation) → copy signing secret `whsec_…` → `STRIPE_WEBHOOK_SECRET`.
4. Redeploy so the env vars load. **Smoke test in test mode:** run a checkout with card
   `4242 4242 4242 4242`, confirm the webhook 200s and the entitlement column flips.
5. Only then swap to **live** keys + a live webhook endpoint, and repeat the smoke test
   with a real small charge you refund.

**Stripe MCP connector (optional, owner-enabled):** claude.ai → Connectors → Stripe →
connect with a **restricted** API key (test first). It lets an agent create
products/prices/customers directly instead of you clicking the dashboard. It does NOT
replace the in-app code above — it's a management convenience. Never paste a live secret
key into chat; use the connector's OAuth/restricted-key flow.

---

## 7. Definition of done

- [ ] Model stated; repo passed the §0 gate.
- [ ] `_stripe`/billing/webhook present; webhook verifies signature over raw body.
- [ ] Entitlement reads ONE server-side source of truth; no client-trusted paid state.
- [ ] Routes registered (vercel.json / rewrite) — verified, not assumed.
- [ ] New routes authed + rate-limited; new surfaces admin-gated per push protocol.
- [ ] Ships inert (no keys = no errors). Build check clean.
- [ ] Activation runbook handed to Matthew; test-mode smoke test defined.
