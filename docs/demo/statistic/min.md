[[[demo
```ts
import { min } from 'parsnip-kit'

min([1, 2, 3, 4]) // 1

min([{ value: 10 }, { value: 20 }], item => item.value) // 10

min([{ score: 85 }, { score: 95 }], 'score') // 85
```
]]]