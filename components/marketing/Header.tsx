import Link from "next/link";
import { Container } from "./Container";
import { ArcCanopy } from "./ArcCanopy";
import { MAIN_NAV } from "@/lib/site-config";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="relative block h-6 w-9">
            <ArcCanopy id="wordmark" tone="marigold" className="h-full w-full" />
          </span>
          <span className="font-display text-xl font-medium tracking-tight text-ink">
            Umbrella
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[15px] text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/sign-in"
            className="hidden sm:block text-[15px] font-medium text-ink-soft transition-colors hover:text-ink"
          >
            Login
          </Link>
          <Link
            href="/firm/sign-up"
            className="rounded-full bg-ink px-4 py-2 text-[15px] font-medium text-paper transition-colors hover:bg-ink-soft"
          >
            Sign up
          </Link>
        </div>
      </Container>
    </header>
  );
}
