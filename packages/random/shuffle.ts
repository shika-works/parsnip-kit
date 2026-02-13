import { shuffleInPlace } from './shuffleInPlace'

/**
 * Accepts an array `arr` and returns a new array with its elements randomly shuffled.
 *
 * The parameter `notFixedPoint` controls whether all elements are forced to leave their original positions after shuffling.
 * - If `false` (default), the Fisher-Yates algorithm is used (elements may stay in their original positions).
 * - If `true`, the Sattolo algorithm is used (ensuring that no element remains in its original position).
 * @template {} T Type of elements of input array
 * @param {T[]} arr Input array to shuffle
 * @param {Boolean} [noFixedPoint=false] Input array to shuffle
 * @returns {T[]}
 * @version 0.1.0
 */

export function shuffle<T>(arr: T[], noFixedPoint: boolean = false) {
  return shuffleInPlace([...arr], noFixedPoint)
}
