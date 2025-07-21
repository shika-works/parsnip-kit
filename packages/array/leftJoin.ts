import { isString } from '../typed/isString'
import { getByPath } from '../object/getByPath'

/**
 * Input two arrays `left` and `right`, and return the array formed by performing a left join of `left` with `right`. This is commonly used to combine arrays of objects that contain related information, similar to how it is done in SQL.
 *
 * Additionally, it accepts two parameters: `leftKey` and `rightKey`. These can be field paths of [getByPath](../object/getByPath) or callback functions, used to provide identifiers to distinguish elements. The `merge` function is used to generate the return array objects.
 * @template {extends object} T  Type of elements of left array in a left join
 * @template {extends object} U  Type of elements of right array in a left join
 * @template {extends object} R  Type of elements of array returned
 * @param {T[]} left  The left array in a left join
 * @param {U[]} right  The right array in a left join
 * @param {string | ((item: T, index: number, arr: T[]) => any)} leftKey Provide an identifier to distinguish elements in the left array
 * @param {string | ((item: U, index: number, arr: U[]) => any)} rightKey  Provide an identifier to distinguish elements in the right array
 * @param {(left: T, right: U | undefined) => R} merge  Return the result of merging elements from left and right arrays.
 * @returns {R[]}
 * @version 0.0.1
 */

export function leftJoin<T extends object, U extends object, R extends object>(
  left: T[],
  right: U[],
  leftKey: string | ((item: T, index: number, arr: T[]) => any),
  rightKey: string | ((item: U, index: number, arr: U[]) => any),
  merge: (left: T, right: U | undefined) => R
): R[] {
  const rightMap = new Map<any, U>()

  const lenRight = right.length
  for (let i = 0; i < lenRight; i++) {
    rightMap.set(
      isString(rightKey)
        ? getByPath(right[i] as object, rightKey)
        : rightKey(right[i], i, right),
      right[i]
    )
  }

  const ans: R[] = []
  const lenLeft = left.length
  for (let i = 0; i < lenLeft; i++) {
    const curLeftKey = isString(leftKey)
      ? getByPath(left[i] as object, leftKey)
      : leftKey(left[i], i, left)
    const rightItem = rightMap.get(curLeftKey)
    ans.push(merge(left[i], rightItem))
  }

  return ans
}
