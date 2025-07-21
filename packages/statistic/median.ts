import { numberComparatorAsc } from '../common/constants'
import { getByPath } from '../object/getByPath'
import { isString } from '../typed/isString'

/**
 * Calculates the median of the input array, supporting the extraction of numeric values via an optional parameter `getter` (or directly using the numeric values of the array elements).
 *
 * The `getter` is a field path of [getByPath](../object/getByPath) or a callback function, for extracting numerical values.
 * @template {} TType of input array
 * @param {T[]} data Input array
 * @param {string | ((item: T, index: number, arr: T[]) => number)} [getter] For extracting numerical values from array elements
 * @returns {number}
 * @version 0.0.1
 */
export function median<T>(
  data: T[],
  getter?: string | ((item: T, index: number, arr: T[]) => number)
): number {
  const copy = data.map((item, index) => {
    return getter !== undefined
      ? isString(getter)
        ? getByPath(item as object, getter)
        : getter(item, index, data)
      : item
  })
  copy.sort(numberComparatorAsc)
  const idx = Math.floor(copy.length / 2)
  return copy.length & 1 ? copy[idx] : (copy[idx] + copy[idx - 1]) / 2
}
