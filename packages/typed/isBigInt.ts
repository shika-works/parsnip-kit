/**
 * Check if the input parameter is a `bigint`.
 * @param {any} arg Parameters for check
 * @returns {boolean}
 * @version 0.0.1
 */
export function isBigInt(arg): arg is bigint {
  return typeof arg === 'bigint'
}
