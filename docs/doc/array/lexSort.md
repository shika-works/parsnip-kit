# lexSort
[[[desc lexSort
]]]
[[[desc lexSort zh
输入参数 `arr`，根据字典序对其进行排序，参数 `order` 指定排序顺序。

`order` 可以是 `'asc'`（升序）或者 `desc`（降序），默认为 `'asc'`。内部会调用 [stringComparatorAsc](../common/constants#stringcomparatorasc) 或者 [stringComparatorDesc](../common/constants#stringcomparatordesc)。

可选参数 `getter` 用于从数组 `arr` 的元素中获取字符串值，默认情况下直接使用元素本身进行排序。`getter`值为 [getByPath](../object/getByPath) 函数的字段路径，或者回调函数。
]]]
[[[desc lexSort ja
  パラメータ `order` で指定された順序に従って、パラメータ `arr` を辞書順にソートします。デフォルトの順序は `'asc'` （昇順）です。

  `order` パラメータには、`'asc'` （昇順）または `'desc'` （降順）を指定できます。内部で [stringComparatorAsc](../common/constants#stringcomparatorasc) または [stringComparatorDesc](../common/constants#stringcomparatordesc) を呼び出します。

  オプションの `getter` パラメータは、配列 `arr` の各要素から文字列値を取得するために使用され、デフォルトでは要素そのものがソートに使われます。

  `getter` は、[getByPath](../object/getByPath) のフィールドパスまたはコールバック関数として指定可能です。
]]]
[[[version lexSort
  
]]]

### Usage

[[[demo]]]


### API

#### Type Parameter

[[[template lexSort
]]]
[[[template lexSort zh
T: 数组元素类型
R: 排序顺序的类型
]]]
[[[template lexSort ja
T:配列の要素の型
R:ソートの順序の型
]]]

#### Arguments

[[[params lexSort
]]]
[[[params lexSort zh
arr:待排序数组
order:排序的顺序
getter:用于获取字符串值
]]]
[[[params lexSort ja
arr: ソート対象の配列
order: ソートの順序
getter: 配列要素から文字列値を取得するもの
]]]

#### Returns

[[[returns lexSort

]]]
