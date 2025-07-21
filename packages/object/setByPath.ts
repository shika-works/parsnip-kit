import { splitToKeys } from '../string/splitToKeys'
import { isNumberString } from '../typed/isNumberString'
import { isObject } from '../typed/isObject'

/**
 * Input an object `obj` and a field path `path`, then traverse the object deeply according to the path to set the value `value`.
 * @param {object} obj Object to be set
 * @param {string} path Field path
 * @param {any} value Value to be set
 * @returns {void}
 * @version 0.0.1
 */
export function setByPath(obj: object, path: string, value: any) {
  const pathArr = splitToKeys(path)
  const len = pathArr.length
  let cur = obj
  for (let i = 0; i < len; i++) {
    let numIdx: undefined | number
    if (isNumberString(pathArr[i])) {
      numIdx = parseInt(pathArr[i])
    }
    if (i === len - 1) {
      cur[numIdx === undefined ? pathArr[i] : numIdx] = value
    } else {
      const nextIsNumberIdx = isNumberString(pathArr[i + 1])
      const idx = numIdx === undefined ? pathArr[i] : numIdx
      if (!isObject(cur[idx])) {
        cur[idx] = !nextIsNumberIdx ? {} : []
      }
      cur = cur[idx]
    }
  }
}
