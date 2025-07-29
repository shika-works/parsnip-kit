import { Nullish } from '../common/types'

/**
 * Check if the input parameter is a `undefined` or `null`.
 * @param {any} arg Parameters to check
 * @returns {boolean}
 * @version 0.0.4
 */

export function isNullish(arg): arg is Nullish {
  return arg === null || arg === undefined
}
