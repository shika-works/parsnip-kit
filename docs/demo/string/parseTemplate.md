[[[demo
```ts
import { parseTemplate } from 'parsnip-kit'

const template0 = 'Hello, {name}! Your balance is {balance}.'
parseTemplate(template0, { name: 'Alice', balance: '$100' })
// 'Hello, Alice! Your balance is $100.'
parseTemplate(template0, (pattern: string) => data[pattern])
// 'Hello, Alice! Your balance is $100.'

const template1 = 'Are you called {info.name}?'
parseTemplate(template1, { info: { name: 'Administrator' } })
// 'Are you called Administrator?'

const template2 = 'Dear User [username], thank you for registering on our website.'
parseTemplate(template2, { username: 'John Titor' }, { start: '[', end: ']' })
// 'Dear User John Titor, thank you for registering on our website.'

```
]]]