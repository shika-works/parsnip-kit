/**
 * Returns a random integer value in interval [`start`, `end`).
 * @param {number} [start=0] The left boundary of the interval
 * @param {number} [end=10] The right boundary of the interval
 * @returns {number}
 * @version 0.0.3
 */

export function randomInt(start: number = 0, end: number = 10) {
  return start + Math.floor(Math.random() * (end - start))
}
