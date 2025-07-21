/**
 * input an object `obj`, and return an array composed of arrays formed by each field's key-value pairs, or composed of the results returned by the optional parameter `createItem`.
 * @template {extends object} T Type of original object
 * @param {T} obj Original object
 * @param {(value: T[string & keyof T], key: string, obj: T) => any} [createItem] To create element of array to be returned
 * @returns {any[]}
 * @version 0.0.1
 */
export function objectToPairs<T extends object>(
  obj: T,
  createItem?: (value: T[string & keyof T], key: string, obj: T) => any
) {
  const ans: any = []

  const objKeys = Object.keys(obj)
  for (const key of objKeys) {
    ans.push(createItem ? createItem(obj[key], key, obj) : [key, obj[key]])
  }

  return ans
}
