import { FlattenNestObject } from '../common/types'
import { isArray, isNumberString, isObject } from '../main'

/**
 * Receive an object `obj`, perform a depth-first traversal of the enumerable properties of nested objects, and return a flattened new object where the key is the field path string and the value is the corresponding value.
 * @template {extends object} T The type of the object to be flattened
 * @param {T} obj The object to be flattened
 * @returns {FlattenNestObject<T>}
 * @version 0.0.4
 */

export function flattenObject<T extends object>(obj: T) {
  const ans: Record<string, any> = {}
  flattenHelper(obj, ans)
  return ans as FlattenNestObject<T>
}
function flattenHelper(
  currentObj: any,
  ans: any,
  prefix: string | number = ''
) {
  const keys = Object.keys(currentObj)
  for (const key of keys) {
    const value = currentObj[key]
    const newKey = prefix
      ? isArray(currentObj) && isNumberString(key)
        ? `${prefix}[${key}]`
        : `${prefix}.${key}`
      : isArray(currentObj) && isNumberString(key)
        ? `[${key}]`
        : key
    if (isObject(value)) {
      flattenHelper(value, ans, newKey)
    } else {
      ans[newKey] = value
    }
  }
}
