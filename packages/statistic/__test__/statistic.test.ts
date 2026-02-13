import { describe, expect, test } from 'vitest'
import { average } from '../average'
import { sum } from '../sum'
import { median } from '../median'
import { count } from '../count'
import { mode } from '../mode'
import { max } from '../max'
import { min } from '../min'
import { maxItem } from '../maxItem'
import { minItem } from '../minItem'
import { modeItem } from '../modeItem'

describe('statistic', () => {
  test('average', () => {
    expect(average([1, 2, 3, 4])).eq(2.5)

    expect(average([{ value: 10 }, { value: 20 }], (item) => item.value)).eq(15)

    expect(average([{ score: 85 }, { score: 95 }], 'score')).eq(90)

    try {
      average([])
    } catch (error) {
      expect(error).instanceOf(TypeError)
      expect(error.message).eq('Length of data to calculate average must > 0')
    }
  })
  test('sum', () => {
    expect(sum([1, 2, 3, 4])).eq(10)

    expect(sum([{ value: 10 }, { value: 20 }], (item) => item.value)).eq(30)

    expect(sum([{ score: 85 }, { score: 95 }], 'score')).eq(180)
  })
  test('median', () => {
    expect(median([1, 2, 3, 4, 0])).eq(2)
    expect(median([1, 2, 3, 4])).eq(2.5)

    expect(
      median([{ value: 10 }, { value: 20 }, { value: 10 }], (item) => item.value)
    ).eq(10)

    expect(median([{ score: 100 }, { score: 85 }, { score: 95 }], 'score')).eq(95)
  })
  test('count', () => {
    const res4Number = count([1, 2, 2, 3, 3, 3])
    expect(res4Number).instanceOf(Map)
    expect(res4Number.size).eq(3)
    const keys4Number = [1, 2, 3]
    const values4Number = [1, 2, 3]
    for (const i in keys4Number) {
      expect(res4Number.get(keys4Number[i])).eq(values4Number[i])
    }

    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'alice' }
    ]
    const res4Path = count(users, 'id')
    expect(res4Path).instanceOf(Map)
    expect(res4Path.size).eq(2)
    const keys4Path = [1, 2]
    const values4Path = [2, 1]
    for (const i in keys4Path) {
      expect(res4Path.get(keys4Path[i])).eq(values4Path[i])
    }

    const res4Func = count(users, (user) => user.name.toLowerCase())
    expect(res4Func).instanceOf(Map)
    expect(res4Func.size).eq(2)
    const keys4Func = ['alice', 'bob']
    const values4Func = [2, 1]
    for (const i in keys4Func) {
      expect(res4Func.get(keys4Func[i])).eq(values4Func[i])
    }
  })
  test('modeItem', () => {
    const res4Number = modeItem([1, 2, 2, 3, 3, 3])
    expect(res4Number).toEqual(3)

    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'alice' }
    ]
    const res4Path = modeItem(users, 'id')
    expect(res4Path).toEqual({ id: 1, name: 'Alice' })

    const res4Func = modeItem(users, (user) => user.name.toLowerCase())
    expect(res4Func).toEqual({ id: 1, name: 'Alice' })
  })
  test('mode', () => {
    const res4Number = mode([1, 2, 2, 3, 3, 3])
    expect(res4Number).toEqual(3)

    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'alice' }
    ]
    const res4Path = mode(users, 'id')
    expect(res4Path).toEqual(1)

    const res4Func = mode(users, (user) => user.name.toLowerCase())
    expect(res4Func).toEqual('alice')
  })
  test('max', () => {
    expect(max([1, 2, 3, 4])).eq(4)
    expect(max([{ value: 10 }, { value: 20 }], (item) => item.value)).eq(20)
    expect(max([{ score: 85 }, { score: 95 }], 'score')).eq(95)
  })
  test('min', () => {
    expect(min([1, 2, 3, 4])).eq(1)
    expect(min([{ value: 10 }, { value: 20 }], (item) => item.value)).eq(10)
    expect(min([{ score: 85 }, { score: 95 }], 'score')).eq(85)
  })
  test('maxItem', () => {
    expect(maxItem([1, 2, 3, 4])).toEqual(4)
    expect(
      maxItem(
        [{ value: 10 }, { value: 20 }, { value: 20, key: 'count' }],
        (item) => item.value
      )
    ).toEqual({ value: 20 })
    expect(
      maxItem([{ value: 10 }, { value: 20 }, { value: 20, key: 'count' }], 'value')
    ).toEqual({ value: 20 })
  })
  test('minItem', () => {
    expect(minItem([1, 2, 3, 4])).toEqual(1)
    expect(
      minItem(
        [{ value: 10 }, { value: 20 }, { value: 10, key: 'count' }],
        (item) => item.value
      )
    ).toEqual({ value: 10 })
    expect(
      minItem([{ value: 10 }, { value: 20 }, { value: 10, key: 'count' }], 'value')
    ).toEqual({ value: 10 })
  })
})
