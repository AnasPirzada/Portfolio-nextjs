/**
 * Text Correction Utility
 * Fixes common speech recognition errors, especially for names and technical terms
 */

/**
 * Common misrecognitions and their corrections
 */
const CORRECTIONS = {
  // Name corrections
  anus: 'anas',
  annas: 'anas',
  annus: 'anas',
  'a nas': 'anas',
  'a nus': 'anas',

  // Common word corrections
  'hi anus': 'hi anas',
  'who is anus': 'who is anas',
  'tell me about anus': 'tell me about anas',
  'what is anus': 'what is anas',

  // Technical term corrections (add more as needed)
  react: 'react',
  'next js': 'nextjs',
  'next.js': 'nextjs',
  'node js': 'nodejs',
  'node.js': 'nodejs',
};

/**
 * Correct common speech recognition errors
 * @param {string} text - The transcribed text
 * @returns {string} - Corrected text
 */
export const correctText = text => {
  if (!text || typeof text !== 'string') return text;

  let corrected = text.toLowerCase().trim();

  // Apply word-by-word corrections
  const words = corrected.split(/\s+/);
  const correctedWords = words.map(word => {
    // Remove punctuation for matching
    const cleanWord = word.replace(/[^\w]/g, '');

    // Check if this word needs correction
    if (CORRECTIONS[cleanWord]) {
      return CORRECTIONS[cleanWord];
    }

    return word;
  });

  corrected = correctedWords.join(' ');

  // Apply phrase-level corrections (for multi-word patterns)
  Object.keys(CORRECTIONS).forEach(wrong => {
    if (wrong.includes(' ')) {
      // Multi-word correction
      const regex = new RegExp(
        wrong.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
        'gi'
      );
      corrected = corrected.replace(regex, CORRECTIONS[wrong]);
    }
  });

  // Special handling: if "anus" appears, replace with "anas" (case-insensitive)
  corrected = corrected.replace(/\banus\b/gi, 'anas');
  corrected = corrected.replace(/\bannas\b/gi, 'anas');
  corrected = corrected.replace(/\bannus\b/gi, 'anas');

  // Preserve original capitalization for first letter if it was capitalized
  if (text[0] && text[0] === text[0].toUpperCase()) {
    corrected = corrected.charAt(0).toUpperCase() + corrected.slice(1);
  }

  return corrected;
};

/**
 * Normalize text for intent detection (handles name variations)
 * @param {string} text - The text to normalize
 * @returns {string} - Normalized text
 */
export const normalizeForIntent = text => {
  if (!text) return '';

  let normalized = correctText(text);

  // Additional normalization for intent detection
  // Replace variations of "Anas" with standard form
  normalized = normalized.replace(
    /\b(anus|annas|annus|a nas|a nus)\b/gi,
    'anas'
  );

  return normalized;
};
