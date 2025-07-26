import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 hover:shadow-md focus:ring-emerald-500',
        secondary: 'bg-white text-stone-700 border border-stone-300 shadow-sm hover:bg-stone-50 hover:shadow-md focus:ring-stone-500',
        success: 'bg-green-600 text-white shadow-sm hover:bg-green-700 hover:shadow-md focus:ring-green-500',
        danger: 'bg-red-600 text-white shadow-sm hover:bg-red-700 hover:shadow-md focus:ring-red-500',
        warning: 'bg-orange-600 text-white shadow-sm hover:bg-orange-700 hover:shadow-md focus:ring-orange-500',
        ghost: 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 focus:ring-stone-500',
        outline: 'border border-stone-300 bg-transparent text-stone-700 hover:bg-stone-50 focus:ring-stone-500',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {!loading && leftIcon && <span className="mr-1">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-1">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
