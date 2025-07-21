const regSplitPath = /\.|\[(\d+)\]/

/**
 * Split the path string used for accessing values into individual keys.
 * @param {any} arg The string to be converted.
 * @returns {string[]}
 * @version 0.0.1
 */
export function splitToKeys(arg: string): string[] {
  return arg.split(regSplitPath).filter(Boolean)
}
