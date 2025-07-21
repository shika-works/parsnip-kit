[[[demo
```ts
import { asyncMap } from 'parsnip-kit'

const array = [1, 2, 3]
const logConcurrent = [] as any[]
const iterator = (item, index, arr) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      logConcurrent.push({ item, index })
      resolve({ item, index })
    }, Math.random() * 100)
  })
}
asyncMap(array, iterator).then(res => {
  console.log(res)
  // [{ item: 1, index: 0 }, { item: 2, index: 1 }, { item: 3, index: 2 }]
  console.log(logConcurrent)
  // Array contain { item: 1, index: 0 }, { item: 2, index: 1 }, { item: 3, index: 2 } with random order.
})

const logSequential = [] as any[]
const iterator = (item, index, arr) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      logSequential.push({ item, index })
      resolve({ item, index })
    }, Math.random() * 100)
  })
}
asyncMap(array, iterator, 'sequential').then(res => {
  console.log(res)
  // [{ item: 1, index: 0 }, { item: 2, index: 1 }, { item: 3, index: 2 }]
  console.log(logSequential)
  // [{ item: 1, index: 0 }, { item: 2, index: 1 }, { item: 3, index: 2 }]
})
```
]]]