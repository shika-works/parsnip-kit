import { NumberString } from '../common/types'
import { isString } from './isString'

/**
 * Check if the input is string consisting only of numeric characters.
 * @param {any} arg Parameters for check
 * @returns {boolean}
 * @version 0.0.1
 */
export function isNumberString(arg: any): arg is NumberString {
  return isString(arg) && /^\d+$/.test(arg)
}
