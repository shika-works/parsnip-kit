import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { randomString } from '../randomString'

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
describe('randomString', () => {
  beforeEach(() => {
    setFakeRandom(seed)
  })
  afterEach(() => {
    undoSetFakeRandom()
  })

  test('should generate string with correct length', () => {
    const length = 10
    const result = randomString(length)
    expect(result).toHaveLength(length)
  })

  test('should include lowercase letters when lowercase option is true', () => {
    const length = 10
    const result = randomString(length)

    expect(result).eq('Dij1mzPzyW')
  })

  test('should not include lowercase letters when lowercase option is false', () => {
    const length = 10
    const result = randomString(length, { lowercase: false })

    expect(result).eq('AJ2001NXD1')
  })

  test('should include uppercase letters when uppercase option is true', () => {
    const length = 10
    const result = randomString(length, { uppercase: true })

    expect(result).eq('690Io4jEgT')
  })

  test('should not include uppercase letters when uppercase option is false', () => {
    const length = 10
    const result = randomString(length, { uppercase: false })

    expect(result).eq('i76ydhb4n6')
  })

  test('should include numbers when number option is true', () => {
    const length = 10
    const result = randomString(length, { number: true })

    expect(result).eq('tGcIXel9m0')
  })

  test('should not include numbers when number option is false', () => {
    const length = 10
    const result = randomString(length, { number: false })

    expect(result).eq('iYyyWSReNw')
  })

  test('should include symbols when symbol option is true', () => {
    const length = 10
    const result = randomString(length, { symbol: true })

    expect(result).eq('gI(CThCMK%')
  })

  test('should not include symbols when symbol option is false', () => {
    const length = 10
    const result = randomString(length, { symbol: false })

    expect(result).eq('1rtghebGll')
  })

  test('should include customized characters when customized option is provided', () => {
    const length = 20
    const customized = 'αβγδεζηθικλμνξοπρστυφχψω'
    const result = randomString(length, { customized })

    expect(result).eq('jRjVυocY9θoπσdlhμhz8')
  })

  test('should return empty string when no characters are available', () => {
    const length = 10
    const result = randomString(length, {
      lowercase: false,
      uppercase: false,
      number: false,
      symbol: false
    })
    expect(result).toBe('')
  })

  test('should return empty string when length is 0', () => {
    const length = 0
    const result = randomString(length)
    expect(result).toBe('')
  })
})
