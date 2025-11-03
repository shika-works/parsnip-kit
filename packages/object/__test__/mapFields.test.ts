import { describe, it, expect, vi } from 'vitest'
import { mapFields } from '../mapFields'

describe('mapFields', () => {
  it('maps numeric values correctly', () => {
    const input = { a: 1, b: 2 }
    const result = mapFields(input, (v) => v * 2)
    expect(result).toEqual({ a: 2, b: 4 })
  })

  it('preserves keys and returns mapped types', () => {
    const input = { name: 'alice', city: 'tokyo' } as const
    const result = mapFields(input, (v) => v.length)
    expect(result).toEqual({ name: 5, city: 5 })
  })

  it('returns empty object for empty input', () => {
    const input: Record<string, number> = {}
    const result = mapFields(input, (v) => v * 2)
    expect(result).toEqual({})
  })

  it('passes value, key and object to mapper', () => {
    const input = { x: 10, y: 20 }
    const spy = vi.fn(
      (value: number, key: keyof typeof input, object: typeof input) => {
        return `${key}:${value}:${Object.keys(object).length}`
      }
    )
    const result = mapFields(input, spy as any)
    expect(spy).toHaveBeenCalledTimes(2)
    expect(spy).toHaveBeenCalledWith(10, 'x', input)
    expect(spy).toHaveBeenCalledWith(20, 'y', input)
    expect(result).toEqual({ x: 'x:10:2', y: 'y:20:2' })
  })

  it('works with nested object values', () => {
    const input = { a: { n: 1 }, b: { n: 2 } }
    const result = mapFields(input, (v) => v.n)
    expect(result).toEqual({ a: 1, b: 2 })
  })
})
