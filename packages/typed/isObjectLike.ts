import { ObjectLike } from '../common/types'

/**
 * Check if the input parameter is an object, excluding functions.
 * @param {any} arg Parameters for check
 * @returns {boolean}
 * @version 0.0.1
 */
export function isObjectLike(arg): arg is ObjectLike {
  return arg !== null && typeof arg === 'object'
}
