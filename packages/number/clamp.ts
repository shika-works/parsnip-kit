/**
 * Clamp the input parameter `num` using `max` as the upper bound and `min` as the lower bound.
 * @param {number} num The number to clamp
 * @param {number} [min=-Infinity] The minimum
 * @param {number} [max=Infinity] The maximum
 * @returns {number}
 * @version 0.0.6
 */

export const clamp = (
  num: number,
  min: number = -Infinity,
  max: number = Infinity
): number => Math.max(min, Math.min(max, num))
