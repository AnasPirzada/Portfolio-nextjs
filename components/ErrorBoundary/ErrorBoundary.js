import { Component } from 'react';

/**
 * Error Boundary Component
 * Catches JavaScript errors in child components and logs them
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Enhanced error logging
    const errorDetails = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent:
        typeof window !== 'undefined' ? window.navigator?.userAgent : 'N/A',
      url: typeof window !== 'undefined' ? window.location?.href : 'N/A',
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by ErrorBoundary:', errorDetails);
    }

    // Log to logger utility
    if (typeof window !== 'undefined' && window.logger) {
      window.logger.error('ErrorBoundary caught error', errorDetails);
    }

    // Send to Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false,
        error_type: error.name,
      });
    }

    // Send to error tracking service (Sentry, LogRocket, etc.)
    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.captureException(error, {
        contexts: { react: errorInfo },
        extra: errorDetails,
      });
    }

    // Store error in localStorage for debugging (development only)
    if (
      process.env.NODE_ENV === 'development' &&
      typeof window !== 'undefined'
    ) {
      try {
        const errors = JSON.parse(localStorage.getItem('error_log') || '[]');
        errors.push(errorDetails);
        // Keep only last 10 errors
        if (errors.length > 10) {
          errors.shift();
        }
        localStorage.setItem('error_log', JSON.stringify(errors));
      } catch (e) {
        // Silently fail if localStorage is not available
      }
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });

    // Log recovery attempt
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'error_recovery', {
        event_category: 'ErrorBoundary',
        event_label: 'User clicked Try Again',
      });
    }
  };

  handleReload = () => {
    // Log page reload
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_reload', {
        event_category: 'ErrorBoundary',
        event_label: 'User clicked Go Home after error',
      });
    }
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-dark-4 to-gray-dark-5 px-4"
          role="alert"
        >
          <div className="max-w-md text-center">
            <div className="mb-6">
              <div className="text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Oops! Something went wrong
              </h2>
              <p className="text-gray-light-3 mb-6">
                We encountered an unexpected error. Please try refreshing the
                page.
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 text-left bg-red/10 border border-red p-4 rounded-lg">
                <summary className="cursor-pointer text-red font-mono text-sm">
                  Error Details (Dev Only)
                </summary>
                <pre className="mt-2 text-xs text-gray-light-3 overflow-auto max-h-48">
                  {this.state.error.toString()}
                  {'\n\n'}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <div className="flex gap-4">
              <button
                onClick={this.handleReset}
                className="flex-1 px-6 py-3 bg-GoldenGlow-light text-black font-semibold rounded-lg hover:bg-GoldenGlow-dark transition-colors duration-300"
              >
                Try Again
              </button>
              <button
                onClick={this.handleReload}
                className="flex-1 px-6 py-3 bg-gray-dark-2 text-white font-semibold rounded-lg border border-gray-dark-1 hover:border-GoldenGlow-light transition-colors duration-300"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
