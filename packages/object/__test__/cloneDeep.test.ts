import { describe, expect, test } from 'vitest'
import { cloneDeep, CustomizeClone } from '../cloneDeep'

// Test cloning of plain objects
describe('cloneDeep', () => {
  test('should correctly clone a plain object', () => {
    const original = { a: 1, b: { c: 2 }, d: [3, 4] }
    const cloned = cloneDeep(original)

    expect(cloned).not.toBe(original)
    expect(cloned).toEqual(original)
    expect(cloned.b).not.toBe(original.b)
    expect(cloned.d).not.toBe(original.d)
  })

  test('should correctly clone an array', () => {
    const original = [1, { a: 2 }, [3, 4]]
    const cloned = cloneDeep(original)

    expect(cloned).not.toBe(original)
    expect(cloned).toEqual(original)
    expect(cloned[1]).not.toBe(original[1])
    expect(cloned[2]).not.toBe(original[2])
  })

  test('should correctly clone a Map', () => {
    const original = new Map()
    original.set('a', 1)
    original.set('b', { c: 2 })
    const cloned = cloneDeep(original)

    expect(cloned).not.toBe(original)
    expect(Array.from(cloned.entries())).toEqual(Array.from(original.entries()))
    expect(cloned.get('b')).not.toBe(original.get('b'))
  })

  test('should correctly clone a Set', () => {
    const original = new Set([1, { a: 2 }, [3, 4]])
    const cloned = cloneDeep(original)

    expect(cloned).not.toBe(original)
    expect(Array.from(cloned)).toEqual(Array.from(original))
    const originalArray = Array.from(original)
    const clonedArray = Array.from(cloned)
    expect(clonedArray[1]).not.toBe(originalArray[1])
    expect(clonedArray[2]).not.toBe(originalArray[2])
  })

  test('should support custom cloning logic', () => {
    const original = { a: 1 }
    const customizeClone: CustomizeClone = (arg) => {
      if (arg && arg.a === 1) {
        return { ...arg, custom: 'custom' }
      }
      return undefined
    }
    const cloned = cloneDeep(original, customizeClone)

    expect(cloned).not.toBe(original)
    expect(cloned).toEqual({ ...original, custom: 'custom' })
  })

  test('Handle circular references (shallow clone)', () => {
    const original: any = {}
    original.self = original
    const cloned = cloneDeep(original)
    expect(cloned).not.toBe(original)
    expect(cloned.self).not.toBe(original.self)
    expect(cloned).toBe(cloned.self)
  })

  test('Clone primitive data types', () => {
    expect(cloneDeep(123)).toBe(123)
    expect(cloneDeep('hello')).toBe('hello')
    expect(cloneDeep(true)).toBe(true)
    expect(cloneDeep(null)).toBeNull()
    expect(cloneDeep(undefined)).toBeUndefined()
  })
})
