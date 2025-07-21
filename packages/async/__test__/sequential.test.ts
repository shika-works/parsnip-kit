import { describe, it, expect } from 'vitest'
import { sequential } from '../sequential'

describe('sequential', () => {
  it('should execute functions in series without initialValue', async () => {
    const functions = [
      () => Promise.resolve(1),
      async (arg?: PromiseSettledResult<number>) => {
        if (arg?.status === 'fulfilled') {
          return Promise.resolve(arg.value + 1)
        } else {
          return 0
        }
      },
      (arg?: PromiseSettledResult<number>) => {
        if (arg?.status === 'fulfilled') {
          return Promise.resolve(arg.value * 2)
        } else {
          return Promise.resolve(0)
        }
      }
    ]

    const results = await sequential(functions)

    expect(results).toEqual([
      { status: 'fulfilled', value: 1 },
      { status: 'fulfilled', value: 2 },
      { status: 'fulfilled', value: 4 }
    ])
  })

  it('should execute functions in series with initialValue', async () => {
    const functions = [
      (arg?: PromiseSettledResult<number>) => {
        if (arg?.status === 'fulfilled') {
          return Promise.resolve(arg.value + 1)
        } else {
          return Promise.resolve(0)
        }
      },
      (arg?: PromiseSettledResult<number>) => {
        if (arg?.status === 'fulfilled') {
          return Promise.resolve(arg.value * 2)
        } else {
          return Promise.resolve(0)
        }
      }
    ]

    const results = await sequential(functions, 0)

    expect(results).toEqual([
      { status: 'fulfilled', value: 1 },
      { status: 'fulfilled', value: 2 }
    ])
  })

  it('should handle rejected promises', async () => {
    const functions = [
      () => Promise.resolve(1),
      () => Promise.reject(new Error('Failed')),
      (arg?: PromiseSettledResult<number>) => {
        if (arg?.status === 'fulfilled') {
          return Promise.resolve(arg.value + 1)
        } else {
          return Promise.resolve(0)
        }
      }
    ]

    const results = await sequential(functions)

    expect(results).toEqual([
      { status: 'fulfilled', value: 1 },
      { status: 'rejected', reason: new Error('Failed') },
      { status: 'fulfilled', value: 0 }
    ])
  })

  it('should handle empty functions array', async () => {
    const functions: Array<() => Promise<number>> = []

    const results = await sequential(functions)

    expect(results).toEqual([])
  })

  it('should handle initialValue with empty functions array', async () => {
    const functions: Array<() => Promise<number>> = []

    const results = await sequential(functions, 0)

    expect(results).toEqual([])
  })
})
