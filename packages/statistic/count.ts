import { getByPath } from '../object/getByPath'
import { isString } from '../typed/isString'

/**
 * Count the occurrences of values extracted via the optional `getter` parameter (or directly using the array elements themselves).
 *
 * The `getter` is a field path of [getByPath](../object/getByPath) or a callback function, used to provide a label for frequency statistics.
 * @template {} T Type of input array
 * @param {T[]} data Input array
 * @param {string | ((item: T, index: number, arr: T[]) => any)} [getter] Provide an identifier to distinguish the elements
 * @returns {Map<any, number>}
 * @version 0.0.1
 */
export function count<T>(
  data: T[],
  getter?: string | ((item: T, index: number, arr: T[]) => any)
): Map<any, number> {
  const ans = new Map<any, number>()
  const len = data.length
  for (let i = 0; i < len; i++) {
    const key =
      getter !== undefined
        ? isString(getter)
          ? getByPath(data[i] as object, getter)
          : getter(data[i], i, data)
        : data[i]
    ans.set(key, (ans.get(key) ?? 0) + 1)
  }
  return ans
}
