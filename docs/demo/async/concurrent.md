[[[demo
```ts
import { concurrent } from 'parsnip-kit'

const functions = Array.from(
  { length: 5 },
  (_, i) => () =>
    new Promise<number>((resolve) => {
      setTimeout(() => { resolve(i) }, i * 100)
    })

concurrent(functions, 2).then(res => {
  console.log(res)
  // [{ status: 'fulfilled', value: 0 }, { status: 'fulfilled', value: 1 }, { status: 'fulfilled', value: 2 }, { status: 'fulfilled', value: 3 }, { status: 'fulfilled', value: 4 }]
})
```
]]]