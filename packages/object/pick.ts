import { ExtractUnion, KeyOrIndex } from '../common/types'
import { splitToKeys } from '../string/splitToKeys'

/**
 * Returns a new object or array containing the specified keys or indices extracted from the input object or array. The return value is a plain object or array and does not modify the original input.
 * @param {T} obj Type of the object to be processed
 * @param {R} keys The keys or array indices to extract
 * @template {extends object} T Type of the object to be processed
 * @template {extends readonly string[]} R Array type of field paths
 * @returns {Pick<T, KeyOrIndex<ExtractUnion<R>> & keyof T>}
 * @version 0.0.1
 *
 */
export function pick<T extends object, R extends readonly string[]>(
  obj: T,
  keys: R
) {
  const resolvedKeys = keys.map((item) => splitToKeys(item)[0])
  const ans = Array.isArray(obj) ? [] : {}
  resolvedKeys.forEach((item) => {
    if (Object.prototype.hasOwnProperty.call(obj, item)) {
      if (Array.isArray(ans)) {
        ans.push(obj[item])
      } else {
        ans[item] = obj[item]
      }
    }
  })
  return ans as Pick<T, KeyOrIndex<ExtractUnion<R>> & keyof T>
}
