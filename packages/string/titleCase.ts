import { capitalize } from './capitalize'
import { splitToWords } from './splitToWords'

/**
 * Convert the string to Title Case, with words separated by spaces and each word capitalized.
 * @param {any} arg The string to be converted.
 * @returns {string}
 * @version 0.0.1
 */
export function titleCase(arg: string): string {
  const words = splitToWords(arg)
  let ans = ''
  const len = words.length
  for (let i = 0; i < len; i++) {
    ans += capitalize(words[i]) + (i < len - 1 ? ' ' : '')
  }
  return ans
}
