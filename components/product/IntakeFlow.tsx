"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  matchPath,
  type IntakeAnswers,
  type Pathway,
  type PathMatchResult,
} from "@/lib/path-matching";
import { checklistForPathway, type Matter } from "@/lib/mock-data";
import { useDemoStore } from "@/lib/demo-store";

const PATHWAY_OPTIONS: { value: Pathway; label: string }[] = [
  { value: "step-second-parent", label: "Stepparent / second-parent adoption" },
  { value: "foster-to-adopt", label: "Foster-to-adopt" },
  { value: "agency", label: "Agency adoption" },
  { value: "private-domestic", label: "Private domestic (independent) adoption" },
  { value: "international", label: "International (intercountry) adoption" },
];

const initialAnswers: IntakeAnswers = {
  relationshipToChild: "not-yet-a-legal-parent-relationship",
  maritalOrPartnershipStatus: "single",
  conceivedViaSurrogacyOrKnownDonor: false,
  hasExistingParentageJudgment: false,
  childCurrentlyInFosterCare: false,
  childBornOutsideUS: false,
  workingWithLicensedAgency: false,
};

// Explicit state machine for step order — the next phase is always
// computed from the current phase + answers so far inside goToNext(),
// never inferred during render, so there's no risk of a render-phase
// state update or an infinite loop.
type Phase =
  | "name"
  | "relationship"
  | "partnership-status"
  | "surrogacy"
  | "parentage-judgment"
  | "foster-care"
  | "final"
  | "result";

const PHASE_ORDER: Phase[] = [
  "name",
  "relationship",
  "partnership-status",
  "surrogacy",
  "parentage-judgment",
  "foster-care",
  "final",
  "result",
];

function phaseProgress(phase: Phase): number {
  return (PHASE_ORDER.indexOf(phase) + 1) / PHASE_ORDER.length;
}

export function IntakeFlow() {
  const router = useRouter();
  const { addMatter, setActiveMatterId } = useDemoStore();

  const [clientName, setClientName] = useState("");
  const [answers, setAnswers] = useState<IntakeAnswers>(initialAnswers);
  const [phase, setPhase] = useState<Phase>("name");
  const [result, setResult] = useState<PathMatchResult | null>(null);
  const [overridePathway, setOverridePathway] = useState<Pathway | "">("");
  const [overrideReason, setOverrideReason] = useState("");

  function update<K extends keyof IntakeAnswers>(key: K, value: IntakeAnswers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function goToNext(current: Phase, latestAnswers: IntakeAnswers) {
    const isSecondParent =
      latestAnswers.relationshipToChild === "spouse-or-partner-of-legal-parent";

    switch (current) {
      case "name":
        setPhase("relationship");
        return;
      case "relationship":
        setPhase(isSecondParent ? "partnership-status" : "foster-care");
        return;
      case "partnership-status":
        setPhase("surrogacy");
        return;
      case "surrogacy":
        setPhase(
          latestAnswers.conceivedViaSurrogacyOrKnownDonor ? "parentage-judgment" : "final"
        );
        return;
      case "parentage-judgment":
        setPhase("final");
        return;
      case "foster-care":
        setPhase("final");
        return;
      case "final":
        setResult(matchPath(latestAnswers));
        setPhase("result");
        return;
      default:
        return;
    }
  }

  function createMatter() {
    if (!result) return;
    const finalPathway = overridePathway || result.pathway;
    const finalLabel =
      PATHWAY_OPTIONS.find((p) => p.value === finalPathway)?.label ?? result.label;

    const matter: Matter = {
      id: `matter-${Date.now()}`,
      clientName: clientName || "New client",
      pathway: finalPathway,
      pathwayLabel: finalLabel,
      reasoning: result.reasoning,
      sequencingNote: result.sequencingNote,
      overrideReason: overridePathway ? overrideReason : undefined,
      status: "intake",
      createdAt: new Date().toISOString().slice(0, 10),
      checklist: checklistForPathway(finalPathway),
      references: [],
      nudgeLog: [],
    };
    addMatter(matter);
    setActiveMatterId(matter.id);
    router.push("/matter");
  }

  if (phase === "result" && result) {
    return (
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-clay">
          Recommended pathway
        </p>
        <h2 className="mt-3 font-display text-2xl font-medium text-ink">
          {result.label}
        </h2>

        <div className="mt-6 space-y-3">
          {result.reasoning.map((r, i) => (
            <div key={i} className="rounded-xl border border-line bg-paper-dim/40 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                Rule
              </p>
              <p className="mt-1 text-sm text-ink">{r.rule}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-wide text-ink-soft">
                Finding
              </p>
              <p className="mt-1 text-sm text-ink-soft">{r.finding}</p>
            </div>
          ))}
        </div>

        {result.sequencingNote && (
          <div className="mt-4 rounded-xl border border-clay/30 bg-clay/10 p-4 text-sm text-ink">
            <strong>Sequencing note:</strong> {result.sequencingNote}
          </div>
        )}

        <div className="mt-8 rounded-xl border border-line p-5">
          <p className="text-sm font-medium text-ink">
            Attorney override (optional)
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            The engine shows its reasoning so you can override it — this is a
            recommendation, not a black box.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <select
              value={overridePathway}
              onChange={(e) => setOverridePathway(e.target.value as Pathway | "")}
              className="rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink"
            >
              <option value="">Keep recommended pathway</option>
              {PATHWAY_OPTIONS.filter((p) => p.value !== result.pathway).map((p) => (
                <option key={p.value} value={p.value}>
                  Override to: {p.label}
                </option>
              ))}
            </select>
            {overridePathway && (
              <input
                value={overrideReason}
                onChange={(e) => setOverrideReason(e.target.value)}
                placeholder="Reason for override (required)"
                className="rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink-soft/50"
              />
            )}
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={() => {
              setResult(null);
              setPhase("name");
            }}
            className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink-soft hover:text-ink"
          >
            ← Redo intake
          </button>
          <button
            onClick={createMatter}
            disabled={Boolean(overridePathway) && overrideReason.trim() === ""}
            className="rounded-full bg-marigold px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-marigold-deep hover:text-paper disabled:cursor-not-allowed disabled:opacity-50"
          >
            Create matter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-paper-dim">
        <div
          className="h-full rounded-full bg-marigold transition-all"
          style={{ width: `${phaseProgress(phase) * 100}%` }}
        />
      </div>

      {phase === "name" && (
        <StepShell
          title="Client name"
          onNext={() => goToNext("name", answers)}
          canNext={clientName.trim() !== ""}
        >
          <input
            autoFocus
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="e.g. Alex Rivera"
            className="w-full rounded-lg border border-line bg-paper px-4 py-2.5 text-[15px] text-ink placeholder:text-ink-soft/50 focus:border-ink focus:outline-none"
          />
        </StepShell>
      )}

      {phase === "relationship" && (
        <StepShell
          title="Is your client the spouse, registered domestic partner, or unmarried partner of the child's existing legal parent?"
          onNext={() => goToNext("relationship", answers)}
        >
          <RadioGroup
            value={answers.relationshipToChild}
            onChange={(v) => update("relationshipToChild", v as IntakeAnswers["relationshipToChild"])}
            options={[
              { value: "spouse-or-partner-of-legal-parent", label: "Yes" },
              { value: "not-yet-a-legal-parent-relationship", label: "No" },
            ]}
          />
        </StepShell>
      )}

      {phase === "partnership-status" && (
        <StepShell
          title="What is the client's relationship status with the legal parent?"
          onNext={() => goToNext("partnership-status", answers)}
        >
          <RadioGroup
            value={answers.maritalOrPartnershipStatus}
            onChange={(v) =>
              update("maritalOrPartnershipStatus", v as IntakeAnswers["maritalOrPartnershipStatus"])
            }
            options={[
              { value: "married", label: "Married" },
              { value: "registered-domestic-partnership", label: "Registered domestic partnership" },
              { value: "unmarried-partner", label: "Unmarried partner" },
            ]}
          />
        </StepShell>
      )}

      {phase === "surrogacy" && (
        <StepShell
          title="Was the child conceived via surrogacy or a known/identified donor?"
          onNext={() => goToNext("surrogacy", answers)}
        >
          <RadioGroup
            value={String(answers.conceivedViaSurrogacyOrKnownDonor)}
            onChange={(v) => update("conceivedViaSurrogacyOrKnownDonor", v === "true")}
            options={[
              { value: "true", label: "Yes" },
              { value: "false", label: "No" },
            ]}
          />
        </StepShell>
      )}

      {phase === "parentage-judgment" && (
        <StepShell
          title="Does a parentage judgment already exist for the non-legal parent?"
          onNext={() => goToNext("parentage-judgment", answers)}
        >
          <RadioGroup
            value={String(answers.hasExistingParentageJudgment)}
            onChange={(v) => update("hasExistingParentageJudgment", v === "true")}
            options={[
              { value: "true", label: "Yes" },
              { value: "false", label: "No" },
            ]}
          />
        </StepShell>
      )}

      {phase === "foster-care" && (
        <StepShell
          title="Is the child currently placed with the client through the foster care system?"
          onNext={() => goToNext("foster-care", answers)}
        >
          <RadioGroup
            value={String(answers.childCurrentlyInFosterCare)}
            onChange={(v) => update("childCurrentlyInFosterCare", v === "true")}
            options={[
              { value: "true", label: "Yes" },
              { value: "false", label: "No" },
            ]}
          />
        </StepShell>
      )}

      {phase === "final" && (
        <FinalQuestions
          answers={answers}
          isSecondParent={answers.relationshipToChild === "spouse-or-partner-of-legal-parent"}
          update={update}
          onSubmit={() => goToNext("final", answers)}
        />
      )}
    </div>
  );
}

function FinalQuestions({
  answers,
  isSecondParent,
  update,
  onSubmit,
}: {
  answers: IntakeAnswers;
  isSecondParent: boolean;
  update: <K extends keyof IntakeAnswers>(key: K, value: IntakeAnswers[K]) => void;
  onSubmit: () => void;
}) {
  return (
    <div>
      <h3 className="font-display text-lg font-medium text-ink">
        A couple more questions
      </h3>
      <div className="mt-5 space-y-6">
        {!isSecondParent && (
          <div>
            <p className="text-sm font-medium text-ink">
              Was the child born outside the United States?
            </p>
            <div className="mt-2">
              <RadioGroup
                value={String(answers.childBornOutsideUS)}
                onChange={(v) => update("childBornOutsideUS", v === "true")}
                options={[
                  { value: "true", label: "Yes" },
                  { value: "false", label: "No" },
                ]}
              />
            </div>
          </div>
        )}
        {!isSecondParent && !answers.childBornOutsideUS && !answers.childCurrentlyInFosterCare && (
          <div>
            <p className="text-sm font-medium text-ink">
              Is a licensed public or private adoption agency placing the child?
            </p>
            <div className="mt-2">
              <RadioGroup
                value={String(answers.workingWithLicensedAgency)}
                onChange={(v) => update("workingWithLicensedAgency", v === "true")}
                options={[
                  { value: "true", label: "Yes" },
                  { value: "false", label: "No" },
                ]}
              />
            </div>
          </div>
        )}
        {isSecondParent && (
          <p className="text-sm text-ink-soft">
            Based on your answers so far, Umbrella has enough to recommend a
            pathway. Continue to see the reasoning.
          </p>
        )}
      </div>
      <button
        onClick={onSubmit}
        className="mt-8 rounded-full bg-marigold px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-marigold-deep hover:text-paper"
      >
        See recommended pathway →
      </button>
    </div>
  );
}

function StepShell({
  title,
  children,
  onNext,
  canNext = true,
}: {
  title: string;
  children: React.ReactNode;
  onNext: () => void;
  canNext?: boolean;
}) {
  return (
    <div>
      <h3 className="font-display text-lg font-medium text-ink">{title}</h3>
      <div className="mt-5">{children}</div>
      <button
        onClick={onNext}
        disabled={!canNext}
        className="mt-8 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-40"
      >
        Continue →
      </button>
    </div>
  );
}

function RadioGroup({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="grid gap-2.5">
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-[15px] transition-colors ${
            value === option.value
              ? "border-ink bg-paper-dim/60 text-ink"
              : "border-line text-ink-soft hover:border-ink-soft"
          }`}
        >
          <input
            type="radio"
            className="accent-ink"
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}
