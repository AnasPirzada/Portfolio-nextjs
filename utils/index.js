/**
 * Utility Functions Export Index
 * Central location for all utility function imports
 */

// Logger
export { logger } from './logger';

// Environment Validation
export { validateEnv } from './validateEnv';

// Reading Time
export {
  calculateReadingTime,
  formatReadingTime,
  getReadingTimeEstimate,
} from './readingTime';

// Project Filters
export {
  filterProjects,
  getUniqueTags,
  groupProjectsByCategory,
  sortProjectsByDate,
} from './projectFilters';

// Animation Variants
export {
  cardHoverVariants,
  containerVariants,
  fadeInVariants,
  getTransitionVariants,
  itemVariants,
  rotateInVariants,
  scaleInVariants,
  slideInRightVariants,
  slideInVariants,
} from './animationVariants';

// Existing utilities (maintain backward compatibility)
export { openCalendlyPopup } from './calendly';
export { cn } from './cn';
export { share } from './share';
