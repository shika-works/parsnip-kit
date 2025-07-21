# linkToTree
[[[desc linkToTree
  
]]]
[[[desc linkToTree zh
将扁平数组 `arr` 转换为树形结构，并返回根节点数组。这对于从扁平数组构建树形的选项非常有用。

需要注意的是，函数 `linkToTree` 会修改 `arr` 中的元素。

可选参数：
- `getKey`：用于获取每个元素的唯一标识。值为 [getByPath](../object/getByPath) 的字段路径或者一个函数。
- `getParent`：获取每个元素的亲代节点标识。与 `getKey` 类似，值为 [getByPath](../object/getByPath) 的字段路径或函数。
- `childrenPath`：指定对象中存储子元素的字段路径。默认值为 `'children'`。访问和修改子节点时，[getByPath](../object/getByPath) 和 [setByPath](../object/setByPath) 都会使用这个变量。
]]]
[[[desc linkToTree ja
  扁平な配列 `arr` をツリー構造に変換し、ルートノードの配列を返します。これにより、フラットな配列からツリー構造のオプションを構築する際に非常に便利です。

  注意：関数 `linkToTree` が `arr` の要素を変更する可能性があることです。

  オプションのパラメータ：
  - `getKey`：各要素の一意の識別子を取得するために使用されます。[getByPath](../object/getByPath) のフィールドパスまたは関数です。
  - `getParent`：各要素の親ノードの識別子を取得します。`getKey` と同様に、[getByPath](../object/getByPath) のフィールドパスまたは関数です。
  - `childrenPath`：オブジェクト内で子要素を格納するフィールドパスを指定します。デフォルトは `'children'` です。子ノードにアクセスしたり変更したりする際に、[getByPath](../object/getByPath) と [setByPath](../object/setByPath) はこの変数を使用します。
]]]
[[[version linkToTree
  
]]]

### Usage

[[[demo]]]


### API

#### Type Parameter

[[[template linkToTree

]]]
[[[template linkToTree zh
T: 数组 `arr` 中元素的类型
R: `childrenPath` 的类型
]]]
[[[template linkToTree ja
getKey：各要素の一意の識別子を取得するために使用されます
getParent：各要素の親ノードの識別子を取得します
childrenPath：オブジェクト内で子要素を格納するフィールドパスを指定します
]]]

#### Arguments

[[[params linkToTree

]]]
[[[params linkToTree zh
arr:要转换为树形结构的扁平数组
getKey:用于获取数组元素唯一标识
getParent：用于获取亲代节点的标识
childrenPath：存储子元素的数组的对象字段路径
]]]
[[[params linkToTree ja
arr：ツリー構造に変換されるフラットな配列です
getKey：配列要素の一意の識別子を取得するために使用します
getParent：親ノードの識別子を取得するために使用します
childrenPath：子要素を格納するオブジェクトのフィールドパスです
]]]

#### Returns

[[[returns linkToTree

]]]

#### Reference

[LiteralStringWithFallback](../common/types#literalstringwithfallback) [DeepMappedTypeByKeyOrIndex](../common/types#deepmappedtypebykeyorindex)