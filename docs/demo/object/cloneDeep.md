[[[demo
```ts
import { cloneDeep, getTypeTag } from 'parsnip-kit'

cloneDeep('test') // 'test'

const testObj0 = [
  { label: 'Time', dataIndex: 'time', validation: /^\d+$/, min: new Date() },
  { label: 'Name', dataIndex: 'name', validation: (value) => !!(value ?? '').trim() }
]
const clonedTestObj0 = cloneDeep(testObj0)
// [
//   { label: 'Time', dataIndex: 'time', validation: /^\d+$/, min: new Date() }
//   { label: 'Name', dataIndex: 'name', validation: (value) => !!(value ?? '').trim() }
// ]

clonedTestObj0 === testObj0 // false
clonedTestObj0[0] === testObj0[0] // false
clonedTestObj0[0].validation === testObj0[0].validation // false
clonedTestObj0[1] === testObj0[1] // false
clonedTestObj0[1].validation === testObj0[1].validation // true

const testClass = class {
  #privateData
  publicData
  constructor(publicData, privateData) {
    this.#privateData = privateData
    this.publicData = publicData
  },
  getPrivateData() {
    return this.#privateData
  }
}
const testObj1 = {
  data: new testClass('publicData', 'privateData')
}
const clonedTestObj1 = cloneDeep(testObj1)

testObj1.data.getPrivateData() // 'privateData'
clonedTestObj1.data.getPrivateData()
// TypeError: Cannot read private member #privateData from an object whose class did not declare it

const testCloner = (
  value: any,
  key: string | undefined,
  cache: WeakMap<any, any>,
  defaultClone4Object
) => {
  if (cache.has(value)) {
    return cache.get(value)
  }
  if (getTypeTag(value) === 'Object') {
    if (value instanceof testClass) {
      return new testClass(value.publicData, value.getPrivateData())
    } else {
      return defaultClone4Object(value, cache, testCloner)
    }
  } else {
    return value
  }
}
const clonedTestObj2 = cloneDeep(
  testObj1,
  testCloner
)
clonedTestObj2.data.getPrivateData() // 'privateData'

const testCircle: any = {}
testCircle.a = testCircle
const clonedTestObj3 = cloneDeep(testCircle)
clonedTestObj3.a === clonedTestObj3 // true
```
]]]