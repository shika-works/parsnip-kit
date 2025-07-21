import { ExtractUnion, KeyOrIndex } from '../common/types'
import { splitToKeys } from '../string/splitToKeys'
import { isNumber } from '../typed/isNumber'
import { isNumberString } from '../typed/isNumberString'

/**
 * Generate a new object or array from the input object or array with specified keys or indices removed. The returned value is a plain object or array, and the input will not be modified.
 * @template {extends object} T Type of the object to be processed
 * @template {extends readonly string[]} R Array type of field paths
 * @param {T} obj The object or array to process
 * @param {R} keys The keys or array indices to delete
 * @returns {Omit<T, KeyOrIndex<ExtractUnion<R>>>}
 * @version 0.0.1
 *
 */
export function omit<T extends object, R extends readonly string[]>(
  obj: T,
  keys: R
) {
  const resolvedKeys = keys
    .map((item) => splitToKeys(item)[0])
    .map((item) => (isNumberString(item) ? parseInt(item) : item))

  const ans: any = Array.isArray(obj) ? [] : {}
  const objKeys = Object.keys(obj)
  for (const key of objKeys) {
    ans[key] = obj[key]
  }
  resolvedKeys.sort((a, b) => {
    const aIsNumber = isNumber(a)
    const bIsNumber = isNumber(b)
    if (aIsNumber && bIsNumber) {
      return b - a
    } else if (aIsNumber || bIsNumber) {
      return aIsNumber ? -1 : 1
    } else {
      return a.localeCompare(b)
    }
  })
  resolvedKeys.forEach((item) => {
    if (Array.isArray(ans) && isNumber(item)) {
      ans.splice(item, 1)
    } else {
      delete ans[item]
    }
  })
  return ans as Omit<T, KeyOrIndex<ExtractUnion<R>>>
}
