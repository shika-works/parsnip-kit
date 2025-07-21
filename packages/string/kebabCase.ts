import { splitToWords } from './splitToWords'

/**
 * Convert the string to kebab-case.
 * @param {any} arg The string to be converted.
 * @returns {string}
 * @version 0.0.1
 */

export function kebabCase(arg: string): string {
  const words = splitToWords(arg)
  let ans = ''
  const len = words.length
  for (let i = 0; i < len; i++) {
    ans += words[i].toLowerCase() + (i < len - 1 ? '-' : '')
  }
  return ans
}
