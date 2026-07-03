import Link from "next/link";
import { Container } from "./Container";
import { ArcCanopy } from "./ArcCanopy";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <ArcCanopy
        id="hero"
        tone="marigold"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[26%] w-full opacity-90"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(226,163,59,0.55) 0%, rgba(184,92,56,0.25) 45%, transparent 70%)",
        }}
      />

      <Container className="relative pt-20 pb-28 md:pt-28 md:pb-36">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-marigold">
          AI for adoption attorneys
        </p>

        <h1 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.08] tracking-tight text-paper sm:text-5xl md:text-6xl">
          Every family finds its path.
          <br />
          Every file keeps moving.
        </h1>

        <p className="mt-7 max-w-xl text-lg leading-relaxed text-paper/75 md:text-xl">
          Match every family to the right adoption pathway.
          <br />
          Keep home studies moving without the chasing.
          <br />
          Get LGBTQ clients to finalization faster.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
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
