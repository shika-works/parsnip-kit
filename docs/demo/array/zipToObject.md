[[[demo
```ts
import { zipToObject } from 'parsnip-kit'

zipToObject(['id', 'name', 'skill'], [1, 'Alex', ['Javascript']])
// { id: 1, name: 'Alex', skill: ['Javascript'] }

const users = [{ id: 0, user: 'IAmBot' }, { id: 2, user: 'Alice' }, { id: 5, user: 'Tom' }]
const record = [
  { system: 'Linux', count: 99999, userId: 0 },
  { system: 'Mac OS', count: 10, userId: 2 },
  { system: 'Window', count: 2, userId: 5 },
]
zipToObject(
  users, record, 'user', 'count'
) // { IAmBot: 99999, Alice: 10, Tom: 2 }

zipToObject(
  users, record, item => item.user, item => item.count
) // { IAmBot: 99999, Alice: 10, Tom: 2 }
```
]]]