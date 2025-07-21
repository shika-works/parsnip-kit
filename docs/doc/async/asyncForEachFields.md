# asyncForEachFields

[[[desc asyncForEachFields

]]]
[[[desc asyncForEachFields zh
输入一个对象`obj`和迭代器`iterator`，遍历对象的每个字段，对每个字段的值执行`iterator`。

`iterator`支持`async`函数，或者`Promise`返回值。`concurrent`可选参数控制是否并发调用，若值为`'sequential'`，当前一个`iterator`返回的`Promise`为 fulfilled 或者 rejected 后，才会执行新的`iterator`。
]]]

[[[version asyncForEachFields
  
]]]

### Usage

[[[demo]]]


### API

#### Type Parameter

[[[template asyncForEachFields

]]]
[[[template asyncForEachFields zh
T:对象类型
R:并发类型
]]]

#### Arguments

[[[params asyncForEachFields

]]]
[[[params asyncForEachFields zh
obj:待遍历的对象
iterator:迭代器函数
concurrent:并发类型
]]]

#### Returns

[[[returns asyncForEachFields

]]]