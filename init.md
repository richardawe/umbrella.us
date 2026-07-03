# Umbrella.us — Initiation Document

**Purpose of this document:** this is the founding brief for Claude Code (and any agents working in this repo) to scaffold, build, and iterate on Umbrella — “AI for adoption attorneys serving LGBTQ people,” modeled on the proven structure of untangle.us (AI for divorce attorneys) but reoriented around adoption law and built for LGBTQ-competent practice from the ground up.

Treat this file as the source of truth for scope during initial build. Update it as decisions change, and keep it in the repo root so future agent sessions can re-read it for context.

-----

## 1. Product summary

**Umbrella** is a legal workflow tool for adoption attorneys who represent LGBTQ prospective parents. It does two things:

1. **Intake & path matching** — When a firm takes on a new client, Umbrella runs a structured intake conversation, identifies the right adoption pathway (step-parent/second-parent, foster-to-adopt, private domestic infant adoption, agency adoption, or international), and flags state-specific and LGBTQ-specific issues early (e.g., second-parent adoption necessity even with marriage, surrogacy-then-adoption sequencing, home study agency friendliness, birth certificate correction needs).
1. **Document collection through finalization** — Once a path is selected, Umbrella manages the ongoing home-study and court-filing document checklist: chasing references, background checks, financial disclosures, medical clearances, and required forms; explaining each request to the client in plain language; answering routine questions; and keeping the file moving until the matter is ready for attorney review and filing.

Umbrella is **not a law firm** and does **not provide legal advice**. It is workflow software supervised by the retaining attorney, the same posture Untangle takes for divorce.

Launch state: **California**. Architecture must support adding additional states later without a rewrite (see §6, State Config Layer).

-----

## 2. Why this matters (positioning, not to be watered down)

LGBTQ prospective parents face adoption friction straight couples don’t:

- Some agencies and home-study providers are still unwelcoming or slow-walk LGBTQ clients.
- Even in marriage-equality states, **second-parent/step-parent adoption remains legally advisable** for non-biological or non-gestational parents, because marriage alone doesn’t guarantee full parentage recognition in every state if the family later moves or a legal challenge arises.
- Surrogacy and known-donor arrangements often require a parentage judgment *before or alongside* adoption, and clients don’t know the sequencing.
- Trans and nonbinary clients may need extra care around name/gender marker consistency across background checks, home study paperwork, and birth certificates.
- Paralegal capacity is scarce in family law generally (per Untangle’s own positioning) — this is worse in a niche practice area with fewer specialized staff.

Umbrella’s job is to remove the chasing and the generic-checklist mismatch, so attorneys spend their time on strategy and the client feels guided by someone who actually gets it — not routed through paperwork built for a straight married couple’s home study.

-----

## 3. Site structure (mirrors untangle.us, adapted)

Build a marketing/product site with this page architecture. Reuse Untangle’s information architecture almost exactly — it converts and it’s a known-good pattern — but adapt every line of copy to adoption + LGBTQ context. Do not reuse Untangle’s actual copy verbatim; write original copy in the same voice and rhythm.

### Homepage (`/`)

- **Header:** Logo/wordmark (“Umbrella”), `Login`, `Sign up` nav links.
- **Hero:** Full-bleed hero image (warm, real-feeling — not stock-y rainbow iconography; think a family moment, hands, a nursery, a courthouse hallway). Headline pattern: *“AI for adoption attorneys”* / subhead three-liner, e.g. “Match every family to the right path. / Keep home studies moving. / Get LGBTQ clients to finalization faster.” Primary CTA: `Schedule a demo`. Secondary CTA: `Sign up`.
- **Testimonial pull-quote** near hero (placeholder attorney name/title until real testimonials exist — mark clearly as `PLACEHOLDER — replace before launch`).
- **How it works — 5 steps** (icon + heading + one-line description each), following Untangle’s five-beat structure but adoption-specific:
1. Replace intake scramble → structured intake identifies the right adoption pathway and flags LGBTQ-specific legal issues immediately.
1. Match the path → step-parent/second-parent, foster-to-adopt, private domestic, agency, or international, with the reasoning shown to the attorney.
1. Stop repetitive client chasing → plain-language explanations of home study requirements, reminders, and routine Q&A, looping until the client responds.
1. Clean up the file → references, background checks, financials, and medical forms land in one matter workspace before the team reviews.
1. Protect review time & keep cases moving → attorneys spend time on substance and court prep, not status updates.
- **Second CTA band:** “Book a demo → Launch the first case → Scale from there” three-step secondary flow, same shape as Untangle’s mid-page repeat.
- **Per-case pricing band:** Flat per-case fee, prominent, with both CTAs. (See §5 for how to source the number — do not invent a real price point; use a clearly marked placeholder.)
- **Pain points list** (4 items, icon + bold lead-in + 2-3 sentences), adoption/LGBTQ-specific, e.g.:
  - **Path confusion:** generic adoption intake doesn’t ask the questions that matter for LGBTQ families — Umbrella does.
  - **Home study friction:** flags agency/provider friendliness and keeps documentation moving even when the process is slower than it should be.
  - **Paralegal shortage:** same framing as Untangle — specialized family law support is hard to hire and keep.
  - **Client anxiety:** adoption is emotionally loaded for any parent, and LGBTQ clients often carry extra fear about being treated fairly — Umbrella keeps them informed in plain language, 24/7.
- **FAQ accordion**, minimum questions:
1. Who is Umbrella built for?
1. What does Umbrella’s AI adoption assistant do with clients?
1. Does Umbrella replace attorneys?
1. How much does Umbrella cost?
1. Does Umbrella work for surrogacy and known-donor cases, or only agency/foster adoption?
1. Is Umbrella only for same-sex couples, or all LGBTQ family structures (single parents, polyamorous co-parents where legally recognized, trans parents, etc.)?
- **Final CTA band** with hero-style closing image.
- **Footer:**
  - *Resources* column: California-specific guides, mirroring Untangle’s `/ct-divorce-guides` pattern but for adoption, e.g. `/how-to/adopt-in-ca`, `/ca-adoption-guides/second-parent-adoption-california`, `/ca-adoption-guides/how-to-fill-out-adopt-200`, `/ca-adoption-guides/foster-to-adopt-california`, link to `/ca-adoption-guides` index and `/calculators` (if a cost calculator makes sense — see open question in §8).
  - *More info* column: About, Schedule demo, Sign up, Login, Terms of service, Privacy policy.
  - *Official resources* column: link out to real CA authorities — CA Courts adoption forms (`courts.ca.gov`), CA Family Code adoption provisions, CA Department of Social Services adoption resources, CA case law search. **Agents: verify these URLs are live and correctly targeted before committing them** — do not guess a URL.
  - Legal disclaimer (see §7 — this is non-negotiable, adapt Untangle’s language, don’t soften it).
  - Social links (placeholder until real accounts exist).
  - Copyright line: `© 2026 Umbrella Legal, Inc. All rights reserved.` — placeholder entity name, flag for real legal entity name before launch.

### Other required routes (stub pages are fine for v0, but scaffold them)

- `/sign-in`, `/firm/sign-up` — auth pages (stub UI, wire up real auth in a later milestone; see §6).
- `/book` — demo scheduling (stub with a simple form or embed placeholder; do not fake a real calendar integration).
- `/about`
- `/terms`, `/privacy` — placeholder legal text clearly marked `NOT FINAL — attorney review required before launch`.
- `/ca-adoption-guides` index + a small number of real, well-researched starter guides (see §8 open question on content depth).

-----

## 4. Product application (behind the marketing site)

This is the actual workflow tool, analogous to what a client sees after `Sign up`. Scaffold the shape even if v0 functionality is thin:

- **Firm/attorney dashboard:** list of matters, status per matter, outstanding items count.
- **New matter intake flow:** structured Q&A (attorney or client-facing) that:
  - Captures family structure, relationship to child, marital status, state of residence, prior legal steps taken (e.g., surrogacy agreement, existing parentage judgment).
  - Runs path-matching logic against a rules table (see §6, Path Matching Engine) and returns a recommended pathway **with visible reasoning**, not a black-box answer — attorneys need to see and override the “why.”
- **Matter workspace:** per-matter document checklist (state-specific + path-specific), upload area, reference-contact tracker, reminder/nudge log, plain-language explanation shown per requested item.
- **Client-facing portal view:** simplified view of the same matter — what’s needed, what’s done, plain-language explanations, a place to ask routine questions.
- **AI assistant surface:** chat-style assistant scoped to the matter, answering client questions in plain language and explaining document requests — same posture as Untangle’s “AI divorce assistant,” renamed for this product (working name: **Umbrella Adoption Assistant** — open to a better name, flag in README).

-----

## 5. Pricing

Untangle uses flat per-case pricing ($350–$495/case depending on page section, notably **inconsistent on their own site** — the hero footer says $495 and the pricing band says $350, worth noting as something *not* to replicate). Umbrella should:

- Use a single flat per-case price, consistent everywhere.
- Do not invent a specific number. Use `$[PRICE]/case` as a placeholder token searchable across the codebase, and put a `PRICING.md` note in the repo flagging that a real number needs business-side sign-off before launch (adoption cases likely run longer than divorce discovery, so the per-case economics may differ meaningfully from Untangle’s number).

-----

## 6. Technical architecture

**Stack:** Next.js + TypeScript, matching Untangle’s apparent stack — **built and deployed as a fully static site via Next.js static export (`output: 'export'`), served from GitHub Pages.** This is a firm constraint, not a default: no server components that require a Node runtime, no API routes, no server-side rendering, no middleware, no image optimization API. Every page must be pre-renderable at build time to static HTML/CSS/JS.

- **Framework:** Next.js (App Router), TypeScript throughout, `next.config` set to `output: 'export'`. Use `basePath`/`assetPrefix` correctly for the repo’s GitHub Pages path if this deploys to a project page rather than a custom domain (e.g. `username.github.io/umbrella` vs. a custom `umbrella.us` domain via `CNAME`) — confirm which before assuming root path.
- **Styling:** Tailwind CSS. Consult `/mnt/skills/public/frontend-design/SKILL.md` before building any UI — do not ship default/templated-looking Tailwind components. This product needs to feel warm and trustworthy, not like a generic SaaS template.
- **Component structure:** shared marketing components (Hero, HowItWorksStep, PainPointCard, FAQAccordion, PricingBand, Footer) separate from product-app components (Dashboard, MatterWorkspace, IntakeFlow, ClientPortal).
- **State config layer:** Do not hardcode “California” logic inline throughout the app. Create a `states/` config directory (e.g. `states/ca.ts`) holding: document checklist templates, form names/links, statute citations, agency/resource links, and path-matching rule adjustments specific to that state. This is the seam that lets a future agent add `states/ny.ts` etc. without touching core logic.
- **Path matching engine:** implement as an explicit rules module (not an LLM call for the core legal-pathway decision) — e.g. `lib/path-matching.ts` — that takes structured intake answers and returns a recommended path + human-readable reasoning trace. An LLM (Claude, via API) can be used for the conversational intake layer and for plain-language explanation generation, but the actual pathway determination should be deterministic and auditable, given the legal stakes. Flag this design choice clearly in code comments so it isn’t “simplified away” by a later agent.
- **Auth:** no real backend auth is possible on static GitHub Pages hosting. For v0, build the sign-in/sign-up/dashboard/matter-workspace screens as **UI-only stubs with mock/local data** (e.g. hardcoded demo matter, client-side-only state via React state or `localStorage`, clearly labeled as a demo). Do not attempt to wire real session auth, real user accounts, or real persistence — that requires a server and is out of scope until the site moves off static hosting. Flag this limitation prominently in the README.
- **Data:** no real database. Use static JSON fixtures or in-memory/client-side state for any “matter” or “document checklist” data shown in the product-app screens. Everything resets on refresh unless explicitly built with `localStorage` for demo persistence — mark clearly as non-production.
- **AI assistant:** a truly interactive AI assistant needs a backend to call the Anthropic API (an API key cannot be safely called from a static, client-only site). For v0 on static hosting, either (a) build the assistant UI as a scripted/mocked conversation demonstrating the intended experience, clearly labeled as a demo, or (b) omit the live assistant from v0 and document it as a future milestone requiring a hosting change (e.g. a small serverless function or a move off pure GitHub Pages). Do not embed a real Anthropic API key in client-side code under any circumstances — this would leak the key publicly. Treat “wire up the real AI assistant” as a deferred milestone, not a v0 deliverable.

-----

## 7. Legal & compliance guardrails (do not soften these)

- Every page footer must carry a disclaimer in the spirit of Untangle’s: *Umbrella provides legal workflow software for adoption attorneys and does not provide legal advice or legal services. Umbrella is not a law firm. Attorneys are responsible for supervising use of Umbrella, reviewing AI-assisted outputs, and exercising professional judgment before relying on or sharing them.* Adapt wording but keep every substantive protection.
- The AI assistant’s system prompt (wherever implemented) must never phrase output as legal advice, must never tell a client whether a given path is legally sufficient for their situation without attorney sign-off language, and must handle LGBTQ-specific sensitivities (e.g., a client’s gender marker, chosen name, or family structure) with care and without assumptions.
- Do not fabricate real attorney testimonials, real client logos, or real statistics. Use clearly marked placeholders (`PLACEHOLDER —`) everywhere real content/legal review is pending.
- Do not invent specific statutory citations, form numbers, or court procedures for California without verifying them via web search against an authoritative source (California Courts, CA Department of Social Services, CA Family Code). If an agent can’t verify a specific legal detail confidently, it should leave a `TODO: verify against CA authority` comment rather than guess — inaccurate legal-adjacent content here is a real-world harm risk, not just a code-quality issue.

-----

## 8. Open questions for the founder before/while building (agents: flag these, don’t silently resolve them)

1. **Real pricing number** — see §5.
1. **Content depth for CA adoption guides** — Untangle has a deep bench of CT-specific guides and two calculators (child support, alimony). Does Umbrella need equivalent depth at launch, or is a smaller starter set (3–5 guides) enough for v0? Recommend starting smaller given the higher legal-accuracy bar per guide.
1. **Product name for the AI assistant** — “Umbrella Adoption Assistant” is a placeholder; confirm or replace.
1. **Real testimonials/logos** — none exist yet; site should launch with either honest placeholder styling or none at all rather than fake quotes.
1. **Scope of “LGBTQ family structures” covered** — confirm whether the product should explicitly support single LGBTQ parents, polyamorous/multi-parent households (where CA law allows for more than two legal parents in limited circumstances), and trans/nonbinary parents’ documentation needs, so the intake flow and state config are built broad enough from day one.
1. **Auth/payments/live AI provider, and when to move off static hosting** — static GitHub Pages hosting means real auth, real data persistence, and a live AI assistant are all deferred by necessity (§6). Decide when/whether to move to a host that supports a backend (e.g. Vercel, or GitHub Pages + a small separate serverless API) so these become real rather than demo stubs.

-----

## 9. Definition of done for v0

- [ ] Marketing site fully built per §3, deployed and viewable, all copy original (not copied from Untangle) and all placeholder content clearly marked.
- [ ] Product app shell built per §4 with working navigation between dashboard → intake → matter workspace → client portal, using mock/local data.
- [ ] State config layer (§6) implemented with `states/ca.ts` populated with real, verified California adoption resources, forms, and statute references.
- [ ] Path-matching engine implemented as an explicit, auditable rules module with at least the five core pathways from §1 covered.
- [ ] Legal disclaimer present on every page footer.
- [ ] `PRICING.md` and README documenting all open questions from §8.
- [ ] Code lives on the GitHub repo’s default branch; static export builds cleanly (`output: 'export'`) with no server-dependent features; a GitHub Actions workflow (or equivalent) builds and publishes the export to GitHub Pages.
- [ ] README explains how to run locally, how the static export/deploy works, and clearly lists what’s a real static feature vs. a mocked/demo stub (auth, data, AI assistant) pending a future non-static hosting decision.

-----

## 10. Instructions to the building agent

1. Read this file fully before writing code.
1. Check `/mnt/skills/public/frontend-design/SKILL.md` before building any UI component.
1. Web-search to verify any California-specific legal fact (form names, agency names, statute sections, court links) before including it — do not rely on training data for jurisdiction-specific legal details, since these change and errors here are higher-stakes than typical copy.
1. Keep this document updated as decisions in §8 get resolved — treat it as living project memory, not a one-time brief.
1. Commit early and often with clear messages; push to the GitHub repo. Set up a GitHub Actions workflow that builds the Next.js static export and publishes it to GitHub Pages (either the `gh-pages` branch or the Pages “deploy from branch/Actions” mechanism — check the repo’s current Pages settings before assuming which). Verify the exported site actually loads correctly at its Pages URL, including asset paths (a common static-export bug), before considering a milestone done.
1. Flag anything that felt like it required inventing a legal fact, a real vendor, or a real price — surface it instead of guessing.
