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
