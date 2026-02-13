/**
 * Returns the type tag of the provided argument using `Object.prototype.toString`.
 * @param {any} arg The argument to check
 * @returns {string}
 * @version 0.0.1
 */
export const getTypeTag = (arg) => Object.prototype.toString.apply(arg).slice(8, -1)
