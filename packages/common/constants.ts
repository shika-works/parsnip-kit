/**
 * Comparator for sorting strings in lexicographical ascending order.
 * @version 0.0.1
 */
export const stringComparatorAsc = (a: string, b: string) => {
  return a.localeCompare(b)
}

/**
 * Comparator for sorting strings in lexicographical descending order.
 * @version 0.0.1
 */
export const stringComparatorDesc = (a: string, b: string) => {
  return b.localeCompare(a)
}

/**
 * Comparator for sorting numbers in ascending order.
 * @version 0.0.1
 */
export const numberComparatorAsc = (a: number, b: number) => {
  return a - b
}

/**
 * Comparator for sorting numbers in descending order.
 * @version 0.0.1
 */
export const numberComparatorDesc = (a: number, b: number) => {
  return b - a
}

/**
 * Comparator for sorting strings in ascending order based on their code unit values. This is the default order used by `Array.prototype.sort` in Vanilla JavaScript.
 * @version 0.0.2
 */

export const codeUnitComparatorAsc = (a: string, b: string) => {
  if (a < b) return -1
  if (b > a) return 1
  return 0
}

/**
 * Comparator for sorting strings in descending order based on their code unit values.
 * @version 0.0.2
 */
export const codeUnitComparatorDesc = (a: string, b: string) => {
  if (a < b) return 1
  if (b > a) return -1
  return 0
}
