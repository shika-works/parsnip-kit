[[[slice zh
# 什么是 Parsnip-Kit ？

Parsnip-Kit 是一个零依赖、多功能、模块化的 JavaScript 工具库，支持 TypeScript。

它提供涵盖了类型检查、数组、对象、字符串、函数、异步、数字、统计、随机数等方面的工具函数，覆盖开发中的大部分需求，让我们的应用减少模板代码，增加可维护性。

Parsnip-Kit 使用现代 JavaScript API 编写，所有工具函数都支持 TypeScript 类型，不管是开发应用还是阅读源码，都能带给开发者清新的体验。

# 函数概览

以下是 Parsnip-Kit 提供的工具函数概览：
- Object: 操作 JavaScript 对象的工具函数，如 [cloneDeep](../object/cloneDeep)、[isEqual](../object/isEqual)、[getByPath](../object/getByPath)。
- Array: 操作数组的工具函数，如 [unique](../array/unique)、[intersection](../array/intersection)、[lexSort](../array/lexSort) 和 [numberSort](../array/numberSort)。
- Statistic: 在 JavaScript 中进行描述统计的工具函数，包括 [sum](../statistic/sum)、[maxItem](../statistic/maxItem) 和 [minItem](../statistic/minItem)。
- Number: 处理数值的工具函数，如 [range](../number/range)、[thousandSeparator](../number/thousandSeparator) 和 [percent](../number/percent)。
- Function: 处理函数入参、返回和行为的函数，如 [debounce](../function/debounce)、[throttle](../function/throttle)、[combine](../function/combine) 和 [curry](../function/curry)。
- Async: 专注于处理异步流程处理的工具函数，如 [concurrent](../async/concurrent)、[retry](../async/retry) 和 [asyncForEach](../async/asyncForEach)。
- String: 字符串工具函数，如 [camelCase](../string/camelCase)、[snakeCase](../string/snakeCase) 和 [htmlEncode](../string/htmlEncode)。
- Typed: 用于判断入参类型，包括 [isPrimitive](../typed/isPrimitive)、[isNanValue](../typed/isNanValue) 和 [getTypeTag](../typed/getTypeTag)。
- Random: 生成随机数据，包括 [randomNumber](../random/randomNumber)、[randomString](../random/randomString) 和 [randomFromArray](../random/randomFromArray)。

![](/overview.svg)

]]]
[[[slice ja
# Parsnip-Kit とは？

Parsnip-Kit は、ゼロディペンダシ、マルチファンクション、モジュラライズされた JavaScript ユーティリティライブラリで、TypeScript をサポートしています。

このライブラリは、型チェック、配列、オブジェクト、文字列、関数、非同期処理、数値、統計、ランダムなど、開発におけるほとんどのニーズをカバーするツール関数を提供します。これにより、アプリケーションにおけるテンプレートコードを削減し、保守性を向上させることができます。

Parsnip-Kit は、モダンな JavaScript API を使用して書かれており、すべてのツール関数が TypeScript の型定義をサポートしています。アプリケーションの開発やソースコードの閲覧において、開発者に快適な体験を提供します。

# 概要

以下は Parsnip-Kit が提供するツール関数の概要です：
- Object: JavaScript オブジェクトを操作するツール関数。例：[cloneDeep](../object/cloneDeep)、[isEqual](../object/isEqual)、[getByPath](../object/getByPath)。
- Array: 配列を操作するツール関数。例：[unique](../array/unique)、[intersection](../array/intersection)、[lexSort](../array/lexSort) と [numberSort](../array/numberSort)。
- Statistic: JavaScript で記述統計を行うツール関数。[sum](../statistic/sum)、[maxItem](../statistic/maxItem) と [minItem](../statistic/minItem) を含む。
- Number: 数値を処理するツール関数。例：[range](../number/range)、[thousandSeparator](../number/thousandSeparator) と [percent](../number/percent)。
- Function: 関数の入参、戻り値、ロジックを処理する関数。例：[debounce](../function/debounce)、[throttle](../function/throttle)、[combine](../function/combine) と [curry](../function/curry)。
- Async: 非同期プロセスを処理するツール関数。例：[concurrent](../async/concurrent)、[retry](../async/retry) と [asyncForEach](../async/asyncForEach)。
- String: 文字列のツール関数。例：[camelCase](../string/camelCase)、[snakeCase](../string/snakeCase) と [htmlEncode](../string/htmlEncode)。
- Typed: 入参の型を判断するための関数。例：[isPrimitive](../typed/isPrimitive)、[isNanValue](../typed/isNanValue) と [getTypeTag](../typed/getTypeTag)。
- Random: ランダムなデータを生成する。例：[randomNumber](../random/randomNumber)、[randomString](../random/randomString) と [randomFromArray](../random/randomFromArray)。

![](/overview.svg)

]]]
[[[slice
# What is Parsnip-Kit?

Parsnip-Kit is a zero-dependency, multi-functional, modular JavaScript utility library that supports TypeScript.

It provides a wide range of utility functions covering type checking, arrays, objects, strings, functions, asynchronous operations, numbers, statistics, and random numbers, meeting most development needs and reducing boilerplate code in our applications while increasing maintainability.

Written using modern JavaScript APIs, Parsnip-Kit supports TypeScript types for all utility functions, offering developers a refreshing experience whether they are developing applications or reading the source code.

# Overview

Here's an overview of the tool functions provided by Parsnip-Kit:
- Object: For manipulating JavaScript objects, such as [cloneDeep](../object/cloneDeep), [isEqual](../object/isEqual), [getByPath](../object/getByPath).
- Array: For manipulating arrays, such as [unique](../array/unique), [intersection](../array/intersection), [lexSort](../array/lexSort) and [numberSort](../array/numberSort).
- Statistic: For descriptive statistics in JavaScript, including [sum](../statistic/sum), [maxItem](../statistic/maxItem) and [minItem](../statistic/minItem).
- Number: For processing numbers, such as [range](../number/range), [thousandSeparator](../number/thousandSeparator) and [percent](../number/percent).
- Function: Functions for handling function parameters, returns, and logic, such as: [debounce](../function/debounce), [throttle](../function/throttle), [combine](../function/combine) and [curry](../function/curry).
- Async: Focused on asynchronous process handling, such as [concurrent](../async/concurrent), [retry](../async/retry) and [asyncForEach](../async/asyncForEach).
- String: String tool functions, such as [camelCase](../string/camelCase), [snakeCase](../string/snakeCase) and [htmlEncode](../string/htmlEncode).
- Typed: For checking the type of input parameters, including [isPrimitive](../typed/isPrimitive), [isNanValue](../typed/isNanValue) and [getTypeTag](../typed/getTypeTag).
- Random: Generates random data, including [randomNumber](../random/randomNumber), [randomString](../random/randomString) and [randomFromArray](../random/randomFromArray).

![](/overview.svg)

]]]