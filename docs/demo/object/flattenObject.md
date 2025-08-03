[[[demo
```ts
import { flattenObject } from 'parsnip-kit'

const input0 = {
  a: [1, 2, { b: 3 }],
  c: {
    d: [4, 5, { e: 6 }]
  }
}
flattenObject(input0)
// {
//   'a[0]': 1,
//   'a[1]': 2,
//   'a[2].b': 3,
//   'c.d[0]': 4,
//   'c.d[1]': 5,
//   'c.d[2].e': 6
// }

const input1 = {
  a: {},
  b: [],
  c: {
    d: {},
    e: []
  }
}
flattenObject(input1) // {}
```
]]]