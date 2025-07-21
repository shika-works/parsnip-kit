[[[demo
```ts
import { withFallback } from 'parsnip-kit'

const func = (a: number) => (a === 0 ? null : a)
const funcWithDefault = withFallback(func, -1)

funcWithDefault(1)
// 1
funcWithDefault(0)
// -1

```
]]]