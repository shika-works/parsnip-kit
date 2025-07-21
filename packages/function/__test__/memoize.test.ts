import { describe, it, vi, expect, beforeEach } from 'vitest'
import { memoize } from '../memoize'

describe('memoize function tests', () => {
  let testFunc: (...args: any[]) => number

  beforeEach(() => {
    testFunc = vi.fn((a: number, b: number) => a + b)
  })

  describe('basic functionality', () => {
    it('should return the same result for the same arguments', () => {
      const memoizedFunc = memoize(testFunc)
      const result1 = memoizedFunc(1, 2)
      const result2 = memoizedFunc(1, 2)
      expect(result1).toEqual(result2)
      expect(testFunc).toHaveBeenCalledTimes(1)
    })

    it('should call the original function with different arguments', () => {
      const memoizedFunc = memoize(testFunc)
      memoizedFunc(1, 2)
      memoizedFunc(3, 4)
      memoizedFunc(5, 6)
      expect(testFunc).toHaveBeenCalledTimes(3)
    })
  })

  describe('resolver functionality', () => {
    it('should use the resolver function to generate cache keys', () => {
      const resolver = vi.fn(() => 'custom-key')
      const memoizedFunc = memoize(testFunc, resolver)
      memoizedFunc(1, 2)
      memoizedFunc(3, 4)
      expect(resolver).toHaveBeenCalledTimes(2)
      expect(testFunc).toHaveBeenCalledTimes(1)
    })
  })

  describe('initCache functionality', () => {
    it('should initialize the cache with the provided arguments', () => {
      const memoizedFunc = memoize(testFunc, undefined, [1, 2])
      const result = memoizedFunc(1, 2)
      expect(testFunc).toHaveBeenCalledTimes(1)
      expect(result).toEqual(3)
      expect(testFunc).toHaveBeenCalledTimes(1)
    })
  })

  describe('reference equality test', () => {
    it('should consider same arguments by reference', () => {
      const memoizedFunc = memoize(testFunc)
      const a = { value: 1 }
      const b = { value: 2 }
      memoizedFunc(a, b)
      memoizedFunc(a, b)
      expect(testFunc).toHaveBeenCalledTimes(1)
    })
  })
})
