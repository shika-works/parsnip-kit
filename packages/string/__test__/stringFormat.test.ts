import { test, describe, expect } from 'vitest'
import { camelCase } from '../camelCase'
import { splitToWords } from '../splitToWords'
import { kebabCase } from '../kebabCase'
import { pascalCase } from '../pascalCase'
import { snakeCase } from '../snakeCase'
import { upperSnakeCase } from '../upperSnakeCase'
import { capitalize } from '../capitalize'
import { titleCase } from '../titleCase'
import { htmlEncode } from '../htmlEncode'
import { htmlDecode } from '../htmlDecode'
import { splitToKeys } from '../splitToKeys'

describe('transform naming string', () => {
  test('splitToKeys', () => {
    const words = splitToKeys('a[0].b.c')
    const ans = ['a', '0', 'b', 'c']

    expect(words.length).eq(ans.length)
    words.forEach((item, i) => {
      expect(item).eq(ans[i])
    })
  })
  test('splitToWords', () => {
    const words = splitToWords('-_i need 123XmlHTTPRequest -_')
    const ans = ['i', 'need', '123', 'Xml', 'HTTP', 'Request']

    expect(words.length).eq(ans.length)
    words.forEach((item, i) => {
      expect(item).eq(ans[i])
    })
  })
  test('camelCase', () => {
    expect(camelCase('HelloWorld')).eq('helloWorld')
    expect(camelCase('helloWorld')).eq('helloWorld')
    expect(camelCase('hello-world')).eq('helloWorld')
    expect(camelCase('hello_world')).eq('helloWorld')
    expect(camelCase('HELLO_WORLD')).eq('helloWorld')
    expect(camelCase('Hello World')).eq('helloWorld')
    expect(camelCase('-_HELLO World -_')).eq('helloWorld')
  })
  test('kebabCase', () => {
    expect(kebabCase('HelloWorld')).eq('hello-world')
    expect(kebabCase('helloWorld')).eq('hello-world')
    expect(kebabCase('hello-world')).eq('hello-world')
    expect(kebabCase('hello_world')).eq('hello-world')
    expect(kebabCase('HELLO_WORLD')).eq('hello-world')
    expect(kebabCase('Hello World')).eq('hello-world')
    expect(kebabCase('-_HELLO World -_')).eq('hello-world')
  })
  test('pascalCase', () => {
    expect(pascalCase('HelloWorld')).eq('HelloWorld')
    expect(pascalCase('helloWorld')).eq('HelloWorld')
    expect(pascalCase('hello-world')).eq('HelloWorld')
    expect(pascalCase('hello_world')).eq('HelloWorld')
    expect(pascalCase('HELLO_WORLD')).eq('HelloWorld')
    expect(pascalCase('Hello World')).eq('HelloWorld')
    expect(pascalCase('-_HELLO World -_')).eq('HelloWorld')
  })
  test('snakeCase', () => {
    expect(snakeCase('HelloWorld')).eq('hello_world')
    expect(snakeCase('helloWorld')).eq('hello_world')
    expect(snakeCase('hello-world')).eq('hello_world')
    expect(snakeCase('hello_world')).eq('hello_world')
    expect(snakeCase('HELLO_WORLD')).eq('hello_world')
    expect(snakeCase('Hello World')).eq('hello_world')
    expect(snakeCase('-_HELLO World -_')).eq('hello_world')
  })
  test('upperSnakeCase', () => {
    expect(upperSnakeCase('HelloWorld')).eq('HELLO_WORLD')
    expect(upperSnakeCase('helloWorld')).eq('HELLO_WORLD')
    expect(upperSnakeCase('hello-world')).eq('HELLO_WORLD')
    expect(upperSnakeCase('hello_world')).eq('HELLO_WORLD')
    expect(upperSnakeCase('HELLO_WORLD')).eq('HELLO_WORLD')
    expect(upperSnakeCase('Hello World')).eq('HELLO_WORLD')
    expect(upperSnakeCase('-_HELLO World -_')).eq('HELLO_WORLD')
  })
  test('capitalize', () => {
    expect(capitalize('HelloWorld')).eq('Helloworld')
  })
  test('titleCase', () => {
    expect(titleCase('HelloWorld')).eq('Hello World')
    expect(titleCase('helloWorld')).eq('Hello World')
    expect(titleCase('hello-world')).eq('Hello World')
    expect(titleCase('hello_world')).eq('Hello World')
    expect(titleCase('HELLO_WORLD')).eq('Hello World')
    expect(titleCase('Hello World')).eq('Hello World')
    expect(titleCase('-_HELLO World -_')).eq('Hello World')
  })
  test('htmlEncode', () => {
    expect(htmlEncode("'test'")).eq('&#39;test&#39;')
    expect(htmlEncode('"test"')).eq('&quot;test&quot;')
    expect(htmlEncode('<img/>')).eq('&lt;img/&gt;')
    expect(htmlEncode('talk & code')).eq('talk &amp; code')
  })
  test('htmlDecode', () => {
    expect(htmlDecode('&#39;test&#39;')).eq("'test'")
    expect(htmlDecode('&quot;test&quot;')).eq('"test"')
    expect(htmlDecode('&lt;img/&gt;')).eq('<img/>')
    expect(htmlDecode('talk &amp; code')).eq('talk & code')
  })
})
