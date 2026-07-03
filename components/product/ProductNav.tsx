"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArcCanopy } from "@/components/marketing/ArcCanopy";
import { useDemoStore } from "@/lib/demo-store";

const LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/intake", label: "New matter" },
  { href: "/matter", label: "Matter workspace" },
  { href: "/portal", label: "Client portal" },
];

export function ProductNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { resetDemo } = useDemoStore();

  return (
    <header className="border-b border-line bg-paper">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-10">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="relative block h-5 w-8">
              <ArcCanopy id="product-nav" tone="ink" className="h-full w-full" />
            </span>
            <span className="font-display text-lg font-medium text-ink">Umbrella</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    active ? "text-ink" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden rounded-full bg-marigold/15 px-3 py-1 text-xs font-medium text-marigold-deep sm:inline">
            Demo data — resets in your browser only
          </span>
          <button
            type="button"
            onClick={() => {
              if (confirm("Reset all demo matters back to the starting sample data?")) {
                resetDemo();
                router.push("/dashboard");
              }
            }}
            className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
          >
            Reset demo
          </button>
        </div>
      </div>
    </header>
  );
}
