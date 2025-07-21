# convertDataUnit
[[[desc convertDataUnit
  
]]]
[[[desc convertDataUnit zh
  在不同单位之间转换数据（例如，bit、byte、kilobyte 等）。
  
  支持二进制前缀和十进制前缀。

  二进制前缀基于 2 的幂（例如，1 KiB = 2^10字节），由国际电工委员会（IEC）定义，而十进制前缀是国际单位制（SI）的一部分，基于 10 的幂（例如，1 kB = 10^3字节）。
]]]
[[[desc convertDataUnit ja
  データを異なる単位（ビット、バイト、キロバイトなど）に変換します。

  二進制接頭語と十進制接頭語をサポートしています。

  二進制接頭語は、国際電気標準会議（IEC）によって定義され、2 の冪に基づいています（例：1 KiB = 2^10 バイト）。十進制接頭語は、国際単位系（SI）の一部であり、10 の冪に基づいています（例：1 kB = 10^3 バイト）。
]]]
[[[version convertDataUnit
  
]]]

### Usage

[[[demo]]]


### API

#### Type Parameter

[[[template convertDataUnit

]]]

#### Arguments

[[[params convertDataUnit

]]]
[[[params convertDataUnit zh
value: 要转换的数据大小的值
from: 数据大小的原始单位
to: 要转换到的目标数据单位
prefix: 转换中使用的前缀类型（二进制或十进制），默认为 `'binary'`
]]]
[[[params convertDataUnit ja
value: 変換するデータサイズの値
from: データサイズの元の単位
to: 変換する目標データ単位
prefix: 変換に使用する接頭語の種類（二進制または十進制）。デフォルトは `'binary'` です
]]]

#### Returns

[[[returns convertDataUnit

]]]

#### Reference

[DataUnit](../common/types#dataunit)