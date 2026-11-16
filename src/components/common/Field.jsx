import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

export function Label({ htmlFor, children, className }) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn('mb-1.5 block text-sm font-medium text-content', className)}
    >
      {children}
    </label>
  );
}

export const Input = forwardRef(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={cn('input-base', className)} {...props} />;
});

export const Select = forwardRef(function Select({ className, children, ...props }, ref) {
  return (
    <select ref={ref} className={cn('input-base appearance-none pr-9', className)} {...props}>
      {children}
    </select>
  );
});

/** Wrapper: label + control + optional hint. */
export function FormField({ label, htmlFor, hint, children, className }) {
  return (
    <div className={className}>
      {label && <Label htmlFor={htmlFor}>{label}</Label>}
      {children}
      {hint && <p className="mt-1 text-xs text-content-muted">{hint}</p>}
    </div>
  );
}

export default FormField;
