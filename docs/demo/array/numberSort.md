[[[demo
```ts
import { numberSort } from 'parsnip-kit'

const numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]
const res = numberSort(numbers) // [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]
res === numbers // true

const nestedObjects = [
  { details: { age: 30 } },
  { details: { age: 25 } },
  { details: { age: 35 } }
]
numberSort(nestedObjects, 'asc', 'details.age')
// [
//   { details: { age: 25 } },
//   { details: { age: 30 } },
//   { details: { age: 35 } }
// ]
```
]]]