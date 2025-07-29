[[[demo
```ts
import { isNullish } from 'parsnip-kit'

isNullish(undefined) // true
isNullish(null) // true
isNullish(NaN) // false
isNullish(0) // false
```
]]]