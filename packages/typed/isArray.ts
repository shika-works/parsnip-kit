/**
 * Check if the input parameter is an array.
 * @param {any} arg Parameters for check
 * @returns {boolean}
 * @version 0.0.1
 */
export function isArray(arg): arg is any[] {
  return Array.isArray(arg)
}
