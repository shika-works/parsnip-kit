import { getByPath } from '../object/getByPath'
import { isString } from '../typed/isString'

/**
 * Sorts an array `arr` based on a specified order `order`.
 *
 * `getter` is a function that transforms elements of the array `arr` to keys that can be used for sorting, which can be a field path of [getByPath](../object/getByPath) or a function.
 *
 * If `getter` is not provided, the `orderSort` use the array `arr` element itself as the sorting key.
 *
 * Elements not in the `order` array maintain their original relative order and be placed at the end.
 * @template {} T Type of elements of array to sort
 * @param {T[]} arr The array to be sorted
 * @param {any[]} order The array specifying the desired order
 * @param {string | ((item: T) => any)} [getter] Transform the elements of the array into keys that can be used for sorting
 * @returns {T[]}
 * @version 0.0.3
 */
export function orderSort<T>(
  arr: T[],
  order: any[],
  getter?: string | ((item: T) => any)
): T[] {
  const orderMap = new Map<any, number>()
  order.forEach((item, index) => {
    orderMap.set(item, index)
  })

  const itemMap = new Map<T, number>()
  arr.forEach((item, index) => {
    itemMap.set(item, index)
  })

  const res = arr.sort((a, b) => {
    const aKey =
      getter !== undefined
        ? isString(getter)
          ? getByPath(a as object, getter)
          : getter(a)
        : a
    const bKey =
      getter !== undefined
        ? isString(getter)
          ? getByPath(b as object, getter)
          : getter(b)
        : b
    const aIndex = orderMap.get(aKey)
    const bIndex = orderMap.get(bKey)

    if (aIndex !== undefined && bIndex !== undefined) {
      return aIndex - bIndex
    }
    if (aIndex !== undefined) {
      return -1
    }
    if (bIndex !== undefined) {
      return 1
    }
    return itemMap.get(a)! - itemMap.get(b)!
  })

  return res
}
