import { Link } from "react-router-dom";
import {
  MapPin,
  ArrowRight,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Wallet,
} from "lucide-react";
import Card from "./Card";
import Badge from "./Badge";
import { InitialsBadge } from "./Logo";
import BookmarkButton from "./BookmarkButton";

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

  return (
    <Card
      hover
      className="flex h-full w-full min-w-0 flex-col relative overflow-visible"
    >
      {/* Bookmark Button */}
      <BookmarkButton uniId={uni.id} uniName={uni.shortName || uni.name} />

      {/* Top Badges: Group + GPA / Eligibility */}
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

      {/* Department / Programme Name */}
      <h3 className="text-lg font-bold text-content leading-snug mb-3">
        {programme}
      </h3>

      {/* University Info */}
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

      {/* Fee & Credit Box (Directly visible on Card) */}
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

      {/* Eligibility Reason / Note */}
      <p className="text-xs text-content-muted line-clamp-2 mb-4">
        {eligibility.reason}
      </p>

      {/* Footer Action */}
      <div className="mt-auto pt-3 border-t border-line flex items-center justify-between">
        <Link
          to={`/university/${uni.id}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition hover:gap-2 dark:text-brand-300"
        >
          View University Details <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
}

export default MatchedProgramCard;
