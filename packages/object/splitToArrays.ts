/**
 * Input an object `obj`, and return an array of plain objects formed from each field of the `obj`, split by the object, or composed of the results returned by the optional parameter `createItem`.
 * @template {extends object} T Type of original object
 * @param {object} obj Original object
 * @param {(value: T[string & keyof T], key: string, obj: T) => any} [createItem] To create element of array to be returned
 * @returns {any[]}
 * @version 0.0.1
 */
export function splitToArrays<T extends object>(
  obj: T,
  createItem?: (value: T[string & keyof T], key: string, obj: T) => any
): [string, T[keyof T]][] {
  const ans: [string, T[keyof T]][] = []

  const objKeys = Object.keys(obj)
  for (const key of objKeys) {
    ans.push(createItem ? createItem(obj[key], key, obj) : { [key]: obj[key] })
  }

  return ans
}
