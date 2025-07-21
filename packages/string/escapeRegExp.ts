/**
 * Escapes the regular expression metacharacters in string `str` and returns the escaped string.
 * @param {string} str The string to escape
 * @returns {string}
 * @version 0.0.2
 */

export function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
