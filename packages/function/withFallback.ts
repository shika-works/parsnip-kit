import { WithFallback } from '../common/types'

/**
 * This function returns a new function that either returns the result of `func` or a fallback value `defaultValue` if the result is `null` or `undefined`.
 * @template {extends (...args: any[]) => any} T Function type
 * @template {} R Type of default value
 * @param {T} func The function with default return value
 * @param {R} defaultValue Default value
 * @returns {WithFallback<T, R>}
 * @version 0.0.2
 */

export function withFallback<T extends (...args: any[]) => any, R>(
  func: T,
  defaultValue: R
) {
  return function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ): WithFallback<T, R> {
    return func.apply(this, args) ?? defaultValue
  }
}
