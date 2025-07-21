import { describe, it, expect } from 'vitest'
import { chunk } from '../chunk'

describe('chunk', () => {
  it('should split array into chunks of specified length', () => {
    const arr = [1, 2, 3, 4, 5]
    const length = 2
    const result = chunk(arr, length)
    expect(result).toEqual([[1, 2], [3, 4], [5]])
  })

  it('should handle empty array', () => {
    const arr: number[] = []
    const length = 3
    const result = chunk(arr, length)
    expect(result).toEqual([])
  })

  it('should throw error when length is less than 1', () => {
    const arr = [1, 2, 3]
    const length = 0
    expect(() => chunk(arr, length)).toThrow(TypeError)
  })

  it('should handle non-integer length', () => {
    const arr = [1, 2, 3, 4, 5]
    const length = 2.5
    const result = chunk(arr, length)
    expect(result).toEqual([[1, 2], [3, 4], [5]])
  })

  it('should handle length larger than array length', () => {
    const arr = [1, 2, 3]
    const length = 5
    const result = chunk(arr, length)
    expect(result).toEqual([[1, 2, 3]])
  })

  it('should handle different data types', () => {
    const arr = [1, 'a', true, null, undefined]
    const length = 2
    const result = chunk(arr, length)
    expect(result).toEqual([[1, 'a'], [true, null], [undefined]])
  })
})
