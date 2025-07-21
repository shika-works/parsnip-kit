# zipToObject

[[[desc zipToObject

]]]
[[[desc zipToObject zh
输入两个数组`keys`和`values`，返回`keys`元素作为键，`values`元素作为值的普通对象。

可选参数`getKey`和`getValue`用于把对象元素转换为键和值，它们是[getByPath](../object/getByPath)函数的字段路径，或者回调函数。
]]]

[[[version zipToObject
  
]]]

### Usage

[[[demo]]]


### API

#### Type Parameter

[[[template zipToObject

]]]
[[[template zipToObject zh
T:作为键的数组元素类型
U:作为值的数组元素类型
]]]

#### Arguments


[[[params zipToObject

]]]
[[[params zipToObject zh
keys:作为键的数组
values:作为值的数组
getKey:把数组元素转换为键
getValue:把数组元素转换为值
]]]

#### Returns
[[[returns zipToObject

]]]

#### Reference

[ObjectLike](../common/types#objectlike)