import { Link } from 'react-router-dom';
import { MapPin, CalendarDays, ArrowRight, BadgeCheck } from 'lucide-react';
import Card from './Card';
import Badge from './Badge';
import { InitialsBadge } from './Logo';

/** Compact university card used on the homepage and (later) listings. */
export function UniversityCard({ uni }) {
  return (
    <Card hover className="flex h-full flex-col">
      <div className="flex items-start gap-3">
        {uni.logo ? (
          <img
            src={uni.logo}
            alt={`${uni.shortName} logo`}
            className="h-12 w-12 rounded-xl object-contain"
          />
        ) : (
          <InitialsBadge text={uni.shortName || uni.name} className="h-12 w-12 text-sm" />
        )}
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-content">{uni.shortName}</h3>
          <p className="truncate text-xs text-content-muted">{uni.name}</p>
        </div>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-content-muted">{uni.description}</p>

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <span className="inline-flex items-center gap-1 text-content-muted">
          <MapPin className="h-3.5 w-3.5" /> {uni.division}
        </span>
        {typeof uni.established === 'number' && (
          <span className="inline-flex items-center gap-1 text-content-muted">
            <CalendarDays className="h-3.5 w-3.5" /> Est. {uni.established}
          </span>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <Badge tone="info" icon={BadgeCheck}>
          {uni.ugcStatus?.includes('UGC') ? 'UGC-approved' : 'Private'}
        </Badge>
        <Badge tone="warning">Fees: verify</Badge>
      </div>

      <div className="mt-auto pt-4">
        <Link
          to={`/university/${uni.id}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition hover:gap-2 dark:text-brand-300"
        >
          View details <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
}

export default UniversityCard;
