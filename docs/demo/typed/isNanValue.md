[[[demo
```ts
import { isNanValue } from 'parsnip-kit'

isNanValue(123) // false
isNanValue('123') // false
isNanValue(Infinity) // false
isNanValue(NaN) // true
isNanValue(new Number(NaN)) // true
```
]]]