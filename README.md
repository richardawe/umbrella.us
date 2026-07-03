# Umbrella

AI for adoption attorneys serving LGBTQ prospective parents. This repo
holds the marketing site and a v0 product-app shell, launching with
California as the only supported state. See `init.md` for the full
founding brief — it's kept up to date as decisions land, treat it as
living project memory, not a one-time spec.

## Running locally

```bash
npm install
npm run dev
```

Because the site deploys to a GitHub Pages **project subpath** (see
below), `basePath` is set in `next.config.ts` — the dev server serves
everything under that same subpath. Open
**http://localhost:3000/umbrella.us/**, not the bare root. `npm run
build` produces the static export in `out/` (see below); `npm run lint`
runs ESLint.

## Static export & deployment

Umbrella ships as a fully static site — no server runtime, no API routes,
no ISR. This is a firm architectural constraint (see `init.md` §6), not a
default:

- `next.config.ts` sets `output: "export"`, `trailingSlash: true`, and
  `basePath`/`assetPrefix` of `/umbrella.us`.
- `npm run build` writes static HTML/CSS/JS to `out/`.
- `.github/workflows/deploy.yml` builds on every push to `main` and
  publishes `out/` to GitHub Pages via the official Pages Actions
  (`actions/upload-pages-artifact` + `actions/deploy-pages`).
- The live site is confirmed to be
  **https://richardawe.github.io/umbrella.us/** — a GitHub Pages
  **project subpath**, not a custom domain. `basePath`/`assetPrefix` are
  set to match. There is **no** `public/CNAME` file — don't add one
  unless this repo is actually pointed at a custom domain in Settings →
  Pages, in which case `basePath`/`assetPrefix` would need to come back
  out instead.
- Every internal link/navigation in the app goes through `next/link` or
  `useRouter()` (never a raw `<a href="/...">` or `window.location`),
  because only Next's own router rewrites hrefs with `basePath`
  automatically — a raw absolute path silently bypasses it and 404s
  under the subpath. Keep it that way when adding new internal links.
- In the repo's Settings → Pages, source should be set to **GitHub
  Actions** (not "Deploy from a branch") for the workflow to take effect.

After any deploy, verify the live Pages URL loads correctly, including
asset paths — a static-export + basePath mismatch (unstyled page, missing
CSS/JS) is exactly the failure this config guards against, and it's easy
to reintroduce by adding a raw internal link that skips `next/link`.

## What's real vs. mocked (read this before assuming a feature works)

This is a v0 build. Per `init.md` §6, real backend features are
deliberately deferred because static GitHub Pages hosting can't run a
server:

| Area | Status |
|---|---|
| Marketing site (all routes under `/`, `/about`, `/terms`, `/privacy`, `/book`, `/ca-adoption-guides/*`) | Real static content. Copy is original; all placeholders are marked `PLACEHOLDER —` or `NOT FINAL —` inline. |
| Path-matching engine (`lib/path-matching.ts`) | Real, deterministic, auditable rules logic — not mocked, but not yet wired to a real client-facing intake outside the demo product app. |
| California state config (`states/ca.ts`) | Real, verified legal facts (Family Code citations, Judicial Council form numbers, CDSS/courts.ca.gov links) as of initial build — see "Legal content maintenance" below. |
| Sign-in / sign-up (`/sign-in`, `/firm/sign-up`) | **UI-only demo.** No real authentication exists. Submitting either form routes you to the demo dashboard with no account created. |
| Dashboard / intake / matter workspace / client portal (`/dashboard`, `/intake`, `/matter`, `/portal`) | **Demo product app.** All data is mock data seeded in `lib/mock-data.ts`, held in `localStorage` (`lib/demo-store.ts`), and resets if you clear site data or click "Reset demo" in the product nav. Nothing here is persisted server-side — there is no server. |
| AI assistant (client portal chat) | **Scripted demo**, not a live model call. A real Anthropic-API-backed assistant needs a backend (an API key can't safely live in a static client-side site) — deferred milestone, see `init.md` §6 and §8.5. |
| `/book` demo scheduling | UI-only; submitting shows a simulated confirmation, no request is sent anywhere. |

## Legal content maintenance

Every California-specific fact in `states/ca.ts` and the `/ca-adoption-guides/*`
pages (Family Code citations, Judicial Council form numbers like ADOPT-200
vs. ADOPT-203, CDSS terminology, self-help URLs) was verified against a
live primary source (`leginfo.legislature.ca.gov`, `selfhelp.courts.ca.gov`,
`cdss.ca.gov`) during initial build — not pulled from model training data.
Statutes, forms, and agency URLs do change. Re-verify these periodically
and before any real launch; `states/ca.ts` has inline `TODO: verify`
comments where a fact could not be confidently confirmed at all.

One specific flag: no official CDSS or California Courts source frames
confirmatory stepparent/second-parent adoption as an LGBTQ-specific or
*Obergefell*-driven recommendation. That rationale (used in the
"Second-parent adoption in California" guide) is standard family-law
practice commentary, not a government statement — it's presented that way
in copy, and should stay that way rather than being attributed to a state
source.

## Open questions (init.md §8) — not silently resolved

1. **Real pricing number** — see `PRICING.md`. Still a placeholder token.
2. **Content depth for CA adoption guides** — shipped with 4 starter
   guides (smaller than Untangle's CT bench), per the recommendation in
   `init.md` §8.2. No cost calculator built for v0 — the footer's
   `/calculators` link mentioned in the brief was deliberately **not**
   built; revisit once/if a calculator is scoped.
3. **Product name for the AI assistant** — shipping as "Umbrella Adoption
   Assistant" (`ASSISTANT_NAME_PLACEHOLDER` in `lib/site-config.ts`), a
   working name only.
4. **Real testimonials/logos** — none exist. The homepage testimonial is
   explicitly marked `PLACEHOLDER — replace before launch`.
5. **Scope of LGBTQ family structures** — intake (`lib/path-matching.ts`)
   currently models relationship-to-child, marital/partnership status,
   and surrogacy/donor conception explicitly. It does **not** yet model
   multi-parent households (California allows more than two legal
   parents in limited circumstances) — flagged as a gap, not silently
   built around. Single LGBTQ parents and trans/nonbinary documentation
   needs are addressed in copy (FAQ, guides) but not yet as separate
   intake branches.
6. **Auth / payments / live AI provider, and when to move off static
   hosting** — all deferred by the static-hosting constraint. See the
   table above for exactly what's mocked.

## Project structure

```
app/                      Marketing routes + product-app routes (App Router)
components/marketing/     Header, Footer, Hero, PricingBand, FAQAccordion, etc.
components/product/       ProductNav, IntakeFlow, MatterWorkspace, ClientPortal, AssistantChat
lib/path-matching.ts       Deterministic path-matching rules engine (not an LLM call — see file header)
lib/mock-data.ts           Demo matters + checklist seed data
lib/demo-store.ts          localStorage-backed demo state (useSyncExternalStore)
lib/site-config.ts         Shared placeholders, nav links, footer links
states/ca.ts               California-specific forms, statutes, agencies, document checklist
states/types.ts            Shared state-config shape — add states/ny.ts etc. against this interface
```
