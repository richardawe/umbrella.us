import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { PageHero } from "@/components/marketing/PageHero";
import { Container } from "@/components/marketing/Container";
import { ASSISTANT_NAME_PLACEHOLDER } from "@/lib/site-config";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="About"
          title="Adoption law has a paralegal-capacity problem. LGBTQ families feel it first."
        />
        <Container className="py-14 md:py-20">
          <div className="mx-auto max-w-2xl space-y-6 text-[15px] leading-relaxed text-ink-soft">
            <p>
              LGBTQ prospective parents face adoption friction straight
              couples usually don&rsquo;t. Some agencies and home-study
              providers are still unwelcoming or slow to work with them. Even
              in marriage-equality states, second-parent or stepparent
              adoption often remains legally advisable for a non-biological
              or non-gestational parent, because marriage alone doesn&rsquo;t
              guarantee full parentage recognition everywhere a family might
              later live. Surrogacy and known-donor arrangements frequently
              require a parentage judgment before or alongside an adoption,
              and most clients have no idea in what order those steps need
              to happen. Trans and nonbinary clients need extra care so that
              name and gender-marker details stay consistent across
              background checks, home-study paperwork, and birth
              certificates.
            </p>
            <p>
              None of that is exotic to a specialized adoption attorney. But
              specialized family-law staff are hard to hire and hard to keep
              in general, and that shortage is worse in a niche practice area
              with fewer people trained in it. The result is the same
              generic checklist, built for a straight married couple&rsquo;s
              home study, routed to every client regardless of their family
              structure — and an attorney spending hours chasing paperwork
              instead of practicing law.
            </p>
            <p>
              <strong className="text-ink">Umbrella</strong> is built to
              close that gap: a structured intake that asks the questions
              that actually matter for LGBTQ families, a transparent
              path-matching engine an attorney can see and override, and a
              matter workspace that keeps references, background checks,
              financials, and medical forms moving without someone on staff
              manually chasing every item down.
            </p>
            <p>
              The client-facing chat layer is currently named the{" "}
              <strong className="text-ink">{ASSISTANT_NAME_PLACEHOLDER}</strong>
              . That&rsquo;s a working name, not a final one — flagged here
              and in the project README for the founding team to confirm or
              replace.
            </p>
            <p>
              Umbrella is workflow software supervised by the retaining
              attorney. It is not a law firm, and it does not provide legal
              advice — see the disclaimer in the footer of every page.
              Umbrella launches in California, with an architecture built so
              future states can be added without a rewrite.
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
