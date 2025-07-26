





import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const VARIANTS = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-100',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  loading = false,
  className = '',
  type = 'button',
  ...rest
}) => (
  <button
    type={type}
    className={`inline-flex items-center justify-center px-4 py-2 rounded-md font-semibold text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-150 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed ${VARIANTS[variant] || VARIANTS.primary} ${fullWidth ? 'w-full' : ''} ${className}`}
    disabled={disabled || loading}
    aria-busy={loading}
    {...rest}
  >
    {loading && (
      <span className="loader loader-gray mr-2" aria-hidden="true" />
    )}
    {children}
  </button>
);

export default Button;




