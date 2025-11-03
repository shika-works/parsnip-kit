import { isArray } from './isArray'
import { isNanValue } from './isNanValue'
import { isNullish } from './isNullish'

/**
 * Check if the input parameter is an empty value, including `undefined`, `null`, `NaN`, `''` and array with length of 0.
 * @param {any} arg The argument to check
 * @returns {boolean}
 * @version 0.0.6
 */

export const isEmpty = (arg: any) => {
  return (
    isNullish(arg) ||
    isNanValue(arg) ||
    arg === '' ||
    (isArray(arg) && arg.length === 0)
  )
}
