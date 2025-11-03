import { describe, it, expect } from 'vitest'
import { clamp } from '../clamp'

describe('clamp', () => {
  it('should clamp a number within the bounds', () => {
    expect(clamp(5, 0, 10)).toBe(5)
  })

  it('should clamp a number below the minimum', () => {
    expect(clamp(-5, 0, 10)).toBe(0)
  })

  it('should clamp a number above the maximum', () => {
    expect(clamp(15, 0, 10)).toBe(10)
  })

  it('should clamp with default min and max values', () => {
    expect(clamp(100)).toBe(100)
    expect(clamp(-100)).toBe(-100)
  })

  it('should clamp with custom min and max values', () => {
    expect(clamp(7, 3, 8)).toBe(7)
    expect(clamp(2, 3, 8)).toBe(3)
    expect(clamp(10, 3, 8)).toBe(8)
  })

  it('should handle negative numbers correctly', () => {
    expect(clamp(-10, -20, -5)).toBe(-10)
    expect(clamp(-30, -20, -5)).toBe(-20)
    expect(clamp(-1, -20, -5)).toBe(-5)
  })
})
