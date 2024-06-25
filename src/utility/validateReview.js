import { countWords } from "./countWords";

/**
 * Validates the review form inputs including title, content, and rating.
 * Sets an error message if validation fails.
 *
 * @param {string} title - The title of the review.
 * @param {string} content - The content of the review.
 * @param {number} rating - The star rating of the review.
 * @param {function} setErrorMessage - Function to set the error message.
 * @returns {boolean} - Returns true if all validations pass, otherwise false.
 * @returns
 */
export const validateReview = (title, content, rating, setErrorMessage) => {
  if (title.trim().length === 0) {
    setErrorMessage("A title cannot be empty.");
    return false;
  }

  if (rating === 0) {
    setErrorMessage("Please select a star rating.");
    return false;
  }

  //replace any regular expression matches any HTML tags with "" and then count the length.
  if (content.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
    setErrorMessage("A review cannot be empty.");
    return false;
  }

  const wordCount = countWords(content.replace(/<(.|\n)*?>/g, "").trim());
  if (wordCount > 100) {
    setErrorMessage(
      `The review cannot exceed 100 words. Current word count: ${wordCount}`
    );
    return false;
  }
  return true;
};
