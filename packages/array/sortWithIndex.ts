import { sortIndex } from './sortIndex'

/**
 * Input an array `arr`, sort `arr`, and return an array representing the mapping from the indices of the original array to the indices of the sorted array.
 *
 * The [sortIndex](./sortIndex) will be called internally.
 *
 * Note that the array `arr` itself will be sorted!
 *
 * A custom comparator `comparator` can be provided; if not provided, the comparison logic will be the same as the native `sort`.
 * @template {} T Type of elements of array
 * @param {T[]} arr Array to be sorted
 * @param {(a: T, b: T) => number} [comparator]  Comparator for sorting
 * @returns {number[]}
 * @version 0.0.2
 */

export function sortWithIndex<T>(
  arr: T[],
  comparator?: (a: T, b: T) => number
) {
  const indices = sortIndex(arr, comparator)
  const sortedArray = indices.map((idx) => arr[idx])
  const len = arr.length
  for (let i = 0; i < len; i++) {
    arr[i] = sortedArray[i]
  }
  return indices
}
