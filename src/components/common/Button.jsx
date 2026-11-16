import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

const variants = {
  primary:
    'bg-brand-600 text-white shadow-lift hover:bg-brand-700 focus-visible:ring-brand-500',
  secondary:
    'bg-card text-content border border-line hover:bg-card-muted focus-visible:ring-brand-500',
  ghost:
    'bg-transparent text-content hover:bg-card-muted focus-visible:ring-brand-500',
  outline:
    'bg-transparent text-brand-600 dark:text-brand-300 border border-brand-500/40 hover:bg-brand-500/10 focus-visible:ring-brand-500',
  danger:
    'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
};

const sizes = {
  sm: 'h-9 px-3.5 text-sm gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2',
};

const Button = forwardRef(function Button(
  { as, to, href, variant = 'primary', size = 'md', className, children, ...props },
  ref
) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-xl font-semibold transition',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
    'disabled:opacity-50 disabled:pointer-events-none select-none',
    variants[variant],
    sizes[size],
    className
  );

  if (to) {
    return (
      <Link to={to} className={classes} ref={ref} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} ref={ref} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
  const Comp = as || 'button';
  return (
    <Comp className={classes} ref={ref} {...props}>
      {children}
    </Comp>
  );
});

export default Button;
