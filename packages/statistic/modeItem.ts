import { getByPath } from '../object/getByPath'
import { isString } from '../typed/isString'

/**
 * Extract key values using the optional `getter` parameter (or directly using the array elements themselves), and return the first element that have the most frequently occurring value.
 *
 * The `getter` is a field path of [getByPath](../object/getByPath) or a callback function, used to provide a label for frequency statistics.
 * @template {} T Type of input array
 * @param {T[]} data Input array
 * @param {string | ((item: T, index: number, arr: T[]) => any)} [getter] Provide an identifier to distinguish the elements
 * @returns {T}
 * @version 0.0.1
 *
 */
export function modeItem<T>(
  data: T[],
  getter?: string | ((item: T, index: number, arr: T[]) => any)
) {
  const count = new Map<any, { count: number; firstIndex: number }>()
  let max = -Infinity
  let index = 0
  const len = data.length
  for (let i = 0; i < len; i++) {
    const key =
      getter !== undefined
        ? isString(getter)
          ? getByPath(data[i] as object, getter)
          : getter(data[i], i, data)
        : data[i]
    let current = count.get(key)
    if (!current) {
      current = { count: 0, firstIndex: i }
      count.set(key, current)
    }
    current.count++
    if (current.count > max) {
      max = current.count
      index = current.firstIndex
    }
  }
  return data[index]
}
