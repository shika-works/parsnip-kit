import { describe, expect, test } from 'vitest'
import { lexSort } from '../lexSort'
import { sortWithIndex } from '../sortWithIndex'
import { numberSort } from '../numberSort'

const fruits = ['banana', 'apple', 'cherry', 'date']
const mixedCaseFruits = ['Banana', 'apple', 'Cherry', 'date']
const people = [
  { name: 'John', age: 30 },
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 35 }
]

describe('lexSort', () => {
  test('sorts strings in ascending order by default', () => {
    const sorted = lexSort([...fruits])
    expect(sorted).toEqual(['apple', 'banana', 'cherry', 'date'])
  })

  test('sorts strings in descending order', () => {
    const sorted = lexSort([...fruits], 'desc')
    expect(sorted).toEqual(['date', 'cherry', 'banana', 'apple'])
  })

  test('sorts with no case sensitivity', () => {
    const sortedAsc = lexSort([...mixedCaseFruits], 'asc')
    expect(sortedAsc).toEqual(['apple', 'Banana', 'Cherry', 'date'])

    const sortedDesc = lexSort([...mixedCaseFruits], 'desc')
    expect(sortedDesc).toEqual(['date', 'Cherry', 'Banana', 'apple'])
  })

  test('uses getter as string path', () => {
    const sortedByNameAsc = lexSort([...people], 'asc', 'name')
    expect(sortedByNameAsc).toEqual([
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 35 },
      { name: 'John', age: 30 }
    ])

    const sortedByNameDesc = lexSort([...people], 'desc', 'name')
    expect(sortedByNameDesc).toEqual([
      { name: 'John', age: 30 },
      { name: 'Bob', age: 35 },
      { name: 'Alice', age: 25 }
    ])
  })

  test('uses getter as callback function', () => {
    const sortedByAgeAsc = lexSort([...people], 'asc', (person) =>
      person.age.toString()
    )
    expect(sortedByAgeAsc).toEqual([
      { name: 'Alice', age: 25 },
      { name: 'John', age: 30 },
      { name: 'Bob', age: 35 }
    ])

    const sortedByAgeDesc = lexSort([...people], 'desc', (person) =>
      person.age.toString()
    )
    expect(sortedByAgeDesc).toEqual([
      { name: 'Bob', age: 35 },
      { name: 'John', age: 30 },
      { name: 'Alice', age: 25 }
    ])
  })

  test('handles empty array', () => {
    const emptyArray: string[] = []
    const sorted = lexSort([...emptyArray])
    expect(sorted).toEqual([])
  })

  test('handles array with single element', () => {
    const singleElementArray = ['apple']
    const sorted = lexSort([...singleElementArray])
    expect(sorted).toEqual(['apple'])
  })

  test('works with nested objects using getByPath', () => {
    const nestedObjects = [
      { details: { name: 'John' } },
      { details: { name: 'Alice' } },
      { details: { name: 'Bob' } }
    ]

    const sorted = lexSort([...nestedObjects], 'asc', 'details.name')
    expect(sorted).toEqual([
      { details: { name: 'Alice' } },
      { details: { name: 'Bob' } },
      { details: { name: 'John' } }
    ])
  })
})

describe('sortWithIndex', () => {
  test('sorts numbers and returns index map', () => {
    const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]
    const indexMap = sortWithIndex(arr)

    expect(arr).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9])
    expect(indexMap).toEqual([1, 3, 6, 0, 9, 2, 4, 8, 10, 7, 5])
  })

  test('sorts strings and returns index map', () => {
    const arr = ['banana', 'apple', 'cherry', 'date']
    const indexMap = sortWithIndex(arr)

    expect(arr).toEqual(['apple', 'banana', 'cherry', 'date'])
    expect(indexMap).toEqual([1, 0, 2, 3])
  })

  test('sorts with custom comparator', () => {
    const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]
    const comparator = (a: number, b: number) => b - a
    const indexMap = sortWithIndex(arr, comparator)

    expect(arr).toEqual([9, 6, 5, 5, 5, 4, 3, 3, 2, 1, 1])
    expect(indexMap).toEqual([5, 7, 4, 8, 10, 2, 0, 9, 6, 1, 3])
  })

  test('handles empty array', () => {
    const arr: number[] = []
    const indexMap = sortWithIndex(arr)

    expect(arr).toEqual([])
    expect(indexMap).toEqual([])
  })

  test('handles single-element array', () => {
    const arr = [42]
    const indexMap = sortWithIndex(arr)

    expect(arr).toEqual([42])
    expect(indexMap).toEqual([0])
  })

  test('sorts objects by a specific property', () => {
    const arr = [...people]
    const comparator = (a: { age: number }, b: { age: number }) => a.age - b.age
    const indexMap = sortWithIndex(arr, comparator)

    expect(arr).toEqual([
      { name: 'Alice', age: 25 },
      { name: 'John', age: 30 },
      { name: 'Bob', age: 35 }
    ])
    expect(indexMap).toEqual([1, 0, 2])
  })

  test('sorts nested objects using custom comparator', () => {
    const arr = [
      { details: { name: 'John' } },
      { details: { name: 'Alice' } },
      { details: { name: 'Bob' } }
    ]
    const comparator = (
      a: { details: { name: string } },
      b: { details: { name: string } }
    ) => a.details.name.localeCompare(b.details.name)
    const indexMap = sortWithIndex(arr, comparator)

    expect(arr).toEqual([
      { details: { name: 'Alice' } },
      { details: { name: 'Bob' } },
      { details: { name: 'John' } }
    ])
    expect(indexMap).toEqual([1, 2, 0])
  })
})

const numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]

describe('numberSort', () => {
  test('sorts numbers in ascending order by default', () => {
    const sorted = numberSort([...numbers])
    expect(sorted).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9])
  })

  test('sorts numbers in descending order', () => {
    const sorted = numberSort([...numbers], 'desc')
    expect(sorted).toEqual([9, 6, 5, 5, 5, 4, 3, 3, 2, 1, 1])
  })

  test('uses getter as string path', () => {
    const sortedByAgeAsc = numberSort([...people], 'asc', 'age')
    expect(sortedByAgeAsc).toEqual([
      { name: 'Alice', age: 25 },
      { name: 'John', age: 30 },
      { name: 'Bob', age: 35 }
    ])

    const sortedByAgeDesc = numberSort([...people], 'desc', 'age')
    expect(sortedByAgeDesc).toEqual([
      { name: 'Bob', age: 35 },
      { name: 'John', age: 30 },
      { name: 'Alice', age: 25 }
    ])
  })

  test('uses getter as callback function', () => {
    const sortedByAgeAsc = numberSort([...people], 'asc', (person) => person.age)
    expect(sortedByAgeAsc).toEqual([
      { name: 'Alice', age: 25 },
      { name: 'John', age: 30 },
      { name: 'Bob', age: 35 }
    ])

    const sortedByAgeDesc = numberSort([...people], 'desc', (person) => person.age)
    expect(sortedByAgeDesc).toEqual([
      { name: 'Bob', age: 35 },
      { name: 'John', age: 30 },
      { name: 'Alice', age: 25 }
    ])
  })

  test('handles empty array', () => {
    const emptyArray: number[] = []
    const sorted = numberSort([...emptyArray])
    expect(sorted).toEqual([])
  })

  test('handles array with single element', () => {
    const singleElementArray = [42]
    const sorted = numberSort([...singleElementArray])
    expect(sorted).toEqual([42])
  })

  test('works with nested objects using getByPath', () => {
    const nestedObjects = [
      { details: { age: 30 } },
      { details: { age: 25 } },
      { details: { age: 35 } }
    ]

    const sorted = numberSort([...nestedObjects], 'asc', 'details.age')
    expect(sorted).toEqual([
      { details: { age: 25 } },
      { details: { age: 30 } },
      { details: { age: 35 } }
    ])
  })
})
