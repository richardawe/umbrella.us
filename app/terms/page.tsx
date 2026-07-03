import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { PageHero } from "@/components/marketing/PageHero";
import { NoticeBanner } from "@/components/marketing/NoticeBanner";
import { Container } from "@/components/marketing/Container";
import { ENTITY_NAME_PLACEHOLDER, LEGAL_DISCLAIMER } from "@/lib/site-config";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero eyebrow="Legal" title="Terms of Service" />
        <Container className="py-14 md:py-20">
          <div className="mx-auto max-w-2xl space-y-8">
            <NoticeBanner>
              <strong>NOT FINAL — attorney review required before launch.</strong>{" "}
              This is placeholder structure only, drafted to show the shape
              of the page. Do not treat any clause below as binding or
              accurate until reviewed by counsel.
            </NoticeBanner>

            <div className="space-y-6 text-[15px] leading-relaxed text-ink-soft">
              <Section title="1. What Umbrella is">
                Umbrella is legal workflow software licensed to adoption
                attorneys and their firms. {LEGAL_DISCLAIMER}
              </Section>
              <Section title="2. Who may use Umbrella">
                Umbrella is intended for use by licensed attorneys and their
                supervised staff. Client-facing access is provisioned by the
                retaining attorney&rsquo;s firm for a specific matter.
              </Section>
              <Section title="3. Attorney responsibility">
                The retaining attorney remains solely responsible for legal
                advice given to clients, for reviewing any AI-assisted
                output before relying on or sharing it, and for compliance
                with applicable rules of professional conduct.
              </Section>
              <Section title="4. Fees">
                Umbrella is billed on a flat per-case basis. See the pricing
                section on the homepage; a final rate schedule is pending
                business sign-off (see PRICING.md in the project repository).
              </Section>
              <Section title="5. Data and confidentiality">
                Placeholder — data handling, retention, and confidentiality
                terms will be drafted with counsel before this product
                stores any real client data.
              </Section>
              <Section title="6. Limitation of liability">
                Placeholder — standard limitation-of-liability language
                pending attorney review.
              </Section>
              <Section title="7. Changes to these terms">
                {ENTITY_NAME_PLACEHOLDER} may update these terms; material
                changes will be communicated to firm administrators.
              </Section>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-display text-lg font-medium text-ink">{title}</h2>
      <p className="mt-2">{children}</p>
    </div>
  );
}
