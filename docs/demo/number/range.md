[[[demo
```ts
import { range } from 'parsnip-kit'

range(1, 10) // [1, 2, 3, 4, 5, 6, 7, 8, 9]
range(1, 10, 2) // [1, 3, 5, 7, 9]
range(10, 1, -2) // [10, 8, 6, 4, 2]

range(1, 10, -2) // []
range(10, 1, 2) // []
range(10, 10, 2) // []

try {
  range(0, 1, 0)
} catch (error) {
  console.log(error.message) // 'range step must be not equal 0.'
}
```
]]]