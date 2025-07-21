const decodeMap: { [key: string]: string } = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#34;': '"',
  '&#39;': "'"
}

/**
 * Decode the string from HTML entities, converting specific HTML entities (such as `&lt;`, `&gt;`, `&amp;`) back to their corresponding plain characters (e.g., <, >, &).
 * @param {any} arg The string to be converted.
 * @returns {string}
 * @version 0.0.1
 */

export function htmlDecode(arg: string): string {
  return arg.replace(/&lt;|&gt;|&amp;|&quot;|&#39;|&#34;/g, (match) => {
    return decodeMap[match]
  })
}
