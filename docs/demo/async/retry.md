[[[demo
```ts
import { retry } from 'parsnip-kit'

let times = 0
const func = async (a: number, b: number) => {
  if (times < 3) {
    times++
    throw new Error(`Error ${times}`)
  }
  return a + b
}
const retried = retry(func)
retried(2, 3).then(res => {
  console.log(res)
  // { status: 'fulfilled', value: 5 }
})
```
]]]