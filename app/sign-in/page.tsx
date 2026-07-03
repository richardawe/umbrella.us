"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { PageHero } from "@/components/marketing/PageHero";
import { NoticeBanner } from "@/components/marketing/NoticeBanner";
import { Container } from "@/components/marketing/Container";

export default function SignInPage() {
  const router = useRouter();

  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Login"
          title="Log in to your firm's workspace."
          description="Enter any details below — this is a UI demo, not a real sign-in."
        />
        <Container className="py-14 md:py-20">
          <div className="mx-auto max-w-sm">
            <NoticeBanner>
              <strong>Demo only.</strong> Umbrella ships as a static site for
              v0, so there is no real authentication yet. Submitting this
              form takes you straight to the demo dashboard.
            </NoticeBanner>

            <form
              className="mt-8 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                router.push("/dashboard");
              }}
            >
              <Field label="Work email" type="email" placeholder="you@firm.com" />
              <Field label="Password" type="password" placeholder="••••••••" />
              <button
                type="submit"
                className="w-full rounded-full bg-ink px-6 py-3.5 text-base font-medium text-paper transition-colors hover:bg-ink-soft"
              >
                Log in
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-ink-soft">
              New to Umbrella?{" "}
              <Link href="/firm/sign-up" className="font-medium text-ink underline underline-offset-4">
                Sign up
              </Link>
            </p>
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
