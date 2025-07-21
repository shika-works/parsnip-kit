import { splitToWords } from './splitToWords'

/**
 * Convert the string to camelCase.
 * @param {any} arg The string to be converted.
 * @returns {string}
 * @version 0.0.1
 */
export function camelCase(arg: string): string {
  const words = splitToWords(arg)
  let ans = ''
  const len = words.length
  for (let i = 0; i < len; i++) {
    ans +=
      i > 0
        ? words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase()
        : words[i].toLowerCase()
  }
  return ans
}
