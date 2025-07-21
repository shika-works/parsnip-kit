/**
 * Check whether the input parameter is a primitive number or a `Number` instance.
 * @param {any} arg Parameters for check
 * @returns {boolean}
 * @version 0.0.1
 */
export function isNumber(arg): arg is number {
  return typeof arg === 'number' || arg instanceof Number
}
