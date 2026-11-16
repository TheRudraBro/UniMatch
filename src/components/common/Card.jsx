import { cn } from '@/utils/cn';

export function Card({ className, hover = false, children, ...props }) {
  return (
    <div
      className={cn(
        'card-base p-5',
        hover && 'transition hover:-translate-y-1 hover:shadow-lift hover:border-brand-500/40',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
