[[[demo
```ts
import { sequential } from 'parsnip-kit'

const functions = [
  async (arg?: PromiseSettledResult<number>) => {
    if (arg?.status === 'fulfilled') {
      return arg.value
    } else {
      throw new Error('test')
    }
  },
  async (arg?: PromiseSettledResult<number>) => {
    return arg?.status === 'fulfilled' ? arg.value + 1 : 0
  },
  async (arg?: PromiseSettledResult<number>) => {
    return arg?.status === 'fulfilled' ? arg.value * 2 : 0
  }
]
sequential(functions).then(res => { console.log(res) })
// [
//   { status: 'rejected', reason: new Error('test') },
//   { status: 'fulfilled', value: 0 },
//   { status: 'fulfilled', value: 0 }
// ]

sequential(functions, 0).then(res => { console.log(res) })
// [
//   { status: 'fulfilled', value: 1 },
//   { status: 'fulfilled', value: 2 },
//   { status: 'fulfilled', value: 4 }
// ]

```
]]]