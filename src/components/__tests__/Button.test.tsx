

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from '../Button';

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Test Button</Button>);
    const button = screen.getByRole('button', { name: 'Test Button' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-emerald-600', 'text-white');
  });

  it('applies variant classes correctly', () => {
    render(<Button variant="primary">Primary Button</Button>);
    const button = screen.getByRole('button', { name: 'Primary Button' });
    expect(button).toHaveClass('bg-emerald-600', 'text-white');

    render(<Button variant="secondary">Secondary Button</Button>);
    const secondaryButton = screen.getByRole('button', { name: 'Secondary Button' });
    expect(secondaryButton).toHaveClass('bg-white', 'text-stone-700', 'border-stone-300');
  });

  it('applies size classes correctly', () => {
    render(<Button size="sm">Small Button</Button>);
    const button = screen.getByRole('button', { name: 'Small Button' });
    expect(button).toHaveClass('h-8', 'px-3', 'text-xs');
  });

  it('handles disabled state', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button', { name: 'Disabled Button' });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50');
  });

  it('shows loading state', () => {
    render(<Button loading>Loading Button</Button>);
    const button = screen.getByRole('button', { name: 'Loading Button' });
    expect(button).toBeDisabled();
    expect(button.querySelector('svg')).toBeInTheDocument();
  });
});

