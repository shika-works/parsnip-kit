import { ObjectLike } from '../common/types'
import { getByPath } from '../object/getByPath'
import { isString } from '../typed/isString'

/**
 * Input a object array `pairs`, and return a plain object composed of key-value pairs extracted from each sub-array. Optional parameters `getKey` and `getValue` can be provided to transform the array elements into keys and values. If not provided, the first element of each sub-array (index 0) will be used as the key, and the second element (index 1) will be used as the value.
 *
 * `getKey` and `getValue` can be field paths of [getByPath](../object/getByPath) or callback functions.
 * @template {extends object} T Type of elements of array
 * @param {T[]} pairs The array of key-value object
 * @param {string | ((item: T, index: number, arr: T[]) => any)} [getKey]  Extract keys form sub-arrays
 * @param {string | ((item: T, index: number, arr: T[]) => any)} [getValue]  Extract values form sub-arrays
 * @returns {ObjectLike}
 * @version 0.0.1
 *
 */
export function pairsToObject<T extends object>(
  pairs: T[],
  getKey?: string | ((item: T, index: number, arr: T[]) => any),
  getValue?: string | ((item: T, index: number, arr: T[]) => any)
) {
  const ans: ObjectLike = {}

  const len = pairs.length
  for (let i = 0; i < len; i++) {
    const key = getKey
      ? isString(getKey)
        ? getByPath(pairs[i] as object, getKey)
        : getKey(pairs[i], i, pairs)
      : pairs[i][0]
    const value = getValue
      ? isString(getValue)
        ? getByPath(pairs[i] as object, getValue)
        : getValue(pairs[i], i, pairs)
      : pairs[i][1]
    ans[key] = value
  }
  return ans
}
