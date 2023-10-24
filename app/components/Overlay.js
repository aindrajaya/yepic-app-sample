import React from 'react';

const LoadingOverlay = ({ color = 'blue-500', size = '16' }) => {
  const spinnerClassName = `animate-spin rounded-full h-${size} w-${size} border-t-2 border-${color} border-r-2 border-b-2 border-gray-300`;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 opacity-50">
      <div className={spinnerClassName}></div>
    </div>
  );
};

export default LoadingOverlay;
