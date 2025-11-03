/**
 * Accepts an `obj` object and a `mapper` function, iterates over each field of the object, and returns a new object whose values are the return values of `mapper`.
 * @template {extends object} T Object type
 * @template {} V The return type iterator function
 * @param {T} obj Object to iterate
 * @param {<K extends keyof T>(value: T[K], key: K, object: T) => V} mapper The Iterator function
 * @returns {Record<keyof T, V>}
 * @version 0.0.6
 */

export function mapFields<T extends object, V>(
  obj: T,
  mapper: <K extends keyof T>(value: T[K], key: K, object: T) => V
) {
  const result = {} as Record<keyof T, V>
  const objKeys = Object.keys(obj) as (keyof T)[]
  for (const key of objKeys) {
    result[key] = mapper(obj[key], key, obj)
  }

  return result
}
