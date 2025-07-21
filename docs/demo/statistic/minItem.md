[[[demo
```ts
import { minItem } from 'parsnip-kit'

minItem([1, 2, 3, 4]) // 1

minItem([{ value: 10 }, { value: 10, key: 'count' }, { value: 20 }], item => item.value)
// { value: 10 }

minItem([{ value: 10 }, { value: 10, key: 'count' }, { value: 20 }], 'value')
// { value: 10 }
```
]]]