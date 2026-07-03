// Listing metadata for the CA adoption guides. Kept intentionally small
// (4 guides) per init.md §8.2 — recommend starting smaller than
// Untangle's deep guide bench, given the higher legal-accuracy bar per
// guide. Each guide's full content lives in its own route file so the
// legal facts are easy to review in place rather than through a layer
// of indirection.
export interface GuideMeta {
  slug: string;
  title: string;
  dek: string;
}

export const GUIDES: GuideMeta[] = [
  {
    slug: "how-to-adopt-in-california",
    title: "How adoption works in California: the five pathways",
    dek: "A plain-language map of stepparent/second-parent, foster-to-adopt, agency, private domestic, and international adoption in California.",
  },
  {
    slug: "second-parent-adoption-california",
    title: "Second-parent adoption in California, even after marriage",
    dek: "Why LGBTQ parents often still need a confirmatory stepparent adoption, and how California's streamlined process works for surrogacy and donor-conceived families.",
  },
  {
    slug: "how-to-fill-out-adopt-200",
    title: "How to fill out ADOPT-200 (Adoption Request)",
    dek: "What California's general adoption petition actually covers — and which supplemental forms your pathway needs alongside it.",
  },
  {
    slug: "foster-to-adopt-california",
    title: "Foster-to-adopt in California: what CDSS actually calls it",
    dek: "Resource Family Approval, agency adoption, and the Adoption Assistance Program — the real terms behind the common shorthand.",
  },
];
