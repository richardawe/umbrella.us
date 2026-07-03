import { GuideLayout, GuideH2, GuideList } from "@/components/marketing/GuideLayout";
import { ca } from "@/states/ca";
import { GUIDES } from "@/lib/guides";

const meta = GUIDES.find((g) => g.slug === "second-parent-adoption-california")!;
const stepparentStatute = ca.statutes[0];
const confirmatoryStatute = ca.statutes[1];

export default function Page() {
  return (
    <GuideLayout title={meta.title} dek={meta.dek}>
      <p>
        &ldquo;Second-parent adoption&rdquo; is the term LGBTQ families and
        their attorneys commonly use, but it is not its own category in the
        California Family Code. Procedurally, it&rsquo;s a{" "}
        <strong className="text-ink">stepparent adoption</strong> under{" "}
        <a href={stepparentStatute.url} target="_blank" rel="noreferrer" className="underline">
          Family Code §§ 9000–9007
        </a>
        . Subsection 9000(b) extends the same procedure to a registered
        domestic partner adopting their partner&rsquo;s child, and
        subsection (g) confirms stepparent adoption &ldquo;includes adoption
        by a domestic partner.&rdquo;
      </p>

      <GuideH2>Why file at all if you&rsquo;re already married?</GuideH2>
      <p>
        Attorneys commonly advise a confirmatory second-parent adoption even
        for married couples, because a marriage certificate or an in-state
        birth certificate listing both parents doesn&rsquo;t always
        guarantee full parentage recognition if the family later moves, or
        if parentage is challenged. A court adoption judgment, unlike a
        birth certificate, is entitled to full faith and credit nationwide.
      </p>
      <p className="text-sm italic text-ink-soft/80">
        Note: this rationale is standard family-law practice guidance, not
        language taken from an official California government source — no
        CDSS or California Courts page we could verify frames the
        recommendation in explicitly LGBTQ or <em>Obergefell</em>-specific
        terms. Present it to clients as your firm&rsquo;s legal judgment,
        not as a quote from the state.
      </p>

      <GuideH2>Married or domestic-partnered, and used a donor or surrogate?</GuideH2>
      <p>
        <a href={confirmatoryStatute.url} target="_blank" rel="noreferrer" className="underline">
          Family Code § 9000.5
        </a>{" "}
        offers a streamlined confirmatory process for married or
        domestic-partnered couples whose child was conceived through
        assisted reproduction or gestational surrogacy: the standard
        investigation and hearing can be waived absent good cause. The
        matching forms are{" "}
        <span className="text-ink">ADOPT-205</span> (assisted reproduction)
        or <span className="text-ink">ADOPT-206</span> (gestational
        surrogacy), filed alongside ADOPT-200 and the stepparent-specific{" "}
        <span className="text-ink">ADOPT-203</span>.
      </p>
      <p>
        Where a surrogacy or known-donor arrangement was used and no
        parentage judgment exists yet, sequence that judgment before or
        alongside the adoption filing — Umbrella&rsquo;s path-matching
        engine flags this automatically during intake.
      </p>

      <GuideH2>Not married or registered?</GuideH2>
      <p>
        The stepparent procedure requires marriage or a registered domestic
        partnership. An unmarried, unregistered partner of the child&rsquo;s
        legal parent cannot use it, and instead needs a full independent
        adoption under{" "}
        <a href={ca.statutes[3].url} target="_blank" rel="noreferrer" className="underline">
          Family Code §§ 8800–8823
        </a>
        , investigation included. Flag this to clients early — it changes
        both the timeline and the checklist.
      </p>

      <GuideH2>Forms referenced in this guide</GuideH2>
      <GuideList
        items={ca.forms
          .filter((f) => ["ADOPT-200", "ADOPT-203", "ADOPT-205", "ADOPT-206"].includes(f.number))
          .map((f) => (
            <>
              <a href={f.url} target="_blank" rel="noreferrer" className="underline">
                {f.number} — {f.title}
              </a>
              : {f.description}
            </>
          ))}
      />
    </GuideLayout>
  );
}
