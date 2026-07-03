export function HowItWorksStep({
  index,
  title,
  description,
}: {
  index: number;
  title: string;
  description: string;
}) {
  return (
    <div className="relative border-t border-line pt-6">
      <span className="font-display text-sm text-clay">
        {String(index).padStart(2, "0")}
      </span>
      <h3 className="mt-3 font-display text-lg font-medium text-ink">
        {title}
      </h3>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
        {description}
      </p>
    </div>
  );
}
