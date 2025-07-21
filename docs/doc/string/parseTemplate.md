# parseTemplate
[[[desc parseTemplate
  
]]]
[[[desc parseTemplate zh
  解析模板字符串 `template`，并根据 `parser` 将占位的字符串替换为实际值。

  `parser` 可以是函数或非函数对象。如果是函数，则需要将传入匹配的模式字符串转化为实际值。如果是非函数的对象，将以 `parser` 和模式串为参数，调用函数 [getByPath](../object/getByPath) 获取替换的实际值。

  如果实际值为 `undefined` 或者 `null`，将保留占位的模式字符串。

  可选参数 `options` 用于设置模式字符串的开始和结束分隔符。
]]]
[[[desc parseTemplate ja
  テンプレート文字列 `template` を解析し、`parser`に基づいてプレースホルダーを実際の値に置き換えます。

  `parser` は関数または非関数オブジェクトのいずれかです。
  
  `parser` が関数の場合、マッチしたパターン文字列を引数として呼び出し、置き換える实际の値を返す必要があります。

  `parser` が非関数オブジェクトの場合、[getByPath](../object/getByPath) を使用し、`parser` とマッチしたパターン文字列を引数として使用します。返り値がパターンを置き換えます。

  置き換える实际の値が `undefined` または `null` の場合、パターン文字列を保持します。

  オプションの `options` を使って、パターン文字列の開始と終了のデリミタを設定できます。
]]]
[[[version parseTemplate
  
]]]

### Usage

[[[demo]]]


### API

#### Type Parameter

[[[template parseTemplate

]]]

#### Arguments

[[[params parseTemplate

]]]
[[[params parseTemplate zh
template: 要替换的模板
parser: 用于将占位符替换为实际值
options: 用于设置分隔符
options.start: 用于设置起始分隔符
options.end: 用于设置结束分隔符
]]]
[[[params parseTemplate ja
template: 置き換えるテンプレート
parser: プレースホルダーを実際の値に置き換える
options: デリミタを設定する
options.start: 開始デリミタを設定する
options.end: 終了デリミタを設定する
]]]

#### Returns

[[[returns parseTemplate

]]]

#### Reference

[ObjectLike](../common/types#objectlike)
