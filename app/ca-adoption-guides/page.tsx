import Link from "next/link";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { PageHero } from "@/components/marketing/PageHero";
import { Container } from "@/components/marketing/Container";
import { GUIDES } from "@/lib/guides";

export default function CAAdoptionGuidesIndex() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="California"
          title="CA adoption guides"
          description="A small, carefully verified set of starter guides — depth over breadth, given how much legal accuracy matters here. See init.md for the plan to grow this bench over time."
        />
        <Container className="py-14 md:py-20">
          <div className="mx-auto grid max-w-3xl gap-6">
            {GUIDES.map((guide) => (
              <Link
                key={guide.slug}
                href={`/ca-adoption-guides/${guide.slug}`}
                className="group rounded-2xl border border-line bg-paper-dim/40 p-7 transition-colors hover:border-clay/50"
              >
                <h2 className="font-display text-xl font-medium text-ink group-hover:text-clay">
                  {guide.title}
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  {guide.dek}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
