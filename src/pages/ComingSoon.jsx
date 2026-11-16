import { useLocation, useSearchParams } from 'react-router-dom';
import { Hammer, ArrowLeft, Home } from 'lucide-react';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';

/**
 * Shared placeholder for pages planned in later phases. Keeps every nav/footer
 * link resolving (no dead buttons) and shows any query params passed in, so the
 * homepage quick-search demonstrably routes here with the user's filters.
 */
export default function ComingSoon({ title, description, phase }) {
  const { pathname } = useLocation();
  const [params] = useSearchParams();
  const entries = [...params.entries()];

  return (
    <section className="container-px flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-300">
        <Hammer className="h-8 w-8" />
      </span>
      <Badge tone="brand" className="mt-5">Coming soon{phase ? ` · ${phase}` : ''}</Badge>
      <h1 className="mt-4 text-3xl font-bold text-content sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-lg text-content-muted">
        {description ||
          'This page is part of a later build phase. The foundation, design system and homepage are live — this section is on the way.'}
      </p>

      {entries.length > 0 && (
        <div className="mt-6 w-full max-w-lg rounded-2xl border border-line bg-card p-4 text-left">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-content-muted">
            Received search filters ({pathname})
          </p>
          <div className="flex flex-wrap gap-2">
            {entries.map(([k, v]) => (
              <Badge key={k} tone="info">
                {k}: {v}
              </Badge>
            ))}
          </div>
          <p className="mt-3 text-xs text-content-muted">
            The matching engine will consume these in the next phase.
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button to="/" size="lg">
          <Home className="h-4 w-4" /> Back to home
        </Button>
        <Button as="button" onClick={() => window.history.back()} variant="secondary" size="lg">
          <ArrowLeft className="h-4 w-4" /> Go back
        </Button>
      </div>
    </section>
  );
}
