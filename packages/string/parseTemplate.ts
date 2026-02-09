import { getByPath } from '../object/getByPath'
import { ObjectLike } from '../common/types'
import { isFunction } from '../typed/isFunction'
import { escapeRegExp } from './escapeRegExp'

/**
 * Parses a template string `template` and replaces placeholders with actual values based on a `parser`.
 *
 * The `parser` can be either a function or a non-function object.
 * If the `parser` is a function, it will be called with the matched pattern string as an argument and should return the actual value for replacement.
 * If the `parser` is a non-function object, [getByPath](../object/getByPath) will be used with the parser and the matched pattern string as arguments. The return value will replace the pattern.
 *
 * If the actual value for replacement is `undefined` or `null`, the pattern string will be preserved.
 *
 * Optional `options` can be used to set the start and end delimiters of the pattern string.
 *
 * @param {string} template The template to replace
 * @param {ObjectLike | ((pattern: string) => string | undefined | null)} parser To replace placeholders with actual value
 * @param {{ start?: string, end?: string }} [options={}] To set the delimiters
 * @param {string} [options.start='{'] To set the start delimiters
 * @param {string} [options.end='}'] To set the end delimiters
 * @returns {string}
 * @version 0.0.2
 */

export function parseTemplate(
  template: string,
  parser: ObjectLike | ((pattern: string) => string | undefined | null),
  options: { start?: string; end?: string } = {}
) {
  const { start = '{', end = '}' } = options

  const pattern = new RegExp(`${escapeRegExp(start)}(.*?)${escapeRegExp(end)}`, 'g')

  return template.replace(pattern, (match, key) => {
    const value = isFunction(parser) ? parser(key) : getByPath(parser, key)
    return value !== undefined && value !== null ? value : match
  })
}
