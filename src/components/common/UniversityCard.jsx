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

export function UniversityCard({ uni }) {
  // চেক করা হচ্ছে এটি ইন্টারন্যাশনাল ইউনিভার্সিটি কি না (যাদের countryId আছে)
  const isInternational = !!uni.countryId;

  return (
    <Card hover className="flex h-full flex-col relative overflow-visible">
      <BookmarkButton uniId={uni.id} uniName={uni.shortName || uni.name} />

      <div className="flex items-start gap-3">
        {uni.logo ? (
          <img
            src={uni.logo}
            alt={`${uni.shortName || uni.name} logo`}
            className="h-12 w-12 rounded-xl object-contain bg-white"
          />
        ) : (
          <InitialsBadge
            text={uni.shortName || uni.name}
            className="h-12 w-12 text-sm shrink-0"
          />
        )}
        <div className="min-w-0 pr-10">
          <h3 className="truncate font-semibold text-content">
            {uni.shortName || uni.name}
          </h3>
          <p className="truncate text-xs text-content-muted">{uni.name}</p>
        </div>
      </div>

      {/* ডেসক্রিপশন না থাকলে ডিফল্ট টেক্সট দেখাবে */}
      <p className="mt-3 line-clamp-2 text-sm text-content-muted">
        {uni.description ||
          (isInternational
            ? `Explore academic programs and opportunities at ${uni.name}, located in ${uni.city}.`
            : "")}
      </p>

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <span className="inline-flex items-center gap-1 text-content-muted">
          <MapPin className="h-3.5 w-3.5" />
          {uni.division || uni.city}{" "}
          {isInternational && (
            <span className="uppercase font-semibold">({uni.countryId})</span>
          )}
        </span>

        {!isInternational && typeof uni.established === "number" && (
          <span className="inline-flex items-center gap-1 text-content-muted">
            <CalendarDays className="h-3.5 w-3.5" /> Est. {uni.established}
          </span>
        )}
      </div>

      {/* কন্ডিশনাল ব্যাজ (ইন্টারন্যাশনালের জন্য Globe, লোকালের জন্য UGC) */}
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

      <div className="mt-auto pt-4">
        {isInternational ? (
          <a
            href={uni.website}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition hover:gap-2 dark:text-brand-300"
          >
            Visit Website <ExternalLink className="h-4 w-4" />
          </a>
        ) : (
          <Link
            to={`/university/${uni.id}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition hover:gap-2 dark:text-brand-300"
          >
            View details <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </Card>
  );
}

export default UniversityCard;
