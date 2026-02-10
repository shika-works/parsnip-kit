import {
  describe,
  expect,
  it,
  vi,
  beforeEach,
  afterEach,
  expectTypeOf
} from 'vitest'
import { wait } from '../wait'

describe('wait function', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Basic functionality', () => {
    it('should return a Promise', () => {
      const result = wait(1000, 'test')
      expect(result).toBeInstanceOf(Promise)
    })

    it('should resolve the Promise after the specified delay', async () => {
      const callback = vi.fn()
      const promise = wait(1000, 'test').then(callback)

      expect(callback).not.toHaveBeenCalled()

      vi.advanceTimersByTime(1000)
      await promise

      expect(callback).toHaveBeenCalledTimes(1)
      expect(callback).toHaveBeenCalledWith('test')
    })

    it('should work with generic types', async () => {
      // Test with string
      const promise1 = wait(300, 'hello')
      vi.advanceTimersByTime(300)
      const result1 = await promise1
      expectTypeOf(result1).toEqualTypeOf<string>()
      expect(result1).toBe('hello')

      const promise2 = wait(300, 42)
      vi.advanceTimersByTime(300)
      const result2 = await promise2
      expect(result2).toBe(42)
      expectTypeOf(result2).toEqualTypeOf<number>()

      const obj = { key: 'value' }
      const promise3 = wait(300, obj)
      vi.advanceTimersByTime(300)
      const result3 = await promise3
      expect(result3).toBe(obj)
      expectTypeOf(result3).toEqualTypeOf<{ key: string }>()

      const arr = [1, 2, 3]
      const promise4 = wait(300, arr)
      vi.advanceTimersByTime(300)
      const result4 = await promise4
      expect(result4).toBe(arr)
      expectTypeOf(result4).toEqualTypeOf<number[]>()

      const promise5 = wait(300, undefined)
      vi.advanceTimersByTime(300)
      const result5 = await promise5
      expect(result5).toBe(undefined)
      expectTypeOf(result5).toEqualTypeOf<undefined>()

      const promise6 = wait(300, null)
      vi.advanceTimersByTime(300)
      const result6 = await promise6
      expect(result6).toBe(null)
      expectTypeOf(result6).toEqualTypeOf<null>()
    })
  })

  describe('Edge cases', () => {
    it('should handle zero delay', async () => {
      const promise = wait(0, 'immediate')

      // Execute microtasks immediately
      await Promise.resolve()

      vi.advanceTimersByTime(0)
      const result = await promise

      expect(result).toBe('immediate')
    })

    it('should handle negative delay (treated as zero)', async () => {
      const promise = wait(-100, 'negative delay')

      // Execute microtasks immediately
      await Promise.resolve()

      vi.advanceTimersByTime(0)
      const result = await promise

      expect(result).toBe('negative delay')
    })
  })

  describe('Concurrency tests', () => {
    it('should handle multiple wait calls independently', async () => {
      const delays = [100, 200, 300]
      const results: string[] = []
      const promises = delays.map((delay, index) =>
        wait(delay, `result-${index}`).then((result) => {
          results.push(result)
          return result
        })
      )

      // Fast-forward time
      vi.advanceTimersByTime(300)

      // Wait for all promises to complete
      await Promise.all(promises)

      expect(results).toEqual(['result-0', 'result-1', 'result-2'])
    })

    it('should resolve in correct order', async () => {
      const resolveOrder: number[] = []

      wait(300, 3).then(() => resolveOrder.push(3))
      wait(100, 1).then(() => resolveOrder.push(1))
      wait(200, 2).then(() => resolveOrder.push(2))

      vi.advanceTimersByTime(300)
      await Promise.resolve() // Execute all microtasks

      expect(resolveOrder).toEqual([1, 2, 3])
    })
  })
})
