import { GuideLayout, GuideH2, GuideList } from "@/components/marketing/GuideLayout";
import { ca } from "@/states/ca";
import { GUIDES } from "@/lib/guides";

const meta = GUIDES.find((g) => g.slug === "foster-to-adopt-california")!;
const rfa = ca.agencies[1];
const cdssAdoptions = ca.agencies[0];

export default function Page() {
  return (
    <GuideLayout title={meta.title} dek={meta.dek}>
      <p>
        &ldquo;Foster-to-adopt&rdquo; is widely used shorthand, but it
        isn&rsquo;t a program name the California Department of Social
        Services (CDSS) actually uses. Two real CDSS terms cover this
        pathway, and it&rsquo;s worth knowing both.
      </p>

      <GuideH2>Resource Family Approval (RFA)</GuideH2>
      <p>
        <a href={rfa.url} target="_blank" rel="noreferrer" className="underline">
          {rfa.name}
        </a>{" "}
        is the unified caregiver-approval process under Welfare &amp;
        Institutions Code § 16519.5. A single approval qualifies a
        caregiver as a foster parent, a relative caregiver, and a
        prospective adoptive parent — so a family who is already
        RFA-approved doesn&rsquo;t need a separate approval to adopt a child
        placed with them.
      </p>

      <GuideH2>Agency adoption, once the child is legally free</GuideH2>
      <p>
        Once dependency proceedings clear a child for adoption, finalizing
        it is procedurally an{" "}
        <a href={ca.statutes[2].url} target="_blank" rel="noreferrer" className="underline">
          agency adoption
        </a>{" "}
        through CDSS or a licensed agency — the same ADOPT-200 petition and
        finalization forms used in any agency matter, layered on top of the
        dependency case history.
      </p>

      <GuideH2>Adoption Assistance Program (AAP)</GuideH2>
      <p>
        Children adopted out of long-term foster care are frequently
        eligible for ongoing financial and medical support through{" "}
        <a href={cdssAdoptions.url} target="_blank" rel="noreferrer" className="underline">
          CDSS&rsquo;s Adoption Assistance Program
        </a>
        , worth confirming early since it can affect a family&rsquo;s
        planning.
      </p>

      <GuideH2>Where LGBTQ families hit friction here</GuideH2>
      <p>
        Foster-to-adopt cases route through a county or agency social
        worker, and comfort working with LGBTQ resource families still
        varies. Umbrella&rsquo;s intake flags provider friendliness early so
        an attorney can advocate for the client before friction slows the
        case down, rather than after.
      </p>

      <GuideList
        items={[
          <>
            CDSS Resource Family Approval:{" "}
            <a href={rfa.url} target="_blank" rel="noreferrer" className="underline">
              cdss.ca.gov
            </a>
          </>,
          <>
            CDSS Adoptions hub:{" "}
            <a href={cdssAdoptions.url} target="_blank" rel="noreferrer" className="underline">
              cdss.ca.gov
            </a>
          </>,
        ]}
      />
    </GuideLayout>
  );
}
