import { splitToKeys } from '../string/splitToKeys'
import { isObject } from '../typed/isObject'

/**
 * Input an object `obj` and a field path `path`, then traverse the object deeply according to the path to retrieve the value. If the traversal is interrupted (e.g., the path is invalid) or the value is undefined or null, use `defaultValue` as the default value.
 * @param {object} obj Object to get value
 * @param {string} path Field path
 * @param {any} [defaultValue] Default value
 * @returns {any}
 * @version 0.0.1
 */

export function getByPath(obj: object, path: string, defaultValue?: any): any {
  const pathArr = splitToKeys(path)
  const len = pathArr.length
  let cur = obj
  for (let i = 0; i < len; i++) {
    if (isObject(cur)) {
      cur = cur[pathArr[i]]
    } else {
      return defaultValue
    }
  }
  return defaultValue ?? cur
}
