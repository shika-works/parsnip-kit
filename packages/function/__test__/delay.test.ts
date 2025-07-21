import { describe, it, expect, vitest } from 'vitest'
import { delay } from '../delay'

describe('delay', () => {
  const asyncFunc = vitest.fn()

  it('should call the function after the specified delay', async () => {
    const waitTime = 100
    vitest.useFakeTimers()

    const delayedFunc = delay(asyncFunc, waitTime)
    delayedFunc()

    expect(asyncFunc).not.toHaveBeenCalled()
    vitest.advanceTimersByTime(waitTime)
    expect(asyncFunc).toHaveBeenCalledTimes(1)
  })

  it('should pass arguments to the function correctly', async () => {
    const waitTime = 30
    vitest.useFakeTimers()

    const arg1 = 'hello'
    const arg2 = 42

    const delayedFunc = delay(asyncFunc, waitTime)
    delayedFunc(arg1, arg2)

    vitest.advanceTimersByTime(waitTime)

    expect(asyncFunc).toHaveBeenCalledWith(arg1, arg2)
  })

  it('should throw errors if the function throws an error', async () => {
    const waitTime = 50
    vitest.useFakeTimers()

    const error = new Error('Test error')
    const asyncFunc = () => {
      throw error
    }

    const delayedFunc = delay(asyncFunc, waitTime)

    expect(() => {
      delayedFunc()
      vitest.advanceTimersByTime(waitTime)
    }).throw(error)
  })
})
