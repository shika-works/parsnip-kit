# leftJoin

[[[desc leftJoin
  
]]]
[[[desc leftJoin zh
  输入两个数组`left`、`right`，返回`left`左连接`right`形成的数组，常用于合成包含相关联信息的对象数组，就像 SQL 那样。
  
  此外，接收两个参数：`leftKey`和`rightKey`，它们是[getByPath](../object/getByPath)函数的字段路径，或者回调函数，用于提供区分元素的标识。`merge`用于生成返回的数组对象。
]]]

[[[version leftJoin
  
]]]



### Usage

[[[demo]]]


### API

#### Type Parameter

[[[template leftJoin

]]]
[[[template leftJoin zh
T: 左连接中左侧数组元素类型
U: 左连接中右侧数组元素类型
R: 返回的数组元素类型
]]]

#### Arguments

[[[params leftJoin

]]]
[[[params leftJoin zh
left:左连接中左侧的数组
right: 左连接中右侧的数组
leftKey:为左侧数组提供区分元素的标识
rightKey:为右侧数组提供区分元素的标识
merge : 返回左右数组元素合并的结果
]]]

#### Returns

[[[returns leftJoin

]]]