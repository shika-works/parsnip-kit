import { splitToWords } from './splitToWords'

/**
 * Convert the string to UPPERCASE_SNAKE_CASE.
 * @param {any} arg The string to be converted.
 * @returns {string}
 * @version 0.0.1
 */
export function upperSnakeCase(arg: string): string {
  const words = splitToWords(arg)
  let ans = ''
  const len = words.length
  for (let i = 0; i < len; i++) {
    ans += words[i].toUpperCase() + (i < len - 1 ? '_' : '')
  }
  return ans
}
