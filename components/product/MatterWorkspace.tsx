"use client";

import Link from "next/link";
import { StatusPill } from "@/components/product/StatusPill";
import { ChecklistItemRow } from "@/components/product/ChecklistItemRow";
import type { Matter, ChecklistStatus } from "@/lib/mock-data";
import { ca } from "@/states/ca";

export function MatterWorkspace({
  matter,
  onChecklistStatusChange,
}: {
  matter: Matter;
  onChecklistStatusChange: (itemId: string, status: ChecklistStatus) => void;
}) {
  const checklistItems = matter.checklist
    .map((c) => {
      const def = ca.documentChecklist.find((d) => d.id === c.id);
      return def ? { def, status: c.status } : null;
    })
    .filter((x): x is { def: (typeof ca.documentChecklist)[number]; status: ChecklistStatus } => x !== null);

  const outstanding = matter.checklist.filter(
    (c) => c.status !== "received" && c.status !== "waived"
  ).length;

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-clay">
            Matter workspace
          </p>
          <h1 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink">
            {matter.clientName}
          </h1>
          <p className="mt-2 text-[15px] text-ink-soft">{matter.pathwayLabel}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <StatusPill status={matter.status} />
          <Link
            href="/portal"
            className="text-sm font-medium text-clay hover:underline"
          >
            View client portal →
          </Link>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <SectionCard title="Document checklist" subtitle={`${outstanding} item${outstanding === 1 ? "" : "s"} outstanding`}>
            {checklistItems.map(({ def, status }) => (
              <ChecklistItemRow
                key={def.id}
                item={def}
                status={status}
                onChange={(next) => onChecklistStatusChange(def.id, next)}
              />
            ))}
          </SectionCard>

          <SectionCard title="Path-matching reasoning" className="mt-8">
            <div className="space-y-3">
              {matter.reasoning.map((r, i) => (
                <div key={i} className="rounded-lg bg-paper-dim/50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                    {r.rule}
                  </p>
                  <p className="mt-1 text-sm text-ink">{r.finding}</p>
                </div>
              ))}
              {matter.sequencingNote && (
                <div className="rounded-lg border border-clay/30 bg-clay/10 p-4 text-sm text-ink">
                  <strong>Sequencing note:</strong> {matter.sequencingNote}
                </div>
              )}
              {matter.overrideReason && (
                <div className="rounded-lg border border-marigold/40 bg-marigold/10 p-4 text-sm text-ink">
                  <strong>Attorney override:</strong> {matter.overrideReason}
                </div>
              )}
            </div>
          </SectionCard>
        </div>

        <div>
          <SectionCard title="Reference contacts">
            {matter.references.length === 0 ? (
              <p className="py-4 text-sm text-ink-soft">No references logged yet.</p>
            ) : (
              <ul className="divide-y divide-line">
                {matter.references.map((ref) => (
                  <li key={ref.id} className="flex items-center justify-between py-3 text-sm">
                    <div>
                      <p className="font-medium text-ink">{ref.name}</p>
                      <p className="text-ink-soft">{ref.relationship}</p>
                    </div>
                    <span className="rounded-full bg-paper-dim px-2.5 py-1 text-xs font-medium text-ink-soft">
                      {ref.status.replace("_", " ")}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>

          <SectionCard title="Reminder / nudge log" className="mt-8">
            {matter.nudgeLog.length === 0 ? (
              <p className="py-4 text-sm text-ink-soft">No nudges sent yet.</p>
            ) : (
              <ul className="space-y-3">
                {matter.nudgeLog.map((entry) => (
                  <li key={entry.id} className="text-sm">
                    <p className="text-ink-soft">
                      <span className="font-medium text-ink">{entry.date}</span> ·{" "}
                      {entry.channel === "email" ? "Email" : "Text"}
                    </p>
                    <p className="mt-0.5 text-ink-soft">{entry.summary}</p>
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

function SectionCard({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-line bg-paper p-6 ${className}`}>
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-display text-lg font-medium text-ink">{title}</h2>
        {subtitle && <span className="text-xs text-ink-soft">{subtitle}</span>}
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}
