import Link from "next/link";
import { Container } from "./Container";

const STEPS = [
  { title: "Book a demo", description: "See the intake flow and matter workspace on a real pathway scenario." },
  { title: "Launch the first case", description: "Bring on your first matter and let Umbrella build the checklist." },
  { title: "Scale from there", description: "Add matters and staff as your adoption practice grows." },
];

export function CTASection() {
  return (
    <section className="bg-paper-dim/50">
      <Container className="py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-center">
          <div className="grid gap-8 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <div key={step.title} className="flex items-start gap-3">
                <span className="mt-0.5 font-display text-sm text-clay">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-base font-medium text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/book"
            className="whitespace-nowrap rounded-full bg-ink px-6 py-3.5 text-base font-medium text-paper transition-colors hover:bg-ink-soft justify-self-start md:justify-self-end"
          >
            Schedule a demo
          </Link>
        </div>
      </Container>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(226,163,59,0.6) 0%, transparent 70%)",
        }}
      />
      <Container className="relative py-20 text-center md:py-28">
        <h2 className="mx-auto max-w-2xl font-display text-3xl font-medium leading-tight text-paper md:text-4xl">
          Give your clients a guide who gets it, from first call to
          finalization.
        </h2>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/book"
            className="rounded-full bg-marigold px-6 py-3.5 text-base font-medium text-ink transition-colors hover:bg-marigold-deep hover:text-paper"
          >
            Schedule a demo
          </Link>
          <Link
            href="/firm/sign-up"
            className="rounded-full border border-paper/25 px-6 py-3.5 text-base font-medium text-paper transition-colors hover:border-paper/60"
          >
            Sign up
          </Link>
        </div>
      </Container>
    </section>
  );
}
