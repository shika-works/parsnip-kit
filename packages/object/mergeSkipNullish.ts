import { Nullish } from '../common/types'
import { isNullish } from '../typed/isNullish'

/**
 * Merge multiple objects from left to right to form a new object.
 *
 * Fields that are not `null` or `undefined` in the preceding objects will not be overwritten by `null` or `undefined` fields from the subsequent objects.
 *
 * @template {extends object} T The type of the objects to merge
 * @param {(T | Nullish)[]} ...objs The objects to merge
 * @returns {T}
 * @version 0.0.4
 */
function mergeSkipNullish<T extends object, U extends object>(
  a: T | Nullish,
  b: U | Nullish
): SpreadSkipNullish<T, U>
function mergeSkipNullish<T extends object, U extends object, V extends object>(
  a: T | Nullish,
  b: U | Nullish,
  c: V | Nullish
): SpreadSkipNullish<SpreadSkipNullish<T, U>, V>
function mergeSkipNullish<
  T extends object,
  U extends object,
  V extends object,
  W extends object
>(
  a: T | Nullish,
  b: U | Nullish,
  c: V | Nullish,
  d: W | Nullish
): SpreadSkipNullish<SpreadSkipNullish<SpreadSkipNullish<T, U>, V>, W>
function mergeSkipNullish(...objs: any[]): any
function mergeSkipNullish(...objs: any[]): any {
  return objs.reduce((acc, obj) => {
    if (isNullish(obj)) {
      return acc
    }
    const keys = Object.keys(obj)
    for (const key of keys) {
      const currentValue = acc![key]
      const newValue = obj[key]

      if (isNullish(currentValue) || !isNullish(newValue)) {
        acc![key] = newValue
      }
    }
    return acc
  }, {})
}

export { mergeSkipNullish }

type SpreadSkipNullish<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T
    ? K extends keyof U
      ? T[K] extends Nullish
        ? U[K]
        : U[K] extends Nullish
          ? T[K]
          : U[K]
      : T[K]
    : K extends keyof U
      ? U[K]
      : never
}
