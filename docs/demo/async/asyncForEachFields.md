[[[demo
```ts
import { asyncForEachFields } from 'parsnip-kit'

const obj = { a: 1, b: 2, c: 3 }

const logConcurrent = [] as any[]
const iterator = (value, key, object) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      logConcurrent.push({ key, value })
      resolve(void 0)
    }, Math.random() * 100)
  })
}
asyncForEachFields(obj, iterator, 'sequential').then(() => {
  console.log(logConcurrent)
  // Array contain { key: 'a', value: 1 }, { key: 'b', value: 2 }, { key: 'c', value: 3 } with random order.
})

const logSequential = [] as any[]
const iterator = (value, key, object) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      logSequential.push({ key, value })
      resolve(void 0)
    }, Math.random() * 100)
  })
}
asyncForEachFields(obj, iterator, 'sequential').then(() => {
  console.log(logSequential)
  // [{ key: 'a', value: 1 }, { key: 'b', value: 2 }, { key: 'c', value: 3 }]
})
```
]]]