# sequential

[[[desc sequential

]]]
[[[desc sequential zh
`sequential`通常用于顺序执行多个异步操作的场景。它接收一组返回`Promise`的函数`functions`，串行执行它们，函数接受`PromiseSettledResult`类型包裹的前一个函数的返回作为入参。

如果传入可选参数`initialValue`，它会被 fulfilled 状态的`PromiseSettledResult`类型包裹传入第一个函数，否则第一个函数将会接收`undefined`作为入参。
]]]

[[[version sequential
  
]]]

### Usage

[[[demo]]]


### API

#### Type Parameter

[[[template sequential

]]]
[[[template sequential zh
T:返回`Promise`的`value`类型
]]]

#### Arguments

[[[params sequential

]]]
[[[params sequential zh
functions:返回`Promise`的函数数组
initialValue:初始值
]]]

#### Returns

[[[returns sequential

]]]