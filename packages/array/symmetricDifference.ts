import { isString } from '../typed/isString'
import { getByPath } from '../object/getByPath'

/**
 * Input two arrays `arr1` and `arr2`, and return their symmetric difference. Symmetric difference refers to the elements that are in either of the two sets but not in their intersection.
 *
 * Accepts a `getter`, which can be a field path of [getByPath](../object/getByPath) or a callback function, used to provide an identifier to distinguish elements.
 * @template {} T  Type of elements of array
 * @param {T[]} arr1  Array for which the symmetric difference is to be calculated
 * @param {T[]} arr2  Array for which the symmetric difference is to be calculated
 * @param {string | ((item: T, index: number, arr: T[]) => any)} [getter] Provide an identifier to distinguish the elements
 * @returns {T[]}
 * @version 0.0.1
 */

export function symmetricDifference<T>(
  arr1: T[],
  arr2: T[],
  getter?: string | ((item: T, index: number, arr: T[]) => any)
) {
  const map = new Map<any, { value: T; mask: number }>()
  const len1 = arr1.length
  for (let i = 0; i < len1; i++) {
    const key =
      getter !== undefined
        ? isString(getter)
          ? getByPath(arr1[i] as object, getter)
          : getter(arr1[i], i, arr1)
        : arr1[i]
    const gotVal = map.get(key)
    if (!gotVal) {
      map.set(key, { value: arr1[i], mask: 1 })
    }
  }
  const len2 = arr2.length
  for (let i = 0; i < len2; i++) {
    const key =
      getter !== undefined
        ? isString(getter)
          ? getByPath(arr2[i] as object, getter)
          : getter(arr2[i], i, arr2)
        : arr2[i]
    const gotVal = map.get(key)
    if (!gotVal) {
      map.set(key, { value: arr2[i], mask: 2 })
    } else {
      gotVal.mask |= 2
    }
  }
  const ans: T[] = []
  for (const data of map.values()) {
    if (data.mask != 3) {
      ans.push(data.value)
    }
  }
  return ans
}
