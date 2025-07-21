import { codeUnitComparatorAsc } from '../common/constants'

/**
 * Input an array `arr` and return an array representing the mapping from the indices of the original array to the indices of the sorted array. Note that the array `arr` itself will not be sorted. A custom comparator `comparator` can be provided; if not provided, the comparison logic will be the same as the native `sort`.
 * @template {} T  Type of elements of array
 * @param {T[]} arr  Array to be sorted
 * @param {(a: T, b: T) => number} [comparator]  Comparator for sorting
 * @returns {number[]}
 * @version 0.0.1
 */

export function sortIndex<T>(
  arr: T[],
  comparator?: (a: T, b: T) => number
): number[] {
  const indices = arr.map((_, index) => index)
  indices.sort((a, b) => {
    if (comparator) {
      return comparator(arr[a], arr[b])
    } else {
      return codeUnitComparatorAsc(`${arr[a]}`, `${arr[b]}`)
    }
  })
  return indices
}
