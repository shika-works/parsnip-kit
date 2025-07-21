# isEqual
[[[desc isEqual
]]]
[[[desc isEqual zh
输入两个参数`arg1`和`arg2`，执行深比较检查它们每个属性，返回它们是否相等，不支持循环引用。

支持基本类型、普通对象（`arg => Object.prototype.toString.apply(arg).slice(8, -1)`返回`"Object"`），以及包括这些在内的内置对象：`Array`、`Map`、`Set`、`Date`、`RegExp`。

对于不支持的内置对象，例如`Blob`、`File`、`Error`、`Function`、`Promise`、`HTMLElement`等等，将调用 [isEqualStrict](../object/isEqualStrict) 进行严格比较。

对于普通对象，仅检查它们的可枚举属性，不会检查原型链。

支持深比较的内置对象：

|分类|支持的对象|
|-|-|
|包装类|`String` `Number` `Boolean`|
|集合类型|`Object` `Array` `Map` `Set`|
|时间日期|`Date`|
|正则表达式|`RegExp`|
|文件和流| `ArrayBuffer`|
|`TypedArray `|`Int8Array` `Uint8Array` `Uint8ClampedArray` `Int16Array` `Uint16Array` `Int32Array` `Uint32Array` `Float32Array` `Float64Array` `BigInt64Array` `BigUint64Array`|
]]]
[[[desc isEqual ja
2つのパラメータ `arg1` と `arg2` を入力し、それぞれのプロパティを深く比較して、等しいかどうかを返します。

基本型、プレーンオブジェクト（`arg => Object.prototype.toString.apply(arg).slice(8, -1)` の結果が `"Object"` を返す）、および `Array`、`Map`、`Set`、`Date`、`RegExp` を含む組み込みオブジェクトをサポートします。

`Blob`、`File`、`Error`、`Function`、`Promise`、`HTMLElement` などのサポートされていない組み込みオブジェクトの場合、厳格な比較のため `isEqualStrict` が呼び出されます。

プレーンオブジェクトの場合、列挙可能なプロパティのみがチェックされ、プロトタイプチェーンは検査されません。

深く比較がサポートされている組み込みオブジェクト:
|カテゴリ|サポートされているオブジェクト|
|-|-|
|ラッパークラス|`String` `Number` `Boolean`|
|コレクションタイプ|`Object` `Array` `Map` `Set`|
|日付と時刻|`Date`|
|正規表現|`RegExp`|
|ファイルとストリーム| `ArrayBuffer`|
|`TypedArray`|`Int8Array` `Uint8Array` `Uint8ClampedArray` `Int16Array` `Uint16Array` `Int32Array` `Uint32Array` `Float32Array` `Float64Array` `BigInt64Array` `BigUint64Array`|
]]]

[[[version isEqual
  
]]]
### Usage

[[[demo]]]


### API

#### Arguments
[[[params isEqual

]]]
#### Returns
[[[returns isEqual

]]]