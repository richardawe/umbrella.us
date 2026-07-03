import Link from "next/link";
import { Container } from "./Container";
import { PRICE_PLACEHOLDER } from "@/lib/site-config";

export function PricingBand() {
  return (
    <section id="pricing" className="bg-ink text-paper">
      <Container className="py-16 md:py-20">
        <div className="flex flex-col items-center gap-8 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-marigold">
            Pricing
          </p>
          <p className="font-display text-4xl font-medium text-paper md:text-5xl">
            {PRICE_PLACEHOLDER}
          </p>
          <p className="max-w-md text-sm text-paper/60">
            Flat, per case, no seat fees.{" "}
            <span className="text-paper/40">
              PLACEHOLDER — real figure pending business sign-off, see
              PRICING.md.
            </span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
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
        </div>
      </Container>
    </section>
  );
}
