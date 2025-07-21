[[[demo
```ts
import { sortIndex } from 'parsnip-kit'
import { numberComparatorAsc } from 'parsnip-kit'
import { stringComparatorAsc } from 'parsnip-kit'

sort([1, 25, 4, 9, 16], (a, b) => a - b) // [1, 4, 9, 16, 25]
sortIndex([1, 25, 4, 9, 16], (a, b) => a - b) // [0, 4, 1, 2, 3]

sort([1, 25, 4, 9, 16]) // [1, 16, 25, 4, 9]
sortIndex([1, 25, 4, 9, 16]) // [0, 2, 3, 4, 1]

sort([1, 25, 4, 9, 16], numberComparatorAsc) // [1, 4, 9, 16, 25]
sortIndex([1, 25, 4, 9, 16], numberComparatorAsc) // [0, 4, 1, 2, 3]

sort(['a', 'b', 'A', 'B', 'c'], stringComparatorAsc)
// ['a', 'A', 'b', 'B', 'c']
sortIndex(['a', 'b', 'A', 'B', 'c'], stringComparatorAsc)
// [0, 2, 1, 3, 4]
```
]]]