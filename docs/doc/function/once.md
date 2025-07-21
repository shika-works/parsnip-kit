# once
[[[desc once
]]]
[[[desc once zh
接受一个函数 `func`，并返回一个新的函数，该函数只会被调用一次。在第一次调用之后，它将返回第一次调用的结果缓存。
]]]
[[[desc once ja
関数 `func` を受け取り、一度だけ呼び出される新しい関数を返します。最初の呼び出しの後、最初の呼び出しの結果をキャッシュして返します。
]]]

[[[version once
  
]]]
### Usage

```typescript
import { once } from 'parsnip-kit'

const handler = (a) => {
  console.log('Function Called')
  return a
}
const onceFn = once(handler)

onceFn(123)
// Function Called
// result is 123

onceFn(321)
// result is 123

```


### API

#### Type Parameter

[[[template once
]]]
[[[template once zh
T:函数类型
]]]
[[[template once ja
T:関数の型
]]]

#### Arguments

[[[params once
]]]
[[[params once zh
func: 只需调用一次的函数
]]]
[[[params once ja
func: 一度だけ呼び出される関数
]]]

#### Returns

[[[returns once

]]]