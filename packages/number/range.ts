/**
 * Input the start value `start` and the end value `end`, and return the sequence starting from `start` with a step size of `step` in the interval [`start`, `end`). Inspired by the syntax for generating arrays with equal steps in Python, as well as in Matlab, Rust, and others.
 * @param {number} start  Start value
 * @param {number} end  End value
 * @param {number} [step=1]  Step size
 * @returns {number[]}
 * @version 0.0.1
 */
export function range(start: number, end: number, step: number = 1): number[] {
  if (start === end) {
    return []
  }
  if (step === 0) {
    throw TypeError('range step must be not equal 0.')
  }
  const ans: number[] = []
  while (step > 0 ? start < end : end < start) {
    ans.push(start)
    start += step
  }
  return ans
}
