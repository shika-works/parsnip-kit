# mapFields
[[[desc mapFields
  
]]]
[[[desc mapFields zh
接收一个 `obj` 对象和 `mapper` 函数，遍历对象每一个字段，返回一个以 `mapper` 返回值为 value 的新对象。
]]]
[[[desc mapFields ja
`obj` オブジェクトと `mapper` `関数を受け取り、オブジェクトの各フィールドを反復処理して、mapper` の戻り値を値とする新しいオブジェクトを返します。
]]]
[[[version mapFields
  
]]]

### Usage

[[[demo]]]


### API

#### Type Parameter

[[[template mapFields

]]]
[[[template mapFields zh
T: 对象类型
V: 迭代器函数的返回类型
]]]
[[[template mapFields ja
T: オブジェクト型
V: イテレータ関数の戻り型
]]]

#### Arguments

[[[params mapFields

]]]
[[[params mapFields zh
obj: 要遍历的对象
mapper: 迭代器函数
]]]
[[[params mapFields ja
obj: 反復するオブジェクト
mapper: イテレータ関数
]]]

#### Returns

[[[returns mapFields

]]]
