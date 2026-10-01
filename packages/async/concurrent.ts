/**
 * Execute a array of function `functions` that return `Promise` in parallel, with the `limit` parameter restricting the number of concurrent executions.
 *
 * @template {} T  The `value` type returned by a function that returns a `Promise`
 * @param {(() => Promise<T>)[]} functions  Array of functions that return `Promise`
 * @param {number} limit  Maximum number of functions executed concurrently
 * @returns {Promise<PromiseSettledResult<Awaited<T>>[]>}
 * @version 0.0.1
 */
export async function concurrent<T>(
  functions: (() => Promise<T>)[],
  limit: number
): Promise<PromiseSettledResult<Awaited<T>>[]> {
  const results: PromiseSettledResult<Awaited<T>>[] = []
  let cursor = 0
  const run = async () => {
    while (cursor < functions.length) {
      const index = cursor++
      try {
        results[index] = { status: 'fulfilled', value: await functions[index]() }
      } catch (reason) {
        results[index] = { status: 'rejected', reason }
      }
    }
  }
  const size = Math.min(Math.max(Math.floor(limit) || 1, 1), functions.length)
  await Promise.all(Array.from({ length: size }, run))
  return results
}
