/**
 * Formats a numeric value into standard Indian Rupee (INR) currency representation.
 * @param {number|string} value - The numerical value to format.
 * @param {Intl.NumberFormatOptions} [options] - Optional overrides.
 * @returns {string} e.g. "₹695" or "₹1,375.50"
 */
export const formatINR = (value, options = {}) => {
  const num = Number(value) || 0;
  const hasDecimals = num % 1 !== 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: options.minimumFractionDigits ?? (hasDecimals ? 2 : 0),
    maximumFractionDigits: options.maximumFractionDigits ?? 2,
  }).format(num);
};
