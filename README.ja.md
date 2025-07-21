# <center> Parsnip-Kit </center>

[![TypeScript](https://img.shields.io/badge/TypeScript-v5.7.2-blue)](https://www.typescriptlang.org/) [![Vite](https://img.shields.io/badge/Vite-v6.1.0-7D85FF)](https://vite.dev/) [![MIT License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Parsnip-Kit は TypeScript 対応のゼロ依存 JavaScript ユーティリティライブラリです。開発者が一般的なプログラミングタスクをより効率的に処理できるように、実用的なユーティリティ関数のコレクションを提供します。

二要素認証を紛失したため、アカウント転生を余儀なくされました。[Parsnip-Kit](https://github.com/shika-works/parsnip-kit) プロジェクトはこのリポジトリで引き続きメンテナンスされます。

[API ドキュメント](https://shika-space.github.io/parsnip-kit/)
[Npm](https://www.npmjs.com/package/parsnip-kit/)

## 言語バージョン
- [中文](README.zh.md)
- [English](README.md)
- [日本語](README.ja.md)

## インストール
```sh 
npm install parsnip-kit
```


## 特徴
1. **🧳 ゼロ依存**: 依存ライブラリがなく、軽量で効率的です。あらゆるサイズのプロジェクトに適しています。
2. **🔩 多機能**: 配列、オブジェクト、文字列、型判定、非同期処理、関数、統計などのモジュールをサポートします。開発者が強く望んでいたツール関数を追加し、開発の要件を満たします。
3. **💡 型友好**: TypeScript を使用して書かれており、正確で完全な型ヒントを提供し、開発体験とコード品質を向上させます。
4. **🚀 モダン化**: 現代の JavaScript API を基に構築されており、デベロッパーや開発者向けに、まだネイティブでサポートされていない一般的なツール関数を提供することを目的としています。
5. **📦 モジュラー**: ES6モジュール化に対応し、Tree-shakingもサポートしています。
6. **🛠️ 簡単メンテナンス**: 充実したユニットテストとコーディングルールが整っており、自動的なドキュメント生成とドキュメントサイトプロジェクトが装備されているため、拡張とメンテナンスが容易です。

## 概要
以下は Parsnip-Kit が提供するツール関数の概要です：
- Object: JavaScript オブジェクトを操作するツール関数。例：`cloneDeep`、`isEqual`、`getByPath`。
- Array: 配列を操作するツール関数。例：`unique`、`intersection`、`lexSort` と `numberSort`。
- Statistic: JavaScript で記述統計を行うツール関数。`sum`、`maxItem` と `minItem` を含む。
- Number: 数値を処理するツール関数。例：`range`、`thousandSeparator` と `percent`。
- Function: 関数の入参、戻り値、ロジックを処理する関数。例：`debounce`、`throttle`、`combine` と `curry`。
- Async: 非同期プロセスを処理するツール関数。例：`camelCase`、`snakeCase` と `htmlEncode`。
- String: 文字列のツール関数。例：`camelCase`、`snakeCase` と `htmlEncode`。
- Typed: 入参の型を判断するための関数。例： `isPrimitive`、`isNanValue` と `getTypeTag`。
- Random: ランダムなデータを生成する。例：`randomNumber`、`randomString` と `randomFromArray`。

## 使用シーン
Parsnip-Kit は、小型ツールから大型アプリケーションまで、さまざまな JavaScript および TypeScript プロジェクトに適しています。開発者の時間を節約し、労力を軽減するための簡潔で効率的なユーティリティ関数を提供することを目指しています。

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

## ドキュメントとサポート
- **ドキュメント**: [ドキュメントを参照](https://shika-works.github.io/parsnip-kit/)して、機能と使用方法の詳細を学ぶことができます。
- **サポート**: 使用中に問題が発生した場合は、[Issue](https://github.com/shika-works/parsnip-kit/issues) または [Pull Request](https://github.com/shika-works/parsnip-kit/pulls) を提出してください。

## ライセンス
Parsnip-Kit は [MIT ライセンス](LICENSE) の下で提供されています。詳細は [LICENSE](LICENSE) ファイルを参照してください。

---

Parsnip-Kit の使用ありがとうございます！