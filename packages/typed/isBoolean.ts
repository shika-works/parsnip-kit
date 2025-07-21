/**
 * Check whether the input parameter is a primitive boolean or a `Boolean` instance.
 * @param {any} arg Parameters for check
 * @returns {boolean}
 * @version 0.0.1
 */
export function isBoolean(arg): arg is boolean {
  return typeof arg === 'boolean' || arg instanceof Boolean
}
