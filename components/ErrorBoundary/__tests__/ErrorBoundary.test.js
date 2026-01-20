import { render, screen, fireEvent } from '@testing-library/react';
import { Component } from 'react';
import ErrorBoundary from '../ErrorBoundary';

// Component that throws an error
const ThrowError = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

// Test component that can be toggled to stop throwing errors
class ToggleErrorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { shouldThrow: props.shouldThrow };
  }

  static getDerivedStateFromProps(props) {
    return { shouldThrow: props.shouldThrow };
  }

  render() {
    if (this.state.shouldThrow) {
      throw new Error('Test error');
    }
    return <div>No error</div>;
  }
}

describe('ErrorBoundary', () => {
  // Suppress console.error for these tests
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should display error UI when error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/Try Again/i)).toBeInTheDocument();
    expect(screen.getByText(/Go Home/i)).toBeInTheDocument();
  });

  it('should reset error state when Try Again is clicked', () => {
    // Use a wrapper component that can change its children
    let shouldThrow = true;

    const TestWrapper = () => (
      <ErrorBoundary>
        <ThrowError
          shouldThrow={shouldThrow}
          key={shouldThrow ? 'error' : 'no-error'}
        />
      </ErrorBoundary>
    );

    const { rerender } = render(<TestWrapper />);

    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();

    // Change shouldThrow BEFORE clicking reset so the boundary
    // renders a component that doesn't throw when it resets
    shouldThrow = false;

    // Re-render with component that doesn't throw
    rerender(<TestWrapper />);

    // Reset error state by clicking Try Again
    const tryAgainButton = screen.getByText(/Try Again/i);
    fireEvent.click(tryAgainButton);

    // After reset, the ErrorBoundary should render the children (which now don't throw)
    expect(
      screen.queryByText(/Oops! Something went wrong/i)
    ).not.toBeInTheDocument();
    expect(screen.getByText('No error')).toBeInTheDocument();
  });
});
