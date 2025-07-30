/**
 * This function mimics the Go language's error handling style, Executing a function (async or regular) and returning a fulfilled `Promise` with value of a tuple of `[Awaited<result>, null]` on success or `[null, error]` on failure.
 * @template {} T The type of the function's return value
 * @template {= any} U The type of the error (defaults to `any`)
 * @param {(...x: any[]) => T} func The function to execute.
 * @returns {Promise<[T, null] | [null, U]>}
 * @version 0.0.4
 */
export async function go<T, U = any>(func: (...x: any[]) => T) {
  try {
    const res = await func()
    return [res, null] as [Awaited<T>, null]
  } catch (error: any) {
    return [null, error] as [null, U]
  }
}
