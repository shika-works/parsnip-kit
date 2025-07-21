import { isNumberString } from '../typed/isNumberString'

/**
 * Input an object `obj` and an iterator `iterator`, iterate over each field of the object, execute `iterator` for each field's value, remove the field if the return value `== false`, and return a new plain object or array.
 * @template {extends object} T Type of object to iterate
 * @param {T} obj Object to iterate
 * @param {(value: any, key: string, object: T) => boolean} iterator Iterator function
 * @returns {object}
 * @version 0.0.1
 *
 */
export function filterFields<T extends object>(
  obj: T,
  iterator: (value: any, key: string, object: T) => boolean
): object {
  const ans: any = Array.isArray(obj) ? [] : {}
  const objKeys = Object.keys(obj)
  for (const key of objKeys) {
    ans[key] = obj[key]
  }

  let count = 0
  for (const key of objKeys) {
    if (!iterator(obj[key], key, obj)) {
      if (Array.isArray(ans) && isNumberString(key)) {
        ans.splice(parseInt(key) - count, 1)
        count++
      } else {
        delete ans[key as string]
      }
    }
  }
  return ans
}
