"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { PageHero } from "@/components/marketing/PageHero";
import { NoticeBanner } from "@/components/marketing/NoticeBanner";
import { Container } from "@/components/marketing/Container";

export default function FirmSignUpPage() {
  const router = useRouter();

  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Sign up"
          title="Set up your firm on Umbrella."
          description="Enter any details below — this is a UI demo, not a real account."
        />
        <Container className="py-14 md:py-20">
          <div className="mx-auto max-w-sm">
            <NoticeBanner>
              <strong>Demo only.</strong> No account is created and no data
              is stored server-side. Submitting this form takes you to the
              demo dashboard with a sample matter already loaded.
            </NoticeBanner>

            <form
              className="mt-8 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                router.push("/dashboard");
              }}
            >
              <Field label="Firm name" type="text" placeholder="Your Firm, LLP" />
              <Field label="Work email" type="email" placeholder="you@firm.com" />
              <Field label="Password" type="password" placeholder="••••••••" />
              <button
                type="submit"
                className="w-full rounded-full bg-marigold px-6 py-3.5 text-base font-medium text-ink transition-colors hover:bg-marigold-deep hover:text-paper"
              >
                Create account
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-ink-soft">
              Already have an account?{" "}
              <Link href="/sign-in" className="font-medium text-ink underline underline-offset-4">
                Log in
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
