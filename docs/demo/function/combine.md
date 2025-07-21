# combine
[[[desc combine

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

#### Arguments

[[[params combine

]]]

#### Returns

[[[returns combine

]]]

#### Reference

[Edge](../common/types#edge) [EdgeReverse](../common/types#edgereverse) [EmptyOrParameters](../common/types#emptyorparameters) [EmptyOrReturnType](../common/types#emptyorreturntype)