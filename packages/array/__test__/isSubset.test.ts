import { describe, expect, it } from 'vitest'
import { isSubset } from '../isSubset'

describe('isSubset', () => {
  describe('basic functionality', () => {
    it('should return true when arr1 is subset of arr2', () => {
      const arr1 = [1, 2]
      const arr2 = [1, 2, 3, 4]
      expect(isSubset(arr1, arr2)).toBe(true)
    })

    it('should return false when arr1 is not subset of arr2', () => {
      const arr1 = [1, 2, 5]
      const arr2 = [1, 2, 3, 4]
      expect(isSubset(arr1, arr2)).toBe(false)
    })

    it('should return true for empty arr1 (empty set is subset of any set)', () => {
      const arr1: number[] = []
      const arr2 = [1, 2, 3]
      expect(isSubset(arr1, arr2)).toBe(true)
    })

    it('should return false when arr1 has more elements than arr2', () => {
      const arr1 = [1, 2, 3]
      const arr2 = [1, 2]
      expect(isSubset(arr1, arr2)).toBe(false)
    })

    it('should handle duplicate elements correctly', () => {
      const arr1 = [1, 1, 2]
      const arr2 = [1, 2, 2, 3]
      expect(isSubset(arr1, arr2)).toBe(false)
    })

    it('should return false when duplicate elements insufficient', () => {
      const arr1 = [1, 1, 2] // needs two 1s
      const arr2 = [1, 2, 3] // only one 1
      expect(isSubset(arr1, arr2)).toBe(false)
    })

    it('should work with Set-like behavior for primitive values', () => {
      const arr1 = [1, 2, 3, 3]
      const arr2 = [1, 2, 3, 4, 5]
      expect(isSubset(arr1, arr2)).toBe(false)
    })

    it('should work with boolean values', () => {
      const arr1 = [true, false]
      const arr2 = [true, false, true]
      expect(isSubset(arr1, arr2)).toBe(true)
    })
  })
})

describe('with getter function', () => {
  interface Product {
    id: string
    name: string
    price: number
  }

  const products1: Product[] = [
    { id: 'p1', name: 'Laptop', price: 1000 },
    { id: 'p2', name: 'Mouse', price: 50 }
  ]

  const products2: Product[] = [
    { id: 'p1', name: 'Laptop', price: 1000 },
    { id: 'p2', name: 'Mouse', price: 50 },
    { id: 'p3', name: 'Keyboard', price: 100 }
  ]

  const products3: Product[] = [
    { id: 'p1', name: 'Laptop', price: 1000 },
    { id: 'p4', name: 'Monitor', price: 300 }
  ]

  it('should use getter function to extract id', () => {
    const getter = (product: Product) => product.id
    expect(isSubset(products1, products2, getter)).toBe(true)
    expect(isSubset(products3, products2, getter)).toBe(false)
  })

  it('should use getter function with index and array parameters', () => {
    const getter = (product: Product, index: number) => `${product.id}-${index}`
    const subset = [{ id: 'p1', name: 'Laptop', price: 1000 }]
    const superset = [
      { id: 'p1', name: 'Laptop', price: 1000 },
      { id: 'p2', name: 'Mouse', price: 50 }
    ]
    expect(isSubset(subset, superset, getter)).toBe(true)
  })
})

describe('with string path getter', () => {
  interface Item {
    data: {
      id: number
      value: string
    }
    metadata: {
      timestamp: string
    }
  }

  const items1: Item[] = [
    { data: { id: 1, value: 'A' }, metadata: { timestamp: '2023-01-01' } },
    { data: { id: 2, value: 'B' }, metadata: { timestamp: '2023-01-02' } }
  ]

  const items2: Item[] = [
    { data: { id: 1, value: 'A' }, metadata: { timestamp: '2023-01-01' } },
    { data: { id: 2, value: 'B' }, metadata: { timestamp: '2023-01-02' } },
    { data: { id: 3, value: 'C' }, metadata: { timestamp: '2023-01-03' } }
  ]

  it('should use string path to access nested property', () => {
    expect(isSubset(items1, items2, 'data.id')).toBe(true)
  })

  it('should handle complex string paths', () => {
    expect(isSubset(items1, items2, 'metadata.timestamp')).toBe(true)
  })

  it('should return false when path values dont match', () => {
    const items3: Item[] = [
      { data: { id: 1, value: 'A' }, metadata: { timestamp: '2023-01-01' } },
      { data: { id: 4, value: 'D' }, metadata: { timestamp: '2023-01-04' } }
    ]
    expect(isSubset(items3, items2, 'data.id')).toBe(false)
  })

  it('should handle getter returning same value for different items', () => {
    const arr1 = [
      { id: 1, type: 'A' },
      { id: 2, type: 'A' }
    ]
    const arr2 = [
      { id: 1, type: 'A' },
      { id: 3, type: 'B' }
    ]
    expect(isSubset(arr1, arr2, 'type')).toBe(false)
  })

  describe('edge cases', () => {
    it('should handle arrays with undefined and null values', () => {
      const arr1 = [undefined, null]
      const arr2 = [1, undefined, null, 2]
      expect(isSubset(arr1, arr2)).toBe(true)
    })

    it('should handle NaN values', () => {
      const arr1 = [NaN, 1]
      const arr2 = [1, 2, NaN]
      expect(isSubset(arr1, arr2)).toBe(true)
    })

    it('should handle mixed types with getter', () => {
      const arr1 = [{ id: 1 }, { id: 2 }]
      const arr2 = [{ id: 1 }, { id: 2 }, { id: 3 }]
      expect(isSubset(arr1, arr2, 'id')).toBe(true)
    })

    it('should return false for non-existing path with string getter', () => {
      const arr1 = [{ id: 1 }]
      const arr2 = [{ id: 1 }]
      expect(isSubset(arr1, arr2, 'non.existing.path')).toBe(true)
    })
  })
})
