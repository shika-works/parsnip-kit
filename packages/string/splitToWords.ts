const regExp = /[-_\s]|(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])|(\d+)/

/**
 * Split the string used for naming into individual words.
 * @param {any} arg The string to be converted.
 * @returns {string[]}
 * @version 0.0.1
 */
export function splitToWords(arg: string): string[] {
  return arg.split(regExp).filter(Boolean)
}
