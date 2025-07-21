[[[demo
```ts
import { sum } from 'parsnip-kit'

sum([1, 2, 3, 4]) // 10

sum([{ value: 10 }, { value: 20 }], item => item.value) // 30

sum([{ score: 85 }, { score: 95 }], 'score') // 180
```
]]]