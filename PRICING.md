# Pricing — open item, not resolved

Umbrella's marketing site displays a single flat per-case price,
consistently, everywhere it appears (hero, pricing band, FAQ). The actual
number is **intentionally not set**.

## Placeholder token

Every price reference in the codebase uses the literal, searchable token:

```
$[PRICE]/case
```

Defined once in `lib/site-config.ts` as `PRICE_PLACEHOLDER` and imported
everywhere the price appears. To find every occurrence:

```
grep -rn "PRICE_PLACEHOLDER\|\$\[PRICE\]" .
```

## Why this isn't resolved yet

Untangle (the model this product is patterned on) uses flat per-case
pricing that is itself inconsistent across its own site ($350 in one
section, $495 in another) — worth avoiding, not repeating.

Adoption cases plausibly run longer than divorce discovery and involve a
different mix of agency/court/home-study touchpoints, so Untangle's
number(s) shouldn't be assumed to transfer directly. Setting a real price
requires:

- Business-side unit economics (expected attorney hours displaced,
  support cost per matter, target margin).
- A view on whether pricing should vary by pathway (e.g. international
  adoption plausibly costs the firm more staff time than a streamlined
  confirmatory stepparent adoption) — the current design assumes a single
  flat number per the brief, but that assumption itself may be worth
  revisiting.
- Competitive/market check against what adoption-specialized firms
  currently charge clients, to sanity-check a per-case SaaS fee against
  it.

## Action needed before launch

Business sign-off on a real number, then a single find/replace of
`PRICE_PLACEHOLDER`'s value in `lib/site-config.ts`. No other file should
need to change.
