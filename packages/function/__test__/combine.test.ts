import { describe, expect, it } from 'vitest'
import { combine } from '../combine'

describe('combine', () => {
  function add(a: number, b: number): number {
    return a + b
  }

  function multiply(a: number): number {
    return a * 2
  }

  describe('Combine left to right', () => {
    it('should return 10 when combining add and multiply', () => {
      const combinedLeft = combine([add, multiply] as const, 'left')
      expect(combinedLeft(2, 3)).toBe(10)
    })
  })
  describe('Combine right to left', () => {
    it('should return 10 when combining add and multiply', () => {
      const combinedRight = combine([multiply, add] as const)
      expect(combinedRight(2, 3)).toBe(10)
    })
  })
  describe('Combine right to left with curried functions', () => {
    it('should return 17 when combining addCurried and multiplyCurried with direction right', () => {
      const addCurried = (a: number) => (b: number) => a + b
      const multiplyCurried = (a: number) => (b: number) => a * b

      const combinedRightCurried = combine(
        [addCurried(2), multiplyCurried(3)] as const,
        'right'
      )
      expect(combinedRightCurried(5)).toBe(17)
    })
  })
})
