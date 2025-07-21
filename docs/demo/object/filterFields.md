[[[demo
```ts
import { filterFields } from 'parsnip-kit'

const obj = { a: 1, b: 2, c: 3 }
const iterator0 = (value: number) => value > 1
const result0 = filterFields(obj, iterator0)
// { b: 2, c: 3 }

const arr0 = [0, 1, 2, 3]
const iterator1 = (value: number) => value % 2 === 0
const result1 = filterFields(arr0, iterator1)
// [0, 2]

const arr1 = [0, 1, 2, 3]
arr1['test'] = 'test'
const iterator2 = (value, key) => typeof key === 'string'
const result2 = filterFields(arr1, iterator2)
// [test: 'test']
```
]]]