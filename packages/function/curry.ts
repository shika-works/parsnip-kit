/**
 * Curries the given function.
 *
 * Curry, a fundamental concept in functional programming, involves transforming a function with multiple parameters into a sequence of functions that each accept a single parameter, facilitating the passing of parameters one at a time.
 * @param {Function}  Function to be curried
 * @returns {Function}
 * @version 0.0.1
 *
 */
export function curry(fn: (...args: any[]) => any) {
  const argsLength = fn.length

  return function curried(this: any, ...args: any[]) {
    if (args.length >= argsLength) {
      return fn.apply(this, args)
    } else {
      return function (this: any, ...restArgs: any[]) {
        return curried.apply(this, args.concat(restArgs))
      }
    }
  }
}
