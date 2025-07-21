[[[demo
```ts
import { joinToObject } from 'parsnip-kit'

const users = [{ Alex: 'vip' }, { Bob: 'viewer' }, { Carter: 'user' }, { Daniel: 'user' }]

joinToObject(users)
// { Alex: 'vip', Bob: 'viewer', Carter: 'user', Daniel: 'user' }

const data = [
  { name: 'Alex', type: 'vip' },
  { name: 'Bob', type: 'viewer' },
  { name: 'Carter', type: 'user' },
  { name: 'Daniel', type: 'user' }
]
joinToObject(data, 'name', 'type')
// { Alex: 'vip', Bob: 'viewer', Carter: 'user', Daniel: 'user' }

joinToObject(data, pair => pair.name, pair => pair.type)
// { Alex: 'vip', Bob: 'viewer', Carter: 'user', Daniel: 'user' }
```
]]]