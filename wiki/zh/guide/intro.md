# 什么是 Parsnip-Kit ？

Parsnip-Kit 是一个零依赖、多功能、模块化的 JavaScript 工具库，支持 TypeScript。

它提供涵盖了类型检查、数组、对象、字符串、函数、异步、数字、统计、随机数等方面的工具函数，覆盖开发中的大部分需求，让我们的应用减少模板代码，增加可维护性。

Parsnip-Kit 使用现代 JavaScript API 编写，所有工具函数都支持 TypeScript 类型，不管是开发应用还是阅读源码，都能带给开发者清新的体验。

# 函数概览

以下是 Parsnip-Kit 提供的工具函数概览：
- Object: 操作 JavaScript 对象的工具函数，如 [cloneDeep](../object/cloneDeep)、[isEqual](../object/isEqual)、[getByPath](../object/getByPath)。
- Array: 操作数组的工具函数，如 [unique](../array/unique)、[intersection](../array/intersection)、[lexSort](../array/lexSort) 和 [numberSort](../array/numberSort)。
- Statistic: 在 JavaScript 中进行描述统计的工具函数，包括 [sum](../statistic/sum)、[maxItem](../statistic/maxItem) 和 [minItem](../statistic/minItem)。
- Number: 处理数值的工具函数，如 [range](../number/range)、[thousandSeparator](../number/thousandSeparator) 和 [percent](../number/percent)。
- Function: 处理函数入参、返回和行为的函数，如 [debounce](../function/debounce)、[throttle](../function/throttle)、[combine](../function/combine) 和 [curry](../function/curry)。
- Async: 专注于处理异步流程处理的工具函数，如 [concurrent](../async/concurrent)、[retry](../async/retry) 和 [asyncForEach](../async/asyncForEach)。
- String: 字符串工具函数，如 [camelCase](../string/camelCase)、[snakeCase](../string/snakeCase) 和 [htmlEncode](../string/htmlEncode)。
- Typed: 用于判断入参类型，包括 [isPrimitive](../typed/isPrimitive)、[isNanValue](../typed/isNanValue) 和 [getTypeTag](../typed/getTypeTag)。
- Random: 生成随机数据，包括 [randomNumber](../random/randomNumber)、[randomString](../random/randomString) 和 [randomFromArray](../random/randomFromArray)。

![](/overview.svg)
