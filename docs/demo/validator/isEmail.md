[[[demo
```ts
import { isEmail } from 'parsnip-kit'
isEmail('user@example.com') // true
isEmail('first.last_1@example-test.co.uk') // true

isEmail('userexample.com') // false
isEmail('user@example.c') // false
isEmail('user@-domain.com') // false

isEmail(123) // false
```
]]]