/**
 * Check whether the input parameter is an object, including general objects (`{ key: 'value' }`), functions (`function() {}`), and instances of primitive type wrappers (`new Number(1)`), all of which would return `true`.
 * @param {any} arg Parameters for check
 * @returns {boolean}
 * @version 0.0.1
 */
export function isObject(arg): arg is object {
  return arg !== null && (typeof arg === 'object' || typeof arg === 'function')
}
