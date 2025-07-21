[[[demo
```ts
import { isFloat } from 'parsnip-kit'

isFloat(123.1) // true
isFloat(new Number(123.1)) // true
isFloat(123) // false
isFloat(BigInt(123)) // false
isFloat(NaN) // false
isFloat(Infinity) // false
```
]]]