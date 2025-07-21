# once
[[[desc once
]]]

[[[version once
  
]]]
### Usage

```typescript
import { once } from 'parsnip-kit'

const handler = (a) => {
  console.log('Function Called')
  return a
}
const onceFn = once(handler)

onceFn(123)
// Function Called
// result is 123

onceFn(321)
// result is 123

```


### API

#### Type Parameter

[[[template once
]]]

#### Arguments

[[[params once
]]]

#### Returns

[[[returns once

]]]