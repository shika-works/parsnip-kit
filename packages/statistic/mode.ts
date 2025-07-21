import { count } from './count'

/**
 * Extract key values using the optional `getter` parameter (or directly using the array elements themselves), and return the most frequently occurring value.
 *
 * The `getter` is a field path of [getByPath](../object/getByPath) or a callback function, used to provide a label for frequency statistics.
 * @template {} T Type of input array
 * @param {T[]} data Input array
 * @param {string | ((item: T, index: number, arr: T[]) => any)} [getter] Provide an identifier to distinguish the elements
 * @returns {any}
 * @version 0.0.1
 */
export function mode<T>(
  data: T[],
  getter?: string | ((item: T, index: number, arr: T[]) => any)
) {
  const countValue = count(data, getter)
  const maxCount = Math.max(...countValue.values())

  let ans
  for (const entry of countValue.entries()) {
    if (entry[1] === maxCount) {
      ans = entry[0]
    }
  }
  return ans
}
