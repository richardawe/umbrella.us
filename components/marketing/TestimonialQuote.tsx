import { Container } from "./Container";

export function TestimonialQuote() {
  return (
    <section className="bg-paper">
      <Container className="py-14 md:py-20">
        <figure className="mx-auto max-w-2xl text-center">
          <blockquote className="font-display text-2xl font-medium leading-snug text-ink md:text-3xl">
            &ldquo;My clients used to disappear for weeks between document
            requests. Now they text me back the same day, and I finally have
            time for the cases that need real strategy.&rdquo;
          </blockquote>
          <figcaption className="mt-6 text-sm text-ink-soft">
            <span className="font-medium text-ink">PLACEHOLDER — replace before launch</span>
            <br />
            Attorney name, Firm name — adoption &amp; family law
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
