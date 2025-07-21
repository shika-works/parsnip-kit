import { isInfinity } from './isInfinity'
import { isNanValue } from './isNanValue'
import { isNumber } from './isNumber'

/**
 * Check if the input parameter is an integer or a `Number` object with an integer value.
 * @param {any} arg Parameters for check
 * @returns {boolean}
 * @version 0.0.1
 */
export function isInt(arg): arg is number {
  return (
    isNumber(arg) &&
    !isInfinity(arg) &&
    !isNanValue(arg) &&
    (typeof arg === 'number'
      ? arg === Math.floor(arg)
      : (arg as number).valueOf() === Math.floor(arg))
  )
}
