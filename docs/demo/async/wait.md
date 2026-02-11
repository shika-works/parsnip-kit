[[[demo
```ts
import { wait } from 'parsnip-kit'

wait(5000).then(() => {
  console.log('Delay end') // after 5000ms
})

wait(5000, () => 'data').then((res) => {
  console.log(res) // 'data' after 5000ms
})
```
]]]