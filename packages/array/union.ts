import { isString } from '../typed/isString'
import { getByPath } from '../object/getByPath'

/**
 * Input two arrays `arr1` and `arr2`, and return their union.
 *
 * Accepts a `getter`, which can be a field path of [getByPath](../object/getByPath) or a callback function, used to provide an identifier to distinguish elements.
 * @template {} T Type of elements of array
 * @param {T[]} arr1  Array for computing the union
 * @param {T[]} arr2  Array for computing the union
 * @param {string | ((item: T, index: number, arr: T[]) => any)} [getter] Provide an identifier to distinguish the elements
 * @returns {T[]}
 * @version 0.0.1
 */

export function union<T>(
  arr1: T[],
  arr2: T[],
  getter?: string | ((item: T, index: number, arr: T[]) => any)
): T[] {
  const map = new Map<any, T>()
  const len1 = arr1.length
  for (let i = 0; i < len1; i++) {
    const key =
      getter !== undefined
        ? isString(getter)
          ? getByPath(arr1[i] as object, getter)
          : getter(arr1[i], i, arr1)
        : arr1[i]
    if (!map.has(key)) {
      map.set(key, arr1[i])
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
    if (!map.has(key)) {
      map.set(key, arr2[i])
    }
  }
  return [...map.values()]
}
