/**
 * @description Take a word and capitalise (set the first char to uppercase)
 *
 * @param {string} word
 * @return {string} - Capitalised Word
 */
export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}
