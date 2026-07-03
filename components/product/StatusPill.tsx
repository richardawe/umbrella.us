import type { MatterStatus } from "@/lib/mock-data";

const STYLES: Record<MatterStatus, string> = {
  intake: "bg-cloud text-ink-soft",
  in_progress: "bg-marigold/15 text-marigold-deep",
  ready_for_review: "bg-clay/15 text-clay",
};

const LABELS: Record<MatterStatus, string> = {
  intake: "Intake",
  in_progress: "In progress",
  ready_for_review: "Ready for review",
};

export function StatusPill({ status }: { status: MatterStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${STYLES[status]}`}
    >
      {LABELS[status]}
    </span>
  );
}
