import { Link } from "react-router-dom";
import {
  MapPin,
  ArrowRight,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Wallet,
  ExternalLink,
} from "lucide-react";
import Card from "./Card";
import Badge from "./Badge";
import { InitialsBadge } from "./Logo";
import BookmarkButton from "./BookmarkButton";
import { getUniversityWebsite } from "@/data/universityWebsites";

export function MatchedProgramCard({ item }) {
  const {
    programme,
    group,
    totalCredits,
    perCreditFee,
    totalDegreeCost,
    university: uni,
    eligibility,
  } = item;

  const isEligible = eligibility.status.startsWith("Eligible");
  const isBelowGpa = eligibility.status === "Below published GPA";
  const isMinGpaLabel = eligibility.status.startsWith("Min GPA");
  const { url: websiteUrl } = getUniversityWebsite(uni);

  return (
    <Card
      hover
      className="flex h-full w-full min-w-0 flex-col relative overflow-visible"
    >
      <BookmarkButton uniId={uni.id} uniName={uni.shortName || uni.name} />

      <div className="flex flex-wrap items-center gap-1.5 pr-10 mb-3">
        <Badge tone="info" icon={GraduationCap}>
          {group}
        </Badge>
        <Badge
          tone={
            isEligible || isMinGpaLabel
              ? "success"
              : isBelowGpa
                ? "danger"
                : "warning"
          }
          icon={isEligible || isMinGpaLabel ? CheckCircle2 : AlertCircle}
        >
          {eligibility.status}
        </Badge>
      </div>

      <h3 className="text-lg font-bold text-content leading-snug mb-3">
        {programme}
      </h3>

      <div className="flex items-center gap-2.5 mb-4">
        {uni.logo ? (
          <img
            src={uni.logo}
            alt={uni.shortName || uni.name}
            className="h-9 w-9 rounded-lg object-contain bg-white shrink-0"
          />
        ) : (
          <InitialsBadge
            text={uni.shortName || uni.name}
            className="h-9 w-9 text-xs shrink-0"
          />
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-content">
            {uni.name}
          </p>
          <p className="truncate text-xs text-content-muted flex items-center gap-1">
            <MapPin className="h-3 w-3 shrink-0" />
            {uni.city}, {uni.division}
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-surface-muted/70 border border-line p-3.5 mb-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-content-muted flex items-center gap-1.5">
            <Wallet className="h-3.5 w-3.5 text-brand-500" /> Total Degree Cost
          </span>
          <span className="text-base font-extrabold text-brand-600 dark:text-brand-400">
            {totalDegreeCost}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs border-t border-line/70 pt-2">
          <span className="text-content-muted flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5" /> Credits:{" "}
            <strong className="text-content">{totalCredits}</strong>
          </span>
          {perCreditFee && perCreditFee !== "Not published" && (
            <span className="text-content-muted">
              Per Credit:{" "}
              <strong className="text-content">{perCreditFee}</strong>
            </span>
          )}
        </div>
      </div>

      <p className="text-xs text-content-muted line-clamp-2 mb-4">
        {eligibility.reason}
      </p>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3">
        <Link
          to={`/university/${uni.id}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition hover:gap-2 dark:text-brand-300"
        >
          View Details <ArrowRight className="h-4 w-4" />
        </Link>

        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-lg border border-line bg-surface-muted/70 px-2.5 py-1.5 text-xs font-semibold text-content transition hover:border-brand-500/40 hover:text-brand-600 dark:hover:text-brand-300"
        >
          Official Website <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </Card>
  );
}

export default MatchedProgramCard;
