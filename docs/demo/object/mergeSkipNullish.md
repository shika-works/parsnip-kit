[[[demo
```ts
import { mergeSkipNullish } from 'parsnip-kit'

const obj1 = { a: 1, b: null, c: undefined }
const obj2 = { b: 2, c: 3, d: null }
const obj3 = { c: undefined, d: 4, e: 5 }

mergeSkipNullish(obj1, obj2, obj3) // { a: 1, b: 2, c: 3, d: 4, e: 5 }
```
]]]