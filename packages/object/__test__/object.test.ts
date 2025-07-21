import { test, describe, expect, vitest } from 'vitest'
import { getByPath } from '../getByPath'
import { setByPath } from '../setByPath'
import { deleteByPath } from '../deleteByPath'
import { unzipToArrays } from '../unzipToArrays'
import { objectToPairs } from '../objectToPairs'
import { omit } from '../omit'
import { pick } from '../pick'
import { forEachFields } from '../forEachFields'
import { filterFields } from '../filterFields'
import { splitToArrays } from '../splitToArrays'

describe('object', () => {
  test('getByPath', () => {
    expect(getByPath({ a: 1 }, 'a')).eq(1)
    expect(getByPath([1], '[0]')).eq(1)
    expect(getByPath({ b: [0, 1, 2] }, 'b[2]')).eq(2)
    expect(getByPath({ a: [{ b: { c: 'test' } }] }, 'a[0].b.c')).eq('test')
    expect(getByPath({ a: 1 }, 'a[0].b.c')).eq(undefined)
    expect(getByPath({ a: 1 }, 'a[0].b.c', 'test')).eq('test')
  })
  test('setByPath', () => {
    const test0 = {}
    setByPath(test0, 'a', 1)
    expect(JSON.stringify(test0)).eq('{"a":1}')

    const test1 = []
    setByPath(test1, '[0]', 1)
    expect(JSON.stringify(test1)).eq('[1]')

    const test2 = {}
    setByPath(test2, '[0]', 1)
    expect(JSON.stringify(test2)).eq('{"0":1}')

    const test3 = {}
    setByPath(test3, 'b[2]', 2)

    expect(JSON.stringify(test3)).eq('{"b":[null,null,2]}')

    const test4 = { a: 1 }
    setByPath(test4, 'a[0]', 'test')
    expect(JSON.stringify(test4)).eq('{"a":["test"]}')

    const test5 = { a: 1 }
    setByPath(test5, 'b', 2)
    expect(JSON.stringify(test5)).eq('{"a":1,"b":2}')

    const test6 = {}
    setByPath(test6, 'a.b', 1)
    expect(JSON.stringify(test6)).eq('{"a":{"b":1}}')
  })
  test('deleteByPath', () => {
    const test0 = { a: 1 }
    deleteByPath(test0, 'a')
    expect(JSON.stringify(test0)).eq('{}')

    const test1 = [1]
    deleteByPath(test1, '[0]')
    expect(JSON.stringify(test1)).eq('[]')

    const test2 = { a: { b: { c: 1 } }, d: [2] }
    deleteByPath(test2, 'a.b')
    expect(JSON.stringify(test2)).eq('{"a":{},"d":[2]}')

    const test3 = { a: 1 }
    try {
      deleteByPath(test3, 'a.b')
    } catch (error) {
      expect(error).instanceOf(TypeError)
      expect(error.message).eq('a.b is not an object.')
    }

    const test4 = { a: 1 }
    try {
      deleteByPath(test4, 'a[0]')
    } catch (error) {
      expect(error).instanceOf(TypeError)
      expect(error.message).eq('a[0] is not an object.')
    }
  })
  test('unzipToArrays', () => {
    const obj = {
      Alex: 16,
      Bob: 659,
      Carter: 155,
      Daniel: 825
    }
    expect(unzipToArrays(obj)).toEqual([
      ['Alex', 'Bob', 'Carter', 'Daniel'],
      [16, 659, 155, 825]
    ])
    expect(
      unzipToArrays(
        obj,
        (_, key) => key.toUpperCase(),
        (value) => value + ''
      )
    ).toEqual([
      ['ALEX', 'BOB', 'CARTER', 'DANIEL'],
      ['16', '659', '155', '825']
    ])
  })
  test('splitToArrays', () => {
    const obj = {
      Alex: 16,
      Bob: 659,
      Carter: 155,
      Daniel: 825
    }
    expect(splitToArrays(obj)).toEqual([
      { Alex: 16 },
      { Bob: 659 },
      { Carter: 155 },
      { Daniel: 825 }
    ])
    expect(splitToArrays(obj, (value, key) => [key, value])).toEqual([
      ['Alex', 16],
      ['Bob', 659],
      ['Carter', 155],
      ['Daniel', 825]
    ])
  })
  test('objectToPairs', () => {
    const obj = {
      Alex: 16,
      Bob: 659,
      Carter: 155,
      Daniel: 825
    }
    expect(objectToPairs(obj)).toEqual([
      ['Alex', 16],
      ['Bob', 659],
      ['Carter', 155],
      ['Daniel', 825]
    ])
    expect(objectToPairs(obj, (value, key) => ({ [key]: value }))).toEqual([
      { Alex: 16 },
      { Bob: 659 },
      { Carter: 155 },
      { Daniel: 825 }
    ])
  })
  test('omit', () => {
    const obj0 = { a: 1, b: 2, c: 3 }
    const result0 = omit(obj0, ['b', 'c'] as const)
    expect(result0).toEqual({ a: 1 })

    const arr = [1, 2, 3, 4]
    const result1 = omit(arr, ['1', '3'] as const)
    expect(result1).toEqual([1, 3])

    const obj1 = { a: 1, 0: 2, 1: 3 }
    const result2 = omit(obj1, ['a', '0'])
    expect(result2).toEqual({ '1': 3 })
  })
  test('pick', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const keys0 = ['a', 'c'] as const
    const result0 = pick(obj, keys0)
    expect(result0).toEqual({ a: 1, c: 3 })

    const arr = [1, 2, 3, 4]
    const keys1 = ['1', '[3]'] as const
    const result1 = pick(arr, keys1)
    expect(result1).toEqual([2, 4])

    const result2 = pick(arr, ['a', '0'])
    expect(result2).toEqual([1])
  })
  test('forEachFields', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const callback = vitest.fn()

    forEachFields(obj, callback)

    expect(callback).toHaveBeenCalledTimes(3)
    expect(callback).toHaveBeenCalledWith(1, 'a', obj)
    expect(callback).toHaveBeenCalledWith(2, 'b', obj)
    expect(callback).toHaveBeenCalledWith(3, 'c', obj)
  })
  test('filterFields', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const iterator0 = (value: number) => value > 1
    const result0 = filterFields(obj, iterator0)
    expect(result0).toEqual({ b: 2, c: 3 })

    const arr0 = [0, 1, 2, 3]
    const iterator1 = (value: number) => value % 2 === 0
    const result1 = filterFields(arr0, iterator1)
    expect(result1).toEqual([0, 2])

    const arr1 = [0, 1, 2, 3]
    arr1['test'] = 'test'

    const iterator2 = (value, key) => typeof key === 'string'
    const result2 = filterFields(arr1, iterator2)
    expect(result2['test']).toEqual('test')
  })
})
