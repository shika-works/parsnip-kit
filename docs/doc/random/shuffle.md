# shuffle
[[[desc shuffle
  
]]]
[[[desc shuffle zh
接收数组 `arr`，返回一个随机打乱顺序的新数组。

参数 `notFixedPoint` 用于控制是否强制所有元素在打乱后离开其原始位置。
- 若为 `false`（默认），使用 Fisher-Yates 算法（允许元素可能留在原位）。
- 若为 `true`，使用 Sattolo 算法（确保每个元素都不在原位）。
]]]
[[[desc shuffle ja
配列 `arr` を受け取り、要素をランダムにシャッフルした新しい配列を返します。

パラメータ `notFixedPoint` は、シャッフル後にすべての要素が元の位置から移動することを強制するかどうかを制御します。
- `false`（デフォルト）の場合、Fisher-Yates アルゴリズムを使用します（要素は元の位置に残る可能性があります）。
- `true` の場合、Sattolo アルゴリズムを使用します（すべての要素が元の位置に残らないことを保証します）。
]]]
[[[version shuffle
  
]]]

### Usage

[[[demo]]]


### API

#### Type Parameter

[[[template shuffle

]]]
[[[template shuffle zh
T: 输入数组的元素类型
]]]
[[[template shuffle ja
T: 入力配列の要素型
]]]

#### Arguments

[[[params shuffle

]]]
[[[params shuffle zh
arr: 待洗牌的输入数组
noFixedPoint: 是否确保所有元素均不在原始位置
]]]
[[[params shuffle ja
arr: シャッフル対象の入力配列
noFixedPoint: 全要素を元の位置から移動させるか否か
]]]

#### Returns

[[[returns shuffle

]]]
