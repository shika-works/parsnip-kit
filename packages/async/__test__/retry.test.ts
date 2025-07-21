import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { retry } from '../retry'

describe('retry', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runAllTimers()
  })

  it('should return a fulfilled result when task succeeds', async () => {
    const value = 42
    const mockTask = vi.fn((value) => value)

    // @ts-ignored
    const retried = retry(mockTask, 3)
    const result = await retried(value)

    expect(result.status).toBe('fulfilled')
    // @ts-ignored
    expect(result.value).toBe(value)
    expect(mockTask).toHaveBeenCalledTimes(1)
  })
  it('should return a fulfilled result when task retried succeeds', async () => {
    let times = 0
    const func = async (a: number, b: number) => {
      if (times < 3) {
        times++
        throw new Error(`Error ${times}`)
      }
      return a + b
    }
    const retried = retry(func)

    retried(2, 3).then((res) => {
      expect(res.status).eq('fulfilled')
      // @ts-ignored
      expect(res.value).eq(5)
    })
    vi.advanceTimersByTime(2000)
  })

  it('should retry and return fulfilled result when task eventually succeeds', async () => {
    const error1 = new Error('First error')
    const value = 100
    const mockTask = vi
      .fn()
      .mockRejectedValueOnce(error1)
      .mockResolvedValue(value)

    // @ts-ignored
    retry(mockTask, 3, {
      delay: 100,
      delayFactor: 2
    })().then((res) => {
      expect(res.status).toBe('fulfilled')
      // @ts-ignored
      expect(res.value).toBe(value)
      expect(mockTask).toHaveBeenCalledTimes(2)
    })
    vi.advanceTimersByTime(800)
  })

  it('should return a rejected result when max retries are exceeded', async () => {
    const error = new Error('Persistent error')
    const mockTask = vi.fn().mockRejectedValue(error)

    // @ts-ignored
    retry(mockTask, 2, {
      delay: 100
    })().then((res) => {
      expect(res.status).toBe('rejected')
      // @ts-ignored
      expect(res.reason).toContain(error)
      // @ts-ignored
      expect(res.reason.length).toBe(2)
      // @ts-ignored
      expect(mockTask).toHaveBeenCalledTimes(3)
    })
    vi.advanceTimersByTime(200)
  })

  it('should not retry when shouldRetry returns false', async () => {
    const error = new Error('Non-retryable error')
    const mockTask = vi.fn().mockRejectedValue(error)

    // @ts-ignored
    const result = retry(mockTask, 3, {
      shouldRetry: (err) => err.message !== 'Non-retryable error'
    })
    vi.advanceTimersByTime(500)

    result().then((res) => {
      expect(res.status).toBe('rejected')
      // @ts-ignored
      expect(res.reason[0]).toBe(error)
      // @ts-ignored
      expect(res.reason.length).toBe(2)
    })
  })

  it('should call onSuccess and onFailure callbacks', async () => {
    const err1 = new Error('Error 1')

    const onSuccess = (res, times) => {
      expect(times).eq(2)
      expect(res).eq(50)
    }
    const onFailure = (err, times) => {
      expect(err).instanceOf(Error)
      expect(times).eq(1)
      expect(err.message).eq('Error 1')
    }

    const mockTask = vi.fn().mockRejectedValueOnce(err1).mockResolvedValue(50)

    // @ts-ignored
    retry(mockTask, 3, { onSuccess, onFailure })()
    vi.advanceTimersByTime(2000)
  })
})
