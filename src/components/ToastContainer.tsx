import React from 'react';
import ToastMessage from './ToastMessage';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

interface ToastContainerProps {
  toasts: Toast[];
  removeToast: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => (
  <div className="fixed top-4 right-4 z-[10001] space-y-3 w-full max-w-xs sm:max-w-sm">
    {toasts.map((toast) => (
      <ToastMessage key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
    ))}
  </div>
);

export default ToastContainer;
