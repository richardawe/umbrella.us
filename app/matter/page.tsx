"use client";

import Link from "next/link";
import { ProductNav } from "@/components/product/ProductNav";
import { Container } from "@/components/marketing/Container";
import { MatterWorkspace } from "@/components/product/MatterWorkspace";
import { useDemoStore } from "@/lib/demo-store";

export default function MatterPage() {
  const { matters, activeMatterId, getMatter, setChecklistStatus } = useDemoStore();
  const matter = getMatter(activeMatterId) ?? matters[0];

  return (
    <>
      <ProductNav />
      <main className="flex-1 bg-paper">
        <Container className="py-12">
          {!matter ? (
            <div className="rounded-2xl border border-line bg-paper-dim/40 p-10 text-center">
              <p className="text-ink-soft">
                No matter selected yet.{" "}
                <Link href="/dashboard" className="font-medium text-clay hover:underline">
                  Pick one from the dashboard
                </Link>{" "}
                or{" "}
                <Link href="/intake" className="font-medium text-clay hover:underline">
                  start a new intake
                </Link>
                .
              </p>
            </div>
          ) : (
            <MatterWorkspace
              matter={matter}
              onChecklistStatusChange={(itemId, status) =>
                setChecklistStatus(matter.id, itemId, status)
              }
            />
          )}
        </Container>
      </main>
    </>
  );
}
