[[[demo
```ts
import { poll } from 'parsnip-kit'

const getList = () => {
  return fetch('https://example.url.test/list').then((response) => {
    response.json()
    // ...
  })
}
const polled = poll(getList, 1000)
const pollResult = polled()

// ...
// Stop polling
pollResult.stop()
```
]]]