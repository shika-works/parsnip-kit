[[[demo
```ts
import { max } from 'parsnip-kit'

max([1, 2, 3, 4]) // 4

max([{ value: 10 }, { value: 20 }], item => item.value) // 20

max([{ score: 85 }, { score: 95 }], 'score') // 95
```
]]]