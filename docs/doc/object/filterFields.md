# filterFields
[[[desc filterFields
]]]
[[[desc filterFields zh
输入一个对象`obj`和迭代器`iterator`，遍历对象的每个字段，对每个字段的值执行`iterator`，返回值`== false`则移除该字段，返回新的普通对象或数组。
]]]
[[[desc filterFields ja
オブジェクト `obj` とイテレータ `iterator` を入力し、オブジェクトの各フィールドをイテレートし、各フィールドの値に対して `iterator` を実行します。戻り値が `== false` の場合、フィールドを削除し、新しいプレーンオブジェクトまたは配列を返します。
]]]

[[[version filterFields
  
]]]
### Usage

[[[demo]]]


### API

#### Type Parameter
[[[template filterFields

]]]
[[[template filterFields zh
T:待遍历的对象的类型
]]]
[[[template filterFields ja
T:イテレートするオブジェクトの型
]]]
#### Arguments
[[[params filterFields

]]]
[[[params filterFields zh
iterator:迭代器函数
obj:待遍历的对象
]]]
[[[params filterFields ja
obj :イテレートするオブジェクト
iterator :イテレータ関数
]]]
#### Returns
[[[returns filterFields

]]]