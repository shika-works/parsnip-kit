import { describe, it, expect } from 'vitest'
import { concurrent } from '../concurrent'

const trackConcurrency = async (count: number, limit: number, duration = 10) => {
  let active = 0
  let maxActive = 0
  const order: number[] = []
  const functions = Array.from(
    { length: count },
    (_, i) => () =>
      new Promise<number>((resolve) => {
        active++
        maxActive = Math.max(maxActive, active)
        order.push(i)
        setTimeout(() => {
          active--
          resolve(i)
        }, duration)
      })
  )
  const result = await concurrent(functions, limit)
  return { result, maxActive, order }
}

describe('concurrent', () => {
  it('should execute functions with concurrency limit', async () => {
    const functions = Array.from(
      { length: 5 },
      (_, i) => () =>
        new Promise<number>((resolve) => {
          setTimeout(() => {
            resolve(i)
          }, i * 100)
        })
    )

    const limit = 2
    const start = Date.now()

    const result = await concurrent(functions, limit)
    expect(result).toEqual([
      { status: 'fulfilled', value: 0 },
      { status: 'fulfilled', value: 1 },
      { status: 'fulfilled', value: 2 },
      { status: 'fulfilled', value: 3 },
      { status: 'fulfilled', value: 4 }
    ])
    const duration = Date.now() - start
    expect(duration).toBeGreaterThan(200)
  })

  it('should handle empty functions array', async () => {
    const functions: (() => Promise<any>)[] = []
    const limit = 3

    const result = await concurrent(functions, limit)
    expect(result).toHaveLength(0)
  })

  it('should handle rejected promises', async () => {
    const functions = [
      () => Promise.reject(new Error('Error 1')),
      () => Promise.resolve(2),
      () => Promise.reject(new Error('Error 3')),
      () => Promise.resolve(4)
    ]

    const limit = 2

    const ans = await concurrent(functions, limit)
    expect(ans[0].status).eq('rejected')
    if (ans[0].status === 'rejected') {
      expect(ans[0].reason).instanceOf(Error)
      expect(ans[0].reason.message).eq('Error 1')
    } else {
      throw Error()
    }

    expect(ans[1].status).eq('fulfilled')
    if (ans[1].status === 'fulfilled') {
      expect(ans[1].value).eq(2)
    } else {
      throw Error()
    }

    expect(ans[2].status).eq('rejected')
    if (ans[2].status === 'rejected') {
      expect(ans[2].reason).instanceOf(Error)
      expect(ans[2].reason.message).eq('Error 3')
    } else {
      throw Error()
    }

    expect(ans[3].status).eq('fulfilled')
    if (ans[3].status === 'fulfilled') {
      expect(ans[3].value).eq(4)
    } else {
      throw Error()
    }
  })

  it('should return resolved values in order', async () => {
    const functions = [
      () => Promise.resolve('A'),
      () => Promise.resolve('B'),
      () => Promise.resolve('C')
    ]

    const limit = 5

    const result = await concurrent(functions, limit)
    expect(result).toEqual([
      { status: 'fulfilled', value: 'A' },
      { status: 'fulfilled', value: 'B' },
      { status: 'fulfilled', value: 'C' }
    ])
  })

  it('should never exceed the concurrency limit', async () => {
    for (const limit of [1, 2, 3, 5]) {
      const { maxActive } = await trackConcurrency(20, limit)
      expect(maxActive).toBeLessThanOrEqual(limit)
      expect(maxActive).toBe(limit)
    }
  })

  it('should keep results in the input order regardless of completion order', async () => {
    const functions = [30, 10, 20].map(
      (delay, i) => () =>
        new Promise<number>((resolve) => setTimeout(() => resolve(i), delay))
    )

    const result = await concurrent(functions, 3)

    expect(result).toEqual([
      { status: 'fulfilled', value: 0 },
      { status: 'fulfilled', value: 1 },
      { status: 'fulfilled', value: 2 }
    ])
  })

  it('should resolve with settled results when every function rejects', async () => {
    const functions = Array.from(
      { length: 5 },
      (_, i) => () => Promise.reject(new Error(`Error ${i}`))
    )

    const result = await concurrent(functions, 2)

    expect(result).toHaveLength(5)
    result.forEach((item, i) => {
      expect(item.status).eq('rejected')
      if (item.status === 'rejected') {
        expect(item.reason).instanceOf(Error)
        expect(item.reason.message).eq(`Error ${i}`)
      }
    })
  })

  it('should fall back to sequential execution when limit is less than 1', async () => {
    const { maxActive, order } = await trackConcurrency(5, 0)
    expect(maxActive).toBe(1)
    expect(order).toEqual([0, 1, 2, 3, 4])
  })
})
