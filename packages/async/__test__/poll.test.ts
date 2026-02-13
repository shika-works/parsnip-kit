import { poll, PollOptions } from '../poll'
import { vi, expect, describe, test, beforeEach } from 'vitest'

const genMockOptions: <T>() => Required<PollOptions<T>> = () => ({
  maxCalls: Infinity,
  maxRetries: 3,
  sequential: false,
  leading: true,
  onSuccess: vi.fn(),
  onFailure: vi.fn()
})

describe('poll function', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('should execute the function with the correct arguments', async () => {
    const mockAsyncFunction = vi.fn().mockImplementation(async () => {
      return 'success'
    })
    const mockOptions = genMockOptions()
    const args = ['arg1', 'arg2']
    const pollResult = poll(mockAsyncFunction, 10, mockOptions)(...args)
    await pollResult.stop()
    expect(mockAsyncFunction).toHaveBeenCalledWith(...args)
  })

  test('should call onSuccess when the function resolves successfully', async () => {
    const mockAsyncFunction = vi.fn().mockImplementation(async () => {
      return 'success'
    })
    const mockOptions = genMockOptions()
    const pollResult = poll(mockAsyncFunction, 10, mockOptions)()
    await pollResult.stop()
    expect(mockOptions.onSuccess).toHaveBeenCalledWith('success', 1)
  })

  test('should call onFailure when the function rejects', async () => {
    const mockAsyncFunction = vi.fn().mockImplementation(async () => {
      return 'success'
    })
    const mockOptions = genMockOptions()
    mockAsyncFunction.mockRejectedValueOnce(new Error('mock error'))
    const pollResult = poll(mockAsyncFunction, 10, mockOptions)()
    await pollResult.stop()
    expect(mockOptions.onFailure).toHaveBeenCalledWith(new Error('mock error'), 1)
  })

  test('should retry until maxRetries is reached', async () => {
    const mockAsyncFunction = vi.fn().mockImplementation(async () => {
      return 'success'
    })
    const mockOptions = genMockOptions()
    mockAsyncFunction.mockRejectedValue(new Error('mock error'))
    const pollResult = poll(mockAsyncFunction, 10, mockOptions)()
    await new Promise((resolve) => setTimeout(resolve, 4000))
    expect(mockAsyncFunction).toHaveBeenCalledTimes(mockOptions.maxRetries + 1)
    expect(mockOptions.onFailure).toHaveBeenCalledTimes(mockOptions.maxRetries + 1)
    pollResult.stop()
  })

  test('should throw an error when maxRetries is exceeded', async () => {
    const mockAsyncFunction = vi.fn().mockImplementation(async () => {
      return 'success'
    })
    const mockOptions = genMockOptions()
    mockAsyncFunction.mockRejectedValue(new Error('mock error'))
    const originalConsoleWarn = console.warn
    console.warn = vi.fn()
    const pollResult = poll(mockAsyncFunction, 10, mockOptions)()
    await new Promise((resolve) => setTimeout(resolve, 100))
    expect(console.warn).toHaveBeenCalledTimes(1)
    console.warn = originalConsoleWarn
    pollResult.stop()
  })

  test('should execute sequentially when sequential is true', async () => {
    const mockAsyncFunction = vi.fn().mockImplementation(async () => {
      return new Promise((res) => {
        setTimeout(() => {
          res('success')
        }, 100)
      })
    })
    const mockOptions = genMockOptions()
    mockOptions.sequential = true
    const pollResult = poll(mockAsyncFunction, 100, mockOptions)()
    await new Promise((resolve) => setTimeout(resolve, 500))
    expect(mockAsyncFunction).toHaveBeenCalledTimes(3)
    mockOptions.sequential = false
    pollResult.stop()
  })

  test('should not execute immediately when leading is false', async () => {
    const mockAsyncFunction = vi.fn().mockImplementation(async () => {
      return 'success'
    })
    const mockOptions = genMockOptions()
    mockOptions.leading = false
    mockAsyncFunction.mockResolvedValueOnce('success')
    const pollResult = poll(mockAsyncFunction, 20, mockOptions)()
    await new Promise((resolve) => setTimeout(resolve, 10))
    expect(mockAsyncFunction).not.toHaveBeenCalled()
    pollResult.stop()
    mockOptions.leading = true // Reset for other tests
  })

  test('should stop the poll when stop is called', async () => {
    const mockAsyncFunction = vi.fn().mockImplementation(async () => {
      return 'success'
    })
    const mockOptions = genMockOptions()
    const pollResult = poll(mockAsyncFunction, 15, mockOptions)()
    await new Promise((resolve) => setTimeout(resolve, 10))
    pollResult.stop()
    await new Promise((resolve) => setTimeout(resolve, 100))
    expect(mockAsyncFunction).toHaveBeenCalledTimes(1)
    expect(pollResult.isRunning()).toBe(false)
  })

  test('should start the poll again when start is called', async () => {
    const mockAsyncFunction = vi.fn().mockImplementation(async () => {
      return 'success'
    })
    const mockOptions = genMockOptions()

    const pollResult = poll(mockAsyncFunction, 15, mockOptions)()
    await new Promise((resolve) => setTimeout(resolve, 10))
    pollResult.stop()
    expect(pollResult.isRunning()).toBe(false)
    await new Promise((resolve) => setTimeout(resolve, 100))
    expect(mockAsyncFunction).toHaveBeenCalledTimes(1)
    pollResult.start()
    expect(pollResult.isRunning()).toBe(true)
    await new Promise((resolve) => setTimeout(resolve, 25))
    expect(mockAsyncFunction).toHaveBeenCalledTimes(3)
  })

  test('should not start the poll if it is already running', async () => {
    const mockAsyncFunction = vi.fn().mockImplementation(async () => {
      return 'success'
    })
    const mockOptions = genMockOptions()

    expect(mockAsyncFunction).toHaveBeenCalledTimes(0)
    const pollResult = poll(mockAsyncFunction, 100, mockOptions)()
    await new Promise((resolve) => setTimeout(resolve, 10))
    expect(pollResult.isRunning()).toBe(true)
    pollResult.start()
    expect(mockAsyncFunction).toHaveBeenCalledTimes(1)
    pollResult.stop()
  })

  test('should handle maxCalls correctly', async () => {
    const mockAsyncFunction = vi.fn().mockImplementation(async () => {
      return 'success'
    })
    const mockOptions = genMockOptions()
    mockOptions.maxCalls = 2
    const pollResult = poll(mockAsyncFunction, 10, mockOptions)()
    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(mockAsyncFunction).toHaveBeenCalledTimes(2)
    expect(pollResult.isRunning()).toBe(false)
    mockOptions.maxCalls = Infinity // Reset for other tests
  })
})
