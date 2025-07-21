/**
 * Splits array `arr` into sub-arrays with the length of `length`.
 * @template {} T Type of elements of array to split
 * @param {T[]} arr The array to split
 * @param {length} length The length of sub-arrays
 * @returns {T[][]}
 * @version 0.0.2
 */

export function chunk<T>(arr: T[], length: number) {
  if (length < 1) {
    throw TypeError(`Length of chunk cannot be less than 1.`)
  }
  const chunkLen = Math.floor(length)
  const len = arr.length
  const ans: T[][] = []

  for (let i = 0; i < len; i++) {
    const index = Math.floor(i / chunkLen)
    if (ans[index] === undefined) {
      ans[index] = []
    }
    ans[index].push(arr[i])
  }

  return ans
}
