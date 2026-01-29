# Frontend Testing Guide

## Overview

The frontend uses **Vitest** as the test runner with **React Testing Library** for component testing.

## Setup

First, install the dependencies:

```bash
sudo chown -R 501:20 "/Users/engadi/.npm/cache"
npm install --legacy-peer-deps
```

## Running Tests

### Run all tests once
```bash
npm test
```

### Watch mode (re-run on file changes)
```bash
npm run test:watch
```

### Generate coverage report
```bash
npm run test:coverage
```

### Open Vitest UI (interactive test runner)
```bash
npm run test:ui
```

## Writing Tests

### Component Test Example

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';

import { MyComponent } from '@/components/MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    const user = userEvent.setup();
    render(<MyComponent />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(screen.getByText('Clicked!')).toBeInTheDocument();
  });
});
```

### Testing Async Operations

```tsx
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { UserProfile } from '@/components/UserProfile';

// Mock API calls
vi.mock('@/lib/api', () => ({
  api: {
    get: vi.fn(),
  },
}));

describe('UserProfile', () => {
  it('loads and displays user data', async () => {
    vi.mocked(api.get).mockResolvedValue({
      data: { name: 'John Doe', email: 'john@example.com' },
    });

    render(<UserProfile userId="1" />);

    // Wait for async data
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });
});
```

## Best Practices

1. **Test user behavior, not implementation details**
   - ✅ Good: `expect(screen.getByText('Submit')).toBeInTheDocument()`
   - ❌ Bad: `expect(button.classList.contains('btn-primary')).toBe(true)`

2. **Use data-testid when necessary**
   ```tsx
   <button data-testid="submit-button">Submit</button>

   // In test
   expect(screen.getByTestId('submit-button')).toBeInTheDocument();
   ```

3. **Test queries in order of preference**
   1. `getByRole` (most accessible)
   2. `getByText` / `getByLabelText`
   3. `getByTestId` (last resort)

4. **Mock external dependencies**
   ```tsx
   // Mock API
   vi.mock('@/lib/api', () => ({
     api: { get: vi.fn() },
   }));

   // Mock router
   vi.mock('next/navigation', () => ({
     useRouter: () => ({ push: vi.fn() }),
   }));
   ```

## Coverage Goals

- Unit tests: 80%+ coverage
- Components: 70%+ coverage
- Critical paths: 90%+ coverage

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
