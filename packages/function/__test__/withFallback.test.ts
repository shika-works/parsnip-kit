import { describe, it, expect } from 'vitest'
import { withFallback } from '../withFallback'

describe('withFallback', () => {
  it('should return the result of the function when it is not null or undefined', () => {
    const func = () => 42
    const wrappedFunc = withFallback(func, 'fallback')
    const result = wrappedFunc()
    expect(result).toBe(42)
  })

  it('should return the default value when the function returns null', () => {
    const func = () => null
    const defaultValue = 'fallback'
    const wrappedFunc = withFallback(func, defaultValue)
    const result = wrappedFunc()
    expect(result).toBe(defaultValue)
  })

  it('should return the default value when the function returns undefined', () => {
    const func = () => undefined
    const defaultValue = 'fallback'
    const wrappedFunc = withFallback(func, defaultValue)
    const result = wrappedFunc()
    expect(result).toBe(defaultValue)
  })

  it('should handle functions with arguments correctly', () => {
    const func = (a: number, b: number) => a + b
    const wrappedFunc = withFallback(func, 0)
    const result = wrappedFunc(2, 3)
    expect(result).toBe(5)
  })

  it('should handle functions that return null with arguments', () => {
    const func = (a: number) => (a === 0 ? null : a)
    const defaultValue = -1
    const wrappedFunc = withFallback(func, defaultValue)
    const result = wrappedFunc(0)
    expect(result).toBe(defaultValue)
  })

  it('should handle functions that return undefined with arguments', () => {
    const func = (a: number) => (a < 0 ? undefined : a)
    const defaultValue = -1
    const wrappedFunc = withFallback(func, defaultValue)
    const result = wrappedFunc(-5)
    expect(result).toBe(defaultValue)
  })
})
