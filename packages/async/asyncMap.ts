/**
 * Input an array `array` and an iterator `iterator`, traverse each element of the array, execute the `iterator` on each element, and return an array composed of the return values after each execution using `await`.
 *
 * The `iterator` supports `async` functions or functions that return a `Promise`. The optional parameter `concurrent` controls whether the `iterator` functions are called concurrently. If the value is `'sequential'`, the next `iterator` will only be executed after the `Promise` returned by the previous `iterator` is either fulfilled or rejected.
 *
 * @template {} T  Element type of array
 * @template {} U  Return type of the `iterator`
 * @template {extends 'concurrent' | 'sequential' = 'concurrent' | 'sequential'} R  Concurrent type
 * @param {T[]} array  Array to iterate
 * @param {(item: T, index: number, array: T[]) => U | Promise<U>} iterator  Iterator function
 * @param {R} [concurrent='concurrent']  Concurrent type
 * @returns {Promise<U[]>}
 * @version 0.0.1
 */
export async function asyncMap<
  T,
  U,
  R extends 'concurrent' | 'sequential' = 'concurrent' | 'sequential'
>(
  array: T[],
  iterator: (item: T, index: number, array: T[]) => U | Promise<U>,
  concurrent: R = 'concurrent' as R
): Promise<U[]> {
  let count = array.length

  if (!count) {
    return []
  }

  let resolveFunc: Function
  const promise = new Promise<undefined>((resolve) => {
    resolveFunc = resolve
  })

  const result: U[] = []
  for (const [index, item] of array.entries()) {
    if (concurrent === 'sequential') {
      result[index] = await iterator(item, index, array)
    } else {
      Promise.resolve(await iterator(item, index, array))
        .then((res) => {
          result[index] = res
        })
        .finally(() => {
          count--
          if (!count) {
            resolveFunc()
          }
        })
    }
  }
  if (concurrent === 'concurrent') {
    await promise
  }
  return result
}
