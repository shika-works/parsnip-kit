import { PrimitiveType } from '../common/types'
import { isObject } from './isObject'

/**
 * Check if the input parameter is a primitive type, including `number`, `string`, `boolean`, `null`, `undefined`, `symbol`, and `bigint`.
 * @param {any} arg Parameters for check
 * @returns {boolean}
 * @version 0.0.1
 */
export function isPrimitive(arg): arg is PrimitiveType {
  return !isObject(arg)
}
