/**
 * Check if the input parameter is a function, including classes (`class {}`), generator functions (`function*() {}`), and async functions (`async function() {}`).
 * @param {any} arg Parameters for check
 * @returns {boolean}
 * @version 0.0.1
 */
export function isFunction(arg): arg is Function {
  return typeof arg === 'function'
}
