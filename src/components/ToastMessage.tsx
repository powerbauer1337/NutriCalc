




import React from 'react';
import Button from './Button';

interface ToastMessageProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
}

const typeStyles = {
  success: 'bg-green-100 text-green-800 border-green-400 dark:bg-green-800 dark:text-green-100 dark:border-green-600',
  error: 'bg-red-100 text-red-800 border-red-400 dark:bg-red-800 dark:text-red-100 dark:border-red-600',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-400 dark:bg-yellow-700 dark:text-yellow-100 dark:border-yellow-500',
  info: 'bg-blue-100 text-blue-800 border-blue-400 dark:bg-blue-800 dark:text-blue-100 dark:border-blue-600',
};

const ToastMessage: React.FC<ToastMessageProps> = ({ message, type = 'info', onClose }) => (
  <div
    className={`p-4 rounded-md shadow-lg border w-full flex items-start text-sm ${typeStyles[type] || typeStyles.info}`}
    data-testid="toast-message"
    role="alert"
    aria-live="assertive"
  >
    <div className="flex-1 font-medium">{message}</div>
    <Button
      onClick={onClose}
      variant="secondary"
      className="ml-4 p-1 h-7 w-7 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white"
      aria-label="Toast schließen"
      title="Schließen"
    >
      ×
    </Button>
  </div>
);

export default ToastMessage;




