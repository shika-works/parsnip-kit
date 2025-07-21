# delay
[[[desc delay

]]]
[[[desc delay zh
这是一个延迟函数，接受一个函数`func`和延迟`wait`毫秒，返回一个延迟调用该函数的函数。
]]]

[[[version delay
  
]]]
### Usage

```typescript
import { delay } from 'parsnip-kit'

const handler = () => console.log('Function call')
const delayed = delay(handler, 3000)
delayed()
// console.log is called after 3s

```


### API

#### Type Parameter

[[[template delay

]]]
[[[template delay zh
T:函数类型
]]]

#### Arguments

[[[params delay

]]]
[[[params delay zh
func:要延迟的函数
wait: 延迟时间（毫秒）
]]]

#### Returns

[[[returns delay

]]]