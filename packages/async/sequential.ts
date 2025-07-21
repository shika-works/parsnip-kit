import { isUndefined } from '../typed/isUndefined'

/**
 * The `sequential` function is typically used when multiple asynchronous operations need to be executed in sequence. It takes an array of functions `functions` that return a `Promise` and executes them serially. Each function can accept the result of the previous function wrapped in a `PromiseSettledResult` type as a parameter.
 *
 * If an optional parameter `initialValue` is provided, it will be wrapped in a `PromiseSettledResult` of fulfilled status and passed to the first function. Otherwise, the first function will receive `undefined` as its parameter.
 *
 * @template {} T The `value` type returned by a function that returns a `Promise`
 * @param {((arg?: PromiseSettledResult<Awaited<T>>) => Promise<T>)[]} functions  Array of functions that return `Promise`
 * @param {Awaited<T>} [initialValue]  Initial Value
 * @returns {Promise<PromiseSettledResult<Awaited<T>>[]>}
 * @version 0.0.1
 */
export async function sequential<T>(
  functions: ((arg?: PromiseSettledResult<Awaited<T>>) => Promise<T>)[],
  initialValue?: Awaited<T>
) {
  const results: PromiseSettledResult<Awaited<T>>[] = []
  const initialParams = !isUndefined(initialValue)
    ? { status: 'fulfilled' as const, value: initialValue! }
    : void 0
  for (const [index, func] of functions.entries()) {
    results[index] = await Promise.resolve()
      .then(() =>
        Promise.resolve(func(index > 0 ? results[index - 1] : initialParams))
      )
      .then((res) => ({ status: 'fulfilled' as const, value: res }))
      .catch((err) => ({ status: 'rejected' as const, reason: err }))
  }
  return results
}
