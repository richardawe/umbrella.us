import { Container } from "./Container";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-line bg-paper-dim/40">
      <Container className="py-16 md:py-20">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-clay">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
