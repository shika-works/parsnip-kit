/**
 * Check whether the input parameter is a primitive string or a `String` instance.
 * @param {any} arg Parameters for check
 * @returns {boolean}
 * @version 0.0.1
 */
export function isString(arg): arg is string {
  return typeof arg === 'string' || arg instanceof String
}
