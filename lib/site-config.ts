// Shared placeholders and nav/footer data for the marketing site.
// PRICE_PLACEHOLDER is a deliberately searchable token — see PRICING.md.
// Do not replace with a real number without business sign-off.
export const PRICE_PLACEHOLDER = "$[PRICE]/case";

export const ENTITY_NAME_PLACEHOLDER = "Umbrella Legal, Inc.";

export const ASSISTANT_NAME_PLACEHOLDER = "Umbrella Adoption Assistant";

export const LEGAL_DISCLAIMER =
  "Umbrella provides legal workflow software for adoption attorneys and does not provide legal advice or legal services. Umbrella is not a law firm. Attorneys are responsible for supervising use of Umbrella, reviewing AI-assisted outputs, and exercising professional judgment before relying on or sharing them with clients.";

export const MAIN_NAV = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/ca-adoption-guides", label: "CA guides" },
  { href: "/about", label: "About" },
];

export const RESOURCES_LINKS = [
  { href: "/ca-adoption-guides", label: "CA adoption guides" },
  {
    href: "/ca-adoption-guides/how-to-adopt-in-california",
    label: "How adoption works in California",
  },
  {
    href: "/ca-adoption-guides/second-parent-adoption-california",
    label: "Second-parent adoption in California",
  },
  {
    href: "/ca-adoption-guides/how-to-fill-out-adopt-200",
    label: "How to fill out ADOPT-200",
  },
  {
    href: "/ca-adoption-guides/foster-to-adopt-california",
    label: "Foster-to-adopt in California",
  },
];
// Note: init.md suggests an optional /calculators link "if a cost
// calculator makes sense" (open question §8.2). Deliberately not built
// for v0 — recommend a smaller starter set of guides first; see README.

export const MORE_INFO_LINKS = [
  { href: "/about", label: "About" },
  { href: "/book", label: "Schedule a demo" },
  { href: "/firm/sign-up", label: "Sign up" },
  { href: "/sign-in", label: "Login" },
  { href: "/terms", label: "Terms of service" },
  { href: "/privacy", label: "Privacy policy" },
];

// Verified live against the source during initial build (2026-07-03).
// Re-verify periodically — see README "Legal content maintenance".
export const OFFICIAL_LINKS = [
  {
    href: "https://selfhelp.courts.ca.gov/adoptions",
    label: "CA Courts — Adoption self-help forms",
  },
  {
    href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=FAM&sectionNum=9000.",
    label: "CA Family Code — Adoption (Division 13)",
  },
  {
    href: "https://www.cdss.ca.gov/adoptions",
    label: "CA Department of Social Services — Adoptions",
  },
  {
    href: "https://courts.ca.gov/opinions",
    label: "CA Courts — Case law / opinions search",
  },
];
