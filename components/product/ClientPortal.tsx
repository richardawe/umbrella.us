import type { Matter } from "@/lib/mock-data";
import { AssistantChat } from "@/components/product/AssistantChat";
import { ca } from "@/states/ca";

export function ClientPortal({ matter }: { matter: Matter }) {
  const items = matter.checklist
    .map((c) => {
      const def = ca.documentChecklist.find((d) => d.id === c.id);
      return def ? { def, status: c.status } : null;
    })
    .filter((x): x is { def: (typeof ca.documentChecklist)[number]; status: (typeof matter.checklist)[number]["status"] } => x !== null);

  const done = items.filter((i) => i.status === "received" || i.status === "waived");
  const needed = items.filter((i) => i.status !== "received" && i.status !== "waived");
  const progress = items.length === 0 ? 0 : done.length / items.length;

  return (
    <div>
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-clay">
        Your case
      </p>
      <h1 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink">
        Hi {matter.clientName.split(/[&,]/)[0].trim()}
      </h1>
      <p className="mt-2 max-w-lg text-[15px] text-ink-soft">
        {`Here’s where your ${matter.pathwayLabel.toLowerCase()} stands right now. Your attorney reviews everything before it’s filed.`}
      </p>

      <div className="mt-6 h-2 w-full max-w-md overflow-hidden rounded-full bg-paper-dim">
        <div
          className="h-full rounded-full bg-marigold transition-all"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-ink-soft">
        {done.length} of {items.length} items done
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-lg font-medium text-ink">Still needed</h2>
          <ul className="mt-4 space-y-4">
            {needed.length === 0 && (
              <li className="text-sm text-ink-soft">
                Nothing outstanding — nice work.
              </li>
            )}
            {needed.map(({ def }) => (
              <li key={def.id} className="rounded-xl border border-line bg-paper-dim/30 p-4">
                <p className="text-[15px] font-medium text-ink">{def.label}</p>
                <p className="mt-1 text-sm text-ink-soft">{def.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-lg font-medium text-ink">Done</h2>
          <ul className="mt-4 space-y-3">
            {done.length === 0 && (
              <li className="text-sm text-ink-soft">Nothing marked done yet.</li>
            )}
            {done.map(({ def }) => (
              <li key={def.id} className="flex items-start gap-2.5 text-sm text-ink-soft">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                {def.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 max-w-xl">
        <h2 className="font-display text-lg font-medium text-ink">
          Have a question?
        </h2>
        <div className="mt-4">
          <AssistantChat />
        </div>
      </div>
    </div>
  );
}
