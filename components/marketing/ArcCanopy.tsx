/**
 * Signature visual device: a single wide, flat arc — the sightline of a
 * canopy overhead, or the horizon breaking after weather clears. Reused
 * at different scales (hero backdrop, section divider, wordmark mark)
 * instead of a literal umbrella icon, so it reads as a system rather than
 * a logo repeated everywhere.
 */
export function ArcCanopy({
  className = "",
  tone = "marigold",
  id,
}: {
  className?: string;
  tone?: "marigold" | "ink" | "paper";
  id: string;
}) {
  const gradientStops: Record<typeof tone, [string, string]> = {
    marigold: ["#e2a33b", "#b85c38"],
    ink: ["#17232e", "#3d4f5e"],
    paper: ["#f7f2e7", "#e2a33b"],
  };
  const [from, to] = gradientStops[tone];
  const gradId = `arc-canopy-${id}`;

  return (
    <svg
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <path
        d="M -40 300 C 320 40, 1120 40, 1480 300"
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
