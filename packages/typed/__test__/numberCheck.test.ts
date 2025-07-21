import { test, describe, expect } from 'vitest'
import { isInfinity } from '../isInfinity'
import { isNanValue } from '../isNanValue'
import { isInt } from '../isInt'
import { isFloat } from '../isFloat'
import { isNumberString } from '../isNumberString'

describe('number type', () => {
  test('isNumberString', () => {
    expect(isNumberString('12345')).eq(true)
    expect(isNumberString('123a5')).eq(false)
    expect(isNumberString('')).eq(false)
  })
  test('isInfinity', () => {
    expect(isInfinity(123)).eq(false)
    expect(isInfinity('123')).eq(false)
    expect(isInfinity(NaN)).eq(false)
    expect(isInfinity(Infinity)).eq(true)
    expect(isInfinity(-Infinity)).eq(true)
    expect(isInfinity(new Number(Infinity))).eq(true)
  })
  test('isNanValue', () => {
    expect(isNanValue(123)).eq(false)
    expect(isNanValue('123')).eq(false)
    expect(isNanValue(Infinity)).eq(false)
    expect(isNanValue(NaN)).eq(true)
    expect(isNanValue(new Number(NaN))).eq(true)
  })
  test('isInt', () => {
    expect(isInt(123)).eq(true)
    expect(isInt(new Number(123))).eq(true)
    expect(isInt(123.1)).eq(false)
    expect(isInt(BigInt(123))).eq(false)
    expect(isInt(Infinity)).eq(false)
    expect(isInt(NaN)).eq(false)
  })
  test('isFloat', () => {
    expect(isFloat(123.1)).eq(true)
    expect(isFloat(new Number(123.1))).eq(true)
    expect(isFloat(123)).eq(false)
    expect(isFloat(BigInt(123))).eq(false)
    expect(isFloat(Infinity)).eq(false)
    expect(isFloat(NaN)).eq(false)
  })
})
