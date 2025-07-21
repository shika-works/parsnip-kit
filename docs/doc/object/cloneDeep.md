# cloneDeep
[[[desc cloneDeep
]]]
[[[desc cloneDeep zh
输入一个参数`arg`，返回它的深复制。

支持的数据类型和 [clone](../object/clone) 函数一致。对于不支持的对象，参考 Lodash 的处理方法，返回它们自身，保证复制结果的可用性。

可选参数`customizeClone`，用于替代复制不支持的对象和普通对象时的行为。
]]]
[[[desc cloneDeep ja
引数 `arg` を受け取り、そのディープコピーを返します。

[clone](../object/clone) 関数と同じデータタイプをサポートしています。サポートされていないオブジェクトについては、Lodash の処理方法を参考に、これらのオブジェクト自身を返すことで、コピー結果の可用性を確保します。

オプションパラメータ `customizeClone` を使用して、サポートされていないオブジェクトとプレーンオブジェクトをクローンする際の動作を上書きできます。
]]]

[[[version cloneDeep
  
]]]
### Usage

[[[demo]]]


### API

#### Type Parameter
[[[template cloneDeep

]]]
[[[template cloneDeep zh
T: 待复制参数的类型
]]]
[[[template cloneDeep ja
T:コピーされるパラメータの型
]]]
#### Arguments
[[[params cloneDeep

]]]
[[[params cloneDeep zh
obj: 待复制的参数
customizeClone:自定义复制普通对象和不支持的内置对象的行为
]]]
[[[params cloneDeep ja
obj:コピーされるパラメータ
customizeClone:プレーンオブジェクトとサポートされていない組み込みオブジェクトのクローン動作をカスタマイズ
]]]
#### Returns
[[[returns cloneDeep

]]]