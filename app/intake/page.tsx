import { ProductNav } from "@/components/product/ProductNav";
import { Container } from "@/components/marketing/Container";
import { IntakeFlow } from "@/components/product/IntakeFlow";

export default function IntakePage() {
  return (
    <>
      <ProductNav />
      <main className="flex-1 bg-paper">
        <Container className="py-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-clay">
            New matter intake
          </p>
          <h1 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink">
            Match this family to a pathway
          </h1>
          <p className="mt-3 max-w-xl text-[15px] text-ink-soft">
            Answers feed the path-matching engine directly — the pathway
            recommendation and its reasoning are computed by an explicit
            rules module, not a language model, given the legal stakes.
          </p>
          <div className="mt-10">
            <IntakeFlow />
          </div>
        </Container>
      </main>
    </>
  );
}
