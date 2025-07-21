/**
 * Throttle function used to limit the frequency of function calls. It ensures that the function is not called more than once within a specified time interval.
 *
 * @template {extends (...args: any[]) => any} T Type of function to throttle
 * @param {T} func The function to throttle
 * @param {number} wait The minimum allowed interval between two consecutive calls (in milliseconds).
 * @param {object} [options] Optional parameter object
 * @param {boolean} [options.leading=false] Whether to execute the function at the beginning of the wait interval
 * @param {boolean} [options.trailing=true]  Whether to execute the function at the end of the wait interval, if not already executed
 * @returns {(...args: Parameters<T>) => void}
 * @version 0.0.1
 *
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options?: { leading?: boolean; trailing?: boolean }
) {
  let previous = 0
  let timeout: number | undefined
  const { leading = false, trailing = true } = options || {}

  const throttled = function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ): void {
    const now = +new Date()

    if (leading === false) {
      previous = now
    }
    const remaining = wait - (now - previous)
    if (remaining <= 0) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = undefined
      }
      previous = now
      func.apply(this, args)
    }
    if (!timeout && trailing) {
      timeout = setTimeout(() => {
        timeout = undefined
        previous = leading ? +new Date() : 0
        func.apply(this, args)
      }, remaining)
    }
  }
  return throttled
}
