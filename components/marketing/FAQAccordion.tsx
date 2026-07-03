"use client";

import { useState } from "react";

const FAQS: { question: string; answer: string }[] = [
  {
    question: "Who is Umbrella built for?",
    answer:
      "Umbrella is built for adoption attorneys and their staff who represent LGBTQ prospective parents — solo practitioners and small-to-mid-size family law firms handling stepparent, foster, private domestic, agency, and international adoptions.",
  },
  {
    question: "What does Umbrella's AI adoption assistant do with clients?",
    answer:
      "It runs structured intake conversations, explains document requests in plain language, answers routine procedural questions, and nudges clients about outstanding items — all scoped to the matter and supervised by the attorney. It never gives legal advice.",
  },
  {
    question: "Does Umbrella replace attorneys?",
    answer:
      "No. Umbrella is workflow software, not a law firm. It handles the structured, repeatable parts of intake and document collection so attorneys can spend their time on legal strategy, court prep, and judgment calls that require a licensed professional.",
  },
  {
    question: "How much does Umbrella cost?",
    answer:
      "Umbrella uses a single flat per-case fee. The exact figure is still pending business sign-off — see the pricing section above and PRICING.md in the project repo for details.",
  },
  {
    question:
      "Does Umbrella work for surrogacy and known-donor cases, or only agency/foster adoption?",
    answer:
      "Umbrella's path-matching engine covers surrogacy-and-known-donor sequencing (parentage judgment before or alongside a confirmatory stepparent adoption), foster-to-adopt, private domestic infant adoption, agency adoption, and international adoption.",
  },
  {
    question:
      "Is Umbrella only for same-sex couples, or all LGBTQ family structures (single parents, polyamorous co-parents where legally recognized, trans parents, etc.)?",
    answer:
      "Umbrella is built for the full range of LGBTQ family structures, including single LGBTQ parents and trans and nonbinary parents' documentation needs. Support for multi-parent households follows California's limited legal recognition of more than two parents — this is an active scoping question the team is still refining; see the project README for status.",
  },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-2xl divide-y divide-line">
      {FAQS.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={faq.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
            >
              <span className="font-display text-base font-medium text-ink md:text-lg">
                {faq.question}
              </span>
              <span
                aria-hidden="true"
                className={`shrink-0 text-xl text-clay transition-transform duration-200 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            {isOpen && (
              <p className="pb-6 text-[15px] leading-relaxed text-ink-soft">
                {faq.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
