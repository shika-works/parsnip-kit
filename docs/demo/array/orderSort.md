[[[demo
```ts
import { orderSort } from 'parsnip-kit'

const arr = [{ id: 0 }, { id: 2 }, { id: 1 }, { id: 3 }, { id: 4 }]
const order = [1, 3, 2]
const getter = (item: { id: number }) => item.id

const sortedArr = orderSort(arr, order, getter)
// [{ id: 1 }, { id: 3 }, { id: 2 }, { id: 0 }, { id: 4 }]
```
]]]