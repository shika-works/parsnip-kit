[[[demo
```ts
import { isSubset } from 'parsnip-kit'

const arr0 = [1, 2]
const arr1 = [1, 1, 2]
const arr2 = [1, 2, 3]

isSubset(arr0, arr2) // true
isSubset(arr1, arr2) // false

const getter = (product: Product, index: number, arr: Product[]) => 
  `${product.id}-${index}`
const subset = [{ id: 'p1', name: 'Laptop', price: 1000 }]
const superset = [
  { id: 'p1', name: 'Laptop', price: 1000 },
  { id: 'p2', name: 'Mouse', price: 50 }
]
isSubset(subset, superset, getter) // true
```
]]]