import { PseudoArray } from '../common/types'
import { isObject } from './isObject'

/**
 * Determine whether the input parameter is a pseudo-array, i.e., an object that can be accessed via numeric indices (which is true for most ordinary JavaScript objects) and has a numeric `length` property.
 * @param {any} arg Parameters for check
 * @returns {boolean}
 * @version 0.0.1
 */
export function isPseudoArray(arg): arg is PseudoArray {
  return isObject(arg) && 'length' in arg && typeof arg.length === 'number'
}
