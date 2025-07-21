[[[demo
```ts
import { linkToTree } from 'parsnip-kit'

const arr = [
  { id: '1', parentId: null, name: 'Root 1' },
  { id: '2', parentId: '1', name: 'Child 1' },
  { id: '3', parentId: '1', name: 'Child 2' },
  { id: '4', parentId: '2', name: 'Grandchild 1' },
  { id: '5', parentId: null, name: 'Root 2' }
]

const result = linkToTree(arr, 'id', 'parentId', 'items')

// [
//   {
//     id: '1',
//     parentId: null,
//     name: 'Root 1',
//     items: [
//       {
//         id: '2',
//         parentId: '1',
//         name: 'Child 1',
//         items: [
//           {
//             id: '4',
//             parentId: '2',
//             name: 'Grandchild 1',
//             items: []
//           }
//         ]
//       },
//       {
//         id: '3',
//         parentId: '1',
//         name: 'Child 2',
//         items: []
//       }
//     ]
//   },
//   {
//     id: '5',
//     parentId: null,
//     name: 'Root 2',
//     items: []
//   }
// ]

```
]]]