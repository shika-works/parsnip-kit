/**
 * Returns a random number in interval [`start`, `end`).
 * @param {number} [start=0] The left boundary of the interval
 * @param {number} [end=1] The right boundary of the interval
 * @returns {number}
 * @version 0.0.1
 */
export function randomNumber(start: number = 0, end: number = 1) {
  return start + Math.random() * (end - start)
}
