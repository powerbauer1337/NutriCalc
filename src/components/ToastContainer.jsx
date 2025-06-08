import React from 'react';
import ToastMessage from './ToastMessage.jsx';

const ToastContainer = ({ toasts, removeToast }) => (
  <div className="fixed top-4 right-4 z-[10001] space-y-3 w-full max-w-xs sm:max-w-sm">
    {toasts.map((toast) => (
      <ToastMessage key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
    ))}
  </div>
);

export default ToastContainer; 