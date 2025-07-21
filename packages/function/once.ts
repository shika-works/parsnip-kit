/**
 * This is a function that accepts a function `func` and returns a new function that will be called only once. After the first call, it will return the cached result of the first call.
 *
 * @template {extends (...args: any[]) => any} T Function type
 * @param {T} func The function only called once
 * @returns {(...args: Parameters<T>) => ReturnType<T>}
 * @version 0.0.2
 */
export function once<T extends (...args: any[]) => any>(func: T) {
  let called = false
  let cache: ReturnType<T> | undefined
  return function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ): ReturnType<T> {
    if (!called) {
      called = true
      cache = func.apply(this, args)
      return cache!
    }
    return cache!
  }
}
