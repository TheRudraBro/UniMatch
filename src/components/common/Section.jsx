import { cn } from '@/utils/cn';

/** Consistent vertical rhythm wrapper for page sections. */
export function Section({ id, className, muted = false, children }) {
  return (
    <section id={id} className={cn('py-16 sm:py-20', muted && 'bg-card/40', className)}>
      <div className="container-px">{children}</div>
    </section>
  );
}

export default Section;
