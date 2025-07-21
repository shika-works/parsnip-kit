# sortWithIndex
[[[desc sortWithIndex
  
]]]
[[[desc sortWithIndex zh
  输入一个数组 `arr`，对 `arr` 进行排序，并返回一个数组，表示原数组的索引到排序后数组的索引的映射。

  内部将会调用 [sortIndex](./sortIndex.md) 函数。

  需要注意的是，数组 `arr` 自身会被排序！

  可选参数自定义比较器 `comparator`，默认比较逻辑将与原生 `sort` 方法相同。
]]]
[[[desc sortWithIndex ja
  配列 `arr` を入力として受け取り、`arr` をソートし、元の配列のインデックスからソート後の配列のインデックスへのマッピングを表す配列を返します。

  内部で [sortIndex](./sortIndex.md) 関数を呼び出します。

  配列 `arr` 自体がソートされることに注意してください！

  カスタム比較関数 `comparator` を指定できます。指定しない場合、比較論理はネイティブの `sort` と同じになります。
]]]
[[[version sortWithIndex
  
]]]

### Usage

[[[demo]]]


### API

#### Type Parameter

[[[template sortWithIndex

]]]
[[[template sortWithIndex zh
T: 数组元素类型
]]]
[[[template sortWithIndex ja
T: 配列の要素の型
]]]

#### Arguments

[[[params sortWithIndex

]]]
[[[params sortWithIndex zh
arr: 要排序的数组
comparator:比较器
]]]
[[[params sortWithIndex ja
arr: ソートする配列
comparator:ソート用の比較関数
]]]

#### Returns

[[[returns sortWithIndex

]]]
