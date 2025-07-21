/**
 * Capitalize the first letter of the string.
 * @param {any} arg The string to be converted.
 * @returns {string}
 * @version 0.0.1
 */

export function capitalize(arg: string): string {
  return arg.charAt(0).toUpperCase() + arg.slice(1).toLowerCase()
}
