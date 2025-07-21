/**
 * Execute a array of function `functions` that return `Promise` in parallel, with the `limit` parameter restricting the number of concurrent executions.
 *
 * @template {} T  The `value` type returned by a function that returns a `Promise`
 * @param {(() => Promise<T>)[]} functions  Array of functions that return `Promise`
 * @param {number} limit Array of functions that return `Promise`
 * @returns {Promise<PromiseSettledResult<Awaited<T>>[]>}
 * @version 0.0.1
 */
export async function concurrent<T>(
  functions: (() => Promise<T>)[],
  limit: number
) {
  const tasks: Promise<T>[] = []
  const executing: Promise<unknown>[] = []
  for (const func of functions) {
    const task = Promise.resolve().then(() => func())
    tasks.push(task as any)
    if (limit <= tasks.length) {
      const executingTask = task.finally(() => {
        executing.splice(executing.indexOf(executingTask), 1)
      })
      executing.push(executingTask)
      if (executing.length >= limit) {
        await Promise.race(executing)
      }
    }
  }
  return Promise.allSettled(tasks)
}
