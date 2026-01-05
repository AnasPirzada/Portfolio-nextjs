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

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    // Send to error tracking service (Sentry, LogRocket, etc.)
    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.captureException(error, { contexts: { react: errorInfo } });
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-dark-4 to-gray-dark-5 px-4'
          role='alert'
        >
          <div className='max-w-md text-center'>
            <div className='mb-6'>
              <div className='text-6xl mb-4'>⚠️</div>
              <h2 className='text-2xl md:text-3xl font-bold text-white mb-2'>
                Oops! Something went wrong
              </h2>
              <p className='text-gray-light-3 mb-6'>
                We encountered an unexpected error. Please try refreshing the
                page.
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className='mb-6 text-left bg-red/10 border border-red p-4 rounded-lg'>
                <summary className='cursor-pointer text-red font-mono text-sm'>
                  Error Details (Dev Only)
                </summary>
                <pre className='mt-2 text-xs text-gray-light-3 overflow-auto max-h-48'>
                  {this.state.error.toString()}
                  {'\n\n'}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <div className='flex gap-4'>
              <button
                onClick={this.handleReset}
                className='flex-1 px-6 py-3 bg-GoldenGlow-light text-black font-semibold rounded-lg hover:bg-GoldenGlow-dark transition-colors duration-300'
              >
                Try Again
              </button>
              <button
                onClick={() => (window.location.href = '/')}
                className='flex-1 px-6 py-3 bg-gray-dark-2 text-white font-semibold rounded-lg border border-gray-dark-1 hover:border-GoldenGlow-light transition-colors duration-300'
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
