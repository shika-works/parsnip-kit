# pairsToObject

[[[desc pairsToObject
  
]]]
[[[desc pairsToObject zh
  输入一个二维数组`pairs`，返回从每一项中提取的键值对组成的普通对象。可选参数`getKey`和`getValue`用于把子对象转换为键和值，为空时默认取对象元素`[0]`作为键，元素`[1]`作为值。
  
  `getKey`和`getValue`是[getByPath](../object/getByPath)函数的字段路径，或者回调函数。
]]]

[[[version pairsToObject
  
]]]

### Usage

[[[demo]]]


### API

#### Type Parameter

[[[template pairsToObject

]]]
[[[template pairsToObject zh
T: 数组元素类型
]]]

#### Arguments

[[[params pairsToObject

]]]
[[[params pairsToObject zh
pairs: 键值对二维数组
getKey: 从子数组中提取键
getValue: 从子数组中提取值
]]]

#### Returns


[[[returns pairsToObject

]]]

#### Reference

[ObjectLike](../common/types#objectlike)