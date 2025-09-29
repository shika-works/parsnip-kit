import { isNumber } from './isNumber'

/**
 * Check if the input parameter is positive or negative infinity, or a Number object with a value of positive or negative infinity.
 * @param {any} arg Parameters for check
 * @returns {boolean}
 * @version 0.0.1
 */
export function isInfinity(arg) {
  return (
    isNumber(arg) &&
    (typeof arg === 'number'
      ? arg === Infinity || arg === -Infinity
      : (arg as number).valueOf() === Infinity ||
        (arg as number).valueOf() === -Infinity)
  )
}
