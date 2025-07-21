import { describe, expect, it } from 'vitest'
import { orderSort } from '../orderSort'

describe('orderSort', () => {
  it('should sort an array based on the specified order with a function getter', () => {
    const arr = [{ id: 2 }, { id: 1 }, { id: 3 }]
    const order = [1, 3, 2]
    const getter = (item: { id: number }) => item.id

    const sortedArr = orderSort(arr, order, getter)

    expect(sortedArr).toEqual([{ id: 1 }, { id: 3 }, { id: 2 }])
  })

  it('should sort an array based on the specified order with a string path getter', () => {
    const arr = [{ id: 2 }, { id: 1 }, { id: 3 }]
    const order = [1, 3, 2]
    const getter = 'id'

    const sortedArr = orderSort(arr, order, getter)

    expect(sortedArr).toEqual([{ id: 1 }, { id: 3 }, { id: 2 }])
  })

  it('should maintain the original order of elements not in the order array', () => {
    const arr = [{ id: 0 }, { id: 2 }, { id: 1 }, { id: 3 }, { id: 4 }]
    const order = [1, 3, 2]
    const getter = (item: { id: number }) => item.id

    const sortedArr = orderSort(arr, order, getter)

    // Elements not in the order array maintain their original relative order
    expect(sortedArr).toEqual([
      { id: 1 },
      { id: 3 },
      { id: 2 },
      { id: 0 },
      { id: 4 }
    ])
  })

  it('should handle empty order array', () => {
    const arr = [{ id: 2 }, { id: 1 }, { id: 3 }]
    const order: any[] = []
    const getter = (item: { id: number }) => item.id

    const sortedArr = orderSort(arr, order, getter)

    // When the order array is empty, the original array is returned
    expect(sortedArr).toEqual(arr)
  })

  it('should handle undefined getter', () => {
    const arr = [2, 1, 3]
    const order = [1, 3, 2]
    const getter: undefined = undefined

    const sortedArr = orderSort(arr, order, getter)

    expect(sortedArr).toEqual([1, 3, 2])
  })
})
