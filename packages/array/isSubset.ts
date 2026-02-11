import { getByPath } from '../object/getByPath'
import { isString } from '../typed/isString'
import { isUndefined } from '../typed/isUndefined'

/**
 * Input two arrays `arr1` and `arr2`, and return whether `arr1` is subset of `arr2`.
 *
 * Accepts a `getter`, which can be a field path of [getByPath](../object/getByPath) or a callback function, used to provide an identifier to distinguish elements.
 * @template {} T The type of element of input arr
 * @param {T[]} arr1 The candidate subset array
 * @param {T[]} arr2 The superset array to check against
 * @param {string | ((item: T, index: number, arr: T[]) => any)} [getter]  Provide an identifier to distinguish the elements
 * @returns {boolean}
 * @version 0.1.0
 */

export function isSubset<T>(
  arr1: T[],
  arr2: T[],
  getter?: string | ((item: T, index: number, arr: T[]) => any)
) {
  if (arr1.length > arr2.length) {
    return false
  }
  const map = new Map<any, number>()
  const len1 = arr1.length
  for (let i = 0; i < len1; i++) {
    const key =
      getter !== undefined
        ? isString(getter)
          ? getByPath(arr1[i] as object, getter)
          : getter(arr1[i], i, arr1)
        : arr1[i]
    const gotVal = map.get(key)
    if (isUndefined(gotVal)) {
      map.set(key, 1)
    } else {
      map.set(key, gotVal + 1)
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
    if (!isUndefined(gotVal)) {
      map.set(key, gotVal - 1)
    } else {
      map.set(key, -1)
    }
  }
  let flag = true

  for (let i = 0; i < len1; i++) {
    const key =
      getter !== undefined
        ? isString(getter)
          ? getByPath(arr1[i] as object, getter)
          : getter(arr1[i], i, arr1)
        : arr1[i]
    const gotVal = map.get(key)
    if (isUndefined(gotVal) || gotVal > 0) {
      flag = false
      break
    }
  }
  return flag
}
