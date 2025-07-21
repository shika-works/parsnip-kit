[[[demo
```ts
import { leftJoin } from 'parsnip-kit'

const leftArray0 = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
]
const rightArray0 = [
  { id: 1, age: 25 },
  { id: 3, age: 30 },
]

leftJoin(
  leftArray0,
  rightArray0,
  (item) => item.id,
  (item) => item.id,
  (left, right) => ({ ...left, ...(right || {}) }),
) // [{ id: 1, name: 'Alice', age: 25 }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie', age: 30 }]


const leftArray1 = [
  { id: 1, info: { name: 'Alice', age: 25 } },
  { id: 2, info: { name: 'Bob', age: 35 } },
  { id: 3, info: { name: 'Charlie', age: 30 } },
]
const rightArray1 = [
  { name: 'Alice', experience: ['software engineer', 'designer'] },
  { name: 'Charlie', experience: ['freelance'] },
]

leftJoin(
  leftArray1,
  rightArray1,
  'info.name',
  'name',
  (left, right) => ({ name: left.info.name, job: right?.experience[0] ?? null }),
) // [{ name: 'Alice', job: 'software engineer' }, { name: 'Bob', job: null }, { name: 'Charlie', job: 'freelance' }]

```
]]]