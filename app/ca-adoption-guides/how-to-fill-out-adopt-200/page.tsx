import { GuideLayout, GuideH2, GuideList } from "@/components/marketing/GuideLayout";
import { ca } from "@/states/ca";
import { GUIDES } from "@/lib/guides";

const meta = GUIDES.find((g) => g.slug === "how-to-fill-out-adopt-200")!;
const adopt200 = ca.forms[0];

export default function Page() {
  return (
    <GuideLayout title={meta.title} dek={meta.dek}>
      <p>
        <strong className="text-ink">Correcting a common assumption:</strong>{" "}
        ADOPT-200 is not a stepparent-specific form. It&rsquo;s the{" "}
        <a href={adopt200.url} target="_blank" rel="noreferrer" className="underline">
          general Adoption Request
        </a>{" "}
        used to open every California adoption case — stepparent, agency,
        independent, or intercountry. If your matter is a stepparent /
        second-parent adoption, ADOPT-200 is filed together with the
        stepparent-specific supplement, ADOPT-203, not instead of it.
      </p>

      <GuideH2>What ADOPT-200 asks for</GuideH2>
      <p>
        The form identifies the child, the petitioner(s), the child&rsquo;s
        legal parent(s) and their relationship to the petitioner, and the
        basis for the adoption. It&rsquo;s the entry point the court uses to
        open the case file, and it&rsquo;s where the court first sees which
        pathway you&rsquo;re asserting.
      </p>

      <GuideH2>What to file alongside it, by pathway</GuideH2>
      <GuideList
        items={[
          <>
            <strong className="text-ink">Stepparent / second-parent:</strong>{" "}
            add ADOPT-203, and — if using the streamlined confirmatory
            process — ADOPT-205 or ADOPT-206.
          </>,
          <>
            <strong className="text-ink">Agency, independent, or intercountry:</strong>{" "}
            ADOPT-200 stands alone as the petition; the home study,
            background check, and agency paperwork are separate filings
            tracked outside this form.
          </>,
          <>
            <strong className="text-ink">Every pathway:</strong> the ICWA
            inquiry (ICWA-010(A)) is required alongside ADOPT-200 regardless
            of pathway.
          </>,
        ]}
      />

      <GuideH2>After ADOPT-200</GuideH2>
      <p>
        Once the petition is on file, the matter moves toward the Adoption
        Agreement (ADOPT-210) and, at finalization, the Adoption Order
        (ADOPT-215). Umbrella&rsquo;s matter workspace tracks every
        pathway-specific document against this baseline checklist so nothing
        is missed between filing and finalization.
      </p>
    </GuideLayout>
  );
}
