import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  ExternalLink,
  GraduationCap,
  Calendar,
  FileText,
  ShieldCheck,
  Award,
  CheckCircle2,
  Wallet,
  Globe,
} from "lucide-react";
import Section from "@/components/common/Section";
import Badge from "@/components/common/Badge";
import BookmarkButton from "@/components/common/BookmarkButton";
import {
  seedInternationalUniversities,
  getCountryById,
} from "@/data/seedInternational";

function DetailCard({ label, value }) {
  return (
    <div className="rounded-xl border border-line bg-card-muted/40 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-content-muted">
        {label}
      </p>
      <p className="mt-1.5 text-sm font-medium text-content leading-relaxed">
        {value || "Contact university"}
      </p>
    </div>
  );
}

export default function InternationalDetails() {
  const { id } = useParams();
  const uni = seedInternationalUniversities.find((u) => u.id === id);

  if (!uni) {
    return (
      <Section className="min-h-screen">
        <h1 className="text-2xl font-bold text-content">
          International university not found
        </h1>
        <Link
          to="/international"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-300 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to International Universities
        </Link>
      </Section>
    );
  }

  const country = getCountryById(uni.countryId);

  return (
    <Section className="min-h-screen">
      <Link
        to="/international"
        className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-300 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Back to International Universities
      </Link>

      {/* Top University Overview Card */}
      <div className="card-base p-6 sm:p-8 relative">
        <BookmarkButton uniId={uni.id} uniName={uni.name} />

        <div className="flex flex-wrap items-start justify-between gap-4 pr-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl" aria-hidden>
                {country?.flag}
              </span>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-300">
                International University · {country?.name}
              </p>
            </div>

            <h1 className="text-2xl font-bold text-content sm:text-3xl">
              {uni.name}
            </h1>

            <p className="mt-3 flex items-center gap-2 text-sm text-content-muted">
              <MapPin className="h-4 w-4 shrink-0" />
              {uni.city}
            </p>

            {uni.degreeLevel && (
              <p className="mt-1.5 flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-300">
                <GraduationCap className="h-4 w-4 shrink-0" />
                {uni.degreeLevel}
              </p>
            )}
          </div>

          <a
            href={uni.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
          >
            Official Admission Portal <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Badge tone="info" icon={Globe}>
            {country?.name} ({country?.currency})
          </Badge>
          <Badge tone="warning">Last verified: {uni.lastVerifiedAt}</Badge>
        </div>

        {uni.departments?.length > 0 && (
          <div className="mt-6 pt-5 border-t border-line">
            <p className="text-xs font-semibold uppercase tracking-wider text-content-muted mb-2.5">
              Programs & Key Study Areas
            </p>
            <div className="flex flex-wrap gap-2">
              {uni.departments.map((dept, idx) => (
                <span
                  key={idx}
                  className="rounded-xl border border-line bg-surface-muted/50 px-3 py-1.5 text-xs sm:text-sm font-medium text-content"
                >
                  {dept}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tuition, Living Cost, Application Fee, Deadline & Language */}
      <div className="mt-8 card-base p-6 sm:p-8">
        <h2 className="text-xl font-bold text-content flex items-center gap-2 mb-4">
          <Wallet className="h-5 w-5 text-brand-600 dark:text-brand-300" />
          Tuition, Costs, Language & Timeline
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <DetailCard label="Tuition Fees" value={uni.tuitionFees} />
          <DetailCard label="Living & Other Costs" value={uni.livingCosts} />
          <DetailCard label="Application Fee" value={uni.applicationFee} />
          <DetailCard
            label="Application Timeline / Deadline"
            value={uni.applicationDeadline}
          />
          <DetailCard
            label="Language Requirements"
            value={uni.languageRequirements}
          />
          <DetailCard
            label="HSC / Academic Benchmark"
            value={uni.minimumSscHsc}
          />
        </div>
      </div>

      {/* Detailed Admission Requirements, Documents, Process, Scholarship & Visa */}
      <div className="mt-8 space-y-4">
        <article className="card-base p-6">
          <h3 className="text-lg font-bold text-content flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-brand-600 dark:text-brand-300" />
            Eligibility & Admission Requirements
          </h3>
          <p className="mt-2.5 text-sm text-content-muted leading-relaxed">
            {uni.admissionRequirements}
          </p>
        </article>

        <article className="card-base p-6">
          <h3 className="text-lg font-bold text-content flex items-center gap-2">
            <FileText className="h-5 w-5 text-brand-600 dark:text-brand-300" />
            Required Documents
          </h3>
          <p className="mt-2.5 text-sm text-content-muted leading-relaxed">
            {uni.requiredDocuments}
          </p>
        </article>

        <article className="card-base p-6">
          <h3 className="text-lg font-bold text-content flex items-center gap-2">
            <Calendar className="h-5 w-5 text-brand-600 dark:text-brand-300" />
            Step-by-Step Application Process
          </h3>
          <p className="mt-2.5 text-sm text-content-muted leading-relaxed">
            {uni.admissionProcess}
          </p>
        </article>

        <article className="card-base p-6">
          <h3 className="text-lg font-bold text-content flex items-center gap-2">
            <Award className="h-5 w-5 text-brand-600 dark:text-brand-300" />
            Scholarships & Financial Support
          </h3>
          <p className="mt-2.5 text-sm text-content-muted leading-relaxed">
            {uni.scholarshipInfo}
          </p>
        </article>

        <article className="card-base p-6">
          <h3 className="text-lg font-bold text-content flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-brand-600 dark:text-brand-300" />
            Visa & Important Notes
          </h3>
          <p className="mt-2.5 text-sm text-content-muted leading-relaxed">
            {uni.visaRequirements}
          </p>
        </article>
      </div>
    </Section>
  );
}
