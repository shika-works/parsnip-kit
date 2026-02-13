import { describe, it, expect } from 'vitest'
import { parseTemplate } from '../parseTemplate'
import { getByPath } from '../../object/getByPath'

describe('parseTemplate', () => {
  it('should replace placeholders using an object parser', () => {
    const template = 'Hello, {name}! Your balance is {balance}.'
    const data = { name: 'Alice', balance: '$100' }
    const result = parseTemplate(template, data)
    expect(result).toBe('Hello, Alice! Your balance is $100.')
  })

  it('should replace placeholders using a function parser', () => {
    const template = 'Hello, {name}! Your balance is {balance}.'
    const parser = (key: string) => {
      const data = { name: 'Alice', balance: '$100' }
      return getByPath(data, key)
    }
    const result = parseTemplate(template, parser)
    expect(result).toBe('Hello, Alice! Your balance is $100.')
  })

  it('should support custom delimiters', () => {
    const template = 'Hello, <name>! Your balance is <balance>.'
    const data = { name: 'Alice', balance: '$100' }
    const result = parseTemplate(template, data, {
      start: '<',
      end: '>'
    })
    expect(result).toBe('Hello, Alice! Your balance is $100.')
  })

  it('should preserve unmatched placeholders', () => {
    const template = 'Hello, {name}! Your balance is {balance}.'
    const data = { name: 'Alice' }
    const result = parseTemplate(template, data)
    expect(result).toBe('Hello, Alice! Your balance is {balance}.')
  })

  it('should handle empty template string', () => {
    const template = ''
    const data = { name: 'Alice', balance: '$100' }
    const result = parseTemplate(template, data)
    expect(result).toBe('')
  })

  it('should support nested objects', () => {
    const template = 'Hello, {user.name}! Your balance is {user.balance}.'
    const data = { user: { name: 'Alice', balance: '$100' } }
    const result = parseTemplate(template, data)
    expect(result).toBe('Hello, Alice! Your balance is $100.')
  })

  it('should preserve placeholders when function parser returns undefined', () => {
    const template = 'Hello, {name}! Your balance is {balance}.'
    const parser = (key: string) => {
      if (key === 'name') return 'Alice'
      return undefined
    }
    const result = parseTemplate(template, parser)
    expect(result).toBe('Hello, Alice! Your balance is {balance}.')
  })
})
