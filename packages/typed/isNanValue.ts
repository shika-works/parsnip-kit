import { isNumber } from './isNumber'

/**
 * Check if the input parameter is a `NaN` or a `Number` object with a `NaN` value.
 * @param {any} arg Parameters for check
 * @returns {boolean}
 * @version 0.0.1
 */
export function isNanValue(arg) {
  return (
    isNumber(arg) &&
    (typeof arg === 'number'
      ? Number.isNaN(arg)
      : Number.isNaN((arg as number).valueOf()))
  )
}
