import { describe, expect, test } from 'vitest'
import { randomBoolean } from '../randomBoolean'
import { randomNumber } from '../randomNumber'
import { randomFromArray } from '../randomFromArray'

const _ = Math.random.bind(Math)
let seed = 42
const setFakeRandom = (curSeed: number) => {
  seed = curSeed
  Math.random = () => {
    const max = 1,
      min = 0
    seed = (seed * 9301 + 49297) % 233580
    return min + (seed / 233580) * (max - min)
  }
}
const undoSetFakeRandom = () => {
  Math.random = _
}

describe('random', () => {
  test('randomBoolean', () => {
    setFakeRandom(42)
    expect(randomBoolean()).eq(false)
    expect(randomBoolean()).eq(true)
    expect(randomBoolean()).eq(false)
    expect(randomBoolean()).eq(true)
    expect(randomBoolean()).eq(false)
    undoSetFakeRandom()
  })
  test('randomNumber', () => {
    setFakeRandom(42)
    expect(randomNumber()).eq(0.8834617689870709)
    expect(randomNumber(0, 10)).eq(2.8896309615549276)
    expect(randomNumber(0, 10)).eq(8.568070896480863)
    expect(randomNumber(0, 10)).eq(3.7379056426063877)
    undoSetFakeRandom()
  })
  test('randomFromArray', () => {
    setFakeRandom(42)
    const arr = [1, 2, 3, 4]
    expect(randomFromArray(arr)).eq(4)
    expect(randomFromArray(arr)).eq(2)
    expect(randomFromArray(arr)).eq(4)
    expect(randomFromArray(arr)).eq(2)
    expect(randomFromArray(arr)).eq(4)
    expect(randomFromArray(arr)).eq(4)
    expect(randomFromArray(arr)).eq(2)
    expect(randomFromArray(arr)).eq(1)
    expect(randomFromArray(arr)).eq(3)
    expect(randomFromArray(arr)).eq(4)
    undoSetFakeRandom()
  })
})
