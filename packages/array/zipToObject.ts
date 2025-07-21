import { ObjectLike } from '../common/types'
import { getByPath } from '../object/getByPath'
import { isString } from '../typed/isString'

/**
 * Input two arrays `keys` and `values`, and return a plain object where elements of `keys` serve as keys and elements of `values` serve as values.
 *
 * Optional parameters `getKey` and `getValue` can be provided to transform elements of the objects into keys and values, respectively.
 *
 * These can be field paths of [getByPath](../object/getByPath) or callback functions.
 * @template {} T Type of elements of array serving as keys
 * @template {} U Type of elements of array serving as values
 * @param {T[]} keys  The array serving as keys
 * @param {U[]} values  The array serving as values
 * @param {string | ((item: T, index: number, arr: T[]) => any)} [getKey]  Transform array elements into keys
 * @param {string | ((item: U, index: number, arr: U[]) => any)} [getValue]  Transform array elements into values
 * @returns {ObjectLike}
 * @version 0.0.1
 *
 */
export function zipToObject<T, U>(
  keys: T[],
  values: U[],
  getKey?: string | ((item: T, index: number, arr: T[]) => any),
  getValue?: string | ((item: U, index: number, arr: U[]) => any)
) {
  const ans: ObjectLike = {}

  const len = keys.length
  for (let i = 0; i < len; i++) {
    const key = getKey
      ? isString(getKey)
        ? getByPath(keys[i] as object, getKey)
        : getKey(keys[i], i, keys)
      : keys[i]
    const value = getValue
      ? isString(getValue)
        ? getByPath(values[i] as object, getValue)
        : getValue(values[i], i, values)
      : values[i]
    ans[key] = value
  }
  return ans
}
