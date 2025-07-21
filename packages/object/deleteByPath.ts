import { splitToKeys } from '../string/splitToKeys'
import { isNumberString } from '../typed/isNumberString'
import { isObject } from '../typed/isObject'

/**
 * Input an object `obj` and a field path `path`, then traverse the object deeply according to the path to delete the field at the end of the path.
 * @param {object} obj  Object to delete value
 * @param {string} path  Field path
 * @returns {void}
 * @version 0.0.1
 */

export function deleteByPath(obj: object, path: string) {
  const pathArr = splitToKeys(path)
  const len = pathArr.length
  let cur = obj
  for (let i = 0; i < len; i++) {
    if (isObject(cur)) {
      if (i < len - 1) {
        cur = cur[pathArr[i]]
      } else {
        if (isNumberString(pathArr[i]) && Array.isArray(cur)) {
          cur.splice(parseInt(pathArr[i]), 1)
        } else {
          delete cur[pathArr[i]]
        }
      }
    } else {
      throw TypeError(
        `${pathArr
          .slice(0, i + 1)
          .reduce(
            (pre, cur, index) =>
              pre +
              (isNumberString(cur)
                ? `[${cur}]`
                : index === 0
                  ? `${cur}`
                  : `.${cur}`),
            ''
          )} is not an object.`
      )
    }
  }
}
