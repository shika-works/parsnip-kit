import { randomNumber } from './randomNumber'

/**
 * Returns a random element of the input array `arr`.
 * @param {any[]} arr Array to be extracted randomly
 * @returns {any}
 * @version 0.0.1
 */
export function randomFromArray<T>(arr: T[]): T {
  const index = Math.floor(randomNumber(0, arr.length))
  return arr[index]
}
