[[[demo
```ts
import { isString } from 'parsnip-kit'

isString('test') // true
isString(new String('test')) // true
isString(123) // false
```
]]]