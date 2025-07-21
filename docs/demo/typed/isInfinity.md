[[[demo
```ts
import { isInfinity } from 'parsnip-kit'

isInfinity(123) // false
isInfinity('123') // false
isInfinity(NaN) // false
isInfinity(Infinity) // true
isInfinity(-Infinity) // true
isInfinity(new Number(Infinity)) // true
```
]]]