[[[demo
```ts
import { median } from 'parsnip-kit'

median([1, 2, 3, 4, 0]) // 2
median([1, 2, 3, 4]) // 2.5

median([{ value: 10 }, { value: 20 }, { value: 10 }], item => item.value) // 10

median([{ score: 100 }, { score: 85 }, { score: 95 }], 'score') // 95
```
]]]