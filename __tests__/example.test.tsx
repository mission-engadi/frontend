import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

// Example test component
function TestComponent() {
  return <div>Hello from Vitest!</div>;
}

describe('Example Test', () => {
  it('renders test component', () => {
    render(<TestComponent />);
    expect(screen.getByText('Hello from Vitest!')).toBeInTheDocument();
  });

  it('verifies basic math', () => {
    expect(1 + 1).toBe(2);
  });
});
