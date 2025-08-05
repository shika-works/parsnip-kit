[[[demo
```ts
import { go } from 'parsnip-kit'

function getUltraAnswer() {
  return Promise(resolve => setTimeout(resolve, 750))
}
const [result0, error0] = await go(getUltraAnswer)
// [42, null]
if (error0 !== null) {
  // do something...
}

function throwErrorExample() {
  throw new Error('test')
}
const [result1, error1] = await go(throwErrorExample)
// [null, Error: test]
```
]]]