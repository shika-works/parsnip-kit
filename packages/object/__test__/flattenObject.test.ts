import { flattenObject } from '../flattenObject'
import { describe, test, expect } from 'vitest'

describe('flattenObject', () => {
  test('should flatten a simple nested object', () => {
    const input = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3
        }
      }
    }
    const expected = {
      a: 1,
      'b.c': 2,
      'b.d.e': 3
    }
    expect(flattenObject(input)).toEqual(expected)
  })

  test('should handle arrays correctly', () => {
    const input = {
      a: [1, 2, { b: 3 }],
      c: {
        d: [4, 5, { e: 6 }]
      }
    }
    const expected = {
      'a[0]': 1,
      'a[1]': 2,
      'a[2].b': 3,
      'c.d[0]': 4,
      'c.d[1]': 5,
      'c.d[2].e': 6
    }
    expect(flattenObject(input)).toEqual(expected)
  })

  test('should handle deeply nested objects and arrays', () => {
    const input = {
      a: {
        b: [1, { c: 2 }, [3, { d: 4 }]]
      },
      e: {
        f: {
          g: 5
        }
      }
    }
    const expected = {
      'a.b[0]': 1,
      'a.b[1].c': 2,
      'a.b[2][0]': 3,
      'a.b[2][1].d': 4,
      'e.f.g': 5
    }
    expect(flattenObject(input)).toEqual(expected)
  })

  test('should handle empty objects and arrays', () => {
    const input = {
      a: {},
      b: [],
      c: {
        d: {},
        e: []
      }
    }
    const expected = {}
    expect(flattenObject(input)).toEqual(expected)
  })

  test('should handle objects with mixed types', () => {
    const input = {
      a: 1,
      b: 'string',
      c: true,
      d: null,
      e: undefined,
      f: {
        g: 2,
        h: 'another string'
      }
    }
    const expected = {
      a: 1,
      b: 'string',
      c: true,
      d: null,
      e: undefined,
      'f.g': 2,
      'f.h': 'another string'
    }
    expect(flattenObject(input)).toEqual(expected)
  })
})
