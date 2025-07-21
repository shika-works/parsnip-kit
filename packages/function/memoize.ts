const generateKey = (...args: any[]) => JSON.stringify(args)

/**
 * This is a memoize function, which is used to cache the return values of a function. When called again with the same parameters, it will return the cached result, avoiding redundant calculations.
 *
 * By default, uses `JSON.stringify(arguments)` as the cache key.
 *
 * @template {extends (...args: any[]) => any} T Type of function to memoize
 * @param {T} func  The function to memoize
 * @param { ( ...args: Parameters<T> ) => any } [resolver] A function used to generate cache keys
 * @param { Parameters<T>} [initCache]  Parameters for initializing the cache
 * @returns { ( ...args: Parameters<T> ) => ReturnType<T> }
 * @version 0.0.1
 */
export function memoize<T extends (...args: any[]) => any>(
  func: T,
  resolver?: (...args: Parameters<T>) => any,
  initCache?: Parameters<T>
) {
  const cache = new Map<string, ReturnType<T>>()

  const memoized = function (this: any, ...args: Parameters<T>): ReturnType<T> {
    const key = resolver ? resolver(...args) : generateKey(...args)

    if (cache.has(key)) {
      return cache.get(key)!
    }

    const result = func.apply(this, args)
    cache.set(key, result)
    return result
  }
  if (initCache) {
    memoized(...initCache)
  }
  return memoized
}
