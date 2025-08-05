export type MapKey<T> = T extends Map<infer K, any> ? K : never
export type MapValue<T> = T extends Map<any, infer V> ? V : never

export type SetValue<T> = T extends Set<infer K> ? K : never

/**
 * The primitive types including `number`, `string`, `boolean`, `undefined`, `null`, `bigint`, and `symbol`
 * @version 0.0.1
 */
export type PrimitiveType =
  | undefined
  | null
  | number
  | string
  | boolean
  | bigint
  | symbol

/**
 * A string composed of numbers.
 * @version 0.0.1
 */
export type NumberString = `${number}`

/**
 * A pseudo-array, also known as an array-like object, an object had a numeric `length` property.
 * @version 0.0.3
 */
export type PseudoArray = object & { length: number }

/**
 * Non-function object.
 * @version 0.0.1
 */
export type ObjectLike = object & { call?: never; [x: PropertyKey]: any }
/**
 * Extract a union type from a tuple.
 * @version 0.0.1
 */
export type ExtractUnion<T extends readonly string[]> = {
  [K in keyof T]: T[K]
}[number]

/**
 * Extracts a number from a string in the form of [${number}] or ${number}. Otherwise, returns the original string.
 * @version 0.0.1
 */
export type KeyOrIndex<T extends string> = T extends
  | `[${infer D extends number}]`
  | `${infer D extends number}`
  ? D
  : T

/**
 * Returns the last element of tuple type.
 * @version 0.0.1
 */
export type Tail<T extends readonly any[]> = T extends readonly [
  ...any[],
  infer L
]
  ? L
  : never

/**
 * Returns the first element of tuple type.
 * @version 0.0.1
 */
export type Head<T extends readonly any[]> = T extends readonly [
  infer L,
  ...any[]
]
  ? L
  : never

/**
 * Retrieve the first or last element of tuple `T`, determined by type `D`.
 * @version 0.0.1
 */
export type Edge<
  T extends readonly any[],
  D = 'left' | 'right'
> = D extends 'left' ? Head<T> : Tail<T>

/**
 * Similar to `Edge`, but the effects of `'left'` and `'right'` for D are reversed.
 * @version 0.0.1
 */
export type EdgeReverse<
  T extends readonly any[],
  D = 'left' | 'right'
> = D extends 'right' ? Head<T> : Tail<T>

/**
 * Returns the parameter types of the function; if the input is not a function, returns the `never[]` type.
 * @version 0.0.1
 */
export type EmptyOrParameters<T> = T extends (...args: any[]) => any
  ? Parameters<T>
  : never[]

/**
 * Returns the return type of the function; if the input is not a function, returns the `void` type.
 * @version 0.0.1
 */
export type EmptyOrReturnType<T> = T extends (...args: any[]) => any
  ? ReturnType<T>
  : void

/**
 * Either returns the result of type `T` or a fallback value `R` if the result is `null` or `undefined`.
 * @version 0.0.2
 */
export type WithFallback<T extends (...args: any[]) => any, R> =
  ReturnType<T> extends undefined | null ? R : ReturnType<T>

/**
 * This type provides a default string value `R` when string type `T` is too general (like string).
 *
 * It ensures type safety while allowing flexibility in scenarios such as configuration objects or optional parameters.
 * @version 0.0.2
 */
export type LiteralStringWithFallback<T extends string, R extends string> = T &
  R extends never
  ? T
  : R

/**
 * Generates plain objects or arrays based on input string/numeric index `T`, pointing to type `V`, with optionality controlled by type `O`.
 * @version 0.0.2
 */
export type MappedTypeByKeyOrIndex<
  T extends string,
  V,
  O extends boolean = false
> =
  KeyOrIndex<T> extends string
    ? O extends false
      ? { [P in T]: V }
      : { [P in T]?: V }
    : O extends false
      ? unknown[] & { [P in KeyOrIndex<T>]: V }
      : unknown[] & { [P in KeyOrIndex<T>]?: V }

/**
 * Recursively parses the field path `T` and creates nested plain objects or arrays. It can interpret nested path strings like `"data.[0].name"`, with the path's end field pointing to value `V`. `O` decides if the value is optional.
 *
 * It is very useful for creating complex nested types based on string templates.
 * @version 0.0.2
 */
export type DeepMappedTypeByKeyOrIndex<
  T extends string,
  V,
  O extends boolean = false
> = T extends `[${infer Key extends number}][${infer Rest}`
  ? MappedTypeByKeyOrIndex<`${Key}`, DeepMappedTypeByKeyOrIndex<`[${Rest}`, V>>
  : T extends `${infer Key}[${infer Rest}`
    ? MappedTypeByKeyOrIndex<
        `${Key}`,
        DeepMappedTypeByKeyOrIndex<`[${Rest}`, V>
      >
    : T extends `[${infer Key extends number}].${infer Rest}`
      ? MappedTypeByKeyOrIndex<`${Key}`, DeepMappedTypeByKeyOrIndex<Rest, V>>
      : T extends `${infer Key}.${infer Rest}`
        ? MappedTypeByKeyOrIndex<`${Key}`, DeepMappedTypeByKeyOrIndex<Rest, V>>
        : MappedTypeByKeyOrIndex<T, V, O>

/**
 * `DataUnit` type represents different units of digital data.
 * @version 0.0.2
 */
export type DataUnit =
  | 'bit'
  | 'B'
  | 'KB'
  | 'MB'
  | 'GB'
  | 'TB'
  | 'PB'
  | 'EB'
  | 'ZB'
  | 'YB'

/**
 * `Nullish` type represents values that are either `null` or `undefined`.
 * @version 0.0.4
 */
export type Nullish = undefined | null

/**
 * Merge multiple types from left to right to form a new object type.
 *
 * Fields that are not `null` or `undefined` in the preceding objects will not be overwritten by `null` or `undefined` fields from the subsequent objects.
 * @version 0.0.4
 */
export type SpreadSkipNullish<T, U> = {
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
/**
 * `IsAny` type is used to determine if a type is `any`.
 * If `T` is `any`, the result is `true`; otherwise, it is `false`.
 * @version 0.0.4
 */
export type IsAny<T> = 0 extends 1 & T ? true : false
/**
 * `ArrayIndexes` type is used to obtain the indexes of elements in an array (excluding general array properties such as `length`).
 * @version 0.0.4
 */
export type ArrayIndexes<T extends any[]> = Exclude<
  keyof T,
  keyof any[] | 'length'
> &
  (string | number)
/**
 * `FieldPathComponent` type is used to generate field path components.
 * If `Str` is a number or a numeric string, it generates a path like `'[1]'`; if it is a string, it generates a path like `'a'`.
 * Depending on whether the subsequent type is a plain object or an array, it decides whether to append `'.'` at the end.
 * @version 0.0.4
 */
export type FieldPathComponent<
  Str extends string | number,
  Next extends 'object' | 'array' | void = void
> = Str extends NumberString | number
  ? Next extends 'object'
    ? `[${Str & (string | number)}].`
    : `[${Str & (string | number)}]`
  : Next extends 'object'
    ? `${Str & string}.`
    : `${Str & string}`
/**
 * `FlattenArrayObject` type is used to flatten objects within an array into a union type.
 * It recursively processes each element in the array and continues to flatten based on the type of the element (object or array).
 * @version 0.0.4
 */
export type FlattenArrayObject<
  T extends Array<any>,
  Prefix extends string = ''
> = {
  [K in number | ArrayIndexes<T>]: IsAny<T[K]> extends true
    ? { [P in `${Prefix}${FieldPathComponent<K>}`]: T[K] }
    : T[K] extends never
      ? never
      : T[K] extends object
        ? T[K] extends Array<any>
          ? FlattenArrayObject<
              T[K],
              `${Prefix}${FieldPathComponent<K, 'array'>}`
            >
          : FlattenObject<T[K], `${Prefix}${FieldPathComponent<K, 'object'>}`>
        : { [P in `${Prefix}${FieldPathComponent<K>}`]: T[K] }
}[ArrayIndexes<T> | number]
/**
 * `FlattenObject` type is used to flatten an object into a union type.
 * It recursively processes each field of the object and continues to flatten based on the type of the field (object or array).
 * @version 0.0.4
 */
export type FlattenObject<T, Prefix extends string = ''> = {
  [K in keyof T & string]: IsAny<T[K]> extends true
    ? { [P in `${Prefix}${FieldPathComponent<K>}`]: T[K] }
    : T[K] extends never
      ? never
      : T[K] extends object
        ? T[K] extends Array<any>
          ? FlattenArrayObject<
              T[K],
              `${Prefix}${FieldPathComponent<K, 'array'>}`
            >
          : FlattenObject<T[K], `${Prefix}${FieldPathComponent<K, 'object'>}`>
        : { [P in `${Prefix}${FieldPathComponent<K>}`]: T[K] }
}[keyof T & string]
/**
 * `UnionToIntersection` type is used to convert a union type to an intersection type.
 * For example, `A | B` will be converted to `A & B`.
 * @version 0.0.4
 */
export type UnionToIntersection<U> = (
  U extends any ? (x: U) => any : never
) extends (x: infer R) => any
  ? R
  : never
/**
 * `IntersectionToObject` type is used to convert an intersection type to an object type.
 * For example, `A & B` will be converted to `{ [K in keyof (A & B)]: (A & B)[K] }`.
 * @version 0.0.4
 */
export type IntersectionToObject<U> = {
  [K in keyof UnionToIntersection<U>]: UnionToIntersection<U>[K]
}
/**
 * `FlattenNestObject` type is used to flatten a nested object into a new object type.
 * It first flattens the object into a union type using `FlattenObject`, then converts the union type to an intersection type using `UnionToIntersection`,
 * and finally converts the intersection type to an object type using `IntersectionToObject`.
 * @version 0.0.4
 */
export type FlattenNestObject<T extends object> = IntersectionToObject<
  UnionToIntersection<FlattenObject<T>>
>
