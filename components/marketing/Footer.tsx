import Link from "next/link";
import { Container } from "./Container";
import { ArcCanopy } from "./ArcCanopy";
import {
  LEGAL_DISCLAIMER,
  RESOURCES_LINKS,
  MORE_INFO_LINKS,
  OFFICIAL_LINKS,
  ENTITY_NAME_PLACEHOLDER,
} from "@/lib/site-config";

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-line-dark bg-ink text-paper/80">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="relative block h-5 w-8">
                <ArcCanopy id="footer-mark" tone="marigold" className="h-full w-full" />
              </span>
              <span className="font-display text-lg font-medium text-paper">
                Umbrella
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">
              Workflow software for adoption attorneys serving LGBTQ
              prospective parents, from intake to finalization.
            </p>
            <div className="mt-6 flex gap-4">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="text-xs text-paper/50 underline decoration-paper/30 underline-offset-4 hover:text-paper/80"
                >
                  {s.label}
                  <span className="ml-1 text-paper/30">(placeholder)</span>
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Resources" links={RESOURCES_LINKS} />
          <FooterColumn title="More info" links={MORE_INFO_LINKS} />

          <div>
            <h3 className="font-display text-sm font-medium text-paper">
              Official resources
            </h3>
            <ul className="mt-4 space-y-3">
              {OFFICIAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-paper/60 transition-colors hover:text-paper"
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-paper/10 pt-8">
          <p className="max-w-4xl text-xs leading-relaxed text-paper/50">
            {LEGAL_DISCLAIMER}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-2 text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {ENTITY_NAME_PLACEHOLDER} — All rights reserved.{" "}
            <span className="text-paper/30">
              (placeholder entity name — confirm real legal entity before launch)
            </span>
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="font-display text-sm font-medium text-paper">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-paper/60 transition-colors hover:text-paper"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
