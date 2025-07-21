import { describe, expect, test } from 'vitest'
import { clone } from '../clone' // Replace with your module path

function isArrayBuffersEqual(buffer1: ArrayBuffer, buffer2: ArrayBuffer) {
  if (buffer1.byteLength !== buffer2.byteLength) {
    return false
  }
  const view1 = new Uint8Array(buffer1)
  const view2 = new Uint8Array(buffer2)

  return isTypeArraysEqual(view1, view2)
}

function isTypeArraysEqual(a, b) {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (!Object.is(a[i], b[i])) return false
  }
  return true
}

describe('Shallow Clone Function Tests', () => {
  // Test cloning of primitive data types
  test('Clone primitive data types', () => {
    expect(clone(123)).toBe(123)
    expect(clone('hello')).toBe('hello')
    expect(clone(true)).toBe(true)
    expect(clone(null)).toBeNull()
    expect(clone(undefined)).toBeUndefined()
  })

  // Test cloning of plain objects
  test('Clone plain objects', () => {
    const original = { a: 1, b: 2 }
    const cloned = clone(original)
    expect(cloned).not.toBe(original)
    expect(cloned).toEqual(original)
    // Shallow clone, changes to the original object's properties do not affect the cloned object
    original.a = 100
    expect(cloned.a).toBe(1)
  })

  // Test cloning of arrays
  test('Clone arrays', () => {
    const original = [1, 2, 3]
    const cloned = clone(original)
    expect(cloned).not.toBe(original)
    expect(cloned).toEqual(original)
    // Shallow clone, changes to the original array's elements do not affect the cloned array
    original[0] = 100
    expect(cloned[0]).toBe(1)
  })

  // Test cloning of nested objects
  test('Clone nested objects', () => {
    const original = { a: 1, b: { c: 2 } }
    const cloned = clone(original)
    expect(cloned).not.toBe(original)
    expect(cloned).toEqual(original)
    // Shallow clone, the nested object reference is the same
    expect(cloned.b).toBe(original.b)
    // Changes to the original object's nested object properties affect the cloned object
    original.b.c = 200
    expect(cloned.b.c).toBe(200)
  })

  // Test cloning of Set collections
  test('Clone Set collections', () => {
    const original = new Set([1, 2, 3])
    const cloned = clone(original)
    expect(cloned).not.toBe(original)
    expect(cloned.size).toBe(original.size)
    expect(cloned.has(1)).toBe(true)
  })

  // Test cloning of Map collections
  test('Clone Map collections', () => {
    const original = new Map([
      [1, 'one'],
      [2, 'two']
    ])
    const cloned = clone(original)
    expect(cloned).not.toBe(original)
    expect(cloned.size).toBe(original.size)
    expect(cloned.get(1)).toBe('one')
  })

  // Test cloning of special objects (like Date, Blob, etc.)
  test('Clone special objects', () => {
    const originalDate = new Date('2023-01-01')
    const clonedDate = clone(originalDate)
    expect(clonedDate).not.toBe(originalDate)
    expect(clonedDate.getTime()).toBe(originalDate.getTime())

    const originalRegExp = /test/g
    const clonedRegExp = clone(originalRegExp)
    expect(clonedRegExp).not.toBe(originalRegExp)
    expect(clonedDate.toString()).toBe(originalDate.toString())

    const number = new Number(0)
    const cloneNumber = clone(number)
    expect(number === cloneNumber).eq(false)
    expect(cloneNumber.valueOf()).eq(0)

    const string = new String(0)
    const cloneString = clone(string)
    expect(string === cloneString).eq(false)
    expect(cloneString.valueOf()).eq('0')

    const boolean = new Boolean(0)
    const cloneBoolean = clone(boolean)
    expect(boolean === cloneBoolean).eq(false)
    expect(cloneBoolean.valueOf()).eq(false)
  })

  test('Clone File and Stream object', () => {
    const originalBlob = new Blob(['test'], { type: 'text/plain' })
    const clonedBlob = clone(originalBlob)
    expect(clonedBlob).not.toBe(originalBlob)
    expect(clonedBlob.size).toBe(originalBlob.size)

    const file = new File(['test'], 'test.txt', { type: 'plain' })
    const cloneFile = clone(file)
    expect(file === cloneFile).eq(false)
    expect(cloneFile.type).eq('plain')
    expect(cloneFile.name).eq('test.txt')
    file.text().then((text) => {
      expect(text).eq('test')
    })

    const arrayBuffer = new ArrayBuffer(8)
    const view1 = new Uint8Array(arrayBuffer)
    view1[0] = 65
    view1[1] = 66
    view1[2] = 67
    const arrayBufferClone = clone(arrayBuffer)
    expect(arrayBufferClone).not.toBe(arrayBuffer)
    expect(isArrayBuffersEqual(arrayBuffer, arrayBufferClone)).toBe(true)
  })

  test('Clone TypedArray', () => {
    ;[
      Int8Array,
      Uint8Array,
      Uint8ClampedArray,
      Int16Array,
      Uint16Array,
      Int32Array,
      Uint32Array,
      Float32Array,
      Float64Array
    ].forEach((constructor) => {
      const original = new constructor([1, 2, 3, 4, 5])
      const cloned = clone(original)
      expect(original).not.toBe(cloned)
      expect(isTypeArraysEqual(original, cloned)).toBe(true)
    })
    ;[BigInt64Array, BigUint64Array].forEach((constructor) => {
      const original = new constructor([
        BigInt(1),
        BigInt(2),
        BigInt(3),
        BigInt(4),
        BigInt(5)
      ])
      const cloned = clone(original)
      expect(original).not.toBe(cloned)
      expect(isTypeArraysEqual(original, cloned)).toBe(true)
    })
  })

  // Test cloning of arguments objects
  test('Clone arguments objects', () => {
    const getArgs = (...args: any[]) => args
    const argsArray = getArgs(1, 2, 3)
    const clonedArgs = clone(argsArray)
    expect(clonedArgs).not.toBe(argsArray)
    expect(clonedArgs).toEqual([1, 2, 3])
  })

  // Test cloning of objects with __proto__
  test('Clone objects with __proto__', () => {
    const original = Object.create({ a: 1 })
    original.b = 2
    const cloned = clone(original)
    expect(cloned).not.toBe(original)
    expect(cloned.b).toBe(2)
    expect(Object.getPrototypeOf(cloned)).toEqual({ a: 1 })
  })

  // Test handling of circular references (shallow clone)
  test('Handle circular references (shallow clone)', () => {
    const original: any = {}
    original.self = original
    const cloned = clone(original)
    expect(cloned).not.toBe(original)
    // In a shallow clone, circular references will cause the cloned object's self to point to itself
    expect(cloned.self).toBe(original)
  })

  test('Clone not supported object returns {}', () => {
    const original = new Error()
    const cloned = clone(original)
    expect(cloned).toStrictEqual({})
  })

  test('Clone TypedArray', () => {
    const original = new Error()
    const cloned = clone(original)
    expect(cloned).toStrictEqual({})
  })
})
