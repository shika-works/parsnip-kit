import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  MockInstance,
  vi
} from 'vitest'
import { throttle } from '../throttle'

describe('throttle', () => {
  let consoleSpy: MockInstance
  const defaultFunc = vi.fn(() => console.log('Function called'))
  beforeEach(() => {
    vi.restoreAllMocks()
    consoleSpy = vi.spyOn(console, 'log')
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })
  describe('base throttle functionality', () => {
    it('should trigger once per interval when called multiple times', () => {
      const throttledFunc = throttle(defaultFunc, 200)

      throttledFunc()
      throttledFunc()
      throttledFunc()

      expect(defaultFunc).not.toHaveBeenCalled()

      vi.advanceTimersByTime(250)

      expect(defaultFunc).toHaveBeenCalledTimes(1)
      expect(consoleSpy).toHaveBeenCalledTimes(1)
    })
  })
  describe('leading option', () => {
    it('should trigger immediately on first call when leading is true', () => {
      const throttledFunc = throttle(defaultFunc, 200, {
        leading: true
      })

      throttledFunc()
      expect(defaultFunc).toHaveBeenCalledTimes(1)
      vi.advanceTimersByTime(200)
      throttledFunc()

      expect(defaultFunc).toHaveBeenCalledTimes(3)
    })

    it('should not trigger on first call when leading is false', () => {
      const throttledFunc = throttle(defaultFunc, 200, {
        leading: false
      })

      throttledFunc()

      expect(defaultFunc).not.toHaveBeenCalled()

      vi.advanceTimersByTime(250)

      expect(defaultFunc).toHaveBeenCalledTimes(1)
    })
  })
  describe('trailing option', () => {
    it('should trigger at the end of the interval when trailing is true', () => {
      const throttledFunc = throttle(defaultFunc, 200, {
        trailing: true
      })

      throttledFunc()
      vi.advanceTimersByTime(150)

      expect(defaultFunc).not.toHaveBeenCalled()

      vi.advanceTimersByTime(100)

      expect(defaultFunc).toHaveBeenCalledTimes(1)
    })

    it('should not trigger at the end when trailing is false', () => {
      const throttledFunc = throttle(defaultFunc, 200, {
        trailing: false
      })

      throttledFunc()
      vi.advanceTimersByTime(200)

      expect(defaultFunc).toHaveBeenCalledTimes(0)

      throttledFunc()
      vi.advanceTimersByTime(200)

      expect(defaultFunc).toHaveBeenCalledTimes(0)
    })
  })
  describe('combined leading and trailing', () => {
    it('should trigger immediately and not at the end when leading == true and trailing == false', () => {
      const throttledFunc = throttle(defaultFunc, 200, {
        leading: true,
        trailing: false
      })

      throttledFunc()
      expect(defaultFunc).toHaveBeenCalledTimes(1)

      vi.advanceTimersByTime(300)

      expect(defaultFunc).toHaveBeenCalledTimes(1)
      throttledFunc()
      expect(defaultFunc).toHaveBeenCalledTimes(2)

      vi.advanceTimersByTime(200)

      expect(defaultFunc).toHaveBeenCalledTimes(2)
    })
  })
})
