import Link from "next/link";
import { GuideLayout, GuideH2, GuideList } from "@/components/marketing/GuideLayout";
import { ca } from "@/states/ca";
import { GUIDES } from "@/lib/guides";

const meta = GUIDES.find((g) => g.slug === "how-to-adopt-in-california")!;

export default function Page() {
  return (
    <GuideLayout title={meta.title} dek={meta.dek}>
      <p>
        California&rsquo;s Family Code groups every adoption into one of a
        handful of procedural categories. Which one applies to a given
        family determines the forms, investigation requirements, and
        timeline — so getting it right at intake matters more than it might
        seem.
      </p>

      <GuideH2>The five pathways</GuideH2>
      <GuideList
        items={[
          <>
            <strong className="text-ink">Stepparent / second-parent adoption</strong> —
            for a spouse or registered domestic partner adopting their
            partner&rsquo;s child. Governed by{" "}
            <a href={ca.statutes[0].url} target="_blank" rel="noreferrer" className="underline">
              Family Code §§ 9000–9007
            </a>
            . See our{" "}
            <Link href="/ca-adoption-guides/second-parent-adoption-california" className="underline">
              dedicated guide
            </Link>
            .
          </>,
          <>
            <strong className="text-ink">Foster-to-adopt</strong> — adopting a
            child already placed with you through the foster care system,
            typically as a Resource Family Approval (RFA) caregiver. See our{" "}
            <Link href="/ca-adoption-guides/foster-to-adopt-california" className="underline">
              dedicated guide
            </Link>
            .
          </>,
          <>
            <strong className="text-ink">Agency adoption</strong> — a
            licensed public or private adoption agency, or a CDSS Adoption
            Regional Office, places the child. Governed by{" "}
            <a href={ca.statutes[2].url} target="_blank" rel="noreferrer" className="underline">
              Family Code §§ 8700–8720
            </a>
            .
          </>,
          <>
            <strong className="text-ink">Private domestic (independent) adoption</strong> —
            birth parent(s) and prospective adoptive parent(s) identify each
            other directly, without an agency intermediary. Governed by{" "}
            <a href={ca.statutes[3].url} target="_blank" rel="noreferrer" className="underline">
              Family Code §§ 8800–8823
            </a>
            .
          </>,
          <>
            <strong className="text-ink">International (intercountry) adoption</strong> —
            the child was born outside the United States. Governed by{" "}
            <a href={ca.statutes[4].url} target="_blank" rel="noreferrer" className="underline">
              Family Code §§ 8900–8925
            </a>{" "}
            alongside federal immigration and, often, Hague Convention
            requirements.
          </>,
        ]}
      />

      <GuideH2>What&rsquo;s common to all five</GuideH2>
      <p>
        Every California adoption opens with{" "}
        <a href={ca.forms[0].url} target="_blank" rel="noreferrer" className="underline">
          ADOPT-200, Adoption Request
        </a>{" "}
        and includes an Indian Child Welfare Act inquiry (ICWA-010(A)) before
        the court will finalize the matter. Most pathways other than the
        streamlined stepparent process also require a background check, a
        home study or investigation, references, financial disclosure, and
        medical clearance before the file is ready for the court.
      </p>

      <GuideH2>Where LGBTQ-specific issues show up</GuideH2>
      <p>
        The pathway categories themselves are neutral, but where a client
        lands often isn&rsquo;t obvious without asking the right questions:
        a married same-sex couple who used a known donor may need a
        parentage judgment sequenced before their confirmatory adoption; an
        unmarried partner can&rsquo;t use the streamlined stepparent process
        at all; and home-study agencies vary in how comfortable they are
        with LGBTQ families. This is exactly the gap Umbrella&rsquo;s intake
        and path-matching are built to close — see the homepage for how the
        product works.
      </p>
    </GuideLayout>
  );
}
