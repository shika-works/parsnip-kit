# <center> Parsnip-Kit </center>

[![TypeScript](https://img.shields.io/badge/TypeScript-v5.7.2-blue)](https://www.typescriptlang.org/) [![Vite](https://img.shields.io/badge/Vite-v6.1.0-7D85FF)](https://vite.dev/) [![MIT License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Parsnip-Kit is a zero-dependency JavaScript utility library that supports TypeScript. It provides a collection of practical utility functions to help developers handle common programming tasks more efficiently.

Two-factor authentication was lost, forcing an account reincarnation; the [Parsnip-Kit](https://github.com/shika-space/parsnip-kit) project will continue to be maintained in this repository.

[API Document](https://shika-works.github.io/parsnip-kit/)
[Npm](https://www.npmjs.com/package/parsnip-kit/)

## Language Versions
- [中文](README.zh.md)
- [English](README.md)
- [日本語](README.ja.md)

## Installation
```sh
npm install parsnip-kit
```

## Features
1. **🧳 Zero Dependencies**: Lightweight and efficient with no external dependencies, making it suitable for projects of any size.
2. **🔩 Multi-functional**: Supports modules such as array, object, string, type checking, asynchronous operation, function, and statistic. Adds functions that developers have been eager for.
3. **💡 Type-friendly**: Written in TypeScript, providing accurate and complete type hints to enhance the development experience and code quality.
4. **🚀 Modern**: Built with modern JavaScript APIs, it aims to provide developers with commonly used utility functions that are not yet natively supported.
5. **📦 Modular**: Supports ES6 modularization and tree-shaking.
6. **🛠️ Easy to Maintain**: Has comprehensive unit tests and coding standards, and is equipped with automated document generation and a document site project, making it easy for subsequent expansion and maintenance.

## Overview

Here's an overview of the tool functions provided by Parsnip-Kit:
- Object: For manipulating JavaScript objects, such as `cloneDeep`, `isEqual`, `getByPath`.
- Array: For manipulating arrays, such as `unique`, `intersection`, `lexSort` and `numberSort`.
- Statistic: For descriptive statistics in JavaScript, including `sum`, `maxItem` and `minItem`.
- Number: For processing numbers, such as `range`, `thousandSeparator` and `percent`.
- Function: Functions for handling function parameters, returns, and logic, such as: `debounce`, `throttle`, `combine` and `curry`.
- Async: Focused on asynchronous process handling, such as `concurrent`, `retry` and `asyncForEach`.
- String: String tool functions, such as `camelCase`, `snakeCase` and `htmlEncode`.
- Typed: For checking the type of input parameters, including `isPrimitive`, `isNanValue` and `getTypeTag`.
- Random: Generates random data, including `randomNumber`, `randomString` and `randomFromArray`.

## Use Cases
Parsnip-Kit is designed for various JavaScript and TypeScript projects, from small tools to large applications. It aims to provide concise and efficient utility functions to save developers' time and effort.

```typescript
import {
  sum,
  median,
  average,
  pairsToObject,
  leftJoin,
  getByPath,
  omit,
  pick
} from 'parsnip-kit'

const data = [
  {
    id: 13, name: 'Alice', email: 'alice@example.test',
    blog: { count: 15, fans: 45 }
  },
  {
    id: 18, name: 'Bob', email: 'bob@example.test',
    blog: { count: 55, fans: 1546 }
  },
  {
    id: 35, name: 'Carlin', email: 'carlin@example.test',
    blog: { count: 116, fans: 56563 }
  }
]
const profile = [
  { id: 13, age: 44, nickname: 'coding neko' },
  { id: 18, age: 30, nickname: 'kurisutina' },
  { id: 35, age: 23, nickname: 'Bug Engineer' }
]

average(data, 'blog.count') // 62
sum(data, 'blog.count') // 186
median(data, 'blog.count') // 55

pairsToObject(data, 'name', 'blog.fans')
// { Alice: 45, Bob: 1546, Carlin: 56563 }

getByPath(data, '[0].email')
// 'alice@example.test'

omit(data[0], ['blog'])
// { id: 13, name: 'Alice', email: 'alice@example.test' }
pick(data[0], ['id', 'name', 'blog'])
// { id: 13, name: 'Alice', blog: { count: 15, fans: 45 } }

leftJoin(data, profile, 'id', 'id', (a, b) => ({...a, ...b}))
// [
//   {
//     id: 13, name: 'Alice', email: 'alice@example.test',
//     age: 30, nickname: 'kurisutina',
//     blog: { count: 15, fans: 45 }
//   },
//   {
//     id: 18, name: 'Bob', email: 'bob@example.test',
//     age: 30, nickname: 'kurisutina',
//     blog: { count: 55, fans: 1546 }
//   },
//   {
//     id: 35, name: 'Carlin', email: 'carlin@example.test',
//     age: 23, nickname: 'Bug Engineer',
//     blog: { count: 116, fans: 56563 }
//   }
// ]
```

## Documentation & Support
- **Documentation**: [View Documentation](https://shika-works.github.io/parsnip-kit/) to learn more about the features and usage.
- **Support**: Encountered issues during use? Feel free to submit [Issues](https://github.com/shika-works/parsnip-kit/issues) or [Pull Requests](https://github.com/shika-works/parsnip-kit/pulls).

## License
Parsnip-Kit is licensed under the [MIT License](LICENSE). See the [LICENSE](LICENSE) file for details.

---

Thank you for using Parsnip-Kit!