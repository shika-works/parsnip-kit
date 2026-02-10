/**
 * Returns a `Promise` that transitions to the fulfilled state after a delay of `delay` ms.
 * @param {number} delay Delay time
 * @returns {number}
 * @version 0.1.0
 */

export function wait<T = void>(delay: number, data: T) {
  return new Promise<T>((resolve) => setTimeout(() => resolve(data), delay))
}
