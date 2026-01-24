import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  MockInstance,
  vi
} from 'vitest'
import { debounce } from '../debounce'

describe('debounce', () => {
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
  describe('base debounce functionality', () => {
    it('should only trigger once after delay when called multiple times', async () => {
      const debounced = debounce(defaultFunc, 100)

      debounced()
      debounced()
      vi.advanceTimersByTime(50)
      debounced()

      expect(defaultFunc).not.toHaveBeenCalled()

      vi.advanceTimersByTime(100)

      expect(defaultFunc).toHaveBeenCalledTimes(1)
      expect(consoleSpy).toHaveBeenCalledTimes(1)
    })

    it('should trigger once after the last call when calls are spread out', async () => {
      const debounced = debounce(defaultFunc, 200)

      debounced()
      vi.advanceTimersByTime(150)

      expect(defaultFunc).not.toHaveBeenCalled()

      vi.advanceTimersByTime(60)

      expect(defaultFunc).toHaveBeenCalledTimes(1)
    })

    it('immediate option', async () => {
      const debounced = debounce(defaultFunc, 200, { immediate: true })

      debounced()
      vi.advanceTimersByTime(150)

      expect(defaultFunc).toHaveBeenCalledTimes(1)

      vi.advanceTimersByTime(60)

      expect(defaultFunc).toHaveBeenCalledTimes(2)

      debounced()
      expect(defaultFunc).toHaveBeenCalledTimes(3)
    })

    describe('maxWait option', () => {
      it('should trigger at maximum interval even if called frequently', async () => {
        const debounced = debounce(defaultFunc, 50, { maxWait: 150 })

        debounced()
        vi.advanceTimersByTime(40)
        debounced()
        vi.advanceTimersByTime(40)
        debounced()
        vi.advanceTimersByTime(40)
        debounced()
        vi.advanceTimersByTime(40)
        debounced()

        expect(defaultFunc).toHaveBeenCalledTimes(1)

        vi.advanceTimersByTime(60)

        expect(defaultFunc).toHaveBeenCalledTimes(2)
      })
    })

    describe('combined options', () => {
      it('should handle immediate and maxWait together', async () => {
        const debounced = debounce(defaultFunc, 100, {
          immediate: true,
          maxWait: 150
        })

        debounced()
        debounced()

        expect(defaultFunc).toHaveBeenCalledTimes(1)

        vi.advanceTimersByTime(75)
        debounced()

        expect(defaultFunc).toHaveBeenCalledTimes(1)

        vi.advanceTimersByTime(80)

        expect(defaultFunc).toHaveBeenCalledTimes(2)

        vi.advanceTimersByTime(150)

        expect(defaultFunc).toHaveBeenCalledTimes(3)
      })
    })
  })
})
