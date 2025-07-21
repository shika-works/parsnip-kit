import { ObjectLike, PrimitiveType } from '../common/types'
import { getTypeTag } from '../typed/getTypeTag'
import { isObjectLike } from '../typed/isObjectLike'

/**
 * Accepts an argument `arg` and returns its shallow clone.
 *
 * Supports basic types, plain objects (`Object.prototype.toString.apply(arg).slice(8, -1)` returns `"Object"`), as well as built-in objects including these: `Array`, `Map`, `Set`, `Date`, `RegExp`.
 *
 * Similar to Lodash's approach, for built-in objects that are not cloneable, such as `Error`, `Function`, `Promise`, `HTMLElement`, etc., an empty plain object will be returned.
 *
 * For plain objects, it will attempt to construct a new object based on its prototype as a shallow clone. If there is no prototype, an empty object will be created. Then, the enumerable properties of the input argument `arg` will be added.
 *
 * For `Arguments` objects, the function will returns a `Array` as its clone (v0.0.3).
 *
 * For `RegExp` objects, the function will not clone the `lastIndex` field.
 *
 * Supported built-in objects for cloning:
 *
 * |Category|Supported Objects|
 * |-|-|
 * |Wrapper Classes|`String` `Number` `Boolean`|
 * |Collection Types|`Object` `Array` `Map` `Set` `Arguments`(v0.0.3)|
 * |Date and Time|`Date`|
 * |Regular Expressions|`RegExp`|
 * |Files and Streams|`Blob` `File` `ArrayBuffer`|
 * |`TypedArray`|`Int8Array` `Uint8Array` `Uint8ClampedArray` `Int16Array` `Uint16Array` `Int32Array` `Uint32Array` `Float32Array` `Float64Array` `BigInt64Array` `BigUint64Array`|
 *
 * @template {extends PrimitiveType | ObjectLike} T  Type of parameter to be cloned
 * @param {T} obj  Parameter to be cloned
 * @returns {T}
 * @version 0.0.1
 */

export function clone<T extends PrimitiveType | ObjectLike>(arg: T) {
  if (isObjectLike(arg)) {
    let ans: any = {}
    const argTypeTag = getTypeTag(arg)
    if (arg instanceof Map) {
      ans = new Map()
      for (const entry of arg.entries()) {
        ans.set(entry[0], entry[1])
      }
    } else if (arg instanceof Set) {
      ans = new Set()
      for (const value of arg.values()) {
        ans.add(value)
      }
    } else if (Array.isArray(arg) || argTypeTag === 'Arguments') {
      ans = new Array(arg.length)
      const argKeys = Object.keys(arg)
      for (const key of argKeys) {
        ans[key] = arg[key]
      }
    } else {
      ans = cloneNotCollectionObject(arg, argTypeTag)
      if (!ans) {
        if (argTypeTag === 'Object') {
          if ((arg as any).__proto__) {
            ans = Object.create((arg as any).__proto__)
            Object.defineProperty(ans, 'constructor', {
              value: arg.constructor,
              writable: true,
              enumerable: false,
              configurable: true
            })
          } else {
            ans = {}
          }
          const argKeys = Object.keys(arg)
          for (const key of argKeys) {
            ans[key] = arg[key]
          }
        } else {
          ans = {}
        }
      }
    }
    return ans as T
  } else {
    return arg as T
  }
}

export const cloneNotCollectionObject = (
  arg: ObjectLike,
  argTypeTag: string,
  cache?: WeakMap<any, any>
) => {
  if (cache && cache.has(arg)) {
    return cache.get(arg)
  }
  let ans
  switch (argTypeTag) {
    case 'Number':
      ans = new Number(arg.valueOf())
      break
    case 'String':
      ans = new String(arg.valueOf())
      break
    case 'Boolean':
      ans = new Boolean(arg.valueOf())
      break
    case 'Date':
      ans = new Date(arg.valueOf() as number)
      break
    case 'RegExp':
      ans = new RegExp(arg.source, arg.flags)
      break
    case 'Blob':
      ans = new Blob([arg as Blob], { type: arg.type })
      break
    case 'File':
      ans = new File([arg as Blob], arg.name, { type: arg.type })
      break
    case 'ArrayBuffer':
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'BigInt64Array':
    case 'BigUint64Array':
      ans = arg.slice()
      break
  }
  if (cache && ans) {
    cache.set(arg, ans)
  }
  return ans
}
