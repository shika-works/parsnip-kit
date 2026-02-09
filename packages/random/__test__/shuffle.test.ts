import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shuffle } from '../shuffle'
import { shuffleInPlace } from '../shuffleInPlace'

describe('shuffle function', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  describe('in place version', () => {
    it('should return original array and mutate the original', () => {
      const original = [1, 2, 3, 4, 5]
      const result = shuffleInPlace(original)

      expect(result).toBe(original)
    })
  })

  describe('basic functionality', () => {
    it('should return a new array and not mutate the original', () => {
      const original = [1, 2, 3, 4, 5]
      const result = shuffle(original)

      expect(result).not.toBe(original)
      expect(original).toEqual([1, 2, 3, 4, 5])
    })

    it('should return an array with the same length', () => {
      const arr = [1, 2, 3, 4, 5]
      const result = shuffle(arr)

      expect(result).toHaveLength(arr.length)
    })

    it('should return an array with the same elements (order may differ)', () => {
      const arr = [1, 2, 3, 4, 5]
      const result = shuffle(arr)

      expect(result.sort()).toEqual(arr.sort())
    })

    it('should handle empty array', () => {
      const arr: number[] = []
      const result = shuffle(arr)

      expect(result).toEqual([])
    })

    it('should handle single element array', () => {
      const arr = [42]
      const result = shuffle(arr)

      expect(result).toEqual([42])
    })
  })

  describe('noFixedPoint = false (Fisher-Yates algorithm)', () => {
    it('should allow elements to stay in original positions', () => {
      // Mock Math.random to return low values, making swaps less likely
      const mockRandom = vi.spyOn(Math, 'random').mockReturnValue(1)

      const arr = [1, 2, 3, 4, 5]
      const result = shuffle(arr, false)

      // With this mock, elements are more likely to stay in place
      expect(result).toEqual(arr)

      mockRandom.mockRestore()
    })

    it('should produce different shuffles with different random seeds', () => {
      const arr = [1, 2, 3, 4, 5]
      const results = new Set()

      // Run multiple times to check for randomness
      for (let i = 0; i < 200; i++) {
        results.add(JSON.stringify(shuffle(arr, false)))
      }

      // In a truly random shuffle, we'd expect at least 2 different results
      expect(results.size).toBeGreaterThan(1)
    })
  })

  describe('noFixedPoint = true (Sattolo algorithm)', () => {
    it('should not have any element in its original position', () => {
      const arr = [1, 2, 3, 4, 5]
      const result = shuffle(arr, true)

      // Check that no element is in its original position
      arr.forEach((element, index) => {
        expect(result[index]).not.toBe(element)
      })
    })

    it('should handle edge cases for noFixedPoint', () => {
      const single = [42]
      const resultSingle = shuffle(single, true)
      expect(resultSingle).toEqual([42])

      // Two element array
      const two = [1, 2]
      const resultTwo = shuffle(two, true)
      expect(resultTwo).toEqual([2, 1])
    })

    it('should create a derangement (permutation with no fixed points)', () => {
      const arr = ['a', 'b', 'c', 'd', 'e']

      for (let i = 0; i < 20; i++) {
        const result = shuffle(arr, true)

        expect([...result].sort()).toEqual([...arr].sort())

        // Check no fixed points
        arr.forEach((element, index) => {
          expect(result[index]).not.toBe(element)
        })
      }
    })
  })
})
