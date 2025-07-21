import { isFunction } from './isFunction'
import { isObject } from './isObject'

/**
 * Check if the input parameter is a class.
 * @param {any} arg Parameters for check
 * @returns {boolean}
 * @version 0.0.1
 */

export function isClass(arg): arg is Function {
  return (
    isFunction(arg) &&
    isObject(arg.prototype) &&
    isFunction(arg.prototype.constructor)
  )
}
