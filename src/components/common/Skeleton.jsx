import { cn } from '@/utils/cn';

export function Skeleton({ className }) {
  return <div className={cn('animate-pulse rounded-lg bg-card-muted', className)} />;
}

export function CardSkeleton() {
  return (
    <div className="card-base p-5">
      <div className="flex items-center gap-3">
        <Skeleton className="h-12 w-12 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="mt-4 h-3 w-full" />
      <Skeleton className="mt-2 h-3 w-5/6" />
    </div>
  );
}

export default Skeleton;
