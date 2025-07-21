/**
 * A function that takes an object `obj` and an `iterator` function, iterates over each field of the object, and executes the `iterator` for each field's value.
 *
 * The `iterator` supports `async` functions or functions that return a `Promise`. The optional parameter `concurrent` controls whether the `iterator` functions are called concurrently. If the value is `'sequential'`, the next `iterator` will only be executed after the `Promise` returned by the previous `iterator` is either fulfilled or rejected.
 *
 * @template {extends object} T Object type
 * @template {extends 'concurrent' | 'sequential' = 'concurrent' | 'sequential'} R  Concurrent type
 * @param {T} obj Object to iterate
 * @param {(value: any, key: string, object: T) => any} iterator  Iterator function
 * @param {R} [concurrent='concurrent']  Concurrent type
 * @returns {Promise<void>}
 * @version 0.0.1
 */
export async function asyncForEachFields<
  T extends object,
  R extends 'concurrent' | 'sequential' = 'concurrent' | 'sequential'
>(
  obj: T,
  iterator: (value: any, key: string, object: T) => any,
  concurrent: R = 'concurrent' as R
) {
  const objKeys = Object.keys(obj)
  let count = objKeys.length

  if (!count) {
    return
  }

  let resolveFunc: Function
  const promise = new Promise<undefined>((resolve) => {
    resolveFunc = resolve
  })

  for (const key of objKeys) {
    if (concurrent === 'sequential') {
      await iterator(obj[key], key, obj)
    } else {
      Promise.resolve(iterator(obj[key], key, obj)).finally(() => {
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
