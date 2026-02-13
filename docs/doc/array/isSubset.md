# isSubset
[[[desc isSubset
  
]]]
[[[desc isSubset ja
2つの配列 `arr1` と `arr2` を入力し、`arr1` が `arr2` のサブセットであるかどうかを返します。

`getter` を受け付けます。これは [getByPath](../object/getByPath) のフィールドパスまたはコールバック関数で、要素を区別するための識別子を提供するために使用されます。
]]]
[[[desc isSubset zh
输入两个数组 `arr1` 和 `arr2`，返回 `arr1` 是否为 `arr2` 的子集。

接受一个 `getter` 参数，可以是 [getByPath](../object/getByPath) 的字段路径或回调函数，用于提供标识符以区分元素。
]]]
[[[version isSubset
  
]]]

### Usage

[[[demo]]]


### API

#### Type Parameter

[[[template isSubset

]]]
[[[template isSubset ja
T: T 入力配列の要素の型
]]]
[[[template isSubset zh
T: 输入数组元素的类型
]]]

#### Arguments

[[[params isSubset

]]]
[[[params isSubset ja
arr1: チェック対象のサブセット配列
arr2: チェック対象のスーパーセット配列
getter: 要素を区別するための識別子を提供します
]]]
[[[params isSubset zh
arr1: 待检查的子集数组
arr2: 待检查的超集数组
getter: 元素的唯一标识
]]]

#### Returns

[[[returns isSubset

]]]
