/**
 * Tiny className combiner. Filters falsy values and joins with spaces.
 * Keeps dependencies light (no clsx/tailwind-merge needed for this project).
 */
export function cn(...classes) {
  return classes.flat(Infinity).filter(Boolean).join(' ');
}

export default cn;
