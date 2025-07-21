import { describe, expect, test, vitest } from 'vitest'
import { asyncForEachFields } from '../asyncForEachFields'
import { asyncForEach } from '../asyncForEach'
import { asyncMap } from '../asyncMap'

describe('asyncForEach', () => {
  test('should handle concurrent execution correctly', async () => {
    const array = [1, 2, 3, 4]
    const results: number[] = []
    const iterator = (item: number) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          results.push(item * 2)
          resolve(void 0)
        }, Math.random() * 100)
      })
    }

    await asyncForEach(array, iterator)

    expect(results).toEqual(expect.arrayContaining([2, 4, 6, 8]))
    expect(results.length).toBe(array.length)
  })

  test('should handle non-concurrent execution correctly', async () => {
    const array = [1, 2, 3, 4]
    const results: number[] = []
    const iterator = (item: number) => {
      const time = Math.random() * 100
      return new Promise((resolve) => {
        setTimeout(() => {
          results.push(item * 2)
          resolve(void 0)
        }, time)
      })
    }

    await asyncForEach(array, iterator, 'sequential')

    expect(results).toEqual([2, 4, 6, 8])
    expect(results.length).toBe(array.length)
  })

  test('should handle empty array correctly', async () => {
    const array: number[] = []
    const iterator = vitest.fn()

    await asyncForEach(array, iterator)

    expect(iterator).not.toHaveBeenCalled()
  })

  test('should handle errors in concurrent mode', async () => {
    const array = [1, 2, 3, 4]
    const iterator = (item: number) => {
      if (item === 3) {
        throw new Error('Error on item 3')
      }
      return Promise.resolve()
    }

    await expect(asyncForEach(array, iterator)).rejects.toThrow(
      'Error on item 3'
    )
  })

  test('should handle errors in non-concurrent mode', async () => {
    const array = [1, 2, 3, 4]
    const iterator = (item: number) => {
      if (item === 3) {
        throw new Error('Error on item 3')
      }
      return Promise.resolve()
    }

    await expect(asyncForEach(array, iterator, 'sequential')).rejects.toThrow(
      'Error on item 3'
    )
  })
})

describe('asyncForEachFields', () => {
  test('should handle concurrent execution correctly', async () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 }
    const results: number[] = []
    const iterator = (value: number) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          results.push(value * 2)
          resolve(void 0)
        }, Math.random() * 100)
      })
    }

    await asyncForEachFields(obj, iterator, 'concurrent')

    expect(results).toEqual(expect.arrayContaining([2, 4, 6, 8]))
    expect(results.length).toBe(Object.keys(obj).length)
  })

  test('should handle sequential execution correctly', async () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 }
    const results: number[] = []
    const iterator = (value: number) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          results.push(value * 2)
          resolve(void 0)
        }, Math.random() * 100)
      })
    }

    await asyncForEachFields(obj, iterator, 'sequential')

    expect(results).toEqual([2, 4, 6, 8])
    expect(results.length).toBe(Object.keys(obj).length)
  })

  test('should handle empty object correctly', async () => {
    const obj = {}
    const iterator = vitest.fn()

    await asyncForEachFields(obj, iterator)

    expect(iterator).not.toHaveBeenCalled()
  })

  test('should handle errors in concurrent mode', async () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 }
    const iterator = (value: number, key: string) => {
      if (key === 'c') {
        throw new Error('Error on key c')
      }
      return Promise.resolve(void 0)
    }

    await expect(
      asyncForEachFields(obj, iterator, 'concurrent')
    ).rejects.toThrow('Error on key c')
  })

  test('should handle errors in sequential mode', async () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 }
    const iterator = (_, key: string) => {
      if (key === 'c') {
        throw new Error('Error on key c')
      }
      return Promise.resolve(void 0)
    }

    await expect(
      asyncForEachFields(obj, iterator, 'sequential')
    ).rejects.toThrow('Error on key c')
  })

  test('should wait for all promises to complete in concurrent mode', async () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 }
    const results: number[] = []
    const iterator = (value: number) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          results.push(value)
          resolve(void 0)
        }, Math.random() * 100)
      })
    }

    await asyncForEachFields(obj, iterator, 'concurrent')

    expect(results.length).toBe(Object.keys(obj).length)
    expect(results).toEqual(expect.arrayContaining(Object.values(obj)))
  })

  test('should pass correct parameters to iterator', async () => {
    const obj = { hello: 'world', foo: 'bar' }
    const mockIterator = vitest.fn()
    await asyncForEachFields(obj, mockIterator, 'concurrent')
    expect(mockIterator).toHaveBeenCalledTimes(2)
    expect(mockIterator).toHaveBeenCalledWith('world', 'hello', obj)
    expect(mockIterator).toHaveBeenCalledWith('bar', 'foo', obj)
  })
})

describe('asyncMap', () => {
  test('should handle concurrent execution correctly', async () => {
    const array = [1, 2, 3, 4]
    const iterator = (item: number) => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(item * 2), Math.random() * 100)
      })
    }

    const result = await asyncMap(array, iterator)
    expect(result).toEqual([2, 4, 6, 8])
  })

  test('should handle sequential execution correctly', async () => {
    const array = [1, 2, 3, 4]
    const iterator = (item: number) => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(item * 2), Math.random() * 100)
      })
    }

    const result = await asyncMap(array, iterator, 'sequential')
    expect(result).toEqual([2, 4, 6, 8])
  })

  test('should handle empty array correctly', async () => {
    const array: number[] = []
    const iterator = vitest.fn().mockResolvedValue(0)

    const result = await asyncMap(array, iterator)
    expect(iterator).not.toHaveBeenCalled()
    expect(result).toHaveLength(0)
  })

  test('should handle errors in concurrent mode', async () => {
    const array = [1, 2, 3, 4]
    const iterator = (item: number) => {
      if (item === 3) {
        throw new Error('Error on item 3')
      }
      return Promise.resolve(item * 2)
    }

    await expect(asyncMap(array, iterator)).rejects.toThrow('Error on item 3')
  })

  test('should handle errors in sequential mode', async () => {
    const array = [1, 2, 3, 4]
    const iterator = (item: number) => {
      if (item === 3) {
        throw new Error('Error on item 3')
      }
      return Promise.resolve(item * 2)
    }

    await expect(asyncMap(array, iterator, 'sequential')).rejects.toThrow(
      'Error on item 3'
    )
  })

  test('should maintain the order of results', async () => {
    const array = [4, 3, 2, 1]
    const iterator = (item: number) => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(item * 2), 100 - item * 10)
      })
    }

    const result = await asyncMap(array, iterator)
    expect(result).toEqual([8, 6, 4, 2])
  })
})
