import { randomNumber } from './randomNumber'

const lowercaseStr = 'abcdefghijklmnopqrstuvwxyz'
const uppercaseStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numberStr = '0123456789'
const symbolStr = '!@#$%^&*()_+-=[]{}|;:,.<>?'
/**
 * Generate a random string with a length of `length`. The `options` parameter specifies the character range.
 * @param {number} length Length of random string
 * @param {RandomStringOptions} [options] String generation options
 * @param {boolean} [options.lowercase=true] Whether to include lowercase letters
 * @param {boolean} [options.uppercase=true] Whether to include uppercase letters
 * @param {boolean} [options.number=true] Whether to include numbers
 * @param {boolean} [options.symbol=false] Whether to include symbols: `'!@#$%^&*()_+-=[]{}|;:,.<>?'`
 * @param {string} [options.customized] Included custom characters
 * @returns {string}
 * @version 0.0.2
 */

export function randomString(
  length: number,
  options: RandomStringOptions = {}
): string {
  if (length === 0) {
    return ''
  }
  let characters = ''
  const {
    lowercase = true,
    uppercase = true,
    number = true,
    symbol = false,
    customized
  } = options
  if (lowercase) characters += lowercaseStr
  if (uppercase) characters += uppercaseStr
  if (number) characters += numberStr
  if (symbol) characters += symbolStr
  if (customized) characters += customized

  if (characters.length === 0) {
    return ''
  }

  const charactersLength = characters.length
  let result = ''

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(randomNumber(0, charactersLength)))
  }

  return result
}

/**
 * The `options` parameter of the `randomString` function.
 * @version 0.0.2
 */
export interface RandomStringOptions {
  lowercase?: boolean
  uppercase?: boolean
  number?: boolean
  symbol?: boolean
  customized?: string
}
