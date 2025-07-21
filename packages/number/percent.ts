/**
 * Input a number `num` and a total `total` (default is 100), and return a formatted percentage string. An optional parameter `fixed` is available to control the number of decimal places, defaulting to 2.
 * @param {number} num The number to calculate
 * @param {number} [total=100] Total value
 * @param {number} [fixed=2] Decimal places
 * @returns {string}
 * @version 0.0.1
 */
export function percent(
  num: number,
  total: number = 100,
  fixed: number = 2
): string {
  if (total === 0) {
    throw new TypeError('Total cannot be zero.')
  }
  const percentage = (num / total) * 100
  return `${percentage.toFixed(fixed)}%`
}
