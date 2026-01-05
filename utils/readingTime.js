/**
 * Calculate reading time for blog posts
 * @param {string} text - The content text
 * @param {number} wordsPerMinute - Average words per minute (default: 200)
 * @returns {number} Estimated reading time in minutes
 */
export const calculateReadingTime = (text, wordsPerMinute = 200) => {
  if (!text) return 0;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

/**
 * Format reading time for display
 * @param {number} minutes - Reading time in minutes
 * @returns {string} Formatted reading time string
 */
export const formatReadingTime = minutes => {
  if (minutes < 1) return 'Less than 1 min read';
  if (minutes === 1) return '1 min read';
  return `${minutes} min read`;
};

/**
 * Calculate estimated completion time
 * @param {string} text - The content text
 * @returns {string} Formatted time string
 */
export const getReadingTimeEstimate = text => {
  const minutes = calculateReadingTime(text);
  return formatReadingTime(minutes);
};
