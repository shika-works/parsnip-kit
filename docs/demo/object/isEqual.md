[[[demo
```ts
import { isEqual } from 'parsnip-kit'

const arr1 = [1, [2, 3]]
const arr2 = [1, [2, 3]]
isEqual(arr1, arr2) // true

const obj1 = { a: 1, b: { c: 2 } }
const obj2 = { a: 1, b: { c: 2 } }
isEqual(obj1, obj2) // true

const obj3 = { project: ['A', 'B', 'C'], startTime: new Date('2025-1-1'), status: { finish: false, block: true } }
const obj4 = { project: ['A', 'B', 'C'], startTime: new Date('2025-1-1'), status: { finish: false, block: true } }
isEqual(obj3, obj4) // true

const map1 = new Map([[['a'], { data: 1 }], [['b'], { data: 2 }]])
const map2 = new Map([[['a'], { data: 1 }], [['b'], { data: 2 }]])
isEqual(map1, map2) // true
```
]]]