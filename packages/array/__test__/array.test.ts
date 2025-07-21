import { test, describe, expect } from 'vitest'
import { leftJoin } from '../leftJoin'
import { sortIndex } from '../sortIndex'
import { zipToObject } from '../zipToObject'
import { pairsToObject } from '../pairsToObject'
import { joinToObject } from '../joinToObject'

describe('array', () => {
  test('leftJoin', () => {
    const leftArray0 = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' }
    ]
    const rightArray0 = [
      { id: 1, age: 25 },
      { id: 3, age: 30 }
    ]

    const result0 = leftJoin(
      leftArray0,
      rightArray0,
      (item) => item.id,
      (item) => item.id,
      (left, right) => ({ ...left, ...(right || {}) })
    )
    expect(JSON.stringify(result0)).eq(
      '[{"id":1,"name":"Alice","age":25},{"id":2,"name":"Bob"},{"id":3,"name":"Charlie","age":30}]'
    )

    const leftArray1 = [
      { id: 1, info: { name: 'Alice', age: 25 } },
      { id: 2, info: { name: 'Bob', age: 35 } },
      { id: 3, info: { name: 'Charlie', age: 30 } }
    ]
    const rightArray1 = [
      { name: 'Alice', experience: ['software engineer', 'designer'] },
      { name: 'Charlie', experience: ['freelance'] }
    ]

    const result1 = leftJoin(
      leftArray1,
      rightArray1,
      'info.name',
      'name',
      (left, right) => ({
        name: left.info.name,
        job: right?.experience[0] ?? null
      })
    )
    expect(JSON.stringify(result1)).eq(
      '[{"name":"Alice","job":"software engineer"},{"name":"Bob","job":null},{"name":"Charlie","job":"freelance"}]'
    )
  })
  test('sortIndex', () => {
    expect(
      JSON.stringify(sortIndex(sortIndex([1, 25, 4, 9, 16], (a, b) => a - b)))
    ).eq('[0,4,1,2,3]')

    expect(JSON.stringify(sortIndex(sortIndex([1, 25, 4, 9, 16])))).eq(
      '[0,2,3,4,1]'
    )
  })
  test('zipToObject', () => {
    expect(
      JSON.stringify(
        zipToObject(['id', 'name', 'skill'], [1, 'Alex', ['Javascript']])
      )
    ).eq('{"id":1,"name":"Alex","skill":["Javascript"]}')

    const users = [
      { id: 0, user: 'IAmBot' },
      { id: 2, user: 'Alice' },
      { id: 5, user: 'Tom' }
    ]
    const record = [
      { system: 'Linux', count: 99999, userId: 0 },
      { system: 'Mac OS', count: 10, userId: 2 },
      { system: 'Window', count: 2, userId: 5 }
    ]
    expect(JSON.stringify(zipToObject(users, record, 'user', 'count'))).eq(
      '{"IAmBot":99999,"Alice":10,"Tom":2}'
    )

    expect(
      JSON.stringify(
        zipToObject(
          users,
          record,
          (item, index, arr) => {
            expect(item).eq(arr[index])
            expect(item).eq(users[index])
            return item.user
          },
          (item, index, arr) => {
            expect(item).eq(arr[index])
            expect(item).eq(record[index])
            return item.count
          }
        )
      )
    ).eq('{"IAmBot":99999,"Alice":10,"Tom":2}')
  })
  test('pairsToObject', () => {
    const users = [
      ['Alex', 16, 'vip'],
      ['Bob', 659, 'viewer'],
      ['Carter', 155, 'user'],
      ['Daniel', 825, 'user']
    ]
    expect(JSON.stringify(pairsToObject(users))).eq(
      '{"Alex":16,"Bob":659,"Carter":155,"Daniel":825}'
    )
    expect(JSON.stringify(pairsToObject(users, '[0]', '[2]'))).eq(
      '{"Alex":"vip","Bob":"viewer","Carter":"user","Daniel":"user"}'
    )
    expect(
      JSON.stringify(
        pairsToObject(
          users,
          (pair) => pair[0],
          (pair) => `${pair[1]} replies`
        )
      )
    ).eq(
      '{"Alex":"16 replies","Bob":"659 replies","Carter":"155 replies","Daniel":"825 replies"}'
    )
  })
  test('joinToObject', () => {
    const users = [
      { Alex: 'vip' },
      { Bob: 'viewer' },
      { Carter: 'user' },
      { Daniel: 'user' }
    ]
    expect(joinToObject(users)).toEqual({
      Alex: 'vip',
      Bob: 'viewer',
      Carter: 'user',
      Daniel: 'user'
    })
    const data = [
      { name: 'Alex', type: 'vip' },
      { name: 'Bob', type: 'viewer' },
      { name: 'Carter', type: 'user' },
      { name: 'Daniel', type: 'user' }
    ]
    expect(joinToObject(data, 'name', 'type')).toEqual({
      Alex: 'vip',
      Bob: 'viewer',
      Carter: 'user',
      Daniel: 'user'
    })
    expect(
      joinToObject(
        data,
        (pair) => pair.name,
        (pair) => pair.type
      )
    ).toEqual({ Alex: 'vip', Bob: 'viewer', Carter: 'user', Daniel: 'user' })
  })
})
