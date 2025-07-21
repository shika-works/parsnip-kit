# joinToObject
      
[[[desc joinToObject
  
]]]
[[[desc joinToObject zh
  输入一个对象数组`fields`，返回从每一项对象组合起来形成的普通对象。
 
  可选参数`getKey`和`getValue`用于把子对象转换为键和值，为空时默认提取数组元素第一个字段。`getKey`和`getValue`是[getByPath](../object/getByPath)函数的字段路径，或者回调函数。
]]]

[[[version joinToObject
  
]]]


### Usage

[[[demo]]]


### API
#### Type Parameter

[[[template joinToObject

]]]
[[[template joinToObject zh
T:数组元素类型
]]]

#### Arguments

[[[params joinToObject

]]]
[[[params joinToObject zh
pairs: 键值对对象数组
getKey: 从子对象中提取键
getValue: 从子对象中提取值
]]]

#### Returns

[[[returns joinToObject

]]]

#### Reference

[ObjectLike](../common/types#objectlike)