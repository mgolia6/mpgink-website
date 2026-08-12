#!/usr/bin/env node
/**
 * scripts/check-site.mjs — the build check for a site with no build.
 *
 * WHY THIS EXISTS (2026-08-12)
 * mpgink-website carried `ci: { expected: true }` in the PM dashboard's repo
 * registry and `KIT_BUILD_CHECK_CMD=""` in its own kit config. Both were
 * defensible on their own — there is genuinely nothing to compile — but
 * together they meant the one tier-1 property with no framework also had no
 * check of any kind. Fifteen HTML files, a live signup form, and nothing
 * standing between a bad edit and production.
 *
 * "No build step" is not the same as "nothing can break". What breaks on a
 * static site is links and assets: a renamed image, a moved page, a typo in an
 * href. None of that throws anywhere — it just 404s for a visitor.
 *
 * NO DEPENDENCIES on purpose. This repo has no package.json and should not grow
 * one to run a link check; `node scripts/check-site.mjs` works on a bare runner.
 *
 * WHAT IT DOES NOT DO, stated plainly so nobody mistakes green for more than it
 * is: this does not parse HTML properly, validate against a spec, or check
 * external URLs. It checks that every LOCAL reference resolves on disk, plus a
 * few contracts that have already cost something once.
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SKIP_DIRS = new Set([".git", ".claude", "node_modules", "Logs", "State", "Backlog", "docs"]);

const fail = [], ok = [];
const check = (c, pass, msg) => (c ? ok.push(pass) : fail.push(msg));

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    if (SKIP_DIRS.has(e)) continue;
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (e.endsWith(".html")) out.push(p);
  }
  return out;
}

const pages = walk(ROOT);
check(pages.length >= 10, `${pages.length} HTML pages found`,
  `only ${pages.length} HTML files found — this check is not looking where it thinks it is`);

// ── 1. Every local href/src/poster resolves on disk ─────────────────────────
// The whole failure mode of a static site, in one assertion.
const EXTERNAL = /^(https?:|mailto:|tel:|data:|javascript:|#|\/\/)/i;
let refs = 0;
for (const page of pages) {
  const html = readFileSync(page, "utf8");
  const here = dirname(page);
  for (const m of html.matchAll(/(?:href|src|poster)\s*=\s*["']([^"']+)["']/gi)) {
    const raw = m[1].trim();
    if (!raw || EXTERNAL.test(raw)) continue;
    refs++;
    // Strip the query/hash — signup.html?src=x is a reference to signup.html.
    const target = raw.split(/[?#]/)[0];
    if (!target) continue;
    const abs = target.startsWith("/") ? join(ROOT, target) : resolve(here, target);
    if (!existsSync(abs)) {
      fail.push(`${relative(ROOT, page)} → "${raw}" does not exist (looked for ${relative(ROOT, abs)})`);
    }
  }
}
check(refs > 50, `${refs} local references checked`,
  `only ${refs} local references found — the attribute scan is probably not matching`);

// ── 2. Every page has a title ───────────────────────────────────────────────
// A titleless page is what shows up in a browser tab and a search result as the
// raw URL. Cheap to check, invisible until someone sees it.
for (const page of pages) {
  const html = readFileSync(page, "utf8");
  const t = html.match(/<title>\s*([^<]*?)\s*<\/title>/i);
  if (!t || !t[1]) fail.push(`${relative(ROOT, page)} has no <title>`);
}

// ── 3. THE SIGNUP ATTRIBUTION CONTRACT ──────────────────────────────────────
// Found 2026-08-10: 29 LinkedIn first-comments carried utm_source/utm_campaign
// that NOTHING reads — this site has no analytics of any kind, and signup.html
// parses only `?src=`. Post 05 was switched to `signup.html?src=...` and now
// attributes correctly. That makes `?src=` the single thread holding up every
// piece of signup attribution we have, in one file, with no test behind it.
{
  const signup = join(ROOT, "signup.html");
  if (!existsSync(signup)) {
    fail.push("signup.html is missing — the site's only conversion surface");
  } else {
    const html = readFileSync(signup, "utf8");
    check(/["']src["']/.test(html) && /searchParams|URLSearchParams|location\.search/.test(html),
      "signup.html still reads the ?src= attribution param",
      "signup.html no longer parses ?src= — every LinkedIn link pointing here would " +
      "silently stop attributing, and nothing else on this site records where a signup came from");
  }
}

// ── Report ──────────────────────────────────────────────────────────────────
console.log(`check-site: ${ok.length + fail.length} checks`);
ok.forEach((o) => console.log(`  PASS  ${o}`));
fail.forEach((f) => console.log(`  FAIL  ${f}`));
if (fail.length) { console.log(`\ncheck-site: FAILED (${fail.length})`); process.exit(1); }
console.log("check-site: PASS");
