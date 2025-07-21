[[[demo
```ts
import { mode } from 'parsnip-kit'

mode([1, 2, 2, 3, 3, 3]) // 3

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'alice' }
]
mode(users, 'id') // 1

mode(users, (user) => user.name.toLowerCase()) // 'alice'
```
]]]