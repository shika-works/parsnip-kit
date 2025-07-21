import { randomInt } from '../randomInt'
import { describe, expect, test, vi } from 'vitest'

describe('randomInt', () => {
  test('should return a number between 0 and 9 when no arguments are provided', () => {
    for (let i = 1; i < 100; i++) {
      const result = randomInt()
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThan(10)
    }
  })

  test('should return a number in the specified range', () => {
    const start = 5
    const end = 15

    for (let i = 1; i < 100; i++) {
      const result = randomInt(start, end)
      expect(result).toBeGreaterThanOrEqual(start)
      expect(result).toBeLessThan(end)
    }
  })

  test('should return the start value when start equals end', () => {
    const start = 5
    const end = 5
    const result = randomInt(start, end)
    expect(result).toBe(start)
  })

  test('should return different values when Math.random returns different values', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.1)
    const result1 = randomInt(0, 10)
    vi.spyOn(Math, 'random').mockReturnValue(0.9)
    const result2 = randomInt(0, 10)
    expect(result1).not.toEqual(result2)
  })
})
