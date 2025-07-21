/**
 * Input two parameters `arg1` and `arg2`, and return whether they are strictly equal.
 * @param {any} arg1 Variable to compare
 * @param {any} arg2 Variable to compare
 * @returns {boolean}
 * @version 0.0.1
 */
export function isEqualStrict(arg1: any, arg2: any) {
  return Object.is(arg1, arg2)
}
