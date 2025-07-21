/**
 * This is a debounce function, which is used to limit the frequency of function calls. It will execute the function after a specified time interval. If the function is called multiple times within the interval, the previous timer will be cleared and reset.
 *
 * @template {extends (...args: any[]) => any} T  Type of function to debounce
 * @param {T} func The function to debounce
 * @param {number} wait The delay time between two consecutive calls (in milliseconds)
 * @param {object} [options] Optional parameter object
 * @param {boolean} [options.immediate=false] Whether to execute the function immediately on the first call
 * @param {number} [options.maxWait] Set the maximum waiting time
 * @returns {(...args: Parameters<T>) => void}
 * @version 0.0.1
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options?: { maxWait?: number; immediate?: boolean }
): (...args: Parameters<T>) => void {
  let timeout: number | undefined
  let maxTimeout: number | undefined

  const { immediate = false, maxWait } = options || {}

  const debounced = function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ): void {
    if (maxWait !== undefined && !maxTimeout) {
      maxTimeout = setTimeout(() => {
        maxTimeout = undefined
        func.apply(this, args)
      }, maxWait)
    }

    if (!timeout && immediate) {
      func.apply(this, args)
    }
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      if (maxTimeout) {
        clearTimeout(maxTimeout)
        maxTimeout = undefined
      }

      func.apply(this, args)
    }, wait)
  }

  return debounced
}
