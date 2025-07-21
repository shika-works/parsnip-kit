/**
 * Input an object `obj`, and return two arrays: one containing its keys and the other containing its values.
 * @template {extends object} T Type of original object
 * @param {T} obj Original object
 * @param {(value: T[string & keyof T], key: string, obj: T) => any} [createKey] To create element of array of keys to be returned
 * @param {(value: T[string & keyof T], key: string, obj: T) => any} [createValue] To create element of array of values to be returned
 * @returns {[string[], any[]]}
 * @version 0.0.1
 *
 */
export function unzipToArrays<T extends object>(
  obj: T,
  createKey?: (value: T[string & keyof T], key: string, obj: T) => any,
  createValue?: (value: T[string & keyof T], key: string, obj: T) => any
): [string[], T[keyof T][]] {
  const keys: string[] = []
  const values: T[keyof T][] = []

  const objKeys = Object.keys(obj)
  for (const key of objKeys) {
    keys.push(createKey ? createKey(obj[key], key, obj) : key)
    values.push(createValue ? createValue(obj[key], key, obj) : obj[key])
  }

  return [keys, values]
}
