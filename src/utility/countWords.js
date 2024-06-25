// Utility function to count words
//adapted from : https://www.geeksforgeeks.org/count-words-in-a-given-string/
/**
 * Counts the number of words in a given string.
 *
 * @param {string} str The input string to count words in.
 * @returns {number} The number of words in the input string.
 */
export const countWords = (str) => {
  if (str.trim().length === 0) {
    return 0;
  }

  let wordCount = 0;
  let state = 0;

  for (let index = 0; index < str.length; index++) {
    // Check for backslash and "-"
    if (str[index] === "\\" || str[index] === "-") {
      index++; // Skip next character (after backslash or -)
      continue;
    }
    // If the current character is a word character
    if (str[index].match(/[a-zA-Z0-9]/)) {
      if (state === 0) {
        wordCount++;
        state = 1;
      }
    } else {
      state = 0;
    }
  }
  return wordCount;
};
