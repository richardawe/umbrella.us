export function PainPointCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-line bg-paper-dim/60 p-7">
      <h3 className="font-display text-lg font-medium text-ink">{title}</h3>
      <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">
        {children}
      </p>
    </div>
  );
}
