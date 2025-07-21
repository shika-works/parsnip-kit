# combine
[[[desc combine

]]]
[[[desc combine zh
组合多个函数，并按指定的顺序`direction`（默认为`'right'`，即从右到左）执行它们。每个函数的返回都将下一个函数作为参数。
]]]

[[[version combine
  
]]]
### Usage

```typescript
import { combine } from 'parsnip-kit'

function add(a: number, b: number): number { return a + b }
function multiply(a: number): number { return a * 2 }

const combinedRight = combine([multiply, add] as const)
combinedRight(2, 3) // 10

const combinedLeft = combine([add, multiply] as const, 'left')
combinedLeft(2, 3) // 10

// This could be useful for combining curried functions.
const multiplyCurried = (a: number) => (b: number) => a * b
const addCurried = (a: number) => (b: number) => a + b
const combinedRightCurried = combine([addCurried(2), multiplyCurried(3)] as const)

combinedRightCurried(5) // 17
```


### API

#### Type Parameter

[[[template combine

]]]
[[[template combine zh
T:函数数组类型
R:结合方向类型
]]]

#### Arguments

[[[params combine

]]]
[[[params combine zh
functions:用于结合的函数数组
direction:函数结合的方向
]]]

#### Returns

[[[returns combine

]]]

#### Reference

[Edge](../common/types#edge) [EdgeReverse](../common/types#edgereverse) [EmptyOrParameters](../common/types#emptyorparameters) [EmptyOrReturnType](../common/types#emptyorreturntype)