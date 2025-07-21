[[[demo
```ts
import { isNumberString } from 'parsnip-kit'

isNumberString('12345') // true
isNumberString('123a5') // false
isNumberString('') // false
```
]]]