import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { PageHero } from "@/components/marketing/PageHero";
import { NoticeBanner } from "@/components/marketing/NoticeBanner";
import { Container } from "@/components/marketing/Container";
import { ENTITY_NAME_PLACEHOLDER } from "@/lib/site-config";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero eyebrow="Legal" title="Privacy Policy" />
        <Container className="py-14 md:py-20">
          <div className="mx-auto max-w-2xl space-y-8">
            <NoticeBanner>
              <strong>NOT FINAL — attorney review required before launch.</strong>{" "}
              This is placeholder structure only. The v0 marketing and demo
              product screens do not collect or store real client data — see
              the README for what&rsquo;s mocked vs. real.
            </NoticeBanner>

            <div className="space-y-6 text-[15px] leading-relaxed text-ink-soft">
              <Section title="1. What this covers">
                This policy will describe how {ENTITY_NAME_PLACEHOLDER}{" "}
                handles information collected through umbrella.us and the
                Umbrella product, once real accounts and data storage exist.
              </Section>
              <Section title="2. Current state (v0)">
                Today, the demo dashboard, intake flow, matter workspace,
                and client portal run entirely in your browser using mock
                data and, where noted, <code className="text-ink">localStorage</code>.
                Nothing you enter on this demo site is transmitted to a
                server or seen by Umbrella staff.
              </Section>
              <Section title="3. Client and case data (future)">
                Placeholder — once Umbrella moves off static hosting to
                support real accounts, this section will describe categories
                of case data collected, retention periods, and access
                controls, drafted with counsel and aligned to applicable
                confidentiality obligations.
              </Section>
              <Section title="4. Third parties">
                Placeholder — will list any subprocessors (e.g. hosting,
                the AI provider used for the assistant) once the live
                assistant milestone is built.
              </Section>
              <Section title="5. Contact">
                Placeholder — a real contact method will be added before
                launch.
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
