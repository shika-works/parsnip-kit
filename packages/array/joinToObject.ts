import { ObjectLike } from '../common/types'
import { getByPath } from '../object/getByPath'
import { isString } from '../typed/isString'

/**
 * Input an array of objects `fields`, and return a plain object formed by combining each item from the array.
 *
 * The optional parameters `getKey` and `getValue` are used to convert child objects into keys and values. When they are not provided, the first field of the array element is extracted by default.
 *
 * `getKey` and `getValue` can be field paths of [getByPath](../object/getByPath) or callback functions.
 * @template {extends object} T Type of elements of array
 * @param {T[]} pairs The array of key-value object
 * @param {string | ((item: T, index: number, arr: T[]) => any)} [getKey]  Extract keys form sub-objects
 * @param {string | ((item: T, index: number, arr: T[]) => any)} [getValue]  Extract values form sub-objects
 * @returns {ObjectLike}
 * @version 0.0.1
 *
 */
export function joinToObject<T extends object>(
  fields: T[],
  getKey?: string | ((item: T, index: number, arr: T[]) => any),
  getValue?: string | ((item: T, index: number, arr: T[]) => any)
) {
  const ans: ObjectLike = {}
  const len = fields.length
  for (let i = 0; i < len; i++) {
    const originalKey = Object.keys(fields[i])[0]
    const key = getKey
      ? isString(getKey)
        ? getByPath(fields[i] as object, getKey)
        : getKey(fields[i], i, fields)
      : originalKey
    const value = getValue
      ? isString(getValue)
        ? getByPath(fields[i] as object, getValue)
        : getValue(fields[i], i, fields)
      : (fields[i] as any)[originalKey]
    ans[key] = value
  }
  return ans
}
