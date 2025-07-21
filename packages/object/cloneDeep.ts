import { ObjectLike, PseudoArray } from '../common/types'
import { getTypeTag } from '../typed/getTypeTag'
import { isFunction } from '../typed/isFunction'
import { isObject } from '../typed/isObject'
import { cloneNotCollectionObject } from './clone'

/**
 * Accepts an argument `arg` and returns its deep clone.
 *
 * Supports the same data types as the [clone](../object/clone) function. For objects that are not supported, refers to Lodash's handling approach by returning these objects themselves to ensure the usability of the copy results.
 *
 * An optional parameter `customizeClone` used to override the behavior when cloning unsupported objects and plain objects.
 *
 * @template {} T Type of parameter to be cloned
 * @param {T} obj Parameter to be cloned
 * @param {CustomizeClone} [customizeClone] Customize the cloning behavior for plain objects and unsupported built-in objects
 * @returns {T}
 * @version 0.0.1
 */

export function cloneDeep<T>(arg: T, customizeClone?: CustomizeClone) {
  const cache = new WeakMap()
  return cloneDeepHelper(arg, cache, undefined, customizeClone) as T
}

function cloneWithCache(
  arg: any,
  cache: WeakMap<any, any>,
  key?: string,
  customizeClone?: CustomizeClone
) {
  let value = arg
  if (isObject(arg)) {
    if (cache.has(arg)) {
      value = cache.get(arg)
    } else {
      const clonedValue = cloneDeepHelper(arg, cache, key, customizeClone)
      if (clonedValue) {
        value = clonedValue
        cache.set(arg, clonedValue)
      }
    }
  }
  return value
}

function cloneDeepHelper(
  arg: any,
  cache: WeakMap<any, any>,
  key?: string,
  customizeClone?: CustomizeClone
) {
  if (isObject(arg)) {
    let ans: any = {}
    const argTypeTag = getTypeTag(arg)
    if (arg instanceof Map) {
      ans = new Map()
      for (const entry of arg.entries()) {
        ans.set(
          cloneWithCache(entry[0], cache, undefined, customizeClone),
          cloneWithCache(entry[1], cache, undefined, customizeClone)
        )
      }
    } else if (arg instanceof Set) {
      ans = new Set()
      for (const value of arg.values()) {
        ans.add(cloneWithCache(value, cache, undefined, customizeClone))
      }
    } else if (Array.isArray(arg) || argTypeTag === 'Arguments') {
      ans = new Array((arg as PseudoArray).length)
      const argKeys = Object.keys(arg)
      for (const key of argKeys) {
        ans[key] = cloneWithCache(arg[key], cache, key, customizeClone)
      }
    } else {
      ans = cloneNotCollectionObject(arg, argTypeTag, cache)
      if (!ans) {
        if (isFunction(customizeClone)) {
          ans = customizeClone(arg, key, cache, defaultClone4Object)
        } else if (argTypeTag === 'Object') {
          ans = defaultClone4Object(arg, cache, customizeClone)
        } else {
          ans = arg
        }
      }
    }
    return ans
  } else {
    return arg
  }
}

function defaultClone4Object(
  arg: ObjectLike,
  cache: WeakMap<any, any>,
  customizeClone?: CustomizeClone
) {
  if (cache.has(arg)) {
    return cache.get(arg)
  }
  let ans
  if (arg.__proto__) {
    ans = Object.create(arg.__proto__)
    Object.defineProperty(ans, 'constructor', {
      value: arg.constructor,
      writable: true,
      enumerable: false,
      configurable: true
    })
  } else {
    ans = {}
  }
  cache.set(arg, ans)
  const argKeys = Object.keys(arg)
  for (const key of argKeys) {
    ans[key] = cloneWithCache(arg[key], cache, key, customizeClone)
  }
  return ans
}

/**
 * The type of the optional `customizeClone` parameter for `cloneDeep`, which is used to customize the copying behavior for plain objects and unsupported built-in objects.
 * @version 0.0.1
 */
export type CustomizeClone = (
  arg: any,
  key: string | undefined,
  cache: WeakMap<any, any>,
  defaultClone4Object: (
    arg: ObjectLike,
    cache: WeakMap<any, any>,
    customizeClone?: CustomizeClone
  ) => any
) => any
