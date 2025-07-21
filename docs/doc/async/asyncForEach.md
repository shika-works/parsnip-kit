# asyncForEach

[[[desc asyncForEach

]]]
[[[desc asyncForEach zh
输入一个数组`array`和迭代器`iterator`，遍历对象的每个元素，对每个元素执行`iterator`。

`iterator`支持`async`函数，或者`Promise`返回值。`concurrent`可选参数控制是否并发调用，若值为`'sequential'`，当前一个`iterator`返回的`Promise`为 fulfilled 或者 rejected 后，才会执行新的`iterator`。
]]]

[[[version asyncForEach
  
]]]

### Usage

[[[demo]]]


### API

#### Type Parameter

[[[template asyncForEach

]]]
[[[template asyncForEach zh
T:数组元素类型
R:并发类型
]]]

#### Arguments

[[[params asyncForEach

]]]
[[[params asyncForEach zh
array:待遍历的数组
iterator:迭代器函数
concurrent:并发类型
]]]

#### Returns

[[[returns asyncForEach

]]]