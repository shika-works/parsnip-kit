import { test, describe, expect } from 'vitest'
import { range } from '../range'
import { percent } from '../percent'
import { thousandSeparator } from '../thousandSeparator'

describe('number', () => {
  test('range', () => {
    expect(JSON.stringify(range(1, 10))).eq('[1,2,3,4,5,6,7,8,9]')
    expect(JSON.stringify(range(1, 10, 2))).eq('[1,3,5,7,9]')
    expect(JSON.stringify(range(10, 1, -2))).eq('[10,8,6,4,2]')

    expect(JSON.stringify(range(1, 10, -2))).eq('[]')
    expect(JSON.stringify(range(10, 1, 2))).eq('[]')
    expect(JSON.stringify(range(10, 10, 2))).eq('[]')

    try {
      range(0, 1, 0)
    } catch (error: any) {
      expect(error).instanceOf(TypeError)
      expect(error.message).eq('range step must be not equal 0.')
    }
  })
  test('percent', () => {
    expect(percent(75, 200, 0)).eq(`38%`)

    try {
      percent(10, 0)
    } catch (error: any) {
      expect(error).instanceOf(TypeError)
      expect(error.message).eq('Total cannot be zero.')
    }
  })
  test('thousandSeparator', () => {
    expect(thousandSeparator(100)).eq('100')
    expect(thousandSeparator(1000)).eq('1,000')
    expect(thousandSeparator(10000)).eq('10,000')
    expect(thousandSeparator(1234567)).eq('1,234,567')
    expect(thousandSeparator(-1234567)).eq('-1,234,567')
    expect(thousandSeparator(1234.567)).eq('1,234.567')
    expect(thousandSeparator(1234.5678)).eq('1,234.567,8')
  })
})
