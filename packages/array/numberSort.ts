import { getByPath } from '../object/getByPath'
import { numberComparatorAsc, numberComparatorDesc } from '../common/constants'
import { isFunction } from '../typed/isFunction'
/**
 * Sorts parameter `arr` numerically based on the order specified by parameter `order` with the default of `'asc'`.
 *
 * The parameter `order` can be specified as either `'asc'` (ascending order) or `'desc'` (descending order).
 *
 * It will call [numberComparatorAsc](../common/constants#numbercomparatorasc) or [numberComparatorDesc](../common/constants#numbercomparatordesc) internally.
 *
 * The optional parameter `getter` is used to obtain the numerical value from elements of `arr`, with the default being to use the element itself for sorting.
 *
 * `getter` can be a field path of [getByPath](../object/getByPath) or a callback function.
 * @template {} T Type of elements of array
 * @template {extends 'asc' | 'desc' = 'asc' | 'desc'} R Type of order for sorting
 * @param {T[]} arr Array to be sorted
 * @param {R} order Order for sorting
 * @param {string | ((item: T) => number)} getter For extracting numerical values from array elements
 * @returns {T[]}
 * @version 0.0.2
 */

export function numberSort<T, R extends 'asc' | 'desc' = 'asc' | 'desc'>(
  arr: T[],
  order: R = 'asc' as R,
  getter?: string | ((item: T) => number)
) {
  return arr.sort((a, b) => {
    const valueA = getter
      ? isFunction(getter)
        ? getter(a)
        : getByPath(a as any, getter)
      : a
    const valueB = getter
      ? isFunction(getter)
        ? getter(b)
        : getByPath(b as any, getter)
      : b
    return order === 'asc'
      ? numberComparatorAsc(valueA, valueB)
      : numberComparatorDesc(valueA, valueB)
  })
}
