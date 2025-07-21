/**
 * A function that takes an object `obj` and an `iterator` function, iterates over each field of the object, and executes the `iterator` for each field's value.
 * @template {extends object} T Object type
 * @param {T} obj Object to iterate
 * @param {(value: any, key: string, object: T) => any} iterator Iterator function
 * @returns {void}
 * @version 0.0.1
 */
export function forEachFields<T extends object>(
  obj: T,
  iterator: (value: any, key: string, object: T) => any
) {
  const objKeys = Object.keys(obj)
  for (const key of objKeys) {
    iterator(obj[key], key, obj)
  }
}
