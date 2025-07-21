/**
 * Check if the input parameter is a `symbol`.
 * @param {any} arg Parameters for check
 * @returns {boolean}
 * @version 0.0.1
 */
export function isSymbol(arg): arg is symbol {
  return typeof arg === 'symbol'
}
