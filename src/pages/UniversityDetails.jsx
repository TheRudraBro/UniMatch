import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, ExternalLink } from "lucide-react";
import Section from "@/components/common/Section";
import Badge from "@/components/common/Badge";
import { getRequirements } from "@/utils/admission";
import { getUniversityWebsite } from "@/data/universityWebsites";
import { useUniversityData } from "@/context/UniversityDataContext";

function Info({ label, value }) {
  return (
    <div className="rounded-xl border border-line bg-card-muted/40 p-3">
      <p className="text-xs text-content-muted">{label}</p>
      <p className="mt-1 font-semibold text-content">{value || "N/A"}</p>
    </div>
  );
}

export default function UniversityDetails() {
  const { id } = useParams();
  const { universities, programmes, admissionRequirements } =
    useUniversityData();

  const uni = universities.find((u) => u.id === id);
  if (!uni)
    return (
      <Section>
        <h1 className="text-2xl font-bold text-content">
          University not found
        </h1>
        <Link className="mt-4 inline-block text-brand-600" to="/find">
          Back to results
        </Link>
      </Section>
    );

  const rows = programmes.filter((p) => p.university === uni.name);
  const reqs = admissionRequirements.filter((r) => r.university === uni.name);
  const { url: websiteUrl } = getUniversityWebsite(uni);

  return (
    <Section>
      <Link
        to="/find"
        className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-300"
      >
        <ArrowLeft className="h-4 w-4" /> Back to search
      </Link>
      <div className="card-base p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-300">
              Private university · Bangladesh
            </p>
            <h1 className="mt-2 text-2xl font-bold text-content sm:text-3xl">
              {uni.name}
            </h1>
            <p className="mt-3 flex items-center gap-2 text-sm text-content-muted">
              <MapPin className="h-4 w-4" />
              {uni.district}, {uni.division} Division
            </p>
          </div>

          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
          >
            Official Website <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge tone="info">{rows.length} programme records</Badge>
          <Badge tone="warning">Confirm current fees & UGC status</Badge>
        </div>
        <p className="mt-4 text-sm text-content-muted">{uni.ugcCaution}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-content">
          Departments & programme fees
        </h2>
        <p className="mt-1 text-sm text-content-muted">
          Each row below preserves the fee and credit details captured in the
          workbook.
        </p>
        <div className="mt-4 space-y-4">
          {rows.map((p) => {
            const matched = getRequirements(uni.name, p.programme);
            return (
              <article key={p.id} className="card-base p-5">
                <h3 className="text-lg font-semibold text-content">
                  {p.programme}
                </h3>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm md:grid-cols-3">
                  <Info label="Total degree cost" value={p.totalDegreeCost} />
                  <Info label="Total credits" value={p.totalCredits} />
                  <Info label="Total semesters" value={p.totalSemesters} />
                  <Info label="Per-credit fee" value={p.perCreditFee} />
                  <Info label="Tuition cost" value={p.tuitionCost} />
                  <Info label="Other fees" value={p.otherFees} />
                  <Info
                    label="First / admission payment"
                    value={p.firstAdmissionPayment}
                  />
                </div>
                {matched.length > 0 && (
                  <div className="mt-4 rounded-xl border border-line bg-surface-muted/40 p-3 text-xs text-content-muted">
                    <strong className="text-content">
                      Admission Requirement:{" "}
                    </strong>
                    {matched[0].generalEligibility ||
                      `SSC GPA ${matched[0].sscGpa || "N/A"}, HSC GPA ${matched[0].hscGpa || "N/A"}`}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>

      {reqs.length > 0 && (
        <div className="mt-8 card-base p-6">
          <h2 className="text-lg font-bold text-content mb-3">
            General Admission Notes
          </h2>
          <ul className="space-y-2 text-sm text-content-muted list-disc pl-5">
            {reqs.map((r) => (
              <li key={r.id}>
                <strong className="text-content">
                  {r.applicableProgramme}:
                </strong>{" "}
                {r.generalEligibility ||
                  `Min SSC ${r.sscGpa || "N/A"}, Min HSC ${r.hscGpa || "N/A"}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
