import { isString } from '../typed/isString'
import { getByPath } from '../object/getByPath'

/**
 * Input an array `arr` and return the elements that appear only once.
 *
 * Accepts a `getter`, which can be a field path of [getByPath](../object/getByPath) or a callback function, used to provide an identifier to distinguish elements.
 * @template {} T  Type of elements of array
 * @param {T[]} arr  Array that needs to be deduplicated
 * @param {string | ((item: T, index: number, arr: T[]) => any)} [getter]  Provide an identifier to distinguish the elements
 * @returns {T[]}
 * @version 0.0.1
 */

export function unique<T>(
  arr: T[],
  getter?: string | ((item: T, index: number, arr: T[]) => any)
): T[] {
  const map = new Map<any, any>()
  const len1 = arr.length
  for (let i = 0; i < len1; i++) {
    const key =
      getter !== undefined
        ? isString(getter)
          ? getByPath(arr[i] as object, getter)
          : getter(arr[i], i, arr)
        : arr[i]
    const gotVal = map.get(key)
    if (!gotVal) {
      map.set(key, arr[i])
    }
  }
  const ans: T[] = []
  for (const value of map.values()) {
    ans.push(value)
  }
  return ans
}
