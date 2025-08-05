import { describe, it, vi, expect } from 'vitest'
import { go } from '../go'

describe('go function tests', () => {
  it('should return the result and null when the function executes successfully', async () => {
    const mockFunction = vi.fn(async () => 'success')
    const [result, error] = await go(mockFunction)

    expect(mockFunction).toHaveBeenCalled()
    expect(result).toBe('success')
    expect(error).toBeNull()
  })

  it('should return null and the error when the function throws an exception', async () => {
    const mockFunction = vi.fn(async () => {
      throw new Error('mock error')
    })
    const [result, error] = await go(mockFunction)

    expect(mockFunction).toHaveBeenCalled()
    expect(result).toBeNull()
    expect(error).toBeInstanceOf(Error)
    expect(error?.message).toBe('mock error')
  })
})
