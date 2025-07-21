import { DataUnit } from '../common/types'

const unitArray = ['bit', 'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
/**
 * Converts data between different units (e.g., bits, bytes, kilobytes, etc.).
 *
 * Supports binary prefix and decimal prefix.
 *
 * Binary prefixes are based on powers of 2 (e.g., 1 KiB = 2^10 bytes) defined by the International Electrotechnical Commission (IEC), while decimal prefixes are part of the International System of Units (SI) based on powers of 10 (e.g., 1 kB = 10^3 bytes).
 * @param {number} value The value of the data size to be converted
 * @param {DataUnit} from The original unit of the data size
 * @param {DataUnit} to The target data unit to convert to
 * @param {'binary' | 'decimal'} prefix The type of prefix to use in conversion (binary or decimal), defaults to `'binary'`
 * @returns {number}
 * @version 0.0.2
 */

export function convertDataUnit(
  value: number,
  from: DataUnit,
  to: DataUnit,
  prefix: 'binary' | 'decimal' = 'binary'
) {
  let fromIndex = -1,
    toIndex = -1
  const unitArrayLen = unitArray.length
  for (let i = 0; i < unitArrayLen; i++) {
    if (from === unitArray[i]) {
      fromIndex = i
    }
    if (to === unitArray[i]) {
      toIndex = i
    }
    if (fromIndex > -1 && toIndex > -1) {
      break
    }
  }
  if (fromIndex === -1) {
    throw TypeError('Unknown unit of from.')
  }
  if (toIndex === -1) {
    throw TypeError('Unknown unit of to.')
  }
  const factor = prefix === 'decimal' ? 1000 : 1024
  const bitToOther = fromIndex === 0 && toIndex > 0
  const otherToBit = toIndex === 0 && fromIndex > 0
  const exponent =
    fromIndex - toIndex + (bitToOther ? 1 : 0) - (otherToBit ? 1 : 0)
  return (
    ((value * Math.pow(factor, exponent)) / (bitToOther ? 8 : 1)) *
    (otherToBit ? 8 : 1)
  )
}
