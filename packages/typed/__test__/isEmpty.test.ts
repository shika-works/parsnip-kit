import { describe, it, expect } from 'vitest'
import { isEmpty } from '../isEmpty'

describe('isEmpty', () => {
  it('should return true for undefined', () => {
    expect(isEmpty(undefined)).toBe(true)
  })

  it('should return true for null', () => {
    expect(isEmpty(null)).toBe(true)
  })

  it('should return true for NaN', () => {
    expect(isEmpty(NaN)).toBe(true)
  })

  it('should return true for an empty string', () => {
    expect(isEmpty('')).toBe(true)
  })

  it('should return true for an empty array', () => {
    expect(isEmpty([])).toBe(true)
  })

  it('should return false for a non-empty array', () => {
    expect(isEmpty([1, 2, 3])).toBe(false)
  })

  it('should return false for a number', () => {
    expect(isEmpty(42)).toBe(false)
  })

  it('should return false for an object', () => {
    expect(isEmpty({ key: 'value' })).toBe(false)
  })
})
