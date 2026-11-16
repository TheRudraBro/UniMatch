import { cn } from '@/utils/cn';

/** UniMatch wordmark + glyph. */
export function Logo({ className, showText = true }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 text-white shadow-lift">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M12 3 2 8l10 5 7-3.5V15h2V8L12 3Zm0 9.8L5 9.3V12c0 1.9 3.1 3.5 7 3.5s7-1.6 7-3.5V9.3l-7 3.5Z" />
        </svg>
      </span>
      {showText && (
        <span className="text-lg font-extrabold tracking-tight text-content">
          Uni<span className="gradient-text">Match</span>
        </span>
      )}
    </span>
  );
}

/** Square initials badge used as a logo fallback for universities. */
export function InitialsBadge({ text, className }) {
  const initials = (text || '?')
    .replace(/[^A-Za-z ]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
  return (
    <span
      className={cn(
        'grid place-items-center rounded-xl bg-gradient-to-br from-brand-500/15 to-accent-500/15 font-bold text-brand-600 dark:text-brand-300',
        className
      )}
    >
      {initials}
    </span>
  );
}

export default Logo;
