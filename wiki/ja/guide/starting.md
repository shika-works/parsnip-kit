# インストール
お好みのパッケージマネージャーをお選びください。
::: code-group
```sh [npm]
npm install parsnip-kit
```

```sh [yarn]
yarn parsnip-kit
```

```sh [pnpm]
pnpm install parsnip-kit
```

```sh [bun]
bun install parsnip-kit
```
:::
# 互換性

Parsnip Kit は、以下の環境で実行をサポートしています：

|<img src="/js_logo.png" width="32px" height="32px"/>ECMAScript|<img src="/edge_logo.svg" width="32px" height="32px"/>Edge|<img src="/firefox_logo.svg" width="32px" height="32px"/>Firefox|<img src="/chrome_logo.svg" width="32px" height="32px"/>Chrome|<img src="/safari_logo.svg" width="32px" height="32px"/>Safari|
|-|-|-|-|-|
|≥2020|≥88|≥78|≥87|≥14|

古いバージョンのブラウザをサポートする必要がある場合は、[Babel](https://babeljs.io/) と対応する Polyfill を手動で追加してください。

# LLMs

[llms.txt](/llms.txt)

[llms-full.txt](/llms-full.txt)

# 使用例
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