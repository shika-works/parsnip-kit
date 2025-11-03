[[[demo
```ts
import { mapFields } from 'parsnip-kit'
const input = { name: 'alice', city: 'tokyo' } as const
const result = mapFields(input, (v) => v.length)
// { name: 5, city: 5 }
```
]]]