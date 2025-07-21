# memoize
[[[desc memoize

]]]

[[[version memoize
  
]]]
### Usage

```typescript
import { memoize } from 'parsnip-kit'

function expensiveCalculation(a: number, b: number): number {
  // Simulate an expensive computation process
  console.log('Calculating...')
  return a + b
}

const memoizedCalc = memoize(expensiveCalculation)
memoizedCalc(2, 3) // Calculating...，returns 5
memoizedCalc(2, 3) // directly return 5, do not call expensiveCalculation

// Use a custom resolver
const memoizedCalcWithResolver = memoize(
  expensiveCalculation,
  (a, b) => a + b
)
memoizedCalcWithResolver(2, 3) // Calculating...，returns 5
memoizedCalcWithResolver(4, 1) // directly return 5, do not call expensiveCalculation

const memoizedCalcWithAllArgs = memoize(
  expensiveCalculation,
  (a, b) => a + b,
  [2, 3]
)
// Calculating..., call expensiveCalculation to cache
memoizedCalcWithAllArgs(2, 3)
// directly return 5, do not call expensiveCalculation
```


### API

#### Type Parameter

[[[template memoize

]]]


#### Arguments

[[[params memoize

]]]

#### Returns

[[[returns memoize

]]]