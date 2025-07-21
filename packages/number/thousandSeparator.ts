/**
 * Input a number `num` and return a string with thousand separators.
 * @param {number} num  The number to format
 * @returns {string}
 * @version 0.0.1
 */
export function thousandSeparator(num: number): string {
  const numStr = Math.abs(num).toString()
  const [int, decimal] = numStr.split('.')

  const formattedInt = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  let result
  if (decimal) {
    const formattedDecimal = decimal.replace(/(\d{3})(?=\d)/g, '$1,')
    result = `${formattedInt}.${formattedDecimal}`
  } else {
    result = formattedInt
  }

  return num < 0 ? '-' + result : result
}
