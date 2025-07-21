/**
 * Input an array `array` and an iterator `iterator`, iterate over each element of the array, and execute `iterator` for each element.
 *
 * The `iterator` supports `async` functions or functions that return a `Promise`. The optional parameter `concurrent` controls whether the `iterator` functions are called concurrently. If the value is `'sequential'`, the next `iterator` will only be executed after the `Promise` returned by the previous `iterator` is either fulfilled or rejected.
 *
 * @template {} T Element type of array
 * @template {extends 'concurrent' | 'sequential' = 'concurrent' | 'sequential'} R Concurrent type
 * @param {T[]} array   Array to iterate
 * @param {(item: T, index: number, array: T[]) => any} iterator  Iterator function
 * @param {R} [concurrent='concurrent']  Concurrent type
 * @returns {Promise<void>}
 * @version 0.0.1
 */
export async function asyncForEach<
  T,
  R extends 'concurrent' | 'sequential' = 'concurrent' | 'sequential'
>(
  array: T[],
  iterator: (item: T, index: number, array: T[]) => any,
  concurrent: R = 'concurrent' as R
): Promise<void> {
  let count = array.length

  if (!count) {
    return
  }

  let resolveFunc: Function
  const promise = new Promise<undefined>((resolve) => {
    resolveFunc = resolve
  })

  for (const [index, item] of array.entries()) {
    if (concurrent === 'sequential') {
      await iterator(item, index, array)
    } else {
      Promise.resolve(iterator(item, index, array)).finally(() => {
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
}
