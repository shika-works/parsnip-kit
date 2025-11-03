import { describe, it, expect } from 'vitest'
import { isEmail } from '../isEmail'

describe('isEmail', () => {
  it('returns true for simple valid email', () => {
    expect(isEmail('user@example.com')).toBe(true)
  })

  it('returns true for complex valid emails', () => {
    expect(isEmail('first.last_1@example.co.uk')).toBe(true)
    expect(isEmail('user-name@sub.domain.example.co.jp')).toBe(true)
  })

  it('returns false for invalid email formats', () => {
    expect(isEmail('userexample.com')).toBe(false)
    expect(isEmail('user@domain.c')).toBe(false)
    expect(isEmail('.user@domain.com')).toBe(false)
    expect(isEmail('user@-domain.com')).toBe(false)
    expect(isEmail('user@domain..com')).toBe(false)
  })

  it('returns false for non-string inputs', () => {
    expect(isEmail(123)).toBe(false)
    expect(isEmail(null)).toBe(false)
    expect(isEmail(undefined)).toBe(false)
    expect(isEmail({})).toBe(false)
    expect(isEmail([])).toBe(false)
  })

  it('returns false for empty string', () => {
    expect(isEmail('')).toBe(false)
  })
})
