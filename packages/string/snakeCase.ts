import { splitToWords } from './splitToWords'

/**
 * Convert the string to snake_case.
 * @param {string} arg The string to be converted.
 * @returns {string}
 * @version 0.0.1
 */

export function snakeCase(arg: string): string {
  const words = splitToWords(arg)
  let ans = ''
  const len = words.length
  for (let i = 0; i < len; i++) {
    ans += words[i].toLowerCase() + (i < len - 1 ? '_' : '')
  }
  return ans
}
