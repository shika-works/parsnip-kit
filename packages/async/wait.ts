/**
 * Returns a `Promise` that transitions to the fulfilled state after a delay of `delay` ms.
 * @template {extends (...args: any) => any} T Typeof callback
 * @param {number} delay Delay time
 * @param {T} callback Callback After Delay
 * @returns {Promise<ReturnType<T>>}
 * @version 0.1.0
 */

export function wait<T extends (...args: any) => any>(delay: number, callback?: T) {
  return new Promise<ReturnType<T>>((resolve) =>
    setTimeout(() => resolve(callback ? callback() : undefined), delay)
  )
}
