import Link from "next/link";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Container } from "./Container";
import { NoticeBanner } from "./NoticeBanner";

export function GuideLayout({
  title,
  dek,
  children,
}: {
  title: string;
  dek: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="border-b border-line bg-paper-dim/40">
          <Container className="py-14 md:py-20">
            <Link
              href="/ca-adoption-guides"
              className="text-sm font-medium text-clay hover:underline"
            >
              ← CA adoption guides
            </Link>
            <h1 className="mt-5 max-w-2xl font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
              {title}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
              {dek}
            </p>
          </Container>
        </section>
        <Container className="py-14 md:py-20">
          <div className="mx-auto max-w-2xl">
            <NoticeBanner>
              This guide explains general California procedure and is not
              legal advice for your specific situation. Every citation and
              form number was verified against leginfo.legislature.ca.gov,
              selfhelp.courts.ca.gov, or cdss.ca.gov as of this writing —
              always confirm current requirements with your attorney or the
              court before relying on them.
            </NoticeBanner>
            <div className="prose-guide mt-10 space-y-6 text-[15px] leading-relaxed text-ink-soft">
              {children}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export function GuideH2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="!mt-12 font-display text-xl font-medium text-ink">
      {children}
    </h2>
  );
}

export function GuideList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
