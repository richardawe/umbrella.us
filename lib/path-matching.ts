/**
 * Path-matching engine — deterministic and auditable by design.
 *
 * This module is intentionally NOT an LLM call. The legal stakes of
 * recommending an adoption pathway mean the actual decision must be a
 * traceable set of rules an attorney can read, verify, and override — not
 * a black-box model output. An LLM (Claude, via a future backend) may be
 * used for the *conversational* intake layer and for turning this
 * result's reasoning trace into plain-language client copy, but it must
 * never be the thing that decides the pathway. Do not "simplify" this
 * into an LLM call in a later pass.
 *
 * State-specific detail (document checklists, form numbers, statute
 * citations) intentionally lives in `states/*.ts`, not here, so this
 * engine can be reused as new states are added.
 */

export type Pathway =
  | "step-second-parent"
  | "foster-to-adopt"
  | "agency"
  | "private-domestic"
  | "international";

export interface IntakeAnswers {
  /** Is the client already the spouse, registered domestic partner, or
   * unmarried partner of the child's legal parent? */
  relationshipToChild:
    | "spouse-or-partner-of-legal-parent"
    | "not-yet-a-legal-parent-relationship";
  maritalOrPartnershipStatus:
    | "married"
    | "registered-domestic-partnership"
    | "unmarried-partner"
    | "single";
  /** True if the child was conceived via surrogacy or a known/identified donor. */
  conceivedViaSurrogacyOrKnownDonor: boolean;
  /** True if a parentage judgment already exists for the non-legal parent. */
  hasExistingParentageJudgment: boolean;
  /** True if the child is currently placed with the client through the
   * foster care / dependency system. */
  childCurrentlyInFosterCare: boolean;
  /** True if the child was born outside the United States and the client
   * is adopting from abroad. */
  childBornOutsideUS: boolean;
  /** True if a licensed public or private adoption agency is placing the
   * child (and it is not a foster-care placement). */
  workingWithLicensedAgency: boolean;
}

export interface ReasoningStep {
  rule: string;
  finding: string;
}

export interface PathMatchResult {
  pathway: Pathway;
  label: string;
  reasoning: ReasoningStep[];
  sequencingNote?: string;
}

const PATHWAY_LABELS: Record<Pathway, string> = {
  "step-second-parent": "Stepparent / second-parent adoption",
  "foster-to-adopt": "Foster-to-adopt (agency adoption via foster placement)",
  agency: "Agency adoption",
  "private-domestic": "Private domestic (independent) adoption",
  international: "International (intercountry) adoption",
};

export function matchPath(answers: IntakeAnswers): PathMatchResult {
  const reasoning: ReasoningStep[] = [];

  if (answers.relationshipToChild === "spouse-or-partner-of-legal-parent") {
    reasoning.push({
      rule: "Client is the spouse, registered domestic partner, or unmarried partner of the child's existing legal parent.",
      finding:
        "This is a stepparent/second-parent scenario, regardless of the client's marital status.",
    });

    let sequencingNote: string | undefined;

    if (
      answers.conceivedViaSurrogacyOrKnownDonor &&
      !answers.hasExistingParentageJudgment
    ) {
      reasoning.push({
        rule: "Child was conceived via surrogacy or a known/identified donor, and no parentage judgment exists yet.",
        finding:
          "A parentage judgment should be sought before or alongside the adoption filing — sequencing this correctly avoids re-litigating parentage later, and matters if the family later moves to a state that won't automatically honor an out-of-state birth certificate.",
      });
      sequencingNote =
        "Recommend confirming parentage (parentage judgment) before or alongside filing the adoption petition.";
    }

    if (answers.maritalOrPartnershipStatus === "unmarried-partner") {
      reasoning.push({
        rule: "Client is an unmarried, unregistered partner of the legal parent (not a spouse or registered domestic partner).",
        finding:
          "The streamlined stepparent-adoption procedure requires marriage or registered domestic partnership. An unmarried partner instead uses the general independent-adoption process, which includes a full investigation — flag this to the client early so expectations are set correctly.",
      });
    } else {
      reasoning.push({
        rule: "Client is married or in a registered domestic partnership with the legal parent.",
        finding:
          "Even where marriage already exists, a confirmatory stepparent/second-parent adoption remains advisable: marital or partnership status alone does not guarantee every other state or country will recognize the non-biological parent's parentage if the family later relocates or a challenge arises.",
      });
    }

    return {
      pathway: "step-second-parent",
      label: PATHWAY_LABELS["step-second-parent"],
      reasoning,
      sequencingNote,
    };
  }

  if (answers.childCurrentlyInFosterCare) {
    reasoning.push({
      rule: "Child is currently placed with the client through the foster care / dependency system.",
      finding:
        "This is a foster-to-adopt scenario — procedurally an agency adoption once dependency proceedings clear the child for adoption, typically through a Resource Family Approval (RFA) caregiver.",
    });
    return {
      pathway: "foster-to-adopt",
      label: PATHWAY_LABELS["foster-to-adopt"],
      reasoning,
    };
  }

  if (answers.childBornOutsideUS) {
    reasoning.push({
      rule: "Child was born outside the United States.",
      finding:
        "This is an international (intercountry) adoption, which carries its own federal immigration and Hague Convention considerations in addition to state adoption procedure.",
    });
    return {
      pathway: "international",
      label: PATHWAY_LABELS["international"],
      reasoning,
    };
  }

  if (answers.workingWithLicensedAgency) {
    reasoning.push({
      rule: "A licensed public or private adoption agency is placing the child, and this is not a foster-care placement.",
      finding: "This is an agency adoption.",
    });
    return {
      pathway: "agency",
      label: PATHWAY_LABELS["agency"],
      reasoning,
    };
  }

  reasoning.push({
    rule: "No existing legal-parent relationship, no agency placement, not a foster placement, and the child was born in the United States.",
    finding:
      "This is a private domestic (independent) adoption — the birth parent(s) and prospective adoptive parent(s) identify each other directly, without an agency intermediary.",
  });
  return {
    pathway: "private-domestic",
    label: PATHWAY_LABELS["private-domestic"],
    reasoning,
  };
}
