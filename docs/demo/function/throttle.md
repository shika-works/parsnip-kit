# throttle
[[[desc throttle

]]]

[[[version throttle
  
]]]
### Usage

```typescript
import { throttle } from 'parsnip-kit'

const handler = () => console.log('Function called')

// Basic throttle usage
const throttled = throttle(handler, 300)
throttled() // console.log is called after 300ms
throttled() // Call is ignored due to throttle

// Throttle with leading and trailing options
const throttledWithOptions = throttle(handler, 300, { leading: true, trailing: true })
throttledWithOptions() // console.log is called immediately and again after 300ms if no other calls are made.
```


### API

#### Type Parameter
[[[template throttle

]]]
#### Arguments
[[[params throttle

]]]
#### Returns
[[[returns throttle

]]]