import { isArray } from '../typed/isArray'
import { getByPath } from '../object/getByPath'
import { isFunction } from '../typed/isFunction'
import { setByPath } from '../object/setByPath'
import {
  DeepMappedTypeByKeyOrIndex,
  LiteralStringWithFallback
} from '../common/types'

/**
 * Converts a flat array `arr` into a tree structure and returns the array of root nodes.
 *
 * This is useful for build the tree options from flat array.
 *
 * Note: this function can modify the elements of `arr`.
 *
 * Optional parameters:
 * - `getKey`: Used to obtain the unique identifier for each element. This can be a field path for [getByPath](../object/getByPath) or a function.
 * - `getParent`: Retrieves the parent identifier for each element. Like `getKey`, it can be a field path for [getByPath](../object/getByPath) or a function.
 * - `childrenPath`: Specifies the field path in the object where child elements should be stored. It defaults to `'children'`. Both [getByPath](../object/getByPath) and [setByPath](../object/setByPath) will utilize this path when accessing or modifying the child elements.
 * @template {extends object} T The type of elements of array `arr`
 * @template {extends string} R The type of `childrenPath`
 * @param {T[]} arr The flat array to be converted into a tree structure
 * @param {string | ((item: T, index: number, arr: T[]) => string)} [getKey] To get the unique identifier
 * @param {string | ((item: T, index: number, arr: T[]) => string)} [getParent] To get the parent identifier
 * @param {R} [childrenPath='children'] The field path in the object where child elements should be stored
 * @returns {(T & DeepMappedTypeByKeyOrIndex<LiteralStringWithFallback<R, "children">, T[], false>)[]}
 * @version 0.0.2
 */

export function linkToTree<T extends object, R extends string>(
  arr: T[],
  getKey?: string | ((item: T, index: number, arr: T[]) => string),
  getParent?: string | ((item: T, index: number, arr: T[]) => string),
  childrenPath: R = 'children' as R
) {
  const keyToEntity = new Map<any, T>()
  const len = arr.length
  const childrenCount = new Array(len).fill(0)
  const childrenMap = new Map<T, T[]>()

  for (let i = 0; i < len; i++) {
    const currentKey = getKey
      ? isFunction(getKey)
        ? getKey(arr[i], i, arr)
        : getByPath(arr[i], getKey)
      : (arr[i] as any).key
    keyToEntity.set(currentKey, arr[i])
    let children = getByPath(arr[i], childrenPath)
    if (!isArray(children)) {
      children = []
      setByPath(arr[i], childrenPath, children)
    }
    childrenMap.set(arr[i], children)
  }

  for (let i = 0; i < len; i++) {
    const currentParent = getParent
      ? isFunction(getParent)
        ? getParent(arr[i], i, arr)
        : getByPath(arr[i], getParent)
      : (arr[i] as any).parent
    const parent = keyToEntity.get(currentParent)
    if (parent) {
      const children = childrenMap.get(parent)
      if (children) {
        children.push(arr[i])
        childrenCount[i]++
      }
    }
  }

  const ans: (T &
    DeepMappedTypeByKeyOrIndex<
      LiteralStringWithFallback<R, 'children'>,
      T[],
      false
    >)[] = []
  for (let i = 0; i < len; i++) {
    if (childrenCount[i] === 0) {
      ans.push(arr[i] as any)
    }
  }
  return ans
}
