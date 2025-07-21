/**
 * Check if the input parameter is a `null`.
 * @param {any} arg Parameters for check
 * @returns {boolean}
 * @version 0.0.1
 */
export function isNull(arg): arg is null {
  return arg === null
}
