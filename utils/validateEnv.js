/**
 * Environment variable validation
 * Ensures all required environment variables are present
 */
export const validateEnv = () => {
  // Only warn about truly required variables
  // NEXT_PUBLIC_GTAG is optional (only needed for Google Analytics)
  const requiredVars = [];
  const missingVars = requiredVars.filter(key => !process.env[key]);

  if (missingVars.length > 0) {
    console.warn(`⚠️ Missing environment variables: ${missingVars.join(', ')}`);
  }
};

/**
 * Check if a variable is defined
 */
export const isDefined = value => {
  return typeof value !== 'undefined' && value !== null;
};
