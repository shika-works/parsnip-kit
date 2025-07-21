# withFallback
[[[desc withFallback
  
]]]
[[[desc withFallback zh
  返回一个新函数，内部调用 `func` 并返回，如果返回值是 `null` 或者 `undefined`，则返回 `defaultValue`。
]]]
[[[desc withFallback ja
  この関数は、`func` の結果を返すか、結果が `null` または `undefined` の場合にデフォルト値 `defaultValue` を返す新しい関数を返します。
]]]
[[[version withFallback
  
]]]

### Usage

[[[demo]]]


### API

#### Type Parameter

[[[template withFallback

]]]
[[[template withFallback zh
T:函数类型
R:默认值类型
]]]
[[[template withFallback ja
T:関数型
R:デフォルト値の型
]]]

#### Arguments

[[[params withFallback

]]]
[[[params withFallback zh
func:带有默认返回值的函数
defaultValue: 默认值
]]]
[[[params withFallback ja
func:デフォルトの戻り値を持つ関数
defaultValue:デフォルト値
]]]

#### Returns

[[[returns withFallback

]]]
#### Reference

[WithFallback](../common/types#withfallback)