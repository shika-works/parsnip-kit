// once.test.ts
import { describe, expect, it, vi } from 'vitest'
import { once } from '../once'

describe('once function', () => {
  it('should call the function only once', () => {
    const mockFn = vi.fn()
    const onceFn = once(mockFn)

    onceFn()
    onceFn()

    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('should return the cached result after the first call', () => {
    const mockFn = vi.fn().mockReturnValue(42)
    const onceFn = once(mockFn)

    const result1 = onceFn()
    const result2 = onceFn()

    expect(result1).toBe(42)
    expect(result2).toBe(42)
  })

  it('should work with functions that have parameters', () => {
    const mockFn = vi.fn().mockImplementation((a: number, b: number) => a + b)
    const onceFn = once(mockFn)

    const result1 = onceFn(2, 3)
    const result2 = onceFn(4, 5)

    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith(2, 3)
    expect(result1).toBe(5)
    expect(result2).toBe(5)
  })

  it('should work with functions that have context', () => {
    const context = { value: 10 }
    const mockFn = vi.fn().mockImplementation(function () {
      return this.value
    })
    const onceFn = once(mockFn)

    const result1 = onceFn.call(context)
    const result2 = onceFn.call(context)

    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith()
    expect(result1).toBe(10)
    expect(result2).toBe(10)
  })

  it('should work with functions that return objects', () => {
    const mockFn = vi.fn().mockReturnValue({ data: 'test' })
    const onceFn = once(mockFn)

    const result1 = onceFn()
    const result2 = onceFn()

    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(result1).toEqual({ data: 'test' })
    expect(result2).toEqual({ data: 'test' })
  })
})
