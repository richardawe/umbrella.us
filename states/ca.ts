import type { StateConfig } from "./types";

/**
 * California state configuration — the only state Umbrella launches
 * with (see init.md §1). Every fact below was verified against a live
 * primary source (leginfo.legislature.ca.gov, selfhelp.courts.ca.gov, or
 * cdss.ca.gov) during initial build, not pulled from training data.
 *
 * Known correction worth flagging: ADOPT-200 ("Adoption Request") is the
 * general petition used across every adoption type, NOT a
 * stepparent-specific form — the stepparent-specific supplement is
 * ADOPT-203. Earlier project notes assumed ADOPT-200 was stepparent-only;
 * that assumption was wrong and has been corrected here.
 *
 * TODO: verify against CA authority again before real launch — statutes,
 * form numbers, and agency URLs can change. Re-check the citations below
 * on a regular cadence (see README "Legal content maintenance").
 *
 * Also flagged: no official CDSS or CA Courts page frames confirmatory
 * stepparent adoption as an LGBTQ-specific or *Obergefell*-driven
 * recommendation — that rationale is standard family-law practice
 * commentary, not a government statement, and copy should attribute it
 * that way rather than citing CDSS/courts.ca.gov for it.
 */
export const ca: StateConfig = {
  code: "CA",
  name: "California",

  courtSelfHelpUrl: "https://selfhelp.courts.ca.gov/adoptions",
  caseLawSearchUrl: "https://courts.ca.gov/opinions",

  forms: [
    {
      number: "ADOPT-200",
      title: "Adoption Request",
      url: "https://www.courts.ca.gov/documents/adopt200.pdf",
      description:
        "The general petition used to open every California adoption case — stepparent, agency, independent, or intercountry.",
    },
    {
      number: "ADOPT-203",
      title: "Stepparent Adoption Request",
      url: "https://selfhelp.courts.ca.gov/jcc-form/ADOPT-203",
      description:
        "Stepparent/second-parent-specific supplement filed alongside ADOPT-200.",
    },
    {
      number: "ADOPT-205",
      title: "Declaration Confirming Parentage in Stepparent Adoption",
      url: "https://selfhelp.courts.ca.gov/jcc-form/ADOPT-205",
      description:
        "Used for the streamlined confirmatory process (Fam. Code § 9000.5) when the child was conceived through assisted reproduction, not surrogacy.",
    },
    {
      number: "ADOPT-206",
      title:
        "Declaration Confirming Parentage in Stepparent Adoption: Gestational Surrogacy",
      url: "https://selfhelp.courts.ca.gov/jcc-form/ADOPT-206",
      description:
        "Used for the streamlined confirmatory process (Fam. Code § 9000.5) when the child was born through gestational surrogacy.",
    },
    {
      number: "ADOPT-210",
      title: "Adoption Agreement",
      url: "https://selfhelp.courts.ca.gov/jcc-form/ADOPT-210",
      description: "Standard companion agreement filed with the court.",
    },
    {
      number: "ADOPT-215",
      title: "Adoption Order",
      url: "https://selfhelp.courts.ca.gov/jcc-form/ADOPT-215",
      description: "The final court order establishing the adoption.",
    },
    {
      number: "ICWA-010(A)",
      title: "Indian Child Welfare Act Inquiry",
      url: "https://selfhelp.courts.ca.gov/jcc-form/ICWA-010",
      description:
        "Required ICWA inquiry attached to adoption and related proceedings statewide.",
    },
  ],

  statutes: [
    {
      citation: "Fam. Code §§ 9000–9007",
      title: "Stepparent Adoptions (Div. 13, Pt. 2, Ch. 5)",
      url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=FAM&sectionNum=9000.",
      note:
        "§ 9000(b) and (g) extend stepparent adoption procedure to a registered domestic partner adopting their partner's child — this is the statutory basis for what practitioners call 'second-parent adoption.' There is no separate 'second-parent adoption' chapter in the Family Code.",
    },
    {
      citation: "Fam. Code § 9000.5",
      title: "Streamlined confirmatory adoption for assisted reproduction / surrogacy",
      url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=FAM&sectionNum=9000.5",
      note:
        "Waives the standard investigation (§ 9001) and hearing (§ 9007) for married or domestic-partnered couples confirming parentage of a child conceived via assisted reproduction or gestational surrogacy, absent good cause for the court to require them.",
    },
    {
      citation: "Fam. Code §§ 8700–8720",
      title: "Agency Adoptions (Div. 13, Pt. 2, Ch. 2)",
      url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=FAM&sectionNum=8700.",
    },
    {
      citation: "Fam. Code §§ 8800–8823",
      title: "Independent Adoptions (Div. 13, Pt. 2, Ch. 3)",
      url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=FAM&sectionNum=8800.",
      note: "Governs private domestic adoptions arranged directly between birth and adoptive parents, without an agency intermediary.",
    },
    {
      citation: "Fam. Code §§ 8900–8925",
      title: "Intercountry Adoptions (Div. 13, Pt. 2, Ch. 4)",
      url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=FAM&sectionNum=8900.",
    },
  ],

  agencies: [
    {
      name: "CA Department of Social Services — Adoptions",
      url: "https://www.cdss.ca.gov/adoptions",
      description:
        "State adoptions program hub, including agency adoption and Adoption Assistance Program (AAP) information.",
    },
    {
      name: "CA Department of Social Services — Resource Family Approval",
      url: "https://cdss.ca.gov/inforesources/resource-family-approval-program",
      description:
        "The unified caregiver-approval process (Welf. & Inst. Code § 16519.5) that qualifies a family to foster and, without a separate approval, adopt a child already placed with them — CDSS's actual term for what's commonly called 'foster-to-adopt.'",
    },
  ],

  documentChecklist: [
    {
      id: "adoption-request",
      label: "File the Adoption Request",
      description:
        "ADOPT-200 opens the case for every pathway; stepparent/second-parent matters also file ADOPT-203.",
      pathways: [
        "step-second-parent",
        "foster-to-adopt",
        "agency",
        "private-domestic",
        "international",
      ],
      formNumber: "ADOPT-200",
    },
    {
      id: "stepparent-request",
      label: "File the Stepparent Adoption Request",
      description:
        "ADOPT-203 is the stepparent/second-parent-specific supplement to ADOPT-200.",
      pathways: ["step-second-parent"],
      formNumber: "ADOPT-203",
    },
    {
      id: "confirm-parentage-declaration",
      label: "File the parentage confirmation declaration",
      description:
        "ADOPT-205 (assisted reproduction) or ADOPT-206 (gestational surrogacy) supports the streamlined § 9000.5 process, where available.",
      pathways: ["step-second-parent"],
    },
    {
      id: "icwa-inquiry",
      label: "Complete the ICWA inquiry",
      description:
        "ICWA-010(A) is required in every California adoption to determine whether the Indian Child Welfare Act applies.",
      pathways: [
        "step-second-parent",
        "foster-to-adopt",
        "agency",
        "private-domestic",
        "international",
      ],
      formNumber: "ICWA-010(A)",
    },
    {
      id: "background-check",
      label: "Complete Live Scan fingerprint background check",
      description:
        "Required of prospective adoptive parents (and, for stepparent matters, typically the petitioning stepparent/partner).",
      pathways: [
        "step-second-parent",
        "foster-to-adopt",
        "agency",
        "private-domestic",
        "international",
      ],
    },
    {
      id: "home-study-report",
      label: "Complete the home study / investigation report",
      description:
        "Full investigation under Fam. Code § 8611 (agency) or § 8807 (independent); for stepparent matters this may be waived under the § 9000.5 streamlined process for married/domestic-partnered couples with an assisted-reproduction or surrogacy conception, but is otherwise required.",
      pathways: ["foster-to-adopt", "agency", "private-domestic", "international"],
    },
    {
      id: "references",
      label: "Collect character references",
      description:
        "Personal references supporting the home study, chased and logged until returned.",
      pathways: ["foster-to-adopt", "agency", "private-domestic", "international"],
    },
    {
      id: "financial-disclosure",
      label: "Submit financial disclosure",
      description:
        "Household income/expense documentation requested by the agency or investigator.",
      pathways: ["foster-to-adopt", "agency", "private-domestic", "international"],
    },
    {
      id: "medical-clearance",
      label: "Submit medical clearance",
      description:
        "Physician statement confirming the prospective parent(s) can care for a child long-term.",
      pathways: ["foster-to-adopt", "agency", "private-domestic", "international"],
    },
    {
      id: "adoption-agreement",
      label: "Sign the Adoption Agreement",
      description: "ADOPT-210, filed once the matter is ready to finalize.",
      pathways: [
        "step-second-parent",
        "foster-to-adopt",
        "agency",
        "private-domestic",
        "international",
      ],
      formNumber: "ADOPT-210",
    },
    {
      id: "adoption-order",
      label: "Obtain the Adoption Order",
      description: "ADOPT-215 — the final court order finalizing the adoption.",
      pathways: [
        "step-second-parent",
        "foster-to-adopt",
        "agency",
        "private-domestic",
        "international",
      ],
      formNumber: "ADOPT-215",
    },
  ],

  pathwayNotes: {
    "step-second-parent":
      "Requires marriage or a registered domestic partnership to use the stepparent procedure (Fam. Code § 9000); unmarried partners must use independent adoption instead. Where the child was conceived via assisted reproduction or surrogacy, the § 9000.5 streamlined confirmatory process can waive the investigation and hearing.",
    "foster-to-adopt":
      "CDSS does not use 'foster-to-adopt' as an official program name — the state's actual mechanism is Resource Family Approval (RFA), which qualifies a caregiver to foster and adopt under one approval, followed by an agency adoption once the child is legally free.",
    international:
      "Beyond California's intercountry adoption chapter (Fam. Code §§ 8900–8925), these matters carry federal immigration and, often, Hague Convention requirements outside the scope of state law alone.",
  },
};
