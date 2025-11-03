[[[demo
```ts
import { isEmpty } from 'parsnip-kit'

isEmpty(undefined) // true
isEmpty(null) // true
isEmpty(NaN) // true
isEmpty('') // true
isEmpty([]) // true

isEmpty([1, 2, 3]) // false
isEmpty({ key: 'value' }) // false
```
]]]