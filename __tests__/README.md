# Testing Documentation

This project uses Jest and React Testing Library for testing.

## Setup

Install dependencies:

```bash
npm install
# or
yarn install
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Test Structure

- Unit tests for utilities: `utils/__tests__/`
- Component tests: `components/**/__tests__/`
- Integration tests: `__tests__/integration/`

## Writing Tests

### Example: Testing a Utility Function

```javascript
import { myFunction } from '../myFunction';

describe('myFunction', () => {
  it('should do something', () => {
    expect(myFunction(input)).toBe(expected);
  });
});
```

### Example: Testing a Component

```javascript
import { render, screen } from '@testing-library/react';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## Coverage Goals

- **Target**: 70%+ code coverage for utilities and critical components
- **Focus areas**:
  - Utility functions
  - Error boundaries
  - Critical user flows (forms, navigation)
  - Custom hooks

## Mocking

See `jest.setup.js` for:

- Next.js router mocking
- Next.js Image component mocking
- Next.js Link component mocking
- Window APIs (matchMedia, IntersectionObserver, etc.)

## Best Practices

1. Write tests that describe behavior, not implementation
2. Use meaningful test names
3. Test edge cases and error states
4. Keep tests isolated and independent
5. Mock external dependencies
6. Use accessibility queries when possible
