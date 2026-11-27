import { Link } from "react-router-dom";
import {
  MapPin,
  CalendarDays,
  ArrowRight,
  BadgeCheck,
  Globe,
  ExternalLink,
} from "lucide-react";
import Card from "./Card";
import Badge from "./Badge";
import { InitialsBadge } from "./Logo";
import BookmarkButton from "./BookmarkButton";
import { getUniversityWebsite } from "@/data/universityWebsites";

export function UniversityCard({ uni }) {
  const isInternational = !!uni.countryId;
  const { url: websiteUrl } = getUniversityWebsite(uni);
  const detailsPath = isInternational
    ? `/international/${uni.id}`
    : `/university/${uni.id}`;

  return (
    <Card
      hover
      className="relative flex h-full w-full min-w-0 flex-col overflow-visible"
    >
      <BookmarkButton uniId={uni.id} uniName={uni.shortName || uni.name} />

      <div className="flex items-start gap-3">
        {uni.logo ? (
          <img
            src={uni.logo}
            alt={`${uni.shortName || uni.name} logo`}
            className="h-12 w-12 shrink-0 rounded-xl bg-white object-contain"
          />
        ) : (
          <InitialsBadge
            text={uni.shortName || uni.name}
            className="h-12 w-12 shrink-0 text-sm"
          />
        )}
        <div className="min-w-0 flex-1 pr-10">
          <h3 className="truncate font-semibold text-content">
            {uni.shortName || uni.name}
          </h3>
          <p className="truncate text-xs text-content-muted">{uni.name}</p>
        </div>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-content-muted">
        {uni.description ||
          (isInternational
            ? `Explore academic programs and opportunities at ${uni.name}, located in ${uni.city}.`
            : "")}
      </p>

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <span className="inline-flex items-center gap-1 text-content-muted">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          {uni.division || uni.city}{" "}
          {isInternational && (
            <span className="font-semibold uppercase">({uni.countryId})</span>
          )}
        </span>

        {!isInternational && typeof uni.established === "number" && (
          <span className="inline-flex items-center gap-1 text-content-muted">
            <CalendarDays className="h-3.5 w-3.5 shrink-0" /> Est.{" "}
            {uni.established}
          </span>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {isInternational ? (
          <>
            <Badge tone="info" icon={Globe}>
              International
            </Badge>
            <Badge tone="warning">
              Fees: {uni.tuitionFees?.split(" ")[0] || "Varies"}
            </Badge>
          </>
        ) : (
          <>
            <Badge tone="info" icon={BadgeCheck}>
              {uni.ugcStatus?.includes("UGC") ? "UGC-approved" : "Private"}
            </Badge>
            <Badge tone="warning">Fees: verify</Badge>
          </>
        )}
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
        <Link
          to={detailsPath}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition hover:gap-2 dark:text-brand-300"
        >
          View details <ArrowRight className="h-4 w-4" />
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

export default UniversityCard;
