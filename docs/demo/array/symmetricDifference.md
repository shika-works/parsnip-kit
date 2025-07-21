[[[demo
```ts
import { symmetricDifference } from 'parsnip-kit'

symmetricDifference([1, 2, 3, NaN], [1, 4, 8, NaN]) // [2, 3, 4, 8]

symmetricDifference(
  [{ v: 1 }, { v: 2 }, { v: 3 }],
  [{ v: 1 }, { v: 4 }, { v: 8 }],
  'v'
) // [{ v: 2 }, { v: 3 }, { v: 4 }, { v: 8 }]

symmetricDifference(
  [{ v: [1] }, { v: [2] }, { v: [3] }],
  [{ v: [1] }, { v: [4] }, { v: [8] }],
  'v[0]'
) // [{ v: [2] }, { v: [3] }, { v: [4] }, { v: [8] }]

symmetricDifference([1.1, 2.4, 3.9, 4.16], [1, 2, 3, 4, 5, 6], Math.floor) // [5, 6]

symmetricDifference([1.1, 2.4, 3.9, 4.16], [1, 2, 3, 4, 5, 6], (item: number, index: number, arr: number[]) => {
  return Math.floor(item)
}) // [5, 6]
```
]]]