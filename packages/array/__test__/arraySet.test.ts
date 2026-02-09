import { test, describe, expect } from 'vitest'
import { union } from '../union'
import { intersection } from '../intersection'
import { difference } from '../difference'
import { symmetricDifference } from '../symmetricDifference'
import { unique } from '../unique'

describe('arraySet', () => {
  test('union', () => {
    const res = union([1, 2, 3, NaN], [1, 4, 8, NaN])
    const test0 = [1, 2, 3, NaN, 4, 8]
    expect(test0.length).eq(res.length)
    res.forEach((item, i) => {
      expect(Object.is(item, test0[i])).eq(true)
    })

    expect(
      JSON.stringify(
        union([{ v: 1 }, { v: 2 }, { v: 3 }], [{ v: 1 }, { v: 4 }, { v: 8 }], 'v')
      )
    ).eq('[{"v":1},{"v":2},{"v":3},{"v":4},{"v":8}]')
    expect(
      JSON.stringify(
        union(
          [{ v: [1] }, { v: [2] }, { v: [3] }],
          [{ v: [1] }, { v: [4] }, { v: [8] }],
          'v[0]'
        )
      )
    ).eq('[{"v":[1]},{"v":[2]},{"v":[3]},{"v":[4]},{"v":[8]}]')
    let times = 0
    const test1 = [1.1, 2.4, 3.9, 4.16, 1, 2, 3, 4, 5, 6]
    expect(
      JSON.stringify(
        union([1.1, 2.4, 3.9, 4.16], [1, 2, 3, 4, 5, 6], (item, index, arr) => {
          expect(Object.is(test1[times], item)).eq(true)
          expect(Object.is(arr[index], item)).eq(true)
          times++
          return Math.floor(item)
        })
      )
    ).eq('[1.1,2.4,3.9,4.16,5,6]')
  })
  test('intersection', () => {
    const res = intersection([1, 2, 3, NaN], [1, 4, 8, NaN])
    const test0 = [1, NaN]
    expect(test0.length).eq(res.length)
    res.forEach((item, i) => {
      expect(Object.is(item, test0[i])).eq(true)
    })
    expect(JSON.stringify(intersection([1, 1, 2, 3], [1, 1, 2, 3]))).eq('[1,2,3]')
    expect(
      JSON.stringify(
        intersection(
          [{ v: 1 }, { v: 2 }, { v: 3 }],
          [{ v: 1 }, { v: 4 }, { v: 8 }],
          'v'
        )
      )
    ).eq('[{"v":1}]')
    expect(
      JSON.stringify(
        intersection(
          [{ v: [1] }, { v: [2] }, { v: [3] }],
          [{ v: [1] }, { v: [4] }, { v: [8] }],
          'v[0]'
        )
      )
    ).eq('[{"v":[1]}]')
    let times = 0
    const test1 = [1.1, 2.4, 3.9, 4.16, 1, 2, 3, 4, 5, 6]
    expect(
      JSON.stringify(
        intersection(
          [1.1, 2.4, 3.9, 4.16],
          [1, 2, 3, 4, 5, 6],
          (item, index, arr) => {
            expect(Object.is(test1[times], item)).eq(true)
            expect(Object.is(arr[index], item)).eq(true)
            times++
            return Math.floor(item)
          }
        )
      )
    ).eq('[1.1,2.4,3.9,4.16]')
  })

  test('difference', () => {
    const res = difference([1, 2, 3, NaN], [1, 4, 8, NaN])
    const test0 = [2, 3]
    expect(test0.length).eq(res.length)
    res.forEach((item, i) => {
      expect(Object.is(item, test0[i])).eq(true)
    })

    expect(
      JSON.stringify(
        difference(
          [{ v: 1 }, { v: 2 }, { v: 3 }],
          [{ v: 1 }, { v: 4 }, { v: 8 }],
          'v'
        )
      )
    ).eq('[{"v":2},{"v":3}]')
    expect(
      JSON.stringify(
        difference(
          [{ v: [1] }, { v: [2] }, { v: [3] }],
          [{ v: [1] }, { v: [4] }, { v: [8] }],
          'v[0]'
        )
      )
    ).eq('[{"v":[2]},{"v":[3]}]')
    let times = 0
    const test1 = [1.1, 2.4, 3.9, 4.16, 1, 2, 3, 4, 5, 6]
    expect(
      JSON.stringify(
        difference(
          [1.1, 2.4, 3.9, 4.16],
          [1, 2, 3, 4, 5, 6],
          (item, index, arr) => {
            expect(Object.is(test1[times], item)).eq(true)
            expect(Object.is(arr[index], item)).eq(true)
            times++
            return Math.floor(item)
          }
        )
      )
    ).eq('[]')
  })

  test('symmetricDifference', () => {
    const res = symmetricDifference([1, 2, 3, NaN], [1, 4, 8, NaN])
    const test0 = [2, 3, 4, 8]
    expect(test0.length).eq(res.length)
    res.forEach((item, i) => {
      expect(Object.is(item, test0[i])).eq(true)
    })
    expect(JSON.stringify(symmetricDifference([1, 1, 2, 3], [1, 1, 2, 3]))).eq('[]')
    expect(
      JSON.stringify(
        symmetricDifference(
          [{ v: 1 }, { v: 2 }, { v: 3 }],
          [{ v: 1 }, { v: 4 }, { v: 8 }],
          'v'
        )
      )
    ).eq('[{"v":2},{"v":3},{"v":4},{"v":8}]')
    expect(
      JSON.stringify(
        symmetricDifference(
          [{ v: [1] }, { v: [2] }, { v: [3] }],
          [{ v: [1] }, { v: [4] }, { v: [8] }],
          'v[0]'
        )
      )
    ).eq('[{"v":[2]},{"v":[3]},{"v":[4]},{"v":[8]}]')
    let times = 0
    const test1 = [1.1, 2.4, 3.9, 4.16, 1, 2, 3, 4, 5, 6]
    expect(
      JSON.stringify(
        symmetricDifference(
          [1.1, 2.4, 3.9, 4.16],
          [1, 2, 3, 4, 5, 6],
          (item, index, arr) => {
            expect(Object.is(test1[times], item)).eq(true)
            expect(Object.is(arr[index], item)).eq(true)
            times++
            return Math.floor(item)
          }
        )
      )
    ).eq('[5,6]')
  })
  test('unique', () => {
    const res = unique([1, 2, 3, NaN, 1, 4, 8, NaN])
    const test0 = [1, 2, 3, NaN, 4, 8]
    expect(test0.length).eq(res.length)
    res.forEach((item, i) => {
      expect(Object.is(item, test0[i])).eq(true)
    })
    expect(
      JSON.stringify(
        unique([{ v: 1 }, { v: 2 }, { v: 3 }, { v: 1 }, { v: 4 }, { v: 8 }], 'v')
      )
    ).eq('[{"v":1},{"v":2},{"v":3},{"v":4},{"v":8}]')
    expect(
      JSON.stringify(
        unique(
          [{ v: [1] }, { v: [2] }, { v: [3] }, { v: [1] }, { v: [4] }, { v: [8] }],
          'v[0]'
        )
      )
    ).eq('[{"v":[1]},{"v":[2]},{"v":[3]},{"v":[4]},{"v":[8]}]')
    let times = 0
    const test1 = [1.1, 2.4, 3.9, 4.16, 1, 2, 3, 4, 5, 6]
    expect(
      JSON.stringify(
        unique([1.1, 2.4, 3.9, 4.16, 1, 2, 3, 4, 5, 6], (item, index, arr) => {
          expect(Object.is(test1[times], item)).eq(true)
          expect(Object.is(arr[index], item)).eq(true)
          times++
          return Math.floor(item)
        })
      )
    ).eq('[1.1,2.4,3.9,4.16,5,6]')
  })
})
