import { test, describe, expect } from 'vitest'
import { isEqualStrict } from '../isEqualStrict'
import { isEqual } from '../isEqual'

describe('equal', () => {
  test('isEqualStrict', () => {
    expect(isEqualStrict(1, 1)).eq(true)
    expect(isEqualStrict(+0, -0)).eq(false)
    expect(isEqualStrict(NaN, NaN)).eq(true)
    expect(isEqualStrict('hello', 'hello')).eq(true)
    expect(isEqualStrict(true, true)).eq(true)
    expect(isEqualStrict(false, false)).eq(true)

    expect(isEqualStrict({ a: 1 }, { a: 1 })).eq(false)
    expect(isEqualStrict(5, '5')).eq(false)
    expect(isEqualStrict(null, undefined)).eq(false)
  })
  test('isEqual', () => {
    const obj1 = { a: 1, b: { c: 2 } }
    const obj2 = { a: 1, b: { c: 2 } }
    expect(isEqual(obj1, obj2)).eq(true)

    const obj3 = { a: 1, b: 2 }
    const obj4 = { a: 1, b: 3 }
    expect(isEqual(obj3, obj4)).eq(false)

    const obj5 = { a: { b: { c: 1 } } }
    const obj6 = { a: { b: { c: 1 } } }
    expect(isEqual(obj5, obj6)).eq(true)

    const obj7 = Object.create({ inherited: 1 })
    obj7.own = 2
    const obj8 = Object.create({ inherited: 2 })
    obj8.own = 2
    expect(isEqual(obj7, obj8)).eq(true)

    const arr1 = [1, [2, 3]]
    const arr2 = [1, [2, 3]]
    expect(isEqual(arr1, arr2)).eq(true)

    const arr3 = [1, 2]
    const arr4 = [1, 2, 3]
    expect(isEqual(arr3, arr4)).eq(false)

    const map1 = new Map([
      ['a', 1],
      ['b', 2]
    ])
    const map2 = new Map([
      ['a', 1],
      ['b', 2]
    ])
    expect(isEqual(map1, map2)).eq(true)

    const map3 = new Map([
      ['a', 1],
      ['b', 2]
    ])
    const map4 = new Map([
      ['a', 1],
      ['b', 3]
    ])
    expect(isEqual(map3, map4)).eq(false)

    const map5 = new Map([
      [['a'], { data: 1 }],
      [['b'], { data: 2 }]
    ])
    const map6 = new Map([
      [['a'], { data: 1 }],
      [['b'], { data: 2 }]
    ])
    expect(isEqual(map5, map6)).eq(true)

    const map7 = new Map([['a', 1]])
    const map8 = new Map([
      ['a', 1],
      ['b', 3]
    ])
    expect(isEqual(map7, map8)).eq(false)

    const map9 = new Map([['a', 1]])
    const map10 = new Map([['b', 1]])
    expect(isEqual(map9, map10)).eq(false)

    const set1 = new Set([1, 2, 3])
    const set2 = new Set([1, 2, 3])
    expect(isEqual(set1, set2)).eq(true)

    const set3 = new Set([{ a: 1 }])
    const set4 = new Set([{ a: 1 }])
    expect(isEqual(set3, set4)).eq(true)

    const set5 = new Set([1, 2])
    const set6 = new Set([1, 2, 3])
    expect(isEqual(set5, set6)).eq(false)

    const date1 = new Date('2024-01-01')
    const date2 = new Date('2024-01-01')
    expect(isEqual(date1, date2)).eq(true)

    const date3 = new Date('invalid')
    const date4 = new Date('invalid')
    expect(isEqual(date3, date4)).eq(true)

    const regex1 = /pattern/g
    const regex2 = /pattern/g
    expect(isEqual(regex1, regex2)).eq(true)

    const regex3 = /pattern/g
    const regex4 = /pattern/i
    expect(isEqual(regex3, regex4)).eq(false)

    const arrayBuffer1 = new ArrayBuffer(8)
    const view1 = new Uint8Array(arrayBuffer1)
    view1[0] = 65
    view1[1] = 66
    view1[2] = 67
    const arrayBuffer2 = new ArrayBuffer(8)
    const view2 = new Uint8Array(arrayBuffer2)
    view2[0] = 65
    view2[1] = 66
    view2[2] = 67
    expect(isEqual(arrayBuffer1, arrayBuffer2)).eq(true)

    const typedArray1 = new Uint8Array([1, 2, 3])
    const typedArray2 = new Uint8Array([1, 2, 3])
    expect(isEqual(typedArray1, typedArray2)).eq(true)

    const typedArray3 = new Uint8Array([1, 2])
    const typedArray4 = new Int8Array([1, 2])
    expect(isEqual(typedArray3, typedArray4)).eq(false)

    const typedArrayArray1 = [new Uint8Array([1]), new Int16Array([2])]
    const typedArrayArray2 = [new Uint8Array([1]), new Int16Array([2])]
    expect(isEqual(typedArrayArray1, typedArrayArray2)).eq(true)

    const fn1 = () => {
      /*...*/
    }
    const fn2 = () => {
      /*...*/
    }
    expect(isEqual(fn1, fn2)).eq(false)
    expect(isEqual(fn1, fn1)).eq(true)

    const error1 = new Error('message')
    const error2 = new Error('message')
    expect(isEqual(error1, error2)).eq(false)
    expect(isEqual(error1, error1)).eq(true)

    const promise1 = Promise.resolve(1)
    const promise2 = Promise.resolve(1)
    expect(isEqual(promise1, promise2)).eq(false)
    expect(isEqual(promise1, promise1)).eq(true)

    const obj9 = {
      project: ['A', 'B', 'C'],
      startTime: new Date('2025-1-1'),
      status: { finish: false, block: true }
    }
    const obj10 = {
      project: ['A', 'B', 'C'],
      startTime: new Date('2025-1-1'),
      status: { finish: false, block: true }
    }
    expect(isEqual(obj9, obj10)).eq(true)
  })
})
