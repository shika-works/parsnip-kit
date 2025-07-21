import { describe, it, expect } from 'vitest'
import { escapeRegExp } from '../escapeRegExp'

describe('escapeRegExp', () => {
  it('should escape regular characters correctly', () => {
    const str = 'hello world'
    const result = escapeRegExp(str)
    expect(result).toBe('hello world')
  })

  it('should escape regular expression metacharacters correctly', () => {
    const str = '.*+?^${}()|[]\\'
    const result = escapeRegExp(str)
    expect(result).toBe('\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\')
  })

  it('should escape backslashes correctly', () => {
    const str = '\\'
    const result = escapeRegExp(str)
    expect(result).toBe('\\\\')
  })

  it('should escape special characters correctly', () => {
    const str = 'abc123!@#'
    const result = escapeRegExp(str)
    expect(result).toBe('abc123!@#')
  })

  it('should handle empty string correctly', () => {
    const str = ''
    const result = escapeRegExp(str)
    expect(result).toBe('')
  })
})
