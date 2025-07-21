import { describe, expect, test } from 'vitest'
import { convertDataUnit } from '../convertDataUnit'

describe('convertDataUnit', () => {
  test('convert from bit to bit', () => {
    const result = convertDataUnit(1024, 'bit', 'bit')
    expect(result).toBe(1024)
  })

  test('unknown unit', () => {
    try {
      // @ts-ignored
      convertDataUnit(1024, 'test', 'B')
    } catch (error) {
      expect(error).instanceOf(TypeError)
      expect(error.message).eq('Unknown unit of from.')
    }
    try {
      // @ts-ignored
      convertDataUnit(1024, 'B', 'test')
    } catch (error) {
      expect(error).instanceOf(TypeError)
      expect(error.message).eq('Unknown unit of to.')
    }
  })

  test('convert from bit to B with binary prefix', () => {
    const result = convertDataUnit(1024, 'bit', 'B', 'binary')
    expect(result).toBe(128)
  })

  test('convert from bit to B with decimal prefix', () => {
    const result = convertDataUnit(1000, 'bit', 'B', 'decimal')
    expect(result).toBe(125)
  })

  test('convert from B to bit with binary prefix', () => {
    const result = convertDataUnit(1, 'B', 'bit', 'binary')
    expect(result).toBe(8)
  })

  test('convert from B to bit with decimal prefix', () => {
    const result = convertDataUnit(1, 'B', 'bit', 'decimal')
    expect(result).toBe(8)
  })

  test('convert from bit to KB with binary prefix', () => {
    const result = convertDataUnit(1024, 'bit', 'KB', 'binary')
    expect(result).toBe(0.125)
  })

  test('convert from bit to KB with decimal prefix', () => {
    const result = convertDataUnit(1000, 'bit', 'KB', 'decimal')
    expect(result).toBe(0.125)
  })

  test('convert from KB to bit with binary prefix', () => {
    const result = convertDataUnit(1, 'KB', 'bit', 'binary')
    expect(result).toBe(8192)
  })

  test('convert from KB to bit with decimal prefix', () => {
    const result = convertDataUnit(1, 'KB', 'bit', 'decimal')
    expect(result).toBe(8000)
  })

  test('convert from B to KB with binary prefix', () => {
    const result = convertDataUnit(1024, 'B', 'KB', 'binary')
    expect(result).toBe(1)
  })

  test('convert from B to KB with decimal prefix', () => {
    const result = convertDataUnit(1000, 'B', 'KB', 'decimal')
    expect(result).toBe(1)
  })

  test('convert from KB to B with binary prefix', () => {
    const result = convertDataUnit(1, 'KB', 'B', 'binary')
    expect(result).toBe(1024)
  })

  test('convert from KB to B with decimal prefix', () => {
    const result = convertDataUnit(1, 'KB', 'B', 'decimal')
    expect(result).toBe(1000)
  })

  test('convert from B to MB with binary prefix', () => {
    const result = convertDataUnit(1024 * 1024, 'B', 'MB', 'binary')
    expect(result).toBe(1)
  })

  test('convert from B to MB with decimal prefix', () => {
    const result = convertDataUnit(1000 * 1000, 'B', 'MB', 'decimal')
    expect(result).toBe(1)
  })

  test('convert from MB to B with binary prefix', () => {
    const result = convertDataUnit(1, 'MB', 'B', 'binary')
    expect(result).toBe(1024 * 1024)
  })

  test('convert from MB to B with decimal prefix', () => {
    const result = convertDataUnit(1, 'MB', 'B', 'decimal')
    expect(result).toBe(1000 * 1000)
  })

  test('convert from B to GB with binary prefix', () => {
    const result = convertDataUnit(1024 ** 3, 'B', 'GB', 'binary')
    expect(result).toBe(1)
  })

  test('convert from B to GB with decimal prefix', () => {
    const result = convertDataUnit(1000 ** 3, 'B', 'GB', 'decimal')
    expect(result).toBe(1)
  })

  test('convert from GB to B with binary prefix', () => {
    const result = convertDataUnit(1, 'GB', 'B', 'binary')
    expect(result).toBe(1024 ** 3)
  })

  test('convert from GB to B with decimal prefix', () => {
    const result = convertDataUnit(1, 'GB', 'B', 'decimal')
    expect(result).toBe(1000 ** 3)
  })

  test('convert from B to TB with binary prefix', () => {
    const result = convertDataUnit(1024 ** 4, 'B', 'TB', 'binary')
    expect(result).toBe(1)
  })

  test('convert from B to TB with decimal prefix', () => {
    const result = convertDataUnit(1000 ** 4, 'B', 'TB', 'decimal')
    expect(result).toBe(1)
  })

  test('convert from TB to B with binary prefix', () => {
    const result = convertDataUnit(1, 'TB', 'B', 'binary')
    expect(result).toBe(1024 ** 4)
  })

  test('convert from TB to B with decimal prefix', () => {
    const result = convertDataUnit(1, 'TB', 'B', 'decimal')
    expect(result).toBe(1000 ** 4)
  })

  test('convert from B to YB with binary prefix', () => {
    const result = convertDataUnit(1024 ** 8, 'B', 'YB', 'binary')
    expect(result).toBe(1)
  })

  test('convert from B to YB with decimal prefix', () => {
    const result = convertDataUnit(1000 ** 8, 'B', 'YB', 'decimal')
    expect(result).toBe(1)
  })

  test('convert from YB to B with binary prefix', () => {
    const result = convertDataUnit(1, 'YB', 'B', 'binary')
    expect(result).toBe(1024 ** 8)
  })

  test('convert from YB to B with decimal prefix', () => {
    const result = convertDataUnit(1, 'YB', 'B', 'decimal')
    expect(result).toBe(1000 ** 8)
  })

  test('convert with value 0', () => {
    const result = convertDataUnit(0, 'B', 'YB', 'binary')
    expect(result).toBe(0)
  })

  test('convert with fractional value', () => {
    const result = convertDataUnit(512, 'B', 'KB', 'binary')
    expect(result).toBe(0.5)
  })
})
