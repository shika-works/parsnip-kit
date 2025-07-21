# throttle
[[[desc throttle

]]]
[[[desc throttle zh
节流函数用于限制函数调用的频率。它确保函数在指定的时间间隔内不会被多次调用。
]]]

[[[version throttle
  
]]]
### Usage

```typescript
import { throttle } from 'parsnip-kit'

const handler = () => console.log('Function called')

// Basic throttle usage
const throttled = throttle(handler, 300)
throttled() // console.log is called after 300ms
throttled() // Call is ignored due to throttle

// Throttle with leading and trailing options
const throttledWithOptions = throttle(handler, 300, { leading: true, trailing: true })
throttledWithOptions() // console.log is called immediately and again after 300ms if no other calls are made.
```


### API

#### Type Parameter
[[[template throttle

]]]
[[[template throttle zh
T:要节流的函数类型
]]]
#### Arguments
[[[params throttle

]]]
[[[params throttle zh
func:要节流的函数
options:可选参数对象
options.leading:是否在等待间隔开始时执行函数
options.trailing:是否在等待间隔结束时执行函数
]]]
#### Returns
[[[returns throttle

]]]