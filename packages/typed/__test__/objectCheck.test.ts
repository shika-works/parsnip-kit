import { test, describe, expect } from 'vitest'
import { isFunction } from '../isFunction'
import { isObjectLike } from '../isObjectLike'
import { isClass } from '../isClass'
import { isPseudoArray } from '../isPseudoArray'

describe('object type', () => {
  test('isString', () => {
    expect(isFunction({})).eq(false)
    expect(isFunction(() => {})).eq(true)
    expect(isFunction(class {})).eq(true)
    expect(isFunction(function* () {})).eq(true)
    expect(isFunction(async () => {})).eq(true)
  })
  test('isObjectLike', () => {
    expect(isObjectLike({})).eq(true)
    expect(isObjectLike(() => {})).eq(false)
  })
  test('isClass', () => {
    expect(isClass({})).eq(false)
    expect(isClass(() => {})).eq(false)
    expect(isClass(class {})).eq(true)
  })
  test('isPseudoArray', () => {
    expect(isPseudoArray({})).eq(false)
    expect(isPseudoArray({ length: 1 })).eq(true)
    expect(isPseudoArray([])).eq(true)

    function test() {
      expect(isPseudoArray(arguments)).eq(true)
    }
    test()
  })
})
