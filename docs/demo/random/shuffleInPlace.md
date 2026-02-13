[[[demo
```ts
import { shuffleInPlace } from 'parsnip-kit'

const original = [1, 2, 3, 4, 5]
const res0 = shuffleInPlace(original) // It would be [3, 2, 4, 1, 5]
const res1 = shuffleInPlace(original, true) // It would be [3, 4, 2, 5, 1]
res0 === original // true
res1 === original // true
```
]]]