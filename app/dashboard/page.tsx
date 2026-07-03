"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProductNav } from "@/components/product/ProductNav";
import { StatusPill } from "@/components/product/StatusPill";
import { Container } from "@/components/marketing/Container";
import { useDemoStore } from "@/lib/demo-store";

export default function DashboardPage() {
  const router = useRouter();
  const { matters, setActiveMatterId } = useDemoStore();

  function openMatter(id: string) {
    setActiveMatterId(id);
    router.push("/matter");
  }

  return (
    <>
      <ProductNav />
      <main className="flex-1 bg-paper">
        <Container className="py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-clay">
                Firm dashboard
              </p>
              <h1 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink">
                Matters
              </h1>
            </div>
            <Link
              href="/intake"
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-ink-soft"
            >
              + New matter
            </Link>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-line">
            <table className="w-full text-left text-sm">
              <thead className="bg-paper-dim/60 text-xs uppercase tracking-wide text-ink-soft">
                <tr>
                  <th className="px-5 py-3 font-medium">Client</th>
                  <th className="px-5 py-3 font-medium">Pathway</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Outstanding items</th>
                  <th className="px-5 py-3 font-medium">Opened</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {matters.map((matter) => {
                  const outstanding = matter.checklist.filter(
                    (c) => c.status !== "received" && c.status !== "waived"
                  ).length;
                  return (
                    <tr key={matter.id} className="bg-paper">
                      <td className="px-5 py-4 font-medium text-ink">
                        {matter.clientName}
                      </td>
                      <td className="px-5 py-4 text-ink-soft">
                        {matter.pathwayLabel}
                      </td>
                      <td className="px-5 py-4">
                        <StatusPill status={matter.status} />
                      </td>
                      <td className="px-5 py-4 text-ink-soft">
                        {outstanding === 0 ? "All in" : `${outstanding} open`}
                      </td>
                      <td className="px-5 py-4 text-ink-soft">{matter.createdAt}</td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => openMatter(matter.id)}
                          className="text-sm font-medium text-clay hover:underline"
                        >
                          Open →
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Container>
      </main>
    </>
  );
}
