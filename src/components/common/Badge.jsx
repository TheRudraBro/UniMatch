import { cn } from '@/utils/cn';

const tones = {
  default: 'bg-card-muted text-content-muted border-line',
  brand: 'bg-brand-500/10 text-brand-600 dark:text-brand-300 border-brand-500/30',
  success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
  danger: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30',
  info: 'bg-accent-500/10 text-accent-600 dark:text-accent-400 border-accent-500/30',
};

export function Badge({ tone = 'default', className, children, icon: Icon }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold',
        tones[tone],
        className
      )}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </span>
  );
}

export default Badge;
