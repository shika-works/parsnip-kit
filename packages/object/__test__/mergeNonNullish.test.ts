import { describe, it, expect } from 'vitest'
import { mergeSkipNullish } from '../mergeSkipNullish' // 替换为你的文件路径

describe('mergeSkipNullish', () => {
  it('should merge objects correctly', () => {
    const obj1 = { a: 1, b: null, c: undefined }
    const obj2 = { b: 2, c: 3, d: 4 }
    const obj3 = null
    const obj4 = { a: 5, e: 6 }

    const result = mergeSkipNullish(obj1, obj2, obj3, obj4)
    expect(result).toEqual({ a: 5, b: 2, c: 3, d: 4, e: 6 })
  })

  it('should handle empty objects', () => {
    const obj1 = {}
    const obj2 = { a: 1 }
    const obj3 = {}

    const result = mergeSkipNullish(obj1, obj2, obj3)
    expect(result).toEqual({ a: 1 })
  })

  it('should handle all nullish values', () => {
    const obj1 = null
    const obj2 = undefined
    const obj3 = null

    const result = mergeSkipNullish(obj1, obj2, obj3)
    expect(result).toEqual({})
  })

  it('should handle mixed types correctly', () => {
    const obj1 = { a: 1, b: 'string', c: true }
    const obj2 = { a: null, b: 2564, c: false, d: 10 }
    const obj3 = { a: 2, b: 'new string', c: null, d: undefined }

    const result = mergeSkipNullish(obj1, obj2, obj3)
    expect(result).toEqual({ a: 2, b: 'new string', c: false, d: 10 })
  })

  it('nullish field can be overwrote by post nullish field', () => {
    const obj1 = { a: 1, b: null, c: undefined }
    const obj2 = { b: undefined, c: null }

    const result = mergeSkipNullish(obj1, obj2)
    expect(result).toEqual({ a: 1, b: undefined, c: null })
  })

  it('not nullish field cannot be overwrote by post nullish field', () => {
    const obj1 = { a: 1 }
    const obj2 = { a: null }

    const result = mergeSkipNullish(obj1, obj2)
    expect(result).toEqual({ a: 1 })
  })
})
