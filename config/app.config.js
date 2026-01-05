/**
 * Application Configuration
 * Environment-specific settings and API endpoints
 */

export const APP_CONFIG = {
  // App Info
  name: 'Anas Pirzada Portfolio',
  version: '2.0.0',
  environment: process.env.NODE_ENV,

  // URLs & Links
  siteUrl: 'https://anaspirzada.vercel.app',
  githubUrl: 'https://github.com/AnasPirzada',
  linkedinUrl: 'https://www.linkedin.com/in/muhammadanaspirzada/',

  // API Endpoints
  apis: {
    emailjs: {
      serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    },
    analytics: {
      gtag: process.env.NEXT_PUBLIC_GTAG,
    },
  },

  // Feature Flags
  features: {
    enableBlog: true,
    enableProjects: true,
    enableContact: true,
    enableAnalytics: true,
    enablePerformanceMonitoring: true,
  },

  // Performance Settings
  performance: {
    enableImageOptimization: true,
    enableLazyLoading: true,
    enableCodeSplitting: true,
    imageCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },

  // Animation Settings
  animations: {
    enableAnimations: true,
    reduceMotionRespect: true,
    defaultDuration: 0.5,
    defaultEasing: 'easeInOut',
  },

  // Contact Form Settings
  contactForm: {
    maxSubmissionsPerMinute: 3,
    honeypotFieldName: 'website',
    debounceDelay: 300,
  },

  // Pagination
  pagination: {
    projectsPerPage: 12,
    blogsPerPage: 10,
    reviewsPerPage: 5,
  },
};

/**
 * Get API endpoint based on environment
 */
export const getApiEndpoint = service => {
  if (process.env.NODE_ENV === 'development') {
    return `http://localhost:3000/api/${service}`;
  }
  return `${APP_CONFIG.siteUrl}/api/${service}`;
};

/**
 * Check if a feature is enabled
 */
export const isFeatureEnabled = featureName => {
  return APP_CONFIG.features[featureName] !== false;
};
