[[[demo
```ts
import { isBoolean } from 'parsnip-kit'

isBoolean('test') // false
isBoolean(1) // false
isBoolean('') // false
isBoolean(null) // false
isBoolean(undefined) // false
isBoolean(true) // true
isBoolean(false) // true
isBoolean(Boolean()) // true
```
]]]