/**
 * Environment variable validation
 * Ensures all required environment variables are present
 */
export const validateEnv = () => {
  const requiredVars = ['NEXT_PUBLIC_GTAG'];
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
