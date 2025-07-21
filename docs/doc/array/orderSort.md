# orderSort
[[[desc orderSort
  
]]]
[[[desc orderSort zh
  根据指定的顺序 `order` 对数组 `arr` 进行排序。

  `getter` 是一个将数组 `arr` 的元素转换为可用于排序的 key 的函数，它可以是 [getByPath](../object/getByPath) 的字段路径或一个函数。如果未提供 `getter`，`orderSort` 将使用数组 `arr` 的元素本身作为排序的 key。

  不在 `order` 数组中的元素将保持它们原来的顺序排在末尾。
]]]
[[[desc orderSort ja
  指定された順序 `order` に基づいて、配列 `arr` をソートします。

  `getter` は、配列 `arr` の要素をソートに使用できるキーに変換する関数であり、[getByPath](../object/getByPath) のフィールドパスまたは関数です。

  `getter` が提供されない場合、`orderSort` は配列 `arr` の要素自体をソートのキーとして使用します。

  `order` 配列にない要素は、元の相対的な順序を維持したまま、末尾に配置されます。
]]]
[[[version orderSort
  
]]]

### Usage

[[[demo]]]


### API

#### Type Parameter

[[[template orderSort

]]]
[[[template orderSort zh
T:要排序的数组元素类型
]]]
[[[template orderSort ja
T:ソートする配列の要素の型
]]]

#### Arguments

[[[params orderSort

]]]
[[[params orderSort zh
arr: 要排序的数组
order: 指定期望顺序的数组
getter: 将数组的元素转换为可用于排序的 key
]]]
[[[params orderSort ja
arr: ソートする配列
order: 望ましい順序を指定する配列
getter: 配列の要素をソートに使用できるキーに変換します
]]]

#### Returns

[[[returns orderSort

]]]
