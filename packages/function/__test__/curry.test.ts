import { describe, test, expect } from 'vitest'
import { curry } from '../curry'

describe('Curry Function Tests', () => {
  test('Curried addition function', () => {
    // Test case 1: Currying an addition function
    function add(a, b) {
      return a + b
    }
    const curriedAdd = curry(add)
    expect(curriedAdd(2)(3)).toBe(5) // Partial application
    expect(curriedAdd(2, 3)).toBe(5) // Full application
  })

  test('Curried triangle area function', () => {
    // Test case 2: Currying a triangle area calculation function
    function triangleArea(base, height) {
      return (base * height) / 2
    }
    const curriedTriangleArea = curry(triangleArea)

    expect(curriedTriangleArea(4)(5)).toBe(10) // Partial application
    expect(curriedTriangleArea(4, 5)).toBe(10) // Full application
  })

  test('Curried function with default parameters', () => {
    // Test case 3: Currying a function with default parameters
    function greet(name, greeting = 'Hello') {
      return `${greeting}, ${name}!`
    }
    const curriedGreet = curry(greet)

    expect(curriedGreet('Alice', 'Hi')).toBe('Hi, Alice!') // Override default
    expect(curriedGreet('Bob')).toBe('Hello, Bob!') // Use default
  })
})
