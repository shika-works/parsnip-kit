import { describe, it, expect } from 'vitest'
import { linkToTree } from '../linkToTree'

describe('linkToTree', () => {
  it('should convert a flat array to a tree structure', () => {
    const arr = [
      { key: '1', parent: null, name: 'Root 1' },
      { key: '2', parent: '1', name: 'Child 1' },
      { key: '3', parent: '1', name: 'Child 2' },
      { key: '4', parent: '2', name: 'Grandchild 1' },
      { key: '5', parent: null, name: 'Root 2' }
    ]

    const result = linkToTree(arr)

    expect(result).toEqual([
      {
        key: '1',
        parent: null,
        name: 'Root 1',
        children: [
          {
            key: '2',
            parent: '1',
            name: 'Child 1',
            children: [
              {
                key: '4',
                parent: '2',
                name: 'Grandchild 1',
                children: []
              }
            ]
          },
          {
            key: '3',
            parent: '1',
            name: 'Child 2',
            children: []
          }
        ]
      },
      {
        key: '5',
        parent: null,
        name: 'Root 2',
        children: []
      }
    ])
  })

  it('should handle custom key and parent', () => {
    const arr = [
      { id: '1', parentId: null, name: 'Root 1' },
      { id: '2', parentId: '1', name: 'Child 1' },
      { id: '3', parentId: '1', name: 'Child 2' },
      { id: '4', parentId: '2', name: 'Grandchild 1' },
      { id: '5', parentId: null, name: 'Root 2' }
    ]

    const result = linkToTree(arr, 'id', 'parentId')

    expect(result).toEqual([
      {
        id: '1',
        parentId: null,
        name: 'Root 1',
        children: [
          {
            id: '2',
            parentId: '1',
            name: 'Child 1',
            children: [
              {
                id: '4',
                parentId: '2',
                name: 'Grandchild 1',
                children: []
              }
            ]
          },
          {
            id: '3',
            parentId: '1',
            name: 'Child 2',
            children: []
          }
        ]
      },
      {
        id: '5',
        parentId: null,
        name: 'Root 2',
        children: []
      }
    ])
  })

  it('should handle custom childrenPath', () => {
    const arr = [
      { key: '1', parent: null, name: 'Root 1' },
      { key: '2', parent: '1', name: 'Child 1' },
      { key: '3', parent: '1', name: 'Child 2' },
      { key: '4', parent: '2', name: 'Grandchild 1' },
      { key: '5', parent: null, name: 'Root 2' }
    ]

    const result = linkToTree(arr, undefined, undefined, 'subs' as const)

    expect(result).toEqual([
      {
        key: '1',
        parent: null,
        name: 'Root 1',
        subs: [
          {
            key: '2',
            parent: '1',
            name: 'Child 1',
            subs: [
              {
                key: '4',
                parent: '2',
                name: 'Grandchild 1',
                subs: []
              }
            ]
          },
          {
            key: '3',
            parent: '1',
            name: 'Child 2',
            subs: []
          }
        ]
      },
      {
        key: '5',
        parent: null,
        name: 'Root 2',
        subs: []
      }
    ])
  })

  it('should handle getKey and getParent as functions', () => {
    const arr = [
      { id: '1', parentId: null, name: 'Root 1' },
      { id: '2', parentId: '1', name: 'Child 1' },
      { id: '3', parentId: '1', name: 'Child 2' },
      { id: '4', parentId: '2', name: 'Grandchild 1' },
      { id: '5', parentId: null, name: 'Root 2' }
    ]

    const result = linkToTree(
      arr,
      (item) => item.id,
      (item) => item.parentId + ''
    )

    expect(result).toEqual([
      {
        id: '1',
        parentId: null,
        name: 'Root 1',
        children: [
          {
            id: '2',
            parentId: '1',
            name: 'Child 1',
            children: [
              {
                id: '4',
                parentId: '2',
                name: 'Grandchild 1',
                children: []
              }
            ]
          },
          {
            id: '3',
            parentId: '1',
            name: 'Child 2',
            children: []
          }
        ]
      },
      {
        id: '5',
        parentId: null,
        name: 'Root 2',
        children: []
      }
    ])
  })

  it('should handle empty array', () => {
    const arr: any[] = []

    const result = linkToTree(arr)

    expect(result).toEqual([])
  })

  it('should handle single element', () => {
    const arr = [{ key: '1', parent: null, name: 'Single' }]

    const result = linkToTree(arr)

    expect(result).toEqual([
      {
        children: [],
        key: '1',
        parent: null,
        name: 'Single'
      }
    ])
  })

  it('should handle circular references', () => {
    const obj1 = { key: '1', parent: '2', name: 'Item 1' }
    const obj2 = { key: '2', parent: '1', name: 'Item 2' }
    const arr = [obj1, obj2]

    const result = linkToTree(arr)

    expect(result).toEqual([])
    // @ts-ignored
    expect(arr[0].children[0]).eq(obj2)
    // @ts-ignored
    expect(arr[1].children[0]).eq(obj1)
  })
})
