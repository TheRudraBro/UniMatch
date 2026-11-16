// Formatting helpers — keep display logic out of components.

const UNVERIFIED = ['Not verified', 'Contact university', null, undefined, ''];

/** Is a seed value an unverified / missing placeholder? */
export function isUnverified(value) {
  return UNVERIFIED.includes(value);
}

/**
 * Format a BDT amount. Accepts a number, or passes through an unverified string.
 * @param {number|string} value
 */
export function formatBDT(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) return value || 'Not verified';
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    maximumFractionDigits: 0,
  }).format(value);
}

/** Compact form, e.g. 1,250,000 -> "৳12.5L" style (Bangladeshi lakh). */
export function formatBDTShort(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) return value || 'Not verified';
  if (value >= 10000000) return `৳${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `৳${(value / 100000).toFixed(1)} L`;
  if (value >= 1000) return `৳${(value / 1000).toFixed(0)}K`;
  return `৳${value}`;
}

/** Clamp + format a GPA to 2 decimals. */
export function formatGPA(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return '—';
  return n.toFixed(2);
}

/** Format a currency value for international unis with a given ISO code. */
export function formatCurrency(value, currency = 'USD') {
  if (typeof value !== 'number' || Number.isNaN(value)) return value || 'Not verified';
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${value} ${currency}`;
  }
}
