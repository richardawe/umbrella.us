import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { Hero } from "@/components/marketing/Hero";
import { TestimonialQuote } from "@/components/marketing/TestimonialQuote";
import { HowItWorksStep } from "@/components/marketing/HowItWorksStep";
import { PainPointCard } from "@/components/marketing/PainPointCard";
import { PricingBand } from "@/components/marketing/PricingBand";
import { FAQAccordion } from "@/components/marketing/FAQAccordion";
import { CTASection, FinalCTA } from "@/components/marketing/CTASection";
import { Container } from "@/components/marketing/Container";

const HOW_IT_WORKS = [
  {
    title: "Replace the intake scramble",
    description:
      "A structured intake conversation identifies the right adoption pathway and flags LGBTQ-specific legal issues immediately — not three weeks in.",
  },
  {
    title: "Match the path",
    description:
      "Step-parent/second-parent, foster-to-adopt, private domestic, agency, or international — with the reasoning shown to the attorney, never a black box.",
  },
  {
    title: "Stop the repetitive client chasing",
    description:
      "Plain-language explanations of home study requirements, reminders, and routine Q&A loop until the client actually responds.",
  },
  {
    title: "Clean up the file",
    description:
      "References, background checks, financials, and medical forms land in one matter workspace before the team reviews it.",
  },
  {
    title: "Protect review time and keep cases moving",
    description:
      "Attorneys spend time on substance and court prep — not status updates.",
  },
];

const PAIN_POINTS = [
  {
    title: "Path confusion",
    body: "Generic adoption intake doesn't ask the questions that matter for LGBTQ families — Umbrella does, from day one of the file.",
  },
  {
    title: "Home study friction",
    body: "Umbrella flags agency and provider friendliness up front and keeps documentation moving even when the process is slower than it should be.",
  },
  {
    title: "Paralegal shortage",
    body: "Specialized family law support is hard to hire and keep — worse in a niche practice area with fewer trained staff to go around.",
  },
  {
    title: "Client anxiety",
    body: "Adoption is emotionally loaded for any parent, and LGBTQ clients often carry extra fear about being treated fairly. Umbrella keeps them informed, in plain language, any time of day.",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <TestimonialQuote />

        <section id="how-it-works" className="bg-paper">
          <Container className="py-16 md:py-24">
            <div className="max-w-xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-clay">
                How it works
              </p>
              <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
                From first call to finalization, in one workspace.
              </h2>
            </div>
            <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
              {HOW_IT_WORKS.map((step, i) => (
                <HowItWorksStep
                  key={step.title}
                  index={i + 1}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>
          </Container>
        </section>

        <CTASection />
        <PricingBand />

        <section className="bg-paper">
          <Container className="py-16 md:py-24">
            <div className="max-w-xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-clay">
                Why it matters
              </p>
              <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
                Built for the friction straight couples don&rsquo;t face.
              </h2>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {PAIN_POINTS.map((p) => (
                <PainPointCard key={p.title} title={p.title}>
                  {p.body}
                </PainPointCard>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-paper-dim/40">
          <Container className="py-16 md:py-24">
            <div className="max-w-xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-clay">
                FAQ
              </p>
              <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
                Questions firms ask before signing up.
              </h2>
            </div>
            <div className="mt-12">
              <FAQAccordion />
            </div>
          </Container>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
