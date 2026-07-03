"use client";

import type { ChecklistStatus } from "@/lib/mock-data";
import type { DocumentChecklistItem } from "@/states/types";

const STATUS_OPTIONS: { value: ChecklistStatus; label: string }[] = [
  { value: "not_started", label: "Not started" },
  { value: "requested", label: "Requested" },
  { value: "received", label: "Received" },
  { value: "waived", label: "Waived" },
];

const STATUS_DOT: Record<ChecklistStatus, string> = {
  not_started: "bg-ink-soft/30",
  requested: "bg-marigold",
  received: "bg-clay",
  waived: "bg-ink-soft/50",
};

export function ChecklistItemRow({
  item,
  status,
  onChange,
}: {
  item: DocumentChecklistItem;
  status: ChecklistStatus;
  onChange: (status: ChecklistStatus) => void;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-line py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${STATUS_DOT[status]}`} />
        <div>
          <p className="text-[15px] font-medium text-ink">
            {item.label}
            {item.formNumber && (
              <span className="ml-2 text-xs font-normal text-ink-soft">
                {item.formNumber}
              </span>
            )}
          </p>
          <p className="mt-1 text-sm text-ink-soft">{item.description}</p>
        </div>
      </div>
      <select
        value={status}
        onChange={(e) => onChange(e.target.value as ChecklistStatus)}
        className="w-full shrink-0 rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink sm:w-44"
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
