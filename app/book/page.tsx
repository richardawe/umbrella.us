"use client";

import { useState } from "react";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { PageHero } from "@/components/marketing/PageHero";
import { NoticeBanner } from "@/components/marketing/NoticeBanner";
import { Container } from "@/components/marketing/Container";

export default function BookPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Schedule a demo"
          title="See Umbrella on a real pathway scenario."
          description="Tell us a bit about your firm and we'll follow up to find a time."
        />
        <Container className="py-14 md:py-20">
          <div className="mx-auto max-w-sm">
            <NoticeBanner>
              <strong>Demo only.</strong> This form isn&rsquo;t wired to a
              real scheduling system yet — no request is actually sent.
            </NoticeBanner>

            {submitted ? (
              <div className="mt-8 rounded-xl border border-line bg-paper-dim/40 p-6 text-center">
                <p className="font-display text-lg font-medium text-ink">
                  Thanks — we&rsquo;ll be in touch.
                </p>
                <p className="mt-2 text-sm text-ink-soft">
                  (Simulated confirmation — no email was actually sent.)
                </p>
              </div>
            ) : (
              <form
                className="mt-8 space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <Field label="Full name" type="text" placeholder="Jamie Rivera" />
                <Field label="Firm name" type="text" placeholder="Your Firm, LLP" />
                <Field label="Work email" type="email" placeholder="you@firm.com" />
                <label className="block">
                  <span className="text-sm font-medium text-ink">
                    What would you like to see?
                  </span>
                  <textarea
                    rows={3}
                    placeholder="e.g. path matching for a surrogacy case, home-study checklist automation…"
                    className="mt-2 w-full rounded-lg border border-line bg-paper px-4 py-2.5 text-[15px] text-ink placeholder:text-ink-soft/50 focus:border-ink focus:outline-none"
                  />
                </label>
                <button
                  type="submit"
                  className="w-full rounded-full bg-marigold px-6 py-3.5 text-base font-medium text-ink transition-colors hover:bg-marigold-deep hover:text-paper"
                >
                  Request a demo
                </button>
              </form>
            )}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

function Field({
  label,
  type,
  placeholder,
}: {
  label: string;
  type: string;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        required
        className="mt-2 w-full rounded-lg border border-line bg-paper px-4 py-2.5 text-[15px] text-ink placeholder:text-ink-soft/50 focus:border-ink focus:outline-none"
      />
    </label>
  );
}
