/**
 * Check if the input parameter is a `undefined`.
 * @param {any} arg Parameters for check
 * @returns {boolean}
 * @version 0.0.1
 */
export function isUndefined(arg): arg is undefined {
  return arg === undefined
}
