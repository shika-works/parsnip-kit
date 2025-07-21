import {
  Edge,
  EdgeReverse,
  EmptyOrParameters,
  EmptyOrReturnType
} from '../common/types'

/**
 * Combine multiple functions and execute them in the specified order of `direction`, by default of `'right'` meaning executing from right to left. The return of each function takes the next function as an argument.
 * @template {extends readonly ((...args: any[]) => any)[]} T Function array type
 * @template {extends 'left' | 'right' = 'left' | 'right'} R  Combination direction type
 * @param {T} functions  The array of functions to combine
 * @param {R} [direction='right']  The direction in which to combine the functions
 * @returns {(...args: EmptyOrParameters<Edge<T, R>>) => EmptyOrReturnType<EdgeReverse<T, R>>}
 * @version 0.0.1
 */
export function combine<
  T extends readonly ((...args: any[]) => any)[],
  R extends 'left' | 'right' = 'left' | 'right'
>(functions: T, direction: R = 'right' as R) {
  return function combined(
    ...args: EmptyOrParameters<Edge<T, R>>
  ): EmptyOrReturnType<EdgeReverse<T, R>> {
    let result
    let functionsToRun

    if (direction === 'left') {
      result = functions[0](...args)
      functionsToRun = functions.slice(1)
    } else {
      result = functions[functions.length - 1](...args)
      functionsToRun = functions.slice(0, functions.length - 1)
    }

    return direction === 'left'
      ? functionsToRun.reduce((runningResult, func) => {
          return func(runningResult)
        }, result)
      : functionsToRun.reduceRight((runningResult, func) => {
          return func(runningResult)
        }, result)
  }
}
