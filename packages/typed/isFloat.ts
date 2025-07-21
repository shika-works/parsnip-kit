import { isInfinity } from './isInfinity'
import { isNanValue } from './isNanValue'
import { isNumber } from './isNumber'

/**
 * Check if the input parameter is a float or a `Number` object with a float value.
 * @param {any} arg Parameters for check
 * @returns {boolean}
 * @version 0.0.1
 */
export function isFloat(arg): arg is number {
  return (
    isNumber(arg) &&
    !isInfinity(arg) &&
    !isNanValue(arg) &&
    (typeof arg === 'number'
      ? arg !== Math.floor(arg)
      : (arg as number).valueOf() !== Math.floor(arg))
  )
}
