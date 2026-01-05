/**
 * Logger utility for consistent logging across the application
 * Supports different log levels and can integrate with error tracking services
 */

const LOG_LEVELS = {
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  DEBUG: 'debug',
};

const getTimestamp = () => {
  return new Date().toISOString();
};

const log = (level, message, data = null) => {
  const timestamp = getTimestamp();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

  switch (level) {
    case LOG_LEVELS.INFO:
      console.info(logMessage, data || '');
      break;
    case LOG_LEVELS.WARN:
      console.warn(logMessage, data || '');
      break;
    case LOG_LEVELS.ERROR:
      console.error(logMessage, data || '');
      // Send to error tracking service
      if (typeof window !== 'undefined' && window.Sentry) {
        window.Sentry.captureException(data || new Error(message));
      }
      break;
    case LOG_LEVELS.DEBUG:
      if (process.env.NODE_ENV === 'development') {
        console.debug(logMessage, data || '');
      }
      break;
    default:
      console.log(logMessage, data || '');
  }
};

export const logger = {
  info: (message, data) => log(LOG_LEVELS.INFO, message, data),
  warn: (message, data) => log(LOG_LEVELS.WARN, message, data),
  error: (message, error) => log(LOG_LEVELS.ERROR, message, error),
  debug: (message, data) => log(LOG_LEVELS.DEBUG, message, data),
};

export default logger;
