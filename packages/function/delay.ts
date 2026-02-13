/**
 * This is a delay function that accepts a function `func` and a delay `wait` in milliseconds, and returns a function that will call the provided function after the specified delay.
 *
 * @template {extends (...args: any[]) => any} T  Function type
 * @param {T} func  The function to delay
 * @param {number} wait  The delay time (in milliseconds)
 * @returns {(...args: Parameters<T>) => void}
 * @version 0.0.1
 */
export function delay<T extends (...args: any[]) => any>(func: T, wait: number) {
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}
